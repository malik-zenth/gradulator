import React, { ReactFragment, ReactText, useContext, useEffect, useState } from "react"
import { Form, InputNumber, Input, Button, Tooltip, Divider, Select, Row, Col } from "antd";
import { ElevativeCreationType, ElevativeOptionType, ExamCreationType } from "../types";
import { ToolTipNameOrWeightMissingElevative } from "../../const"
import { DeleteElevativeModal, DeleteElevativeOptionModal } from "../Modals";
import { valueType } from "antd/lib/statistic/utils";
import { Droppable } from "react-beautiful-dnd";
import { RenderExamDraggable, RenderRequiredElevative } from "../RenderComponents";
import { CreatorContext } from "../CreatorContext";

interface iProps {
    defaultValues: ElevativeCreationType,
}

const keyGenerator = (): ReactText =>
    "_" + Math.random().toString(36).substr(2, 9);


const ElevativeComponent = (props: iProps) => {
    const { updateElevative, exams, deleteElevative, addElevativeOption, deleteElevativeOption } = useContext(CreatorContext)

    // if Modal to delete this Elevative should be displayed
    const [showDeleteElevativeModal, setShowDeleteElevative] = useState<boolean>(false)
    const [showDeleteElevativeOptionModal, setShowDeleteOptionElevative] = useState<boolean>(false)
    const [optionToDelete, setOptionToDelete] = useState<string>(null)
    // if submit is possible
    const [submitInvalidValuesMissing, setMissingValues] = useState<boolean>(!(
        props.defaultValues.name || props.defaultValues.weight || props.defaultValues.unit))
    // form values
    const [name, setName] = useState<string>(props.defaultValues.name)
    const [weight, setWeight] = useState<number>(props.defaultValues.weight)
    const [unit, setUnit] = useState<string>(props.defaultValues.unit)
    const [examPackageID, setExamPackageID] = useState<number>(props.defaultValues.examPackageID)

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

    const onExamPackageIDChange = (e: number) => {
        setExamPackageID(e)
    }


    const nameInputField = (): ReactFragment => {
        return (
            <Form.Item
                name={"name"}
                style={{minHeight: "33px"}}
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
                style={{minHeight: "33px"}}
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
                        return value
                    }}
                />
            </Form.Item>
        )
    }

    const examPackageIDField = (): ReactFragment => {
        return (
            <Form.Item
                name={"examPackageID"}
                style={{minHeight: "33px"}}
                label="ID"
                {...layout}
            >
                <InputNumber
                    placeholder="Modulnummer"
                    min={1}
                    max={30}
                    step={0.5}
                    onChange={(e: number) => onExamPackageIDChange(e)}
                    style={{ minWidth: "100%" }}
                    parser={(value) => {
                        value = value.replace(",", ".")
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
                style={{minHeight: "33px"}}
                label="Einheit"
                {...layout}>
                <Select
                    placeholder="Einheit"
                    onChange={(value: valueType) => onUnitChange(value)}
                >
                    <Select.Option value="ECTS">ECTS</Select.Option>
                    <Select.Option value="Prüfungen">Prüfungen</Select.Option>

                </Select>

            </Form.Item>
        )
    }

    const onSubmit = () => {
        const newValues: ElevativeCreationType = {
            name: name,
            key: props.defaultValues.key,
            weight: weight,
            examPackageID: examPackageID,
            options: props.defaultValues.options,
            unit: props.defaultValues.unit,
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
                        style={{ marginLeft: 7.5, minWidth: "100px" }}
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
                    style={{ marginLeft: 7.5, minWidth: "100px" }}
                    type="primary"
                    htmlType="submit"
                    onClick={onSubmit}>
                    Speichern
                </Button>
            )
        }
    }

    const renderAddOptionButton = (): ReactFragment => {
        const textAddMore = <p>Weitere Option hinzufügen</p>
        const textAddFirst = <p>Füge jedem Wahlpflichtfach Optionen hinzu, durch welche dieses erfüllt werden können. <br></br> Klicke hier, um eine Option hinzuzufügen und füge anschließend für diese die benötigte Anzahl und mögliche Prüfungen hinzu.</p>
        const text: ReactFragment = props.defaultValues.options.length > 0 ? textAddMore : textAddFirst
        return (
            <Col span={12}>
                <Button
                    className="addOptionButton"
                    style={{ whiteSpace: "normal", height: "100%", width: "100%" }}
                    htmlType="submit"
                    onClick={() => addElevativeOption(props.defaultValues.key)}
                >
                    <div className="buttonTextAddExam">{text}</div>

                </Button>
            </Col>
        )
    }

    const renderOptionsDroppable = (): ReactFragment => {
        return props.defaultValues.options.map((singleOption: ElevativeOptionType) => {
            return (
                <Col span={12} key={keyGenerator()}>
                    <div className="singleOptionElevative">
                        <RenderRequiredElevative
                            defaultValues={singleOption}
                            elevativeKey={props.defaultValues.key}
                            unit={unit}
                        />
                        <Droppable
                            droppableId={singleOption.key}
                            type="1">
                            {(provided, snapshot) => (
                                <Col span={21}
                                    style={{ minWidth: "100%" }}
                                    className="examPackageDroppable"
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                >

                                    {renderOptions(singleOption)}
                                    {provided.placeholder}
                                </Col>
                            )}

                        </Droppable>
                        <div className="deleteOptionButton">
                            <Button
                                htmlType="button"
                                danger
                                onClick={() => validateDeleteOptionModal(singleOption, props.defaultValues.key, singleOption.key)}>
                                Option löschen
                            </Button>
                        </div>
                    </div>
                </Col>

            )
        })
    }

    const renderOptions = (singleOption: ElevativeOptionType): ReactFragment => {
        const optionExams: ExamCreationType[] = exams.filter(single => singleOption.ids.includes(single.key))
        if (optionExams.length === 0) {
            return (
                <div className="addExamsDragAndDropText">Hier Prüfungen per Drag-and-Drop hinzufügen</div>
            )
        }

        return optionExams.map((singleExam: ExamCreationType) => {
            return (
                <Col span={24} key={keyGenerator()}>
                    <RenderExamDraggable
                        singleExam={singleExam}
                        noWeight={true}
                        index={singleExam.index}
                        additionalID={singleOption.key}
                    />
                </Col>
            )
        })
    }

    // check if their are changes to eighter Exams or the ExamPackage
    // if so show Modal message
    const validateDeleteModal = () => {
        if (!(name || weight) && props.defaultValues.options.length === 0) {
            deleteElevative(props.defaultValues.key)
        } else {
            setShowDeleteElevative(true)
        }
    }

    const validateDeleteOptionModal = (singleOption: ElevativeOptionType, elevativeKey: string, optionKey: string) => {
        if (singleOption.ids.length === 0) {
            deleteElevativeOption(elevativeKey, optionKey)
        } else {
            setOptionToDelete(optionKey)
            setShowDeleteOptionElevative(true)
        }
    }

    return (
        <div className="minHeight300 examPackageElement">
            <DeleteElevativeModal
                visible={showDeleteElevativeModal}
                onDelete={() => deleteElevative(props.defaultValues.key)}
                onReturn={() => setShowDeleteElevative(false)}
            />
            <DeleteElevativeOptionModal
                visible={showDeleteElevativeOptionModal}
                onDelete={() => deleteElevativeOption(props.defaultValues.key, optionToDelete)}
                onReturn={() => setShowDeleteOptionElevative(false)}
            />

            <Form initialValues={props.defaultValues} className="form_min_height">
                {nameInputField()}
                {weightField()}
                {examPackageIDField()}
                {unitField()}
            </Form>
            <Divider>Optionen</Divider>
            <Row gutter={[8, 8]}>
                {renderOptionsDroppable()}
                {renderAddOptionButton()}
            </Row>
            {buttons()}
        </div>
    )
}

export default ElevativeComponent