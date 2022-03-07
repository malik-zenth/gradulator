import React, { useState, ReactFragment, ReactText } from "react"
import { Row, Col, Button, Form } from "antd"
import { ExamCreationType, ExamPackageCreationType } from "../types"
import { DragDropContext, Droppable, Draggable, OnDragEndResponder, DropResult, ResponderProvided } from "react-beautiful-dnd"
import { RenderExamDraggable, RenderExamPackage } from "../RenderComponents"
import { ExamPackageComponent } from "../FormComponents"
import { useContext } from "react"
import { CreatorContext } from "../CreatorContext"

const keyGenerator = (): ReactText =>
    "_" + Math.random().toString(36).substr(2, 9);


const ExamPackagesStep = () => {
    const { onDragEndExamPackages, exams, setExamWeight, setEditExam, examPackages, addExamPackage } = useContext(CreatorContext)

    const onDragEnd = (result: DropResult, provided: ResponderProvided) => {
        onDragEndExamPackages(result)
    }

    const renderExams = () => {
        // Filter out all exams that are used for any ExamPackage
        const notUsedExams: ExamCreationType[] = exams.filter(singleExam => examPackages.filter(singleExamPackage => singleExamPackage.required.includes(singleExam.key)).length == 0)
        const orderedNotUsedExams: ExamCreationType[] = notUsedExams.sort((a, b) => (a.index > b.index) ? 1 : ((b.index > a.index) ? -1 : 0))
        return orderedNotUsedExams.map((singleExam: ExamCreationType, index: number) => {
            return (
                <Col xxl={12} xl={24} lg={24} md={24} sm={24} xs={24} key={keyGenerator()}>
                    <RenderExamDraggable
                        singleExam={singleExam}
                        index={index} />
                </Col>
            )
        })
    }

    const renderExamsDroppable = () => {
        return (
            <div style={{ height: "100%" }}>
                <Droppable
                    droppableId="exams"
                    type="1"
                >
                    {(provided, _) => (
                        <div ref={provided.innerRef}
                            style={{ height: "100%" }}
                            {...provided.droppableProps}>
                            <Row gutter={[8, 8]}>
                                {renderExams()}
                                {provided.placeholder}
                            </Row>
                        </div>
                    )}

                </Droppable>

            </div>
        )
    }

    const addExamPackagesButton = (): ReactFragment => {
        const textAddMore = <p>Weitere Modulprüfung hinzufügen</p>
        const textAddFirst = <p>Füge im zweiten Schritt alle Modulprüfungen des Studiengangs hinzu. Ordne anschließend alle Prüfungen per Drag-and-Drop einer Modulprüfung zu<br></br>Beachte jedoch, dass Wahlfächer erst im nächsten Schritt hinzugefügt werden.<br></br> Klicke hier, um deine erste Modulprüfung hinzuzufügen.</p>
        const text: ReactFragment = examPackages.length > 0 ? textAddMore : textAddFirst
        return (
            <Col xxl={8} xl={12} lg={12} md={24} sm={24} xs={24}>
                <Button
                    style={{ whiteSpace: "normal", height: "100%" }}
                    htmlType="submit"
                    className="minHeight300 addExamButton"
                    onClick={() => addExamPackage()}
                >
                    <div className="buttonTextAddExam">{text}</div>

                </Button>
            </Col>
        )
    }

    const renderExamPackages = (): ReactFragment => {
        return examPackages.map(single => {
            if (single.editMode) {
                return (
                    <Col key={keyGenerator()} xxl={8} xl={12} lg={12} md={24} sm={24} xs={24}>
                        <ExamPackageComponent
                            defaultValues={single}
                        />
                    </Col>
                )
            } else {
                return (
                    <Col key={keyGenerator()} xxl={8} xl={12} lg={12} md={24} sm={24} xs={24}>
                        <RenderExamPackage
                            data={single}
                        />
                    </Col>
                )
            }
        })
    }

    const renderExamPackagesBox = () => {
        return (
            <Row gutter={[8, 8]}>
                {renderExamPackages()}
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
                        {renderExamPackagesBox()}
                    </div>
                </div>
            </DragDropContext>
        </div>
    )
}

export default ExamPackagesStep