import React from "react"
import {Formular, AveragePage} from "../Components"
import { Input, SingleOption} from "../Data/types";
interface IProps{

}

// selectedDegree -> Degree from PDF Reader for GradeInput Formular
// inputValues -> InputValues from PDF for GradeInput Formular
// gradeInput -> GradeInput from User from GradeInput Formular
// displayFormular -> If Grade Input Formular should be displayed
// selectedOption -> Selected Degree from GradeInput Formular
interface IState{
    selectedDegree ?: string
    inputValues ?: Input[],
    gradeInput ?: Input[],
    selectedOption ?: SingleOption,
    displayFormular: boolean
}

// Home Page
class Home extends React.Component<IProps, IState>{
    constructor(props: IProps){
        super(props);
        this.state = {
            displayFormular: true
        }
    }

    displayAverage = (gradeInput: Input[], selectedOption: SingleOption): void => {
        this.setState({
            gradeInput: gradeInput,
            displayFormular: false,
            selectedOption: selectedOption
        })
    }



    render(){
        const {inputValues, selectedDegree, gradeInput, displayFormular, selectedOption} = this.state

        return(
            <div>

                {displayFormular &&
                <Formular
                selected={selectedDegree}
                inputGrades={inputValues}
                displayAverage={(gradeValues : Input[], selectedOption: SingleOption) => this.displayAverage(gradeValues, selectedOption)}
                />
                }
                {!displayFormular &&
                <AveragePage
                inputGrades={gradeInput}
                selectedOption={selectedOption}

                />
                }
            </div>
        )
    }
}

export default Home