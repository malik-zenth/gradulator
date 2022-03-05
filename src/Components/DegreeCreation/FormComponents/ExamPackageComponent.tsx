import React, { ReactFragment, ReactText, useEffect, useState } from "react"
import { Form, InputNumber, Input, Button, Tooltip, Divider, Row, Col } from "antd";
import { ExamCreationType, ExamPackageCreationType } from "../types";
import { ToolTipExamPackageValuesMissing } from "../../const"
import { DeleteExamPackageModal } from "../Modals";
import { Droppable } from "react-beautiful-dnd"
import { RenderExamDraggable } from "../RenderComponents";
import { useContext } from "react";
import { CreatorContext } from "../CreatorContext";

interface iProps {
    defaultValues: ExamPackageCreationType,
}

const keyGenerator = (): ReactText =>
    "_" + Math.random().toString(36).substr(2, 9);

const ExamPackageComponent = (props: iProps) => {
    const {updateExamPackage, deleteExamPackage, exams} = useContext(CreatorContext)

    // if Modal to delete this ExamPackage should be displayed
    const [showDeleteExamPackageModal, setShowDeleteExamPackageModal] = useState<boolean>(false)
    // form values
    const [name, setName] = useState<string>(props.defaultValues.name)
    const [weight, setWeight] = useState<number>(props.defaultValues.weight)
    const [examPackageID, setPackageID] = useState<number>(props.defaultValues.examPackageID)

    const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
    }

    const onPackageIDChange = (e: number) => {
        setPackageID(e)
    }

    const onWeightChange = (e: number) => {
        setWeight(e)
    }

    const onSave = () => {
        const newExamPackage: ExamPackageCreationType = {
            name: name,
            weight: weight,
            examPackageID: examPackageID,
            key: props.defaultValues.key,
            editMode: false,
            required: props.defaultValues.required,
        }
        updateExamPackage(newExamPackage)
    }

    const layout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 15 },
    };

    const nameInputField = (): ReactFragment => {
        return (
            <Form.Item
                name="name"
                label="Name"
                {...layout}
            >
                <Input
                    style={{ minWidth: "100%", minHeight: "33px" }}
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
                name="weight"
                label="Gewichtung"
                {...layout}
            >
                <InputNumber
                    placeholder="Gewichtung"
                    style={{ minWidth: "100%", minHeight: "33px" }}
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

    const packageIDField = (): ReactFragment => {
        return (
            <Form.Item
                name="examPackageID"
                label="ID"
                {...layout}
            >
                <InputNumber
                    placeholder="Modulnummer"
                    style={{ minWidth: "100%", minHeight: "33px" }}
                    min={1}
                    step={1}
                    onChange={(e: number) => onPackageIDChange(e)}
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

    const buttons = (): ReactFragment => {
        return (
            <div className="create_degree_buttons position_center">
                <Button
                    htmlType="button"
                    danger
                    onClick={() => validateDeleteModal()}>
                    Modulprüfung löschen
                </Button>
                {(!name || !weight || !examPackageID) &&
                    <Tooltip title={ToolTipExamPackageValuesMissing}>
                        <Button
                            htmlType="button"
                            style={{ marginLeft: 7.5, minWidth: "100px" }}
                            type="primary"
                            disabled
                            onClick={() => onSave()}>
                            Speichern
                        </Button>
                    </Tooltip>
                }
                {(name && weight && examPackageID) &&
                    <Button
                        htmlType="button"
                        style={{ marginLeft: 7.5, minWidth: "100px" }}
                        type="primary"
                        onClick={() => onSave()}>
                        Speichern
                    </Button>
                }
            </div>
        )
    }


    // check if their are changes to eighter Exams or the ExamPackage
    // if so show Modal message
    const validateDeleteModal = () => {
        if (!(name || weight || examPackageID)) {
            deleteExamPackage(props.defaultValues.key)
        } else {
            setShowDeleteExamPackageModal(true)
        }
    }

    const renderExamPackage = () => {
        return (
            <Form initialValues={props.defaultValues}>
                {nameInputField()}
                {packageIDField()}
                {weightField()}
            </Form>
        )
    }

    const examsDroppable = (): ReactFragment => {
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
                        {renderExams()}
                        {provided.placeholder}
                    </Row>
                )}

            </Droppable>
        )
    }

    const renderExams = (): ReactFragment => {
        if(props.defaultValues.required.length === 0){
            return(
                <div className="addExamsDragAndDropText">Hier Prüfungen per Drag-and-Drop hinzufügen</div>
            )
        }
        const examData: ExamCreationType[] = props.defaultValues.required.map(id => exams.filter(x => x.key === id).shift())
        const orderedExamData: ExamCreationType[] = examData.sort((a,b) => (a.index > b.index) ? 1 : ((b.index > a.index) ? -1 : 0))
        return orderedExamData.map(singleExam => {
            return (
                <Col span={16} key={keyGenerator()}>
                    <RenderExamDraggable
                        singleExam={singleExam}
                        index={singleExam.index}

                    />
                </Col>
            )
        })
    }

    return (
        <div className="minHeight300 examPackageElement">
            <DeleteExamPackageModal
                visible={showDeleteExamPackageModal}
                onDelete={() => deleteExamPackage(props.defaultValues.key)}
                onReturn={() => setShowDeleteExamPackageModal(false)}
            />
            {renderExamPackage()}
            {buttons()}
            <Divider>Prüfungen</Divider>
            {examsDroppable()}
            
        </div>
    )
}

export default ExamPackageComponent