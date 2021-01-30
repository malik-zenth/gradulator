import React from "react";
import { Form, Select } from "antd";
import { options } from "../Data";
import GradeInput from "./GradeInput";
import { Input} from "../Data/types";

// form inital values
interface InitialValues{
  [Key: string]: FormOption
}

interface FormOption{
  value: string,
  label: string
}

interface IProps {
  selected?: string,
  inputGrades?: Input[]
}

// selectedOption -> selected Value
// formOptions -> all possible options from given data
// initialValues -> if default value is given e.g. from pdf reader
// disabled -> if their are initial values disable the form
interface IState {
  selectedOption?: string;
  formOptions: FormOption[];
  initialValues?: InitialValues;
  disabled: boolean;
}

// Formular to calculate Grades
// this File is only the Selection of degree course and if one is selected it will render the input of grades
class Formular extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      selectedOption: null,
      formOptions: [],
      disabled: false,
    };
  }
  formRef = React.createRef();

  // settup data
  // if an emphasis is selected, set it as default value, disable the field and show grade input
  componentDidMount() {
    const { selected } = this.props;
    // add all emphasis options to a array, so we easiely can check if an selected value is a valid option
    const emphasisOptions: string[] = [];
    const selectOptions = Object.keys(options).map(function (value, _) {
      emphasisOptions.push(value);
      return { value: value, label: value };
    });
    // if their is a selected value and it is valid add it as default label and set it as selected
    if (selected && emphasisOptions.includes(selected)) {
      this.setState({
        initialValues: { select: { value: selected, label: selected } },
        selectedOption: selected,
        formOptions: selectOptions,
        disabled: true,
      });
    } else {
      this.setState({ formOptions: selectOptions });
    }
  }

  render() {
    const { selectedOption, formOptions, initialValues, disabled } = this.state;
    // settup all option so antd Form can handle them
    const handleChange = (value: any) => {
      this.setState({ selectedOption: value.value });
    };
    // if form values are not ready return empty div so initialValues are handled correctly
    if (formOptions.length === 0) {
      return <div></div>;
    }
    return (
      <div>
        <Form initialValues={initialValues}>
          <Form.Item name="select">
            <Select
              disabled={disabled}
              style={{ width: 200 }}
              labelInValue
              placeholder="Studiengang auswählen"
              options={formOptions}
              onSelect={handleChange}
            ></Select>
          </Form.Item>
        </Form>
        {selectedOption &&
        <GradeInput
        options={options[selectedOption]}
        inputGrades={this.props.inputGrades}
        />}
      </div>
    );
  }
}

export default Formular;
