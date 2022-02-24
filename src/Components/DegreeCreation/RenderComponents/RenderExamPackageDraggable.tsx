import React, { useState, ReactFragment, ReactText } from "react"
import { Button, Form, InputNumber } from "antd"
import { ExamCreationType, ExamPackageCreationType } from "../types"
import { Draggable } from "react-beautiful-dnd"
import { CheckOutlined, EditOutlined } from "@ant-design/icons";
import { useContext } from "react";
import { CreatorContext } from "../CreatorContext";

interface iProps {
    singleExamPackage: ExamPackageCreationType,
    index: number,
}

const keyGenerator = (): ReactText =>
    "_" + Math.random().toString(36).substr(2, 9);

const RenderExamPackageDraggable = (props: iProps) => {
    const { } = useContext(CreatorContext)

    return (
        <Draggable draggableId={props.singleExamPackage.key} index={props.index} key={keyGenerator()}>
            {(provided, snapshot) => (
                <div
                    className="singleExamDraggable"
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    <p className="bold singleExamText">{props.singleExamPackage.examPackageID} - {props.singleExamPackage.name}</p>
                    <div className="weightFieldInline">
                        <div className="center width70">Gewichtung: {props.singleExamPackage.weight}</div>
                    </div>
                </div>
            )}
        </Draggable>
    )
}

export default RenderExamPackageDraggable