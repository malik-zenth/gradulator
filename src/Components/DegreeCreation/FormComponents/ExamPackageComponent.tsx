import React, { ReactFragment, ReactText, useEffect, useState } from "react"
import { Form, InputNumber, Input, Button, Tooltip, Divider } from "antd";
import { ExamCreationType, ExamPackageCreationType } from "../types";
import { PlusOutlined } from "@ant-design/icons";
import { ToolTipExamPackageNotSavable, ToolTipNameOrWeightMissingExamPackage } from "../../const"
import { DeleteExamModal, DeleteExamPackageModal } from "../ModalMessages";
import { RenderExams } from "../RenderComponents"

interface iProps {
    onDelete: Function,
    isChildComponent?: boolean,
    onSave: Function,
    defaultValues: ExamPackageCreationType,
    index: number,
    parentsIndex?: number
}

const ExamPackageComponent = (props: iProps) => {
    const [exams, setExams] = useState<ExamCreationType[]>(props.defaultValues.exams)
    // if Modal to delete Exam should be displayed
    const [showDeleteExamModal, setShowDeleteExamModal] = useState<boolean>(false)
    // Exam that will be deleted if user accepts inside of modal
    const [examToBeDeleted, setExamToBeDeleted] = useState<number>(null)
    // if Modal to delete this ExamPackage should be displayed
    const [showDeleteExamPackageModal, setShowDeleteExamPackageModal] = useState<boolean>(false)
    // if submit is possible
    const [submitInvalidExamsOpen, setExamInEdit] = useState<boolean>(exams.filter((x: ExamCreationType) => { return x.editMode }).length != 0)
    const [submitInvalidValuesMissing, setMissingValues] = useState<boolean>(!(props.defaultValues.name || props.defaultValues.weight))
    // form values
    const [name, setName] = useState<string>(props.defaultValues.name)
    const [weight, setWeight] = useState<number>(props.defaultValues.weight)

    useEffect(() => {
        // if exams change, update the values inside of parent component
        if (exams != props.defaultValues.exams) {
            // check if their are exams in edit mode, if so disable save button
            const submitInvalid: boolean = exams.filter((x: ExamCreationType) => { return x.editMode }).length != 0
            setExamInEdit(submitInvalid)
            updateValues()
        }
    }, [exams])

    useEffect(() => {
        setMissingValues(!name || !weight)
    }, [name, weight])

    const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
    }

    const onWeightChange = (e: number) => {
        setWeight(e)
    }

    const layout = {
        labelCol: { span: 9 },
        wrapperCol: { span: 15 },
    };

    const nameInputField = (): ReactFragment => {
        return (
                <Form.Item
                    name={`examPackage_${props.index}_${props.isChildComponent}_name`}
                    initialValue={props.defaultValues.name}
                    label="Name"
                    {...layout}
                    rules={[
                        {
                            required: true,
                            message: "Name fehlt!"
                        }
                    ]}
                >
                    <Input
                        style={{minWidth: "100%"}}
                        type="string"
                        onChange={onNameChange}
                        placeholder="Name der Modulprüfung"
                    />
                </Form.Item>
        )
    }

    const weightField = (): ReactFragment => {
        return (
                <Form.Item
                    name={`examPackage_${props.index}_${props.isChildComponent}_weight`}
                    initialValue={props.defaultValues.weight}
                    label="Gewichtung"
                    {...layout}
                    rules={[
                        {
                            required: true,
                            message: "Gewichtung fehlt!"
                        }
                    ]}
                >
                    <InputNumber
                        placeholder="Gewichtung"
                        style={{minWidth: "100%"}}
                        min={1}
                        max={30}
                        step={0.5}
                        onChange={(e: number) => onWeightChange(e)}
                        parser={(value) => {
                            value = value.replace(",", ".")
                            if (value.includes(".") && value.indexOf(".") + 2 < value.length) {
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
        const submitValues: ExamPackageCreationType = {
            name: name,
            weight: weight,
            editMode: false,
            exams: exams
        }
        props.onSave(submitValues)
    }

    const buttons = (): ReactFragment => {
        return (
            <div className="create_degree_buttons position_center">
                <Button
                    htmlType="button"
                    danger
                    onClick={() => validateDeleteModal()}>
                    Modulprüfung löschen
                    </Button>
                {renderButtonsWithTooltip()}
            </div>
        )
    }

    const renderButtonsWithTooltip = (): ReactFragment => {
        // if name or weight are missing return with Tooltip regarding those
        if (submitInvalidValuesMissing) {
            return (
                <Tooltip title={ToolTipNameOrWeightMissingExamPackage}>
                    <Button
                        type="primary"
                        style={{ marginLeft: 7.5 }}
                        htmlType="submit"
                        disabled={true}
                        onClick={onSubmit}>
                        Speichern
                </Button>
                </Tooltip>
            )
            // if exams are open return with tooltip regarding those
        } else if (submitInvalidExamsOpen) {
            return (
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
            )
            // Save is possible
        } else {
            return (
                <Button
                    style={{ marginLeft: 7.5 }}
                    type="primary"
                    htmlType="submit"
                    onClick={onSubmit}>
                    Speichern
                </Button>
            )
        }
    }

    // check if their are changes to eighter Exams or the ExamPackage
    // if so show Modal message
    const validateDeleteModal = () => {
        if (!(name || weight || exams.length != 0)) {
            props.onDelete()
        } else {
            setShowDeleteExamPackageModal(true)
        }
    }

    // update values in parent component on form update
    const updateValues = () => {
        const newExamPackage: ExamPackageCreationType = {
            name: name, weight: weight, exams: exams, editMode: props.defaultValues.editMode
        }
        props.onSave(newExamPackage)
    }

    const renderExamPackage = () => {
        return (
            <div
                className={props.isChildComponent ? "min_height_120" : "form_min_height"}
            >
                {nameInputField()}
                {weightField()}
            </div>
        )
    }

    const addExam = () => {
        setExams([...exams, { editMode: true }])
    }

    const renderExamsHeader = (): ReactFragment => {
        return (
            <Divider>
                <div className="examPackages_addExams">
                    <div className="examPackages_add_heading">Prüfungen</div>
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
        <div>
            <DeleteExamPackageModal
                visible={showDeleteExamPackageModal}
                onDelete={() => props.onDelete()}
                onReturn={() => setShowDeleteExamPackageModal(false)}
            />

            <DeleteExamModal
                visible={showDeleteExamModal}
                onDelete={() => deleteExam(examToBeDeleted)}
                onReturn={() => {
                    setShowDeleteExamModal(false)
                    setExamToBeDeleted(null)
                }}
            />
            {renderExamPackage()}
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
                parentIndex={props.index}
                parentsParentsIndex={props.parentsIndex}
            />
            <Divider />
            {buttons()}
        </div>
    )
}

export default ExamPackageComponent