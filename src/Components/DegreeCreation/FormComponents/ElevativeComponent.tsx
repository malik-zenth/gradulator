import React, { ReactFragment, ReactText, useContext, useEffect, useState } from "react"
import { Form, InputNumber, Input, Button, Tooltip, Divider, Select, Row, Col } from "antd";
import { ElevativeCreationType, ElevativeOptionType, ExamCreationType } from "../types";
import { PlusOutlined } from "@ant-design/icons";
import { ToolTipNameOrWeightMissingElevative } from "../../const"
import { DeleteElevativeModal, DeleteExamModal } from "../ModalMessages";
import { valueType } from "antd/lib/statistic/utils";
import { Droppable } from "react-beautiful-dnd";
import { RenderExamDraggable } from "../RenderComponents";
import { CreatorContext } from "../CreatorContext";

interface iProps {
    defaultValues: ElevativeCreationType,
}

const ElevativeComponent = (props: iProps) => {
    const {updateElevative, exams, deleteElevative} = useContext(CreatorContext)

    // if Modal to delete this Elevative should be displayed
    const [showDeleteElevativeModal, setShowDeleteElevative] = useState<boolean>(false)
    // if submit is possible
    const [submitInvalidValuesMissing, setMissingValues] = useState<boolean>(!(
        props.defaultValues.name || props.defaultValues.weight || props.defaultValues.unit))
    // form values
    const [name, setName] = useState<string>(props.defaultValues.name)
    const [weight, setWeight] = useState<number>(props.defaultValues.weight)
    const [unit, setUnit] = useState<string>(props.defaultValues.unit)

    const layout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 15 },
    };

    useEffect(() => {
        setMissingValues(!name || !weight || !unit)
    }, [name, weight, unit])

    const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
    }

    const onUnitChange = (e: valueType) => {
        setUnit(e.toString())
    }

    const onWeightChange = (e: number) => {
        setWeight(e)
    }


    const nameInputField = (): ReactFragment => {
        return (
            <Form.Item
                name={"name"}
                label="Name"
                {...layout}
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
                name={"weight"}
                label="Gewichtung"
                {...layout}
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

    const unitField = (): ReactFragment => {
        return (
            <Form.Item
                name="unit"
                label="Einheit"
                {...layout}>
                <Select
                    placeholder="Einheit"
                    onChange={(value: valueType) => onUnitChange(value)}
                >
                    <Select.Option value="ects">ECTS</Select.Option>
                    <Select.Option value="exams">Prüfungen</Select.Option>

                </Select>

            </Form.Item>
        )
    }

    const onSubmit = () => {
        const newValues: ElevativeCreationType = {
            name: name,
            key: props.defaultValues.key,
            weight: weight,
            options: [],
            editMode: false
        }
        updateElevative(newValues)
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

    const renderOptionsDroppable = (): ReactFragment => {
        return props.defaultValues.options.map((singleOption: ElevativeOptionType) => {
            return (
                <div>
                    <div>

                    </div>
                    <Droppable
                        droppableId={props.defaultValues.key}
                        type="1">
                        {(provided, snapshot) => (
                            <Col span={12}
                                className="examPackageDroppable"
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                            >
                                {renderOptions(singleOption)}
                                {provided.placeholder}
                            </Col>
                        )}

                    </Droppable>
                </div>
            )
        })
    }

    const renderOptions = (singleOption: ElevativeOptionType): ReactFragment => {
        const optionExams: ExamCreationType[] = exams.filter(single => singleOption.ids.includes(single.key))
        return optionExams.map((singleExam: ExamCreationType) => {
            return (
                <RenderExamDraggable
                    singleExam={singleExam}
                    index={singleExam.index}
                />
            )
        })
    }

    // check if their are changes to eighter Exams or the ExamPackage
    // if so show Modal message
    const validateDeleteModal = () => {
        if (!(name || weight || unit)) {
            deleteElevative()
        } else {
            setShowDeleteElevative(true)
        }
    }

    return (
        <div className="minHeight300 examPackageElement">
            <DeleteElevativeModal
                visible={showDeleteElevativeModal}
                onDelete={() => deleteElevative()}
                onReturn={() => setShowDeleteElevative(false)}
            />
            <Form initialValues={props.defaultValues}>
                {nameInputField()}
                {weightField()}
                {unitField()}
            </Form>
            <Divider>Optionen</Divider>
            <Row gutter={[0, 8]}>
                {renderOptionsDroppable()}
            </Row>
            {buttons()}
        </div>
    )
}

export default ElevativeComponent