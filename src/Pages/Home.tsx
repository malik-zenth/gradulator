import React from "react"
import PdfUpload from "../Components/PdfUpload"
import {Formular, AveragePage} from "../Components"
import { UserInput, SingleOption} from "../Data/types";

interface IProps{}

// selectedDegree -> Degree from PDF Reader for GradeInput Formular
// inputValues -> InputValues from PDF for GradeInput Formular
// gradeInput -> GradeInput from User from GradeInput Formular
// displayFormular -> If Grade Input Formular should be displayed
// selectedOption -> Selected Degree from GradeInput Formular
interface IState{
    selectedDegree ?: string
    inputValues ?: UserInput[],
    gradeInput ?: UserInput[],
    selectedOption ?: SingleOption,
    displayFormular: boolean,
    xy: boolean
}

// Home Page
class Home extends React.Component<IProps, IState>{
    constructor(props: IProps){
        super(props);
        this.state = {
            displayFormular: true,
            xy: false
        }
    }

    displayAverage = (gradeInput: UserInput[], selectedOption: SingleOption): void => {
        this.setState({
            gradeInput: gradeInput,
            displayFormular: false,
            selectedOption: selectedOption,
            selectedDegree: selectedOption.basics.name
        })
    }

    newCalculation = () => {
        this.setState({
            displayFormular: true,
            inputValues: [],
            selectedDegree: null
        })
    }

    editGrades = (gradeInput: UserInput[]) => {
        this.setState({
            displayFormular: true,
            inputValues: gradeInput
        })
    }

    resetInputGrades = () => {
        this.setState({
            inputValues: []
        })
    }

    resetInputGradesAndUpdateSelectedDegree = (selectedDegree: string) => {
        this.setState({
            inputValues: [],
            selectedDegree: selectedDegree
        })
    }

    setGrades = (gradeInput: UserInput[], selectedDegree: string) => {
        this.setState({
            inputValues: gradeInput,
            selectedDegree: selectedDegree,
            displayFormular: true
        })
    }



    render(){
        const {inputValues, selectedDegree, gradeInput, displayFormular, selectedOption} = this.state

        return(
            <div>

                {displayFormular &&
                <div>
                <PdfUpload
                    setGrades={(grades: UserInput[], selectedDegree: string) => this.setGrades(grades, selectedDegree)}
                />

                <Formular
                selected={selectedDegree}
                inputGrades={inputValues}
                displayAverage={(gradeValues : UserInput[], selectedOption: SingleOption) => this.displayAverage(gradeValues, selectedOption)}
                resetInputGrades={() => this.resetInputGrades()}
                resetInputGradesAndUpdateSelectedDegree={(selectedDegree: string) => this.resetInputGradesAndUpdateSelectedDegree(selectedDegree)}
                />
                </div>
                }

                {!displayFormular &&
                <AveragePage
                inputGrades={gradeInput}
                selectedOption={selectedOption}
                editCalculation={(grades: UserInput[]) => this.editGrades(grades)}
                newCalculation={() => this.newCalculation()}
                />
                }
            </div>
        )
    }
}

export default Home