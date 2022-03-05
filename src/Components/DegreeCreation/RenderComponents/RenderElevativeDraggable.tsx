import React, { useState, ReactFragment, ReactText } from "react"
import { Button, Form, InputNumber } from "antd"
import { ElevativeCreationType, ExamCreationType, ExamPackageCreationType } from "../types"
import { Draggable } from "react-beautiful-dnd"
import { CheckOutlined, EditOutlined } from "@ant-design/icons";
import { useContext } from "react";
import { CreatorContext } from "../CreatorContext";

interface iProps {
    singleElevative: ElevativeCreationType,
    index: number,
    additionalID?: string
}

const keyGenerator = (): ReactText =>
    "_" + Math.random().toString(36).substr(2, 9);

const RenderElevativeDraggable = (props: iProps) => {
    const { } = useContext(CreatorContext)

    return (
        <Draggable draggableId={props.singleElevative.key} index={props.index} key={keyGenerator()}>
            {(provided, snapshot) => (
                <div
                    className="singleExamDraggable"
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    <p className="bold singleExamText">{props.singleElevative.examPackageID} - {props.singleElevative.name}</p>
                    <div className="weightFieldInline">
                        <div className="center width70">Gewichtung: {props.singleElevative.weight}</div>
                    </div>
                </div>
            )}
        </Draggable>
    )
}

export default RenderElevativeDraggable