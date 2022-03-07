import React, { ReactFragment, ReactText, useContext, useEffect, useState } from "react"
import { Form, InputNumber, Input, Button, Tooltip, Select } from "antd";
import { ExamCreationType } from "../types";
import { DeleteExamModal } from "../Modals"
import { ToolTipExamValuesMissing } from "../../const";
import { CreatorContext } from "../CreatorContext";
import { valueType } from "antd/lib/statistic/utils";

interface iProps {
    onDelete: Function,
    onSave: Function,
    defaultValues?: ExamCreationType,
}

const keyGenerator = (): ReactText =>
    "_" + Math.random().toString(36).substr(2, 9);

const ExamComponent = (props: iProps) => {
    const {semesterChoises} = useContext(CreatorContext)

    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [name, setName] = useState<string>(props.defaultValues.name)
    const [semester, setSemester] = useState<number>(props.defaultValues.semester)
    const [ects, setEcts] = useState<number>(props.defaultValues.ects)
    const [examid, setExamID] = useState<number>(props.defaultValues.examid)
    const [semesterChoiseKey, setSemsterChoiseKey] = useState<string>(props.defaultValues.semesterChoiseKey)

    const [submitInvalidValuesMissing, setMissingValues] = useState<boolean>(
        !(props.defaultValues.name || props.defaultValues.examid || (props.defaultValues.semester || props.defaultValues.semesterChoiseKey) || props.defaultValues.ects))

    useEffect(() => {
        setMissingValues(!name || (!semester && !semesterChoiseKey) || !ects || !examid)
    }, [name, semester,semesterChoiseKey, ects, examid])

    const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
    }

    const onExamIDChange = (e:number) => {
        setExamID(e)
    }

    const onSemesterChange = (e: number) => {
        setSemester(e)
    }

    const onEctsChange = (e: number) => {
        setEcts(e)
    }

    const onSemesterChoiseChange = (e: valueType) => {
        setSemsterChoiseKey(e.toString())
    }

    const layout = {
        labelCol: { span: 5 },
        wrapperCol: { span: 15 },
    };

    const nameInputField = (): ReactFragment => {
        return (
            <Form.Item
                name="name"
                label="Name"
                style={{minHeight: "33px"}}
                {...layout}
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

    const semesterChoiseField = (): ReactFragment => {
        return (
            <Form.Item
                name="semesterChoiseKey"
                style={{minHeight: "33px"}}
                label="Zuordnung"
                {...layout}>
                <Select
                    placeholder="Zuordnungsgruppe?"
                    allowClear
                    onChange={(value: valueType) => onSemesterChoiseChange(value)}
                >
                {semesterChoises.map(x => {
                    return(
                        <Select.Option key={keyGenerator()} value={x.key}>{x.name}</Select.Option>
                    )
                })}

                </Select>

            </Form.Item>
        )
    }

    const semesterField = (): ReactFragment => {
        return (
            <Form.Item
                name="semester"
                label="Semester"
                style={{minHeight: "33px"}}
                {...layout}
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

    const examidField = (): ReactFragment => {
        return (
            <Form.Item
                name="examid"
                label="Nr.:"
                style={{minHeight: "33px"}}
                {...layout}
            >
                <InputNumber
                    type="string"
                    onChange={(e: number) => onExamIDChange(e)}
                    placeholder="Prüfungsnummer"
                    min={1}
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
                name="ects"
                style={{minHeight: "33px"}}
                label="ECTS"
                {...layout}
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

    const onSubmit = () => {
        const newValues: ExamCreationType = {
            name: name,
            ects: ects,
            examid: examid,
            semester: semester,
            semesterChoiseKey: semesterChoiseKey,
            editMode: false,
            key: props.defaultValues.key,
            index: props.defaultValues.index
        }
        props.onSave(newValues)

    }

    const buttons = (): ReactFragment => {
        return (
            <div className="create_degree_buttons">
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
        if (!(name || semester || ects || examid)) {
            // if non of the fields are changed we can delete the exam
            props.onDelete(props.defaultValues.key)
        } else {
            // if not show modal
            setShowDeleteModal(true)
        }
    }

    return (
        <div className="minHeight300 dashedBorder">
            <Form initialValues={props.defaultValues}>
                <div>
                    <div className="createExamForm">
                    {nameInputField()}
                    {examidField()}
                    {ectsField()}
                    {semesterField()}
                    {semesterChoiseField()}
                    
                    </div>
                    {buttons()}
                </div>
            </Form>
            <DeleteExamModal
                visible={showDeleteModal}
                onDelete={() => props.onDelete(props.defaultValues.key)}
                onReturn={() => setShowDeleteModal(false)}
            />
        </div>
    )
}

export default ExamComponent