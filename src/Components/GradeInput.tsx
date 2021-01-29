import React, { ReactFragment, ReactText, useState } from "react";
import { BasicInformation, Emphasis, Exam, ExamPackages, Exams, SingleOption } from "../Data/types";
import { Form, Input, InputNumber, Checkbox, Button } from "antd";

interface IProps {
    options: SingleOption;
}

const keyGenerator = (): ReactText =>
    "_" + Math.random().toString(36).substr(2, 9);

const GradeInput = (props: IProps) => {
    const [form] = Form.useForm();
    const [notDisplayedEmphasis, setEmphasis] = useState([]);

    const renderInputOptions = (exams: Array<[string, number, Exam]>): ReactFragment => {
        var lastSemester: number
        var showSemesterHeading: boolean
        if (exams == null) {
            return <div></div>;
        } else
            return exams.map((exam) => {
                lastSemester != exam[2].semester ? showSemesterHeading = true : showSemesterHeading = false
                lastSemester = exam[2].semester
                if (showSemesterHeading) {
                    return (
                        <div key={keyGenerator()}>
                            <div className="form-semester-heading">{lastSemester}. Semester</div>
                            {renderInputField(exam)}
                        </div>
                    )
                } else {
                    return renderInputField(exam)
                }
            });
    }

    const renderInputField = (exam: [string, number, Exam]): ReactFragment => {
        return (
            <div key={keyGenerator()} className="form-singleGrade" >
                <div className="form-singleGrade-name">{exam[2].name}</div>
                <div className="form-singleGrade-items">
                    <Form.Item
                        rules={[
                        {required: exam[2].emphasisid ? false : true, message: 'Bitte eine Note eingeben' }]}
                        name={exam[0]}>
                        <InputNumber
                            min={1}
                            max={5}
                            step={0.1}
                            style={{ width: 200 }}
                            placeholder="Note eingeben"
                            parser={value => value.replace(",",".")}
                            />
                    </Form.Item>
                    <Form.Item valuePropName="checked" name={exam[0]+"_checkbox"} className="form-singleGrade-estimated">
                        <Checkbox>
                            Geschätze Note
                    </Checkbox>
                    </Form.Item>
                </div>
            </div>
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

    const settupExamData = (exams: Exams): Array<[string, number, Exam]> => {
        var sorted: Array<[string, number, Exam]> = []
        for (var single in exams) {
            if (!notDisplayedEmphasis.includes(exams[single].emphasisid)) {
                sorted.push([single, exams[single].semester, exams[single]])
            }
        }
        sorted.sort((a, b) => (a[1] > b[1]) ? 1 : -1)
        return sorted
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
