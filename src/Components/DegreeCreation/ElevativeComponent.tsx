import React, { ReactFragment, ReactText, useEffect, useState } from "react"
import { Form, InputNumber, Input, Button, Tooltip, Divider } from "antd";
import { ElevativeCreationType, ExamCreationType } from "./types";
import { PlusOutlined } from "@ant-design/icons";
import { ToolTipExamPackageNotSavable } from "../../Components/const"
import { DeleteElevativeModal, DeleteExamModal } from "./ModalMessages";
import {RenderExams} from "./RenderComponents"

interface iProps {
    onDelete: Function,
    onSave: Function,
    defaultValues: ElevativeCreationType
}

const keyGenerator = (): ReactText =>
    "_" + Math.random().toString(36).substr(2, 9);

const ElevativeComponent = (props: iProps) => {
    const [form] = Form.useForm();
    const [exams, setExams] = useState<ExamCreationType[]>(props.defaultValues.exams)
    // if Modal to delete Exam should be displayed
    const [showDeleteExamModal, setShowDeleteExamModal] = useState<boolean>(false)
    // Exam that will be deleted if user accepts inside of modal
    const [examToBeDeleted, setExamToBeDeleted] = useState<number>(null)
    // if Modal to delete this Elevative should be displayed
    const [showDeleteElevativeModal, setShowDeleteElevative] = useState<boolean>(false)
    // if submit is possible
    const [submitInvalid, setSavePossible] = useState<boolean>(exams.filter((x: ExamCreationType) => { return x.editMode }).length != 0)


    useEffect(() => {
        // if exams change, update the values inside of parent component
        if (exams != props.defaultValues.exams) {
            // check if their are exams in edit mode, if so disable save button
            const submitInvalid: boolean = exams.filter((x: ExamCreationType) => { return x.editMode }).length != 0
            setSavePossible(submitInvalid)
            updateValues()
        }
    }, [exams])

    const nameInputField = (): ReactFragment => {
        return (
            <div className="examPackage_nameInput">
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
            </div>
        )
    }

    const weightField = (): ReactFragment => {
        return (
            <div className="examPackage_weightInput">
                <Form.Item
                    name="weight"
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
                        style={{ width: 300 }}
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
            </div>
        )
    }

    const amountField = (): ReactFragment => {
        return (
            <div className="examPackage_weightInput">
                <Form.Item
                    name="amount"
                    rules={[
                        {
                            required: true,
                            message: "Anzahl fehlt!"
                        }
                    ]}
                >
                    <InputNumber
                        placeholder="Benötigte Anzahl"
                        min={1}
                        max={30}
                        step={0.5}
                        style={{ width: 300 }}
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
            </div>
        )
    }

    const onSubmit = (e: any) => {
        e.preventDefault()
        form
            .validateFields()
            .then((values: ElevativeCreationType) => {
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
            <div className="create_degree_buttons position_center">
                <Button
                    htmlType="button"
                    danger
                    onClick={() => validateDeleteModal()}>
                    Wahlpflichtfach löschen
                    </Button>
                {/*Show Tooltip if ExamPackage cannot be saved. If it can be saved dont show it*/}
                {submitInvalid &&
                    <Tooltip title={ToolTipExamPackageNotSavable}>
                        <Button
                            type="primary"
                            style={{ marginLeft: 7.5 }}
                            htmlType="submit"
                            disabled={true}
                            onClick={onSubmit}>
                            Speichern
                </Button>
                    </Tooltip>
                }
                {!submitInvalid &&
                    <Button
                        style={{ marginLeft: 7.5 }}
                        type="primary"
                        htmlType="submit"
                        onClick={onSubmit}>
                        Speichern
                    </Button>
                }
            </div>
        )
    }

    // check if their are changes to eighter Exams or the ExamPackage
    // if so show Modal message
    const validateDeleteModal = () => {
        if (!(form.getFieldValue("name") || form.getFieldValue("weight") || form.getFieldValue("amount") || exams.length != 0)) {
            props.onDelete()
        } else {
            setShowDeleteElevative(true)
        }
    }

    // update values in parent component on form update
    const updateValues = () => {
        const name: string = form.getFieldValue("name")
        const weight: number = form.getFieldValue("weight")
        const amount: number = form.getFieldValue("amount")
        const newExamPackage: ElevativeCreationType = {
            name: name,
            weight: weight,
            amount: amount,
            exams: exams,
            editMode: props.defaultValues.editMode
        }
        props.onSave(newExamPackage)
    }

    const renderElevativePackage = () => {
        return (
            <Form
                form={form}
                initialValues={props.defaultValues}
                onValuesChange={() => updateValues()}
            >
                {nameInputField()}
                {weightField()}
                {amountField()}
            </Form>
        )
    }

    const addExam = () => {
        setExams([...exams, { editMode: true }])
    }

    const renderExamsHeader = (): ReactFragment => {
        return (
            <Divider>
                <div className="examPackages_addExams">
                    <div className="examPackages_add_heading">Auswahlmöglichkeiten</div>
                    <Button
                        type="primary"
                        size="small"
                        onClick={() => addExam()}
                        shape="round"
                        icon={<PlusOutlined />}>
                    </Button>
                </div>
            </Divider>
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
        setExams(exams.filter((_, index) => index != indexToDelete))
    }

    // save Exam
    const saveExam = (exam: ExamCreationType, indexToUpdate: number) => {
        setExams(exams.map((value, index) => {
            if (index === indexToUpdate) return exam
            return value
        }))
    }

    return (
        <div className="examComponent">
            {DeleteElevativeModal(
                showDeleteElevativeModal,
                () => props.onDelete(),
                () => setShowDeleteElevative(false)
            )}
            {DeleteExamModal(
                showDeleteExamModal,
                () => deleteExam(examToBeDeleted),
                () => {
                    setShowDeleteExamModal(false)
                    setExamToBeDeleted(null)
                }
            )}

            {renderElevativePackage()}
            {renderExamsHeader()}
            <RenderExams
                data={exams}
                showEditButtons={true}
                onDeleteEdit={(index: number) => deleteExam(index)}
                onSaveEdit={(examData: ExamCreationType, index: number) => saveExam(examData, index)}
                setEdit={(index: number) => setEditExam(true, index)}
                onDeleteNotEdit={(index: number) => {
                    setExamToBeDeleted(index)
                    setShowDeleteExamModal(true)
                }}
            />
            <Divider />
            {buttons()}
        </div>
    )
}

export default ElevativeComponent