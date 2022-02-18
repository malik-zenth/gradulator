import React, { useState, ReactFragment, ReactText } from "react"
import {Button, Form, InputNumber } from "antd"
import { ExamCreationType } from "../types"
import { Draggable } from "react-beautiful-dnd"
import { CheckOutlined, EditOutlined } from "@ant-design/icons";

interface iProps {
    singleExam: ExamCreationType,
    onSave: Function,
    setEdit: Function,
    index: number
}

const RenderSingleExamDraggable = (props: iProps) => {
    const [weight, setWeight] = useState<number>(props.singleExam.weight)

    const onWeightChange = (e: number) => {
        setWeight(e)
    }

    const saveWeight = () => {
        props.onSave(weight)
    }

    const weightField = (): ReactFragment => {
        return (
            <Form>
                <Form.Item
                    name="weight"
                    style={{ minHeight: "33px", marginBottom: "0px" }}
                >
                    <div className="weightFieldInline">
                        <InputNumber
                            type="string"
                            defaultValue={weight}
                            onChange={(e: number) => onWeightChange(e)}
                            placeholder="Gewichtung"
                            min={1}
                            max={50}
                            step={1}
                            style={{ minWidth: "70%" }}
                            parser={(value) => {
                                if (value.includes(".")) {
                                    return value.substring(0, value.indexOf("."))
                                }
                                return value
                            }}

                        />
                        <Button
                            size="small"
                            type="primary"
                            disabled = {weight ? false: true}
                            className="saveWeightButton"
                            onClick={() => saveWeight()}
                            shape="round"
                            icon={<CheckOutlined />}>
                        </Button>
                    </div>
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
                    <p className="bold singleExamText">{props.singleExam.examid} - {props.singleExam.name}</p>
                    {!props.singleExam.editMode &&
                        <div className="weightFieldInline">
                            <div className="center width70">Gewichtung: {props.singleExam.weight}</div>
                            <Button
                                size="small"
                                className="saveWeightButton"
                                onClick={() => props.setEdit()}
                                shape="round"
                                icon={<EditOutlined />}>
                            </Button>
                        </div>
                    }
                    {props.singleExam.editMode &&
                        weightField()
                    }
                </div>
            )}
        </Draggable>
    )
}

export default RenderSingleExamDraggable