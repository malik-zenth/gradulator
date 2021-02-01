import React from "react"
import { CalculationResult, Input, SingleOption} from "../Data/types";
import { calculateData } from "./Calculation/calculation";

interface IProps{
    inputGrades : Input[],
    selectedOption: SingleOption
}

interface IState{

}

class AveragePage extends React.Component<IProps, IState>{
    constructor(props: IProps){
        super(props);
        this.state = {}
    }

    render(){
        const {inputGrades, selectedOption} = this.props
        const calculationResult: CalculationResult = calculateData(inputGrades, selectedOption)
        return(
            <div></div>
        )
    }
}

export default AveragePage