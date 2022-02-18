import React, { useState, ReactFragment, ReactText } from "react"
import { Row, Col, Button, Form } from "antd"
import { ExamCreationType, ExamPackageCreationType } from "../types"
import { DragDropContext, Droppable, Draggable, OnDragEndResponder, DropResult, ResponderProvided } from "react-beautiful-dnd"
import { RenderExamDraggable, RenderExamPackage } from "../RenderComponents"
import { ExamPackageComponent } from "../FormComponents"

interface iProps {
    onDeleteExamPackage: Function,
    addExamPackage: Function,
    saveExamPackage: Function,
    setEditExamPackage: Function,
    setExamWeight: Function,
    setExamEdit: Function,
    exams: ExamCreationType[],
    defaultValues: ExamPackageCreationType[],
    onDragEnd: Function
}

const keyGenerator = (): ReactText =>
    "_" + Math.random().toString(36).substr(2, 9);


const ExamPackagesStep = (props: iProps) => {

    const onDragEnd = (result: DropResult, provided: ResponderProvided) => {
        props.onDragEnd(result)
    }

    const renderExams = () => {
        // Filter out all exams that are used for any ExamPackage
        const notUsedExams: ExamCreationType[] = props.exams.filter(singleExam => props.defaultValues.filter(singleExamPackage => singleExamPackage.required.includes(singleExam.key)).length == 0)
        const orderedNotUsedExams: ExamCreationType[] = notUsedExams.sort((a,b) => (a.index > b.index) ? 1 : ((b.index > a.index) ? -1 : 0))
        return orderedNotUsedExams.map((singleExam: ExamCreationType, index: number) => {
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
                    style={{height: "100%"}}
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
                    style={{ whiteSpace: "normal", height: "100%" }}
                    htmlType="submit"
                    className="minHeight300 addExamButton"
                    onClick={() => props.addExamPackage()}
                >
                    <div className="buttonTextAddExam">{text}</div>

                </Button>
            </Col>
        )
    }

    const examPackages = (): ReactFragment => {
        return props.defaultValues.map(single => {
            if (single.editMode) {
                return (
                    <Col key={keyGenerator()} span={8}>
                        <ExamPackageComponent
                            defaultValues={single}
                            exams={props.exams}
                            onDelete={(key: string) => props.onDeleteExamPackage(key)}
                            onSave={(examPackage: ExamPackageCreationType) => props.saveExamPackage(examPackage)}
                            onSaveExam={(weight: number, key: string) => props.setExamWeight(weight, key)}
                            setEditExam={(key: string) => props.setExamEdit(key)}
                        />
                    </Col>
                )
            } else {
                return (
                    <Col key={keyGenerator()} span={8}>
                        <RenderExamPackage
                            data={single}
                            exams={props.exams}
                            onDelete={(key: string) => props.onDeleteExamPackage(key)}
                            setEdit={(key: string) => props.setEditExamPackage(key)}
                            onSaveExam={(weight: number, key: string) => props.setExamWeight(weight, key)}
                            setEditExam={(key: string) => props.setExamEdit(key)}
                            
                        />
                    </Col>
                )
            }
        })
    }

    const renderExamPackages = () => {
        return (
            <Row gutter={[8, 8]}>
                {examPackages()}
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
            </DragDropContext>
        </div>
    )
}

export default ExamPackagesStep