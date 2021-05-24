import React, { ReactFragment, ReactText, useEffect, useState } from "react"
import { Form, InputNumber, Input, Button, Tooltip, Divider } from "antd";
import { ElevativeCreationType, ExamCreationType } from "../types";
import { PlusOutlined } from "@ant-design/icons";
import { ToolTipElevativeAmountToHigh, ToolTipNameOrWeightMissingElevative, ToolTipElevativeNotSavable } from "../../const"
import { DeleteElevativeModal, DeleteExamModal } from "../ModalMessages";
import { RenderExams } from "../RenderComponents"

interface iProps {
    onDelete: Function,
    onSave: Function,
    defaultValues: ElevativeCreationType,
    index: number,
    isChildComponent: boolean
}

const ElevativeComponent = (props: iProps) => {
    const [exams, setExams] = useState<ExamCreationType[]>(props.defaultValues.exams)
    // if Modal to delete Exam should be displayed
    const [showDeleteExamModal, setShowDeleteExamModal] = useState<boolean>(false)
    // Exam that will be deleted if user accepts inside of modal
    const [examToBeDeleted, setExamToBeDeleted] = useState<number>(null)
    // if Modal to delete this Elevative should be displayed
    const [showDeleteElevativeModal, setShowDeleteElevative] = useState<boolean>(false)
    // if submit is possible
    const [submitInvalidExamsOpen, setExamsOpen] = useState<boolean>(exams.filter((x: ExamCreationType) => { return x.editMode }).length != 0)
    const [submitInvalidValuesMissing, setMissingValues] = useState<boolean>(!(props.defaultValues.name || props.defaultValues.weight || props.defaultValues.amount))
    // form values
    const [name, setName] = useState<string>(props.defaultValues.name)
    const [weight, setWeight] = useState<number>(props.defaultValues.weight)
    const [amount, setAmount] = useState<number>(props.defaultValues.amount)

    const layout = {
        labelCol: { span: 9 },
        wrapperCol: { span: 15 },
    };

    useEffect(() => {
        // if exams change, update the values inside of parent component
        if (exams != props.defaultValues.exams) {
            // check if their are exams in edit mode, if so disable save button
            const submitInvalid: boolean = exams.filter((x: ExamCreationType) => { return x.editMode }).length != 0
            setExamsOpen(submitInvalid)
            updateValues()
        }
    }, [exams])

    useEffect(() => {
        setMissingValues(!name || !weight || !amount)
    }, [name, weight, amount])

    const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
    }

    const onWeightChange = (e: number) => {
        setWeight(e)
    }

    const onAmountChange = (e:number) => {
        setAmount(e)
    }

    const nameInputField = (): ReactFragment => {
        return (
                <Form.Item
                    name={`examPackage_${props.index}_${props.isChildComponent}_weight`}
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
                        type="string"
                        onChange={onNameChange}
                        placeholder="Name der Modulprüfung"
                        style={{ minWidth: "100%" }}
                    />
                </Form.Item>
        )
    }

    const weightField = (): ReactFragment => {
        return (
                <Form.Item
                    name={`examPackage_${props.index}_${props.isChildComponent}_weight`}
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
                        min={1}
                        max={30}
                        step={0.5}
                        onChange={(e: number) => onWeightChange(e)}
                        style={{ minWidth: "100%" }}
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

    const amountField = (): ReactFragment => {
        return (
                <Form.Item
                    name={`examPackage_${props.index}_${props.isChildComponent}_amount`}
                    label="Anzahl"
                    {...layout}
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
                        onChange={(e: number) => onAmountChange(e)}
                        style={{ minWidth: "100%" }}
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

    const onSubmit = () => {
        const newValues: ElevativeCreationType = {
            name: name,
            weight: weight,
            amount: amount,
            exams: exams,
            editMode: false
        }
        props.onSave(newValues)
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
                {renderButtonsWithTooltip()}
            </div>
        )
    }

    const renderButtonsWithTooltip = (): ReactFragment => {
        // if name or weight are missing return with Tooltip regarding those
        if (submitInvalidValuesMissing) {
            return (
                <Tooltip title={ToolTipNameOrWeightMissingElevative}>
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
                <Tooltip title={ToolTipElevativeNotSavable}>
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
        // if their are less exams than required
        } else if(amount > exams.length){
            return(
                <Tooltip title={ToolTipElevativeAmountToHigh}>
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
        if (!(name || weight || amount || exams.length != 0)) {
            props.onDelete()
        } else {
            setShowDeleteElevative(true)
        }
    }

    // update values in parent component on form update
    const updateValues = () => {
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
            <div
                className="form_min_height"
            >
                {nameInputField()}
                {weightField()}
                {amountField()}
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
        <div>
            <DeleteElevativeModal
                visible={showDeleteElevativeModal}
                onDelete={() => props.onDelete()}
                onReturn={() => setShowDeleteElevative(false)}
            />
            <DeleteExamModal
                visible={showDeleteExamModal}
                onDelete={() => deleteExam(examToBeDeleted)}
                onReturn={() => {
                    setShowDeleteExamModal(false)
                    setExamToBeDeleted(null)
                }}
            />

            {renderElevativePackage()}
            {renderExamsHeader()}
            <RenderExams
                data={exams}
                showEditButtons={true}
                parentIndex={props.index}
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