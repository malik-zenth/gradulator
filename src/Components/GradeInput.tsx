import React, { ReactFragment, ReactText, useState } from "react";
import { BasicInformation, Emphasis, Exam, ExamPackages, Exams, SingleOption } from "../Data/types";
import { Form, Input, InputNumber, Checkbox, Button } from "antd";
import { Row, Col, Divider } from 'antd'

interface IProps {
    options: SingleOption;
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

const GradeInput = (props: IProps) => {
    const [form] = Form.useForm();
    const [notDisplayedEmphasis, setEmphasis] = useState([]);

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

    const changeCheckboxState = (emphasisId: number) => {
        if (notDisplayedEmphasis.includes(emphasisId)) {
            setEmphasis(notDisplayedEmphasis.filter(x => x !== emphasisId))
        } else {
            const newState: number[] = notDisplayedEmphasis.concat(emphasisId)
            setEmphasis(newState)
        }
    }

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

    const onSubmit = (e: any) => {
        e.preventDefault();
        form.validateFields()
            .then(values => console.log(values))
            .catch(error => {
                console.log(error)
            })

    }

    const { options } = props;
    const { basics, exams, examPackages } = options;
    const orderdExams = settupExamData(exams)

    return (
        <div>
            <Form form={form} id="grade-formular">
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
