import React, { ReactFragment, ReactText, useState } from "react";
import { Input, BasicInformation, Emphasis, Exam, ExamPackages, Exams, SingleOption } from "../Data/types";
import { Form, InputNumber, Checkbox, Button } from "antd";
import { Row, Col, Divider } from 'antd'

interface InitialValues{
    [key: string]: number
}

interface IProps {
    options: SingleOption;
    inputGrades?: Input[]
}

interface OrderedExams{
    [Key: number]: SingleExam[]
 }

 interface SingleExam{
     examID: string,
     data: Exam
 }


const keyGenerator = (): ReactText =>
    "_" + Math.random().toString(36).substr(2, 9);


// form to input all grades
const GradeInput = (props: IProps) => {
    const [form] = Form.useForm();
    // this hook will handle all emphasis points which are not displayed
    const [notDisplayedEmphasis, setEmphasis] = useState([]);

    // render all input fields. Data comes in type orderedExams ordered by semester
    const renderInputOptions = (exams: OrderedExams): ReactFragment => {
        if (exams == null) {
            return <div></div>;
        } else
            return Object.keys(exams).map((singleSemester) => {
                return(
                    <div key={keyGenerator()}>
                        <Divider orientation="left">{singleSemester}. Semester</Divider>
                        <Row className="row">
                        {Object.keys(exams[singleSemester]).map(singleExam => renderInputField(exams[singleSemester][singleExam]))}
                        </Row>
                    </div>
                )
            })

    }

    // render a single Input Field and its checkbox to set it as an estimated grade
    const renderInputField = (exam: SingleExam): ReactFragment => {
        return (
            <Col span={6} key={keyGenerator()}>
                <div className="form-singleGrade-name">{exam.data.name}</div>
                <div className="form-singleGrade-items">
                    <Form.Item
                        rules={[
                        {required: exam.data.emphasisid ? false : true, message: 'Bitte eine Note eingeben' }]}
                        name={exam.examID}>
                        <InputNumber
                            min={1}
                            max={5}
                            step={0.1}
                            style={{ width: 200 }}
                            placeholder="Note eingeben"
                            parser={value => value.replace(",",".")}
                            />
                    </Form.Item>
                    <Form.Item valuePropName="checked" name={exam.examID+"_checkbox"} className="form-singleGrade-estimated">
                        <Checkbox>
                            Geschätze Note
                    </Checkbox>
                    </Form.Item>
                </div>
            </Col>
        )
    }

    // render all emphasis checkboxes
    const renderEmphasisCheckboxes = (basics: BasicInformation): ReactFragment => {
        if (basics.emphasis) {
            return basics.emphasis.map(single => {
                return (
                    <div key={keyGenerator()}>
                        <Form.Item valuePropName="checked">
                            <Checkbox
                                onChange={() => changeCheckboxState(single.emphasisid)}
                                checked={!notDisplayedEmphasis.includes(single.emphasisid)}
                                name={single.name} >{single.name}</Checkbox>
                        </Form.Item>
                        </div>
                )
            })
        } else {
            return <div></div>
        }
    }

    // if an emphasis checkbox is changed either add it to state or remove it from it
    const changeCheckboxState = (emphasisId: number) => {
        if (notDisplayedEmphasis.includes(emphasisId)) {
            setEmphasis(notDisplayedEmphasis.filter(x => x !== emphasisId))
        } else {
            const newState: number[] = notDisplayedEmphasis.concat(emphasisId)
            setEmphasis(newState)
        }
    }

    // settup exam data. filter out all exams from emphasis points which are currently not displayed and 
    // order data by semester so single grade inputs can be displayed in this order
    const settupExamData = (exams: Exams): OrderedExams => {
        var semesters: number[] = []
        var sortedBySemester: OrderedExams = []
        for (var single in exams) {
            if (!notDisplayedEmphasis.includes(exams[single].emphasisid)) {
                if(!semesters.includes(exams[single].semester)){
                    semesters.push(exams[single].semester)
                    sortedBySemester[exams[single].semester] = [{examID: single, data: exams[single]}]
                }else{
                    sortedBySemester[exams[single].semester].push({examID: single, data: exams[single]})
                }
            }
        }
        return sortedBySemester
    }

    // settup default Values for the form if given
    const settupDefaultValues = (defaultValues: Input[]): InitialValues => {
        const initalValues: InitialValues = {}
        defaultValues && defaultValues.map(single => {
            initalValues[single.examid] = single.grade
        })
        return initalValues
    }

    // handle submit of form
    const onSubmit = (e: any) => {
        e.preventDefault();
        form.validateFields()
            .then(values => console.log(values))
            .catch(error => {
                console.log(error)
            })

    }

    const { options, inputGrades } = props;
    const { basics, exams, examPackages } = options;
    const orderdExams = settupExamData(exams)
    const defaultValues = settupDefaultValues(inputGrades)
    return (
        <div>
            <Form initialValues={defaultValues} form={form} id="grade-formular">
                <div className="form-emphasis">
                    {renderEmphasisCheckboxes(basics)}
                </div>
                <div className="form-grades">
                    {renderInputOptions(orderdExams)}
                </div>
                <div className="form-submit">
                    <Form.Item>
                        <Button type="primary" htmlType="submit" onClick={onSubmit}>
                            Notenschnitt berechnen
                </Button>
                    </Form.Item>
                </div>
            </Form>
        </div>
    );
}


export default GradeInput;
