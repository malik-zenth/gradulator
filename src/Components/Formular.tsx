import React from "react";
import { Form, Select, Modal, Button } from "antd";
import { options } from "../Data";
import GradeInput from "./GradeInput";
import { UserInput } from "../Data/types";
import { MailLink } from "./const";

// form inital values
interface InitialValues {
  [Key: string]: FormOption;
}

interface FormOption {
  value: string;
  label: string;
}

interface IProps {
  selected?: string;
  inputGrades?: UserInput[];
  displayAverage: Function;
  resetInputGrades: Function
}

// selectedOption -> selected Value
// formOptions -> all possible options from given data
// initialValues -> if default value is given e.g. from pdf reader
// showModal -> If PDF Reader detects invalid degree we do not support jet show Modal
interface IState {
  selectedOption?: string;
  formOptions: FormOption[];
  initialValues?: InitialValues;
  showModal: boolean;
}

// Formular to calculate Grades
// this File is only the Selection of degree course and if one is selected it will render the input of grades
class Formular extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      selectedOption: null,
      formOptions: [],
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
      });
    } else if (selected && !emphasisOptions.includes(selected)) {
      this.setState({
        formOptions: selectOptions,
        showModal: true,
        selectedOption: selected,
      });
    } else {
      this.setState({ formOptions: selectOptions });
    }
  }

  // Modal displayed if the detected degree is not supported
  renderModal() {
    return (
      <Modal
        title="Studiengang wird nicht unterstützt"
        visible={this.state.showModal}
        footer={[
          <Button
            key="submit"
            type="primary"
            onClick={() =>
              this.setState({ selectedOption: null, showModal: false })
            }
          >
            Ok
          </Button>,
        ]}
      >
        <p>
          Der Studiengang {this.state.selectedOption} wird aktuell leider nicht
          unterstützt
        </p>
        <p>
          Lasse uns einen der unteren Wege wissen, dass wir{" "}
          {this.state.selectedOption} hinzufügen sollen und wir melden uns bei
          dir, sollten wir ihn hinzufügen
        </p>
        <a
          className="modal_link"
          onClick={() => (window.location.href = MailLink)}
        >
          per E-Mail
        </a>
        <a
          className="modal_link"
          onClick={() =>
            window.open(
              "https://www.linkedin.com/in/benjamin-zenth-6290681ba/",
              "_blank"
            )
          }
        >
          über LinkedIn
        </a>
      </Modal>
    );
  }

  render() {
    const {
      selectedOption,
      formOptions,
      initialValues,
      showModal,
    } = this.state;
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
        <div className="selectDegree-box">
          <div className="form-selectDegree">
            <Form initialValues={initialValues}>
              <Form.Item name="select">
                <Select
                  style={{ width: 300 }}
                  labelInValue
                  placeholder="Studiengang auswählen"
                  options={formOptions}
                  onSelect={handleChange}
                ></Select>
              </Form.Item>
            </Form>
          </div>
          <div className="selectDegree-info">
            <div className="selectDegree-text">Studiengang auswählen</div>
            <div className="selectDegree-contact">
              Dein Studiengang fehlt?
              <a
                onClick={() => (window.location.href = MailLink)}
                className="selectDegree-contact-link"
              >
                Melde dich hier
              </a>
            </div>
          </div>
        </div>
        {selectedOption && !showModal && (
          <GradeInput
            options={options[selectedOption]}
            inputGrades={this.props.inputGrades}
            displayAverage={(gradeValues: UserInput[]) =>
              this.props.displayAverage(gradeValues, options[selectedOption])
            }
            resetInputGrades={() => this.props.resetInputGrades()}
          />
        )}
      </div>
    );
  }
}

export default Formular;
