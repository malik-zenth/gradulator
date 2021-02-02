import React from "react"
import {Formular, AveragePage} from "../Components"
import { Input, SingleOption} from "../Data/types";

import { options } from "../Data";

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

    newCalculation = () => {
        this.setState({
            displayFormular: true,
            inputValues: []
        })
    }

    editGrades = (gradeInput: Input[]) => {
        this.setState({
            displayFormular: true,
            inputValues: gradeInput
        })
    }



    render(){
        const {inputValues, selectedDegree, gradeInput, displayFormular, selectedOption} = this.state

//         const blub = [
//             {examid: 282011, grade: 1, estimated: false},
// {examid: 282014, grade: 2, estimated: true},
// {examid: 282130, grade: 2, estimated: false},
// {examid: 282133, grade: 3, estimated: true},
// {examid: 282134, grade: 1, estimated: false},
// {examid: 282135, grade: 2, estimated: false},
// {examid: 282136, grade: 3, estimated: false},
// {examid: 282160, grade: 2, estimated: true},
// {examid: 282161, grade: 3, estimated: false},
// {examid: 282162, grade: 4, estimated: false},
// {examid: 282163, grade: 5, estimated: false},
// {examid: 282164, grade: 2, estimated: false},
// {examid: 282165, grade: 1, estimated: false},
// {examid: 282166, grade: 1, estimated: true},
// {examid: 282172, grade: 1, estimated: false},
// {examid: 282180, grade: 4, estimated: false},
// {examid: 282181, grade: 3, estimated: false},
// {examid: 282182, grade: 2, estimated: true},
// {examid: 282183, grade: 2, estimated: true},
// {examid: 282184, grade: 1, estimated: false},
// {examid: 282185, grade: 2, estimated: false},
// {examid: 282186, grade: 2, estimated: false}
//         ]

        return(
            <div>
                <div>
                    HOME CONTENT WHATEVER BYE
                </div>

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
                editCalculation={(grades: Input[]) => this.editGrades(grades)}
                newCalculation={() => this.newCalculation()}
                />
                }
            </div>
        )
    }
}

export default Home