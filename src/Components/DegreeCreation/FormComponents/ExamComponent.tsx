import React, { ReactFragment, useEffect, useState } from "react"
import { Form, InputNumber, Input, Button, Tooltip } from "antd";
import { ExamCreationType } from "../types";
import { DeleteExamModal } from "../ModalMessages"
import { ToolTipExamValuesMissing } from "../../const";

interface iProps {
    onDelete: Function,
    onSave: Function,
    defaultValues?: ExamCreationType,
    ownIndex: number,
    parentIndex: number
}

const ExamComponent = (props: iProps) => {
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [name, setName] = useState<string>(props.defaultValues.name)
    const [weight, setWeight] = useState<number>(props.defaultValues.weight)
    const [semester, setSemester] = useState<number>(props.defaultValues.semester)
    const [ects, setEcts] = useState<number>(props.defaultValues.ects)

    const [submitInvalidValuesMissing, setMissingValues] = useState<boolean>(
        !(props.defaultValues.name || props.defaultValues.weight || props.defaultValues.semester || props.defaultValues.ects))

    useEffect(() => {
        setMissingValues(!name || !weight || !semester || !ects)
    }, [name, weight, semester, ects])

    const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
    }

    const onWeightChange = (e: number) => {
        setWeight(e)
    }

    const onSemesterChange = (e: number) => {
        setSemester(e)
    }

    const onEctsChange = (e: number) => {
        setEcts(e)
    }

    const layout = {
        labelCol: { span: 9 },
        wrapperCol: { span: 15 },
    };

    const nameInputField = (): ReactFragment => {
        return (
            <Form.Item
                name={`exam_${props.parentIndex}_${props.ownIndex}_name`}
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
                    type="string"
                    onChange={onNameChange}
                    placeholder="Name der Prüfung"
                    style={{ minWidth: "100%" }}
                />
            </Form.Item>
        )
    }

    const semesterField = (): ReactFragment => {
        return (
            <Form.Item
                name={`exam_${props.parentIndex}_${props.ownIndex}_semester`}
                initialValue={props.defaultValues.semester}
                label="Semester"
                {...layout}
                rules={[
                    {
                        required: true,
                        message: "Semester fehlt!"
                    }
                ]}
            >
                <InputNumber
                    type="string"
                    onChange={(e: number) => onSemesterChange(e)}
                    placeholder="Semester"
                    min={1}
                    max={10}
                    step={1}
                    style={{ minWidth: "100%" }}
                    parser={(value) => {
                        if (value.includes(".")) {
                            return value.substring(0, value.indexOf("."))
                        }
                        return value
                    }}
                />
            </Form.Item>
        )
    }

    const ectsField = (): ReactFragment => {
        return (
            <Form.Item
                name={`exam_${props.parentIndex}_${props.ownIndex}_ects`}
                initialValue={props.defaultValues.ects}
                label="ECTS"
                {...layout}
                rules={[
                    {
                        required: true,
                        message: "ECTS fehlen!"
                    }
                ]}
            >
                <InputNumber
                    placeholder="ECTS"
                    onChange={(e: number) => onEctsChange(e)}
                    min={1}
                    max={30}
                    step={0.5}
                    style={{ minWidth: "100%" }}
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

    const weightField = (): ReactFragment => {
        return (
            <Form.Item
                name={`exam_${props.parentIndex}_${props.ownIndex}_weight`}
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
                    onChange={(e: number) => onWeightChange(e)}
                    placeholder="Gewichtung"
                    min={1}
                    max={30}
                    step={0.5}
                    style={{ minWidth: "100%" }}
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

    const onSubmit = () => {
        const newValues: ExamCreationType = {
            name: name,
            ects: ects,
            weight: weight,
            semester: semester,
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
                    Prüfung löschen
                    </Button>
                {renderSaveButton()}
            </div>
        )
    }

    const renderSaveButton = (): ReactFragment => {
        if (submitInvalidValuesMissing) {
            return (
                <Tooltip title={ToolTipExamValuesMissing}>
                    <Button
                        style={{ marginLeft: 7.5 }}
                        type="primary"
                        disabled
                        htmlType="submit"
                        onClick={onSubmit}>
                        Speichern
                    </Button>
                </Tooltip>
            )
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

    // if their are no changes to the exam we can delete it.
    // if their are changes show Modal
    const validateDeleteModal = () => {
        if (!(name || weight || semester || ects)) {
            // if non of the fields are changed we can delete the exam
            props.onDelete()
        } else {
            // if not show modal
            setShowDeleteModal(true)
        }
    }

    const renderForm = () => {
        return (
            <div>
                {nameInputField()}
                    {semesterField()}
                    {ectsField()}
                    {weightField()}
                {buttons()}
            </div>
        )
    }

    return (
        <div className="examComponent">
            {renderForm()}
            <DeleteExamModal
                visible={showDeleteModal}
                onDelete={() => props.onDelete()}
                onReturn={() => setShowDeleteModal(false)}
            />
        </div>
    )
}

export default ExamComponent