import React from "react";
import { Form, Select, Modal, Button } from "antd";
import { DegreeOptions, UserInput } from "../Data/types";
import { MailLink } from "./const";
import { FormInstance } from 'antd/lib/form';
import { options } from "../Data";
import { EditOutlined } from '@ant-design/icons';
import { Upload } from 'antd';


const { Dragger } = Upload;

// form inital values
interface InitialValues {
  [Key: string]: FormOption;
}

interface FormOption {
  value: string;
  label: string;
}

interface IProps {
  options: DegreeOptions;
  selected?: string;
  inputGrades?: UserInput[];
  resetInputGradesAndUpdateSelectedDegree: Function
}

// selectedOption -> selected Value
// formOptions -> all possible options from given data
// initialValues -> if default value is given e.g. from pdf reader
// showModal -> If PDF Reader detects invalid degree we do not support jet show Modal
interface IState {
  selectedOption?: string;
  formOptions: FormOption[];
  initialValues?: InitialValues;
}

// Formular to calculate Grades
// this File is only the Selection of degree course and if one is selected it will render the input of grades
class Formular extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      selectedOption: null,
      formOptions: [],
    };
  }

  formRef = React.createRef<FormInstance>();

  componentDidUpdate(prevProps: IProps) {
    if (this.props != prevProps) {
      const { selected } = this.props;
      const formOptions: FormOption[] = this.settupData(selected)
      this.formRef.current.setFieldsValue(formOptions)
    }
  }

  // settup data
  // if an emphasis is selected, set it as default value, disable the field and show grade input
  componentDidMount() {
    const { selected, options } = this.props;
    this.settupData(selected)
  }

  settupData(selected: string): any {
    const selectOptions = Object.keys(this.props.options).map(function (value, _) {
      return { value: value, label: value };
    });
    // if their is a selected value and it is valid add it as default label and set it as selected
    if (selected && Object.keys(options).includes(selected)) {
      this.setState({
        initialValues: { select: { value: selected, label: selected } },
        selectedOption: selected,
        formOptions: selectOptions,
      });
      return { select: { value: selected, label: selected } }
    } else {
      this.setState({ formOptions: selectOptions });
    }
  }


  render() {
    const {
      formOptions,
      initialValues,
    } = this.state;
    // settup all option so antd Form can handle them
    const handleChange = (value: any) => {
      this.setState({ selectedOption: value.value })
      // on change of selectedDegree also reset the current InputGrades
      this.props.resetInputGradesAndUpdateSelectedDegree(value.value)
    };

    // if form values are not ready return empty div so initialValues are handled correctly
    if (formOptions.length === 0) {
      return <div></div>;
    }
    return (
      <div>
        <div className="selectDegree-box">
          <div >
            {/* <div className="selectDegree-text">Studiengang auswählen</div>
            <div className="selectDegree-contact">
              Dein Studiengang fehlt?
              <a
                onClick={() => (window.location.href = MailLink)}
                className="selectDegree-contact-link"
              >
                Melde dich hier
              </a>
            </div> */}
            <div className="ant-upload ant-upload-drag" style={{paddingTop: '16px'}}>
              <p className="ant-upload-drag-icon ant-upload-drag ">
              <EditOutlined />
              </p>
              <p className="ant-upload-text">Studiengang auswählen</p>
              <p className="ant-upload-hint">
                Dein Studiengang fehlt?
              <a
                  onClick={() => (window.location.href = MailLink)}
                  className="selectDegree-contact-link"
                >
                  Melde dich hier
              </a>
              </p>
              <div style={{paddingLeft: 15, paddingRight: 15, paddingTop: 15}}>
              <Form initialValues={initialValues} ref={this.formRef}>
              <Form.Item name="select">
                <Select
                  labelInValue
                  placeholder="Studiengang auswählen"
                  options={formOptions}
                  onSelect={handleChange}
                ></Select>
              </Form.Item>
            </Form>
            </div>
            </div>
          </div>
          {/* <div className="form-selectDegree">
            <Form initialValues={initialValues} ref={this.formRef}>
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
          </div> */}
        </div>
      </div>
    );
  }
}

export default Formular;
