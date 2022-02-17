import React, { useState, ReactFragment, ReactText } from "react"
import { Row, Col, Button, Form, InputNumber } from "antd"
import { ExamCreationType, ExamPackageCreationType } from "../types"
import { DragDropContext, Droppable, Draggable, OnDragEndResponder, DropResult, ResponderProvided } from "react-beautiful-dnd"

interface iProps {
    singleExam: ExamCreationType,
    index: number
}

const RenderSingleExamDraggable = (props: iProps) => {
    const [weight, setWeight] = useState<number>(props.singleExam.weight)

    const onWeightChange = (e: number) => {
        setWeight(e)
    }

    const weightField = (): ReactFragment => {
        return (
            <Form initialValues={props.singleExam}>
                <Form.Item
                    name="weight"
                    initialValue={weight}
                    label="Gewichtung:"
                    style={{ minHeight: "33px" }}
                >
                    <InputNumber
                        type="string"
                        onChange={(e: number) => onWeightChange(e)}
                        placeholder="Gewichtung"
                        min={1}
                        max={50}
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
                </Form>
                )
    }

                return (
                <Draggable draggableId={props.singleExam.key} index={props.index}>
                    {(provided, snapshot) => (
                        <div
                            className="singleExamDraggable"
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                        >
                            <p className="bold singleExamText">{props.singleExam.name}</p>
                            <p className="singleExamText">{props.singleExam.examid} - {props.singleExam.semester}. Semester</p>
                            {!props.singleExam.editMode && <p className="singleExamText">Gewichtung: {props.singleExam.weight}</p>}
                            {props.singleExam.editMode &&
                                weightField()
                            }
                        </div>
                    )}
                </Draggable>
                )
}

                export default RenderSingleExamDraggable