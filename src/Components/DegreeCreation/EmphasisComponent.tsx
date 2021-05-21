import React, { ReactFragment, ReactText, useEffect, useState } from "react"
import { Form, InputNumber, Input, Button, Tooltip, Divider, Row } from "antd";
import { ElevativeCreationType, EmphasisCreationType, ExamCreationType, ExamPackageCreationType, FormUpdateType } from "./types";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { ToolTipEmphasisNotSavable } from "../../Components/const"
import { DeleteEmphasisModal, DeleteExamModal, DeleteExamPackageModal } from "./ModalMessages";
import { RenderExamPackage, RenderExams } from "./RenderComponents"

interface iProps {
    onDelete: Function,
    onSave: Function,
    defaultValues: EmphasisCreationType
}

const keyGenerator = (): ReactText =>
    "_" + Math.random().toString(36).substr(2, 9);

const EmphasisComponent = (props: iProps) => {
    const [form] = Form.useForm();
    const [examPackages, setExamPackages] = useState<ExamPackageCreationType[]>(props.defaultValues.options)
    const [showDeleteEmphasis, setShowDeleteEmphasis] = useState<boolean>(false)
    // if Modal to delete ExamPackage should be displayed
    const [showDeleteExamPackage, setShowDeleteExamPackageModal] = useState<boolean>(false)
    // ExamPackage that will be deleted if user accepts inside of modal
    const [examPackageToBeDeleted, setExamPackageToBeDeleted] = useState<number>(null)
    // if submit is possible
    const [submitInvalid, setSavePossible] = useState<boolean>(examPackages.filter((x: ExamPackageCreationType) => { return x.editMode }).length != 0)


    useEffect(() => {
        // if exams change, update the values inside of parent component
        if (examPackages != props.defaultValues.options) {
            // check if their are exams in edit mode, if so disable save button
            const submitInvalid: boolean = examPackages.filter((x: ExamPackageCreationType) => { return x.editMode }).length != 0
            setSavePossible(submitInvalid)
            updateValues()
        }
    }, [examPackages])

    const nameInputField = (): ReactFragment => {
        return (
            <div className="emphasis_name_input">
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
                        placeholder="Name des Schwerpunktes"
                        style={{ width: 300 }}
                    />
                </Form.Item>
            </div>
        )
    }

    const weightField = (): ReactFragment => {
        return (
            <div className="emphasis_weight_input">
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

    const onSubmit = (e: any) => {
        e.preventDefault()
        form
            .validateFields()
            .then((values: EmphasisCreationType) => {
                values.editMode = false
                values.options = examPackages
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
                    Schwerpunkt löschen
                    </Button>
                {/*Show Tooltip if ExamPackage cannot be saved. If it can be saved dont show it*/}
                {submitInvalid &&
                    <Tooltip title={ToolTipEmphasisNotSavable}>
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
        if (!(form.getFieldValue("name") || form.getFieldValue("weight") || examPackages.length != 0)) {
            props.onDelete()
        } else {
            setShowDeleteEmphasis(true)
        }
    }

    // update values in parent component on form update
    const updateValues = () => {
        const name: string = form.getFieldValue("name")
        const weight: number = form.getFieldValue("weight")
        const newEmphasis: EmphasisCreationType = {
            name: name, weight: weight, options: examPackages, editMode: props.defaultValues.editMode
        }
        props.onSave(newEmphasis)
    }

    const renderExamPackage = () => {
        return (
            <Form
                className="form_min_height"
                form={form}
                initialValues={props.defaultValues}
                onValuesChange={() => updateValues()}
            >
                <div className="display_inline">
                {nameInputField()}
                {weightField()}
                </div>
            </Form>
        )
    }

    const addExamPackage = () => {
        setExamPackages([...examPackages, { editMode: true, exams: [] }])
    }

    const renderHeader = (): ReactFragment => {
        return (
            <Divider>
                <div className="examPackages_addExams">
                    <div className="examPackages_add_heading">Modulprüfungen</div>
                    <Button
                        type="primary"
                        size="small"
                        onClick={() => addExamPackage()}
                        shape="round"
                        icon={<PlusOutlined />}>
                    </Button>
                </div>
            </Divider>
        )
    }

    // update the editMode of an ExamPackage
    const setEditExamPackage = (editValue: boolean, indexToUpdate: number) => {
        setExamPackages(examPackages.map((value, index) => {
            if (indexToUpdate === index) {
                value.editMode = editValue
                return value
            }
            return value
        }))
    }

    // delete ExamPackage
    const deleteExamPackage = (indexToDelete: number) => {
        setExamPackages(examPackages.filter((_, index) => index != indexToDelete))
    }

    // save ExamPackage
    const saveExamPackage = (examPackage: ExamPackageCreationType, indexToUpdate: number) => {
        setExamPackages(examPackages.map((value, index) => {
            if (index === indexToUpdate) return examPackage
            return value
        }))
    }

    const renderExamPackages = () => {
        return examPackages.map((value, index) => {
            return (
                    <RenderExamPackage
                        key={keyGenerator()}
                        data={value}
                        isChildComponent={true}
                        index={index}
                        showEditButtons={true}
                        onDeleteEdit={(index: number) => deleteExamPackage(index)}
                        onSaveEdit={(examData: ExamPackageCreationType, index: number) => saveExamPackage(examData, index)}
                        setEdit={(index: number) => setEditExamPackage(true, index)}
                        onDeleteNotEdit={(index: number) => {
                            setExamPackageToBeDeleted(index)
                            setShowDeleteExamPackageModal(true)
                        }}
                    />
            )
        })
    }

    return (
        <div className="emphasis_component">
            {DeleteEmphasisModal(
                showDeleteEmphasis,
                () => props.onDelete(),
                () => setShowDeleteEmphasis(false)
            )}
            {DeleteExamPackageModal(
                showDeleteExamPackage,
                () => deleteExamPackage(examPackageToBeDeleted),
                () => {
                    setShowDeleteExamPackageModal(false)
                    setExamPackageToBeDeleted(null)
                }
            )}

            {renderExamPackage()}
            {renderHeader()}
            <Row gutter={[20, 40]}>
                {renderExamPackages()}
            </Row>
            <Divider />
            {buttons()}
        </div>
    )
}

export default EmphasisComponent