import React, { useState, ReactFragment, ReactText } from "react"
import { Row, Col, Button, Form } from "antd"
import { ExamCreationType, ExamPackageCreationType } from "../types"
import { DragDropContext, Droppable, Draggable, OnDragEndResponder, DropResult, ResponderProvided } from "react-beautiful-dnd"
import {RenderExamDraggable} from "../RenderComponents"

interface iProps {
    onUpdate: Function,
    onDelete: Function,
    addExamPackage: Function,
    setEdit: Function,
    exams: ExamCreationType[],
    defaultValues?: ExamPackageCreationType[]
}

const keyGenerator = (): ReactText =>
    "_" + Math.random().toString(36).substr(2, 9);


const ExamPackagesStep = (props: iProps) => {

    const onDragEnd = (result: DropResult, provided: ResponderProvided) => {
        console.log(result, provided)
    }

    const renderExams = () => {
        return props.exams.map((singleExam: ExamCreationType, index: number) => {
            console.log(singleExam)
            return (
                <Col span={12}>
                    <RenderExamDraggable
                    singleExam={singleExam}
                    index={index}/>
                </Col>
            )
        })
    }

    const renderExamsDroppable = () => {
        return (
            <Droppable
                droppableId="exams"
                type="1">
                {(provided, snapshot) => (
                    <Row gutter={[8, 8]}
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

    return (
        <div className="singleStepDegreeCreator">
            <DragDropContext
                onDragEnd={(result: DropResult, provided: ResponderProvided) => onDragEnd(result, provided)}
            >
                <div className="examsDroppable">
                    {renderExamsDroppable()}
                </div>
                <Droppable
                    droppableId="2"
                    type="3">
                    {(provided, snapshot) => (
                        <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >

                            {provided.placeholder}
                        </div>
                    )}

                </Droppable>

            </DragDropContext>
        </div>
    )
}

export default ExamPackagesStep