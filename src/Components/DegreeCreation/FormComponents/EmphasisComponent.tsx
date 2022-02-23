import React, { ReactFragment, ReactText, useEffect, useState } from "react"
import { Form, InputNumber, Input, Button, Tooltip, Divider, Row } from "antd";
import { ElevativeCreationType, EmphasisCreationType, EmphasisOptionsType, ExamPackageCreationType } from "../types";
import { PlusOutlined } from "@ant-design/icons";
import { ToolTipNameOrWeightMissingElevative } from "../../const"
import { DeleteEmphasisModal, DeleteExamPackageModal } from "../ModalMessages";
import { RenderElevative, RenderExamPackage } from "../RenderComponents"

interface iProps {
    onDelete: Function,
    onSave: Function,
    defaultValues: EmphasisCreationType,
    index: number
}

const keyGenerator = (): ReactText =>
    "_" + Math.random().toString(36).substr(2, 9);

const EmphasisComponent = (props: iProps) => {
    const [createdOptions, setCreatedOptions] = useState<EmphasisOptionsType[]>(props.defaultValues.options)
    const [showDeleteEmphasis, setShowDeleteEmphasis] = useState<boolean>(false)
    // if Modal to delete ExamPackage should be displayed
    const [showDeleteExamPackage, setShowDeleteExamPackageModal] = useState<boolean>(false)
    // ExamPackage that will be deleted if user accepts inside of modal
    const [examPackageToBeDeleted, setExamPackageToBeDeleted] = useState<number>(null)
    // if submit is possible
    const [submitInvalidExamsOpen, setSubmitOpen] = useState<boolean>(createdOptions.filter((x: EmphasisOptionsType) => {
        return x.examPackage && x.examPackage.editMode || x.elevative && x.elevative.editMode }).length != 0)

    const [submitInvalidValuesMissing, setMissingValues] = useState<boolean>(!(props.defaultValues.name || props.defaultValues.weight))
    // form values
    const [name, setName] = useState<string>(props.defaultValues.name)
    const [weight, setWeight] = useState<number>(props.defaultValues.weight)

    useEffect(() => {
        // if exams change, update the values inside of parent component
        if (createdOptions != props.defaultValues.options) {
            // check if their are exams in edit mode, if so disable save button
            const submitInvalid: boolean = createdOptions.filter((x: EmphasisOptionsType) => {
                return x.examPackage && x.examPackage.editMode || x.elevative && x.elevative.editMode }).length != 0
            setSubmitOpen(submitInvalid)
            updateValues()
        }
    }, [createdOptions])

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
                name={`emphasis_${props.index}_name`}
                {...layout}
                label="Name"
                initialValue={props.defaultValues.name}
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
                    placeholder="Name des Schwerpunktes"
                    style={{ width: 300 }}
                />
            </Form.Item>
        )
    }

    const weightField = (): ReactFragment => {
        return (
            <Form.Item
                name={`emphasis_${props.index}_weight`}
                {...layout}
                label="Gewichtung"
                initialValue={props.defaultValues.weight}
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
                    style={{ width: 300 }}
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
        const submitValues: EmphasisCreationType = {
            name: name,
            weight: weight,
            editMode: false,
            options: createdOptions
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
                    Schwerpunkt löschen
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
                <Tooltip title={"ToolTipEmphasisNotSavable"}>
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
        if (!(name || weight || createdOptions.length != 0)) {
            props.onDelete()
        } else {
            setShowDeleteEmphasis(true)
        }
    }

    // update values in parent component on form update
    const updateValues = () => {
        const newEmphasis: EmphasisCreationType = {
            name: name, weight: weight, options: createdOptions, editMode: props.defaultValues.editMode
        }
        props.onSave(newEmphasis)
    }

    const renderExamPackage = () => {
        return (
            <div className="form_min_height">
                {nameInputField()}
                {weightField()}
            </div>
        )
    }

    const addElevative = () => {
    }

    const renderHeader = (): ReactFragment => {
        return (
            <Divider>
                <div className="examPackages_addExams">
                    <div className="examPackages_add_heading">Modulprüfungen </div>
                    <Button
                        type="primary"
                        size="small"
                        onClick={() => {}}
                        shape="round"
                        icon={<PlusOutlined />}>
                    </Button>
                    <div className="seperator">und</div>
                    <div className="examPackages_add_heading"> Wahlpflichtfächer</div>
                    <Button
                        type="primary"
                        size="small"
                        onClick={() => addElevative()}
                        shape="round"
                        icon={<PlusOutlined />}>
                    </Button>
                </div>
            </Divider>
        )
    }

    // update the editMode of an ExamPackage
    const setEditExamPackage = (editValue: boolean, indexToUpdate: number) => {
        setCreatedOptions(createdOptions.map((value, index) => {
            if (indexToUpdate === index) {
                value.examPackage.editMode = editValue
                return value
            }
            return value
        }))
    }

    const setEditElevative = (editValue: boolean, indexToUpdate: number) => {
        setCreatedOptions(createdOptions.map((value, index) => {
            if (indexToUpdate === index) {
                value.elevative.editMode = editValue
                return value
            }
            return value
        }))
    }

    // delete
    const deleteData = (indexToDelete: number) => {
        setCreatedOptions(createdOptions.filter((_, index) => index != indexToDelete))
    }

    // save ExamPackage
    const saveExamPackage = (examPackage: ExamPackageCreationType, indexToUpdate: number) => {
        setCreatedOptions(createdOptions.map((value, index) => {
            if (index === indexToUpdate) return { examPackage: examPackage }
            return value
        }))
    }

    const saveElevative = (elevative: ElevativeCreationType, indexToUpdate: number) => {
        setCreatedOptions(createdOptions.map((value, index) => {
            if (index === indexToUpdate) return { elevative: elevative }
            return value
        }))
    }

    return (
        <div className="emphasis_component">
            <DeleteEmphasisModal
                visible={showDeleteEmphasis}
                onDelete={() => props.onDelete()}
                onReturn={() => setShowDeleteEmphasis(false)}
            />
            <DeleteExamPackageModal
                visible={showDeleteExamPackage}
                onDelete={() => deleteData(examPackageToBeDeleted)}
                onReturn={() => {
                    setShowDeleteExamPackageModal(false)
                    setExamPackageToBeDeleted(null)
                }}
            />

            {renderExamPackage()}
            {renderHeader()}
            <Row gutter={[20, 40]}>
            </Row>
            <Divider />
            {buttons()}
        </div>
    )
}

export default EmphasisComponent