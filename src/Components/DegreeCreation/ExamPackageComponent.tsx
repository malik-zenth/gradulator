import React, { ReactFragment, ReactText, useEffect, useState } from "react"
import { Form, InputNumber, Input, Button } from "antd";
import { ExamCreationType, ExamPackageCreationType, FormUpdateType } from "./types";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import ExamComponent from "./ExamComponent";
import { DeleteExamModal, DeleteExamPackageModal } from "./ModalMessages";


interface iProps {
    onDelete: Function,
    onSave: Function,
    defaultValues: ExamPackageCreationType
}

const keyGenerator = (): ReactText =>
    "_" + Math.random().toString(36).substr(2, 9);

const ExamPackageComponent = (props: iProps) => {
    const [form] = Form.useForm();
    const [exams, setExams] = useState<ExamCreationType[]>(props.defaultValues.exams)
    // if Modal to delete Exam should be displayed
    const [showDeleteExamModal, setShowDeleteExamModal] = useState<boolean>(false)
    // Exam that will be deleted if user accepts inside of modal
    const [examToBeDeleted, setExamToBeDeleted] = useState<number>(null)
    // if Modal to delete this ExamPackage should be displayed
    const [showDeleteExamPackageModal, setShowDeleteExamPackageModal] = useState<boolean>(false)

    useEffect(() => {
        // if exams change, update the values inside of parent component
        if(exams != props.defaultValues.exams){
            updateValues()
        }
    }, [exams])

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
                    placeholder="Name der Modulprüfung"
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
                values.editMode = false
                values.exams = exams
                props.onSave(values)
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const buttons = (): ReactFragment => {
        return (
            <div>
                <Button htmlType="button" danger onClick={() => validateDeleteModal()}>
                    Modulprüfung löschen
                    </Button>
                <Button type="primary" htmlType="submit" onClick={onSubmit}>
                    Speichern
                </Button>
            </div>
        )
    }

    // check if their are changes to eighter Exams or the ExamPackage
    // if so show Modal message
    const validateDeleteModal = () => {
        if(!(form.getFieldValue("name") || form.getFieldValue("weight") || exams.length != 0)){
            props.onDelete()
        }else{
            setShowDeleteExamPackageModal(true)
        }
    }

    // update values in parent component on form update
    const updateValues = () => {
        const name: string = form.getFieldValue("name")
        const weight: number = form.getFieldValue("weight")
        const newExamPackage: ExamPackageCreationType = {
            name: name, weight: weight, exams: exams, editMode: props.defaultValues.editMode
        }
        props.onSave(newExamPackage)
    }

    const renderExamPackage = () => {
        return (
            <Form
                form={form}
                initialValues={props.defaultValues}
                onValuesChange={() => updateValues()}
            >
                {nameInputField()}
                {weightField()}
            </Form>
        )
    }

    const addExam = () => {
        setExams([...exams, { editMode: true }])
    }

    const renderExamsHeader = (): ReactFragment => {
        return (
            <div>
                <h3>Prüfungen</h3>
                <Button
                    type="primary"
                    size="small"
                    onClick={() => addExam()}
                    shape="round"
                    icon={<PlusOutlined />}>
                </Button>
            </div>
        )
    }

    // update the editMode of an Exam
    const setEditExam = (editValue: boolean, indexToUpdate: number) => {
        setExams(exams.map((value, index) => {
            if (indexToUpdate === index) {
                value.editMode = editValue
                return value
            }
            return value
        }))
    }

    // delete Exam
    const deleteExam = (indexToDelete: number) => {
        setExams(exams.filter((value, index) => index != indexToDelete))
    }

    // save Exam
    const saveExam = (exam: ExamCreationType, indexToUpdate: number) => {
        setExams(exams.map((value, index) => {
            if (index === indexToUpdate) return exam
            return value
        }))
    }

    const renderCreatedExams = (exams: ExamCreationType[]): ReactFragment => {
        // parse all created Exams and display them with an create and delete option
        // if length is null return info text
        if (exams.length === 0) return (
            <div>
                bisher keine Prüfungen hinzugefügt
            </div>
        )
        return (exams.map((value: ExamCreationType, index: number) => {
            if (value.editMode) {
                return (
                    <div key={keyGenerator()}>
                        <ExamComponent
                            onDelete={() => deleteExam(index)}
                            onSave={(examData: ExamCreationType) => saveExam(examData, index)}
                            defaultValues={value}
                        />
                    </div>
                )
            }
            else return (
                <div key={keyGenerator()}>
                    <p>{value.name}</p>
                    <p>{value.semester}. Semester</p>
                    <p>ECTS: {value.ects}</p>
                    <p>Gewichtung: {value.weight}</p>

                    <Button
                        size="small"
                        onClick={() => setEditExam(true, index)}
                        shape="round"
                        icon={<EditOutlined />}>
                    </Button>

                    <Button
                        size="small"
                        danger
                        onClick={() => {
                            setExamToBeDeleted(index)
                            setShowDeleteExamModal(true)
                        }}
                        shape="round"
                        icon={<DeleteOutlined />}>
                    </Button>
                </div>
            )
        }))
    }

    return (
        <div className="examComponent">
            {DeleteExamPackageModal(
                showDeleteExamPackageModal,
                () => props.onDelete(),
                () => setShowDeleteExamPackageModal(false)
            )}
            {DeleteExamModal(
                showDeleteExamModal,
                () => deleteExam(examToBeDeleted),
                () => {
                    setShowDeleteExamModal(false)
                    setExamToBeDeleted(null)
                }
            )}

            {renderExamPackage()}
            {renderExamsHeader()}
            {renderCreatedExams(exams)}
            {buttons()}
        </div>
    )
}

export default ExamPackageComponent