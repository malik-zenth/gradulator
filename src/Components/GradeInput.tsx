import React, { ReactFragment, ReactText, useEffect, useState } from "react";
import {
  UserInput,
  BasicInformation,
  Exam,
  Exams,
  SingleOption,
} from "../Data/types";
import { Form, InputNumber, Checkbox, Button, Modal, Row, Col, Divider } from "antd";

interface InitialValues {
  [key: string]: any;
}

interface FormInput {
  [key: number]: string;
}

interface IProps {
  options: SingleOption;
  inputGrades?: UserInput[];
  displayAverage: Function;
  selectedOption: string,
  resetInputGrades: Function;
}

interface OrderedExams {
  [Key: number]: SingleExam[];
}

interface SingleExam {
  examID: string;
  data: Exam;
}

const keyGenerator = (): ReactText =>
  "_" + Math.random().toString(36).substr(2, 9);

const checkboxMark: string = "_checkbox";

// form to input all grades
const GradeInput = (props: IProps) => {
  const [form] = Form.useForm();
  // this hook will handle all emphasis points which are not displayed
  const [notDisplayedEmphasis, setEmphasis] = useState([]);
  // if Modal Error Message no Input detected is displayed
  const [showModal, setShowModal] = useState(false);
  const [prevInitialValues, setPrevInitialValues] = useState({})

  // render all input fields. Data comes in type orderedExams ordered by semester
  const renderInputOptions = (exams: OrderedExams): ReactFragment => {
    if (exams == null) {
      return <div></div>;
    } else
      return Object.keys(exams).map((singleSemester) => {
        return (
          <div key={keyGenerator()}>
            <Divider orientation="left">{singleSemester}. Semester</Divider>
            <Row className="row">
              {Object.keys(exams[singleSemester]).map((singleExam) =>
                renderInputField(exams[singleSemester][singleExam])
              )}
            </Row>
          </div>
        );
      });
  };

  // render a single Input Field and its checkbox to set it as an estimated grade
  const renderInputField = (exam: SingleExam): ReactFragment => {
    return (
      <Col span={6} key={keyGenerator()}>
        <div className="form-singleGrade-name">{exam.data.name}</div>
        <div className="form-singleGrade-items">
          <Form.Item name={exam.examID} style={{ marginBottom: 0 }}>
            <InputNumber
              min={1}
              max={5}
              step={0.1}
              style={{ width: 200 }}
              placeholder="Note eingeben"
              parser={(value) => value.replace(",", ".")}
            />
          </Form.Item>
          <Form.Item
            valuePropName="checked"
            name={exam.examID + checkboxMark}
            className="form-singleGrade-estimated"
          >
            <Checkbox>Geschätze Note</Checkbox>
          </Form.Item>
        </div>
      </Col>
    );
  };

  // render all emphasis checkboxes
  const renderEmphasisCheckboxes = (
    basics: BasicInformation
  ): ReactFragment => {
    if (basics.emphasis) {
      return basics.emphasis.map((single) => {
        return (
          <div key={keyGenerator()}>
            <Form.Item valuePropName="checked">
              <Checkbox
                onChange={() => changeCheckboxState(single.emphasisid)}
                checked={!notDisplayedEmphasis.includes(single.emphasisid)}
                name={single.name}
              >
                {single.name}
              </Checkbox>
            </Form.Item>
          </div>
        );
      });
    } else {
      return <div></div>;
    }
  };

  // if an emphasis checkbox is changed either add it to state or remove it from it
  const changeCheckboxState = (emphasisId: number) => {
    if (notDisplayedEmphasis.includes(emphasisId)) {
      setEmphasis(notDisplayedEmphasis.filter((x) => x !== emphasisId));
    } else {
      const newState: number[] = notDisplayedEmphasis.concat(emphasisId);
      setEmphasis(newState);
    }
  };

  // settup exam data. filter out all exams from emphasis points which are currently not displayed and
  // order data by semester so single grade inputs can be displayed in this order
  const settupExamData = (exams: Exams): OrderedExams => {
    var semesters: number[] = [];
    var sortedBySemester: OrderedExams = [];
    for (var single in exams) {
      // filter out all currently not displayed exams and also those, which are set as ignored (e.g. Praxissemester)
      if (!notDisplayedEmphasis.includes(exams[single].emphasisid) && !exams[single].ignored) {
        if (!semesters.includes(exams[single].semester)) {
          semesters.push(exams[single].semester);
          sortedBySemester[exams[single].semester] = [
            { examID: single, data: exams[single] },
          ];
        } else {
          sortedBySemester[exams[single].semester].push({
            examID: single,
            data: exams[single],
          });
        }
      }
    }
    return sortedBySemester;
  };

  // settup default Values for the form if given
  const settupDefaultValues = (defaultValues: UserInput[],  hardreset: boolean = false): InitialValues => {
    const initalValues: InitialValues = {};
    defaultValues &&
      defaultValues.map((single) => {
        initalValues[single.examid] = hardreset ? undefined : single.grade;
        if(single.estimated) initalValues[single.examid + checkboxMark] = hardreset ? false : true;
      });
    return initalValues;
  };

  // settup grades in a way the calculations can handle it
  const settupGrades = (inputValues: FormInput): UserInput[] => {
    const gradeData: UserInput[] = [];
    // validation array to easiely check if examid is in gradeData
    const usedExamIds: string[] = [];
    // go through all inputValues
    Object.keys(inputValues).map((singleInput) => {
      // if examId is already inside of grade data go through it and add the estimated tag
      if (usedExamIds.includes(removeCheckboxTag(singleInput))) {
        for (var i = 0; i < gradeData.length; i++) {
          if (gradeData[i].examid === parseFloat(singleInput)) {
            gradeData[i].estimated = true;
          }
        }
      } else {
        // if it is not inside of the gradeData add it
        // we can set estimated to false and in the upper if to true, because the estimated
        // checkbox will always come in after the grade, because our form is settup that way
        if (singleInput.indexOf(checkboxMark) === -1) {
          usedExamIds.push(singleInput);
          gradeData.push({
            examid: parseFloat(singleInput),
            grade: inputValues[singleInput],
            estimated: false,
          });
        }
      }
    });
    return gradeData;
  };

  // Modal displayed if their is no input
  const renderModal = (): ReactFragment => {
    return (
      <Modal
        title="Keine Notendaten eingegeben!"
        visible={showModal}
        footer={[
          <Button
            key="submit"
            type="primary"
            onClick={() => setShowModal(false)}
          >
            Ok
          </Button>,
        ]}
      >
        <p>Bitte geb Notendaten ein, bevor du das Formular abschickst</p>
      </Modal>
    );
  };

  // remove the checkbox tag from the value of the input Object
  const removeCheckboxTag = (examID: string): string => {
    if (examID.indexOf(checkboxMark) === -1) return examID;
    else return examID.substring(0, examID.indexOf(checkboxMark));
  };

  // handle submit of form
  const onSubmit = (e: any) => {
    e.preventDefault();
    form
      .validateFields()
      .then((values) => {
        Object.keys(values).forEach((key) => {
          if (values[key] == undefined) delete values[key];
        });
        if (Object.keys(values).length > 0 && Object.keys(values).filter(x => !x.includes(checkboxMark)).length > 0) {
          props.displayAverage(settupGrades(values), props.selectedOption);
        } else {
          setShowModal(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };


  const { options, inputGrades } = props;
  const { basics, exams } = options;
  const orderdExams = settupExamData(exams);
  const initialValues = settupDefaultValues(inputGrades)

  const resetForm = () => {
    // reset Input Grades on Home.tsx
    props.resetInputGrades()
    // setFieldValues to null and undefined
    // form does also come with form.resetFields() but this does not reset initalValues
    form.setFieldsValue(settupDefaultValues(inputGrades, true))
  }


  useEffect(() => {
    // if incomping defaultValues are different from our current update Form values
    if(JSON.stringify(prevInitialValues) != JSON.stringify(initialValues)){
      setPrevInitialValues(initialValues)
      form.resetFields()
      form.setFieldsValue(initialValues)
    }
  }, [initialValues])

  return (
    <div>
      {renderModal()}
      <Form initialValues={initialValues} form={form} id="grade-formular">
        <div className="form-emphasis">{renderEmphasisCheckboxes(basics)}</div>
        <div className="form-grades">{renderInputOptions(orderdExams)}</div>
        <div className="form-submit">
          <Button type="primary" htmlType="submit" onClick={onSubmit}>
            Notenschnitt berechnen
          </Button>
          <div className="form-grades-button-reset">
            <Button htmlType="button" onClick={resetForm}>
              Formular zurücksetzen
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default GradeInput;
