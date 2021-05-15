import React, { ReactFragment, ReactText, useState } from "react"
import { Form, InputNumber, Input, Button } from "antd";
import { ExamCreationType, ExamPackageCreationType } from "./types";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import ExamComponent from "./ExamComponent";


interface iProps {
    onDelete: Function,
    onSave: Function
}

const keyGenerator = (): ReactText =>
    "_" + Math.random().toString(36).substr(2, 9);

const ExamPackageComponent = (props: iProps) => {
    const [form] = Form.useForm();
    // if an already created Exam is currently edited
    const [editExamMode, setEditExamMode] = useState<boolean>(false)
    // currently edited Exam
    const [examToBeEdited, setToBeEditedExam] = useState<ExamCreationType>(null)
    // if an new Exam is currently created
    const [createExamMode, setCreateExamMode] = useState<boolean>(false)
    const [inputValues, setInputValues] = useState<ExamPackageCreationType>(null)
    // all created Exams
    const [inputExams, setInputExams] = useState<ExamCreationType[]>([{ name: "Leadership und Entrepreneurship", weight: 10, semester: 3, ects: 5, editMode: true }])

    const nameInputField = (): ReactFragment => {
        return (
            <Form.Item
                name="name"
                rules={[
                    {
                        required: true,
                        message: "Name fehlt!"
                    }
                ]}
            >
                <Input
                    type="string"
                    placeholder="Name der Paketes"
                    style={{ width: 300 }}
                />
            </Form.Item>
        )
    }

    const weightField = (): ReactFragment => {
        return (
            <Form.Item
                name="weight"
                style={{ marginLeft: 7.5 }}
                rules={[
                    {
                        required: true,
                        message: "Gewichtung fehlt!"
                    }
                ]}
            >
                <InputNumber
                    placeholder="Gewichtung"
                    min={1}
                    max={30}
                    step={0.5}
                    style={{ width: 100 }}
                    parser={(value) => {
                        value = value.replace(",", ".")
                        if (value.indexOf(".") + 2 < value.length) {
                            value = value.substring(0, value.indexOf(".") + 2)
                        }
                        // we only allow floats with .5as those are the only values that are possible
                        if (value.includes(".") && !value.endsWith(".") && !(value.endsWith("0") || value.endsWith("5"))) {
                            value = value.substring(0, value.indexOf(".") + 1)
                        }
                        return value
                    }}
                />
            </Form.Item>
        )
    }

    const onSubmit = (e: any) => {
        e.preventDefault()
        form
            .validateFields()
            .then((values: ExamPackageCreationType) => {
                setInputValues(values)
                props.onSave(values)
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const buttons = (): ReactFragment => {
        return (
            <div>
                <Button htmlType="button" danger onClick={() => { }}>
                    Löschen
                    </Button>
                <Button type="primary" htmlType="submit" onClick={onSubmit}>
                    Speichern
                </Button>
            </div>
        )
    }

    const renderForm = () => {
        return (
            <Form form={form} initialValues={inputValues}>
                {nameInputField()}
                {weightField()}
            </Form>
        )
    }

    const addExam = () => {
        setCreateExamMode(true)
    }

    const renderExamsHeader = (): ReactFragment => {
        return (
            <div>
                <h3>Prüfungen</h3>
                {!createExamMode &&
                    <Button
                        type="primary"
                        size="small"
                        onClick={() => addExam()}
                        shape="round"
                        icon={<PlusOutlined />}>
                    </Button>
                }
            </div>
        )
    }

    const saveCreatedExam = (exam: ExamCreationType) => {
        inputExams.push(exam)
        setCreateExamMode(false)
    }

    const updateExam = (exam: ExamCreationType) => {
        const updatedInputExams: ExamCreationType[] = inputExams.filter(single => single != examToBeEdited)
        updatedInputExams.push(exam)
        setInputExams(updatedInputExams)
    }

    const editExam = (exam: ExamCreationType) => {
        setToBeEditedExam(exam)
        setEditExamMode(true)
    }

    const deleteExam = (exam: ExamCreationType) => {
        const updatedInputExams: ExamCreationType[] = inputExams.filter(single => single != exam)
        setInputExams(updatedInputExams)
    }

    const renderCreatedExams = (): ReactFragment => {
        // parse all created Exams and display them with an create and delete option
        // if length is null return info text
        if (inputExams.length == 0 && !createExamMode) return (
            <div>
                bisher keine Prüfungen hinzugefügt
            </div>
        )
        return inputExams.map((value: ExamCreationType) => {
            return (
                <div key={keyGenerator()}>
                    <p>{value.name}</p>
                    <p>{value.semester}. Semester</p>
                    <p>ECTS: {value.ects}</p>
                    <p>Gewichtung: {value.weight}</p>

                    <Button
                        size="small"
                        onClick={() => editExam(value)}
                        shape="round"
                        icon={<EditOutlined />}>
                    </Button>

                    <Button
                        size="small"
                        danger
                        onClick={() => deleteExam(value)}
                        shape="round"
                        icon={<DeleteOutlined />}>
                    </Button>
                </div>
            )
        })
    }


    return (
        <div className="examComponent">
            {renderForm()}
            {renderExamsHeader()}
            {renderCreatedExams()}
            {createExamMode &&
                <ExamComponent
                    onDelete={() => setCreateExamMode(false)}
                    onSave={(exam: ExamCreationType) => {
                        setCreateExamMode(false)
                        saveCreatedExam(exam)
                    }}
                />}
            {editExamMode &&
                <ExamComponent
                    onDelete={() => {
                        deleteExam(examToBeEdited)
                        setEditExamMode(false)
                    }
                    }
                    onSave={(exam: ExamCreationType) => {
                        setEditExamMode(false)
                        updateExam(exam)
                    }}
                    inputValues={examToBeEdited}
                />}
            {buttons()}
        </div>
    )
}

export default ExamPackageComponent