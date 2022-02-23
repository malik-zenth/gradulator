import React, { useState, ReactFragment, ReactText } from "react"
import {Button, Form, InputNumber } from "antd"
import { ExamCreationType } from "../types"
import { Draggable } from "react-beautiful-dnd"
import { CheckOutlined, EditOutlined } from "@ant-design/icons";
import { useContext } from "react";
import { CreatorContext } from "../CreatorContext";

interface iProps {
    singleExam: ExamCreationType,
    index: number,
    additionalID?: string
}

const keyGenerator = (): ReactText =>
    "_" + Math.random().toString(36).substr(2, 9);

const RenderSingleExamDraggable = (props: iProps) => {
    const {setExamWeight, setEditExam} = useContext(CreatorContext)

    const [weight, setWeight] = useState<number>(props.singleExam.weight)

    const onWeightChange = (e: number) => {
        setWeight(e)
    }

    const saveWeight = () => {
        setExamWeight(weight, props.singleExam.key)
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
    // this draggable ID with an underscore and the ID of the Option is required to enable the usage of the same exam multiple times within elevatives
    const draggableID: string = props.additionalID ? props.singleExam.key + "_" + props.additionalID : props.singleExam.key
    return (
        <Draggable draggableId={draggableID} index={props.index} key={keyGenerator()}>
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
                                onClick={() => setEditExam(props.singleExam.key)}
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