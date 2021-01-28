import React from "react"
import {Form, Select} from "antd"
import {options} from "../Data"
import GradeInput from "./GradeInput"

interface IProps {

}

interface IState {
    selectedOption?: string
}

class Formular extends React.Component<IProps, IState>{
    constructor(props: IProps) {
        super(props);
        this.state = {
            selectedOption: null
        }
    }

    render(){
        const {selectedOption} = this.state
        const selectOptions = Object.keys(options).map(function(value, label){
            return {value: value, label: value}
        })

        const handleChange = (value: any) => {
            this.setState({selectedOption: value.value})
        }

        return(
            <div>
                <Form>
                    <Form.Item name="select">
                        <Select
                        style={{ width: 200 }}
                        labelInValue
                        placeholder="Studiengang auswählen"
                        options={selectOptions}
                        onSelect={handleChange}
                        >
                        </Select>
                    </Form.Item>
                </Form>
                {selectedOption &&
                <GradeInput
                    options={options[selectedOption]}
                />}
            </div>
        )
    }
}

export default Formular