import React, { ReactFragment, ReactText, useContext, useEffect, useState } from "react"
import { Form, InputNumber, Input, Button, Tooltip, Divider, Row, Col, Switch } from "antd";
import { ElevativeCreationType, EmphasisCreationType, ExamPackageCreationType } from "../types";
import { ToolTipNameOrWeightMissingElevative } from "../../const"
import { DeleteEmphasisModal } from "../Modals";
import { CreatorContext } from "../CreatorContext";
import { Droppable } from "react-beautiful-dnd";
import { RenderElevativeDraggable, RenderExamPackageDraggable } from "../RenderComponents";

interface iProps {
    defaultValues: EmphasisCreationType,
}

const keyGenerator = (): ReactText =>
    "_" + Math.random().toString(36).substr(2, 9);

const EmphasisComponent = (props: iProps) => {
    const { deleteEmphasis, updateEmphasis, examPackages, elevatives } = useContext(CreatorContext)
    const [showDeleteEmphasis, setShowDeleteEmphasis] = useState<boolean>(false)

    const [submitInvalidValuesMissing, setMissingValues] = useState<boolean>(!(props.defaultValues.name || props.defaultValues.weight))
    // form values
    const [name, setName] = useState<string>(props.defaultValues.name)
    const [weight, setWeight] = useState<number>(props.defaultValues.weight)
    const [multiGrades, setMultiGrades] = useState<boolean>(props.defaultValues.multiGrades)

    useEffect(() => {
        setMissingValues(!name || !weight)
    }, [name, weight])

    const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
    }

    const onMultiGradeChange = () => {
        setMultiGrades(!multiGrades)
    }

    const onWeightChange = (e: number) => {
        setWeight(e)
    }

    const layout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 15 },
    };

    const nameInputField = (): ReactFragment => {
        return (
            <Form.Item
                name={"name"}
                style={{ minHeight: "33px" }}
                {...layout}
                label="Name"
            >
                <Input
                    type="string"
                    onChange={onNameChange}
                    placeholder="Name des Schwerpunktes"
                />
            </Form.Item>
        )
    }

    const weightField = (): ReactFragment => {
        return (
            <Form.Item
                name={"weight"}
                style={{ minWidth: "100%", minHeight: "33px" }}
                {...layout}
                label="Gewichtung"
            >
                <InputNumber
                    placeholder="Gewichtung"
                    min={1}
                    style={{ minWidth: "100%"}}
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

    const multiGradesField = (): ReactFragment => {
        return (
            <Form.Item
                name={"multiGrades"}
                style={{ minWidth: "100%", minHeight: "33px" }}
                {...layout}
                label="Eine Note"
            >
                <Switch 
                    checked={multiGrades}
                    onChange={onMultiGradeChange}
                />
            </Form.Item>
        )
    }

    const onSubmit = (e: any) => {
        updateEmphasis({
            name: name,
            weight: weight,
            required: props.defaultValues.required,
            editMode: false,
            multiGrades: multiGrades,
            key: props.defaultValues.key
        })
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
                        style={{ marginLeft: 7.5, minWidth: "100px" }}
                        htmlType="submit"
                        disabled={true}
                        onClick={onSubmit}>
                        Speichern
                    </Button>
                </Tooltip>
            )
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

    // check if their are changes to eighter Exams or the ExamPackage
    // if so show Modal message
    const validateDeleteModal = () => {
        if (!(name || weight || props.defaultValues.required.length != 0)) {
            deleteEmphasis(props.defaultValues.key)
        } else {
            setShowDeleteEmphasis(true)
        }
    }

    // update values in parent component on form update
    const updateValues = () => {
        updateEmphasis({
            key: props.defaultValues.key,
            required: props.defaultValues.required,
            name: name,
            weight: weight,
            editMode: false
        })
    }


    const renderExamPackage = () => {
        if (props.defaultValues.required.length === 0) {
            return (
                <div className="addExamsDragAndDropText">Hier Modulprüfungen per Drag-and-Drop hinzufügen</div>
            )
        }
        const examPackageData = examPackages.filter(x => props.defaultValues.required.includes(x.key))
        return examPackageData.map((singleOption: ExamPackageCreationType, index: number) => {
            return (
                <Col span={16} key={keyGenerator()}>
                    <RenderExamPackageDraggable
                        singleExamPackage={singleOption}
                        index={index}
                    />

                </Col>
            )
        })
    }

    const renderElevatives = () => {
        const elevativeData = elevatives.filter(x => props.defaultValues.required.includes(x.key))
        return elevativeData.map((singleOption: ElevativeCreationType, index: number) => {
            return (
                <Col span={16} key={keyGenerator()}>
                    <RenderElevativeDraggable
                        singleElevative={singleOption}
                        index={index}
                    />

                </Col>
            )
        })
    }

    const renderOptionsDroppable = (): ReactFragment => {
        return (
            <Droppable
                droppableId={props.defaultValues.key}
                type="1">
                {(provided, snapshot) => (
                    <Row gutter={[0, 8]} justify="space-around"
                        className="examPackageDroppable"
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        {renderExamPackage()}
                        {renderElevatives()}
                        {provided.placeholder}
                    </Row>
                )}

            </Droppable>

        )
    }

    return (
        <div className="examPackageElement">
            <DeleteEmphasisModal
                visible={showDeleteEmphasis}
                onDelete={() => deleteEmphasis(props.defaultValues.key)}
                onReturn={() => setShowDeleteEmphasis(false)}
            />
            <Form initialValues={props.defaultValues}>
                {nameInputField()}
                {weightField()}
                {multiGradesField()}
            </Form>
            {buttons()}
            <Divider>Modulprüfungen</Divider>
            <Row gutter={[8, 8]}>
                {renderOptionsDroppable()}
            </Row>
            
        </div>
    )
}

export default EmphasisComponent