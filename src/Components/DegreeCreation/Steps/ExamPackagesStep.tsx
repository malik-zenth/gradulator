import React, { useState, ReactFragment, ReactText } from "react"
import { Row, Col, Button, Form } from "antd"
import { ExamCreationType, ExamPackageCreationType } from "../types"
import { DragDropContext, Droppable, Draggable, OnDragEndResponder, DropResult, ResponderProvided } from "react-beautiful-dnd"
import { RenderExamDraggable, RenderExamPackage} from "../RenderComponents"

interface iProps {
    onUpdate: Function,
    onDelete: Function,
    addExamPackage: Function,
    setEdit: Function,
    setExamWeight: Function,
    setExamEdit: Function,
    exams: ExamCreationType[],
    defaultValues: ExamPackageCreationType[]
}

const keyGenerator = (): ReactText =>
    "_" + Math.random().toString(36).substr(2, 9);


const ExamPackagesStep = (props: iProps) => {

    const onDragEnd = (result: DropResult, provided: ResponderProvided) => {
        console.log(result, provided)
    }

    const renderExams = () => {
        return props.exams.map((singleExam: ExamCreationType, index: number) => {
            return (
                <Col span={12} key={keyGenerator()}>
                    <RenderExamDraggable
                        singleExam={singleExam}
                        onSave={(weight: number) => props.setExamWeight(weight, singleExam.key)}
                        setEdit={() => props.setExamEdit(singleExam.key)}
                        index={index} />
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

    const addExamPackagesButton = (): ReactFragment => {
        const textAddMore = <p>Weitere Modulprüfung hinzufügen</p>
        const textAddFirst = <p>Füge im zweiten Schritt alle Modulprüfungen des Studiengangs hinzu. Ordne anschließend alle Prüfungen per Drag-and-Drop einer Modulprüfung zu<br></br> Klicke hier, um deine erste Modulprüfung hinzuzufügen.</p>
        const text: ReactFragment = props.defaultValues.length > 0 ? textAddMore : textAddFirst
        return (
            <Col span={8}>
                    <Button
                        style={{whiteSpace: "normal"}}
                        htmlType="submit"
                        className="minHeight300 addExamButton"
                        onClick={() => props.addExamPackage()}
                    >
                    <div className="buttonTextAddExam">{text}</div>

                    </Button>
            </Col>
        )
    }

    const renderExamPackages = () => {
        return(
            <Row gutter={[8,8]}>

                {addExamPackagesButton()}
            </Row>
        )   
    }

    return (
        <div className="singleStepDegreeCreator">
            <DragDropContext
                onDragEnd={(result: DropResult, provided: ResponderProvided) => onDragEnd(result, provided)}
            >
                <div className="inlineflex">
                    <div className="headingStepTwo">Prüfungen</div>
                    <div className="headingStepTwo">Modulprüfungen</div>
                </div>
                <div className="inlineflex">
                    <div className="examsDroppable">
                        {renderExamsDroppable()}
                    </div>

                    <div className="examPackagesBox">
                        {renderExamPackages()}
                    </div>
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