import React from "react";
import { Form, Select, Modal, Button } from "antd";
import { options } from "../Data";
import GradeInput from "./GradeInput";
import { Input} from "../Data/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faEdit} from "@fortawesome/free-solid-svg-icons";

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
  inputGrades?: Input[],
  displayAverage: Function
}

// selectedOption -> selected Value
// formOptions -> all possible options from given data
// initialValues -> if default value is given e.g. from pdf reader
// disabled -> if their are initial values disable the form
// showModal -> If PDF Reader detects invalid degree we do not support jet show Modal
interface IState {
  selectedOption?: string;
  formOptions: FormOption[];
  initialValues?: InitialValues;
  disabled: boolean;
  showModal: boolean
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
      showModal: false
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
    } else if(selected && !emphasisOptions.includes(selected)){
      this.setState({
        formOptions: selectOptions,
        showModal: true,
        selectedOption: selected
      })
    }else {
      this.setState({ formOptions: selectOptions });
    }
  }

  renderEditIcon(){
    return(
      <div onClick={() => this.setState({disabled: false})} className="form-editSelectDegree">
        <FontAwesomeIcon icon={faEdit} />
    </div>
    )
  }

  // Modal displayed if the detected degree is not supported
  renderModal(){
    return(
      <Modal title="Studiengang wird nicht unterstützt" visible={this.state.showModal}
      footer={[
          <Button key="submit" type="primary" onClick={() => this.setState({selectedOption: null, showModal: false})}>
            Ok
          </Button>,
        ]}>
      <p>Der Studiengang {this.state.selectedOption} wird aktuell leider nicht unterstützt</p>
      <p>Lasse uns einen der unteren Wege wissen, dass wir {this.state.selectedOption} hinzufügen sollen und wir melden uns bei dir, sollten wir ihn hinzufügen</p>
      <a className="modal_link" onClick={() => window.location.href = "mailto:user@example.com?subject=Unterstützung%20Studiengang&body=message%20goes%20here"}>per E-Mail</a>
      <a className="modal_link" onClick={() => window.open("https://www.linkedin.com/in/benjamin-zenth-6290681ba/", "_blank")}>über LinkedIn</a>
    </Modal>
    )
  }

  render() {
    const { selectedOption, formOptions, initialValues, disabled, showModal } = this.state;
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
        {this.renderModal()}
        <div className="form-selectDegree">
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
        {disabled && this.renderEditIcon()}
        </div>
        {(selectedOption && !showModal) &&
        <GradeInput
        options={options[selectedOption]}
        inputGrades={this.props.inputGrades}
        displayAverage={(gradeValues : Input[]) => this.props.displayAverage(gradeValues, options[selectedOption])}
        />}
      </div>
    );
  }
}

export default Formular;
