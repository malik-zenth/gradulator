import { Button, Col, Row } from "antd";
import React, { ReactFragment, ReactText } from "react"
import { useContext } from "react";
import { DragDropContext, Droppable, DropResult, ResponderProvided } from "react-beautiful-dnd";
import { CreatorContext } from "../CreatorContext";
import { ElevativeComponent } from "../FormComponents";
import { RenderElevative, RenderExamDraggable } from "../RenderComponents";
import { ExamCreationType } from "../types";

const keyGenerator = (): ReactText =>
    "_" + Math.random().toString(36).substr(2, 9);


const ElevativeStep = () => {
    const { exams, elevatives, addElevative, onDragEndElevatives } = useContext(CreatorContext)

    const renderExamsDroppable = () => {
        return (
            <div style={{ height: "100%" }}>
                <Droppable
                    droppableId="exams"
                    key={keyGenerator()}
                    type="1">
                    {(provided, _) => (
                        <div ref={provided.innerRef}
                            style={{ height: "100%" }}
                            {...provided.droppableProps}>
                            <Row gutter={[8, 8]}
                            >
                                {renderExams()}
                                {provided.placeholder}
                            </Row>
                        </div>
                    )}

                </Droppable>

            </div>
        )
    }

    const renderExams = () => {
        return exams.map((singleExam: ExamCreationType, index: number) => {
            return (
                <Col xxl={12} xl={24} lg={24} md={24} sm={24} xs={24} key={keyGenerator()}>
                    <RenderExamDraggable
                        singleExam={singleExam}
                        index={index} />
                </Col>
            )
        })
    }

    const addElevativeButton = (): ReactFragment => {
        const textAddMore = <p>Weitere Wahlfächer hinzufügen</p>
        const textAddFirst = <p>Füge im dritten Schritt alle Modulprüfungen, bei welchen es sich um Wahlfächer handelt hinzu.
            <br></br>Füge für alle die jeweiligen Optionen das Modul zu erfüllen hinzu und ordne anschließend Prüfungen per Drag-and-Drop einer Option zu.
            <br></br>Gehe weiter zum nächsten Schritt, sollte es keine Wahlfächer geben.<br></br> Klicke hier, um dein erstes Wahlfach hinzuzufügen.
        </p>
        const text: ReactFragment = elevatives.length > 0 ? textAddMore : textAddFirst
        return (
            <Col xxl={12} xl={24} lg={24} md={24} sm={24} xs={24} key={keyGenerator()}>
                <Button
                    style={{ whiteSpace: "normal", height: "100%" }}
                    htmlType="submit"
                    className="minHeight300 addExamButton"
                    onClick={() => addElevative()}
                >
                    <div className="buttonTextAddExam">{text}</div>

                </Button>
            </Col>
        )
    }

    const renderElevatives = (): ReactFragment => {
        return elevatives.map(single => {
            if (single.editMode) {
                return (
                    <Col xxl={12} xl={24} lg={24} md={24} sm={24} xs={24} key={keyGenerator()}>
                        <ElevativeComponent
                            defaultValues={single}
                        />
                    </Col>
                )
            }
            else {
                return (
                    <Col key={keyGenerator()} xxl={12} xl={24} lg={24} md={24} sm={24} xs={24}>
                        <RenderElevative
                            data={single}
                        />
                    </Col>
                )
            }
        })
    }

    const renderElevativesBox = () => {
        return (
            <Row gutter={[8, 8]}>
                {renderElevatives()}
                {addElevativeButton()}
            </Row>
        )
    }

    return (
        <div className="singleStepDegreeCreator">
            <DragDropContext
                onDragEnd={(result: DropResult, provided: ResponderProvided) => onDragEndElevatives(result)}
            >
                <div className="inlineflex">
                    <div className="headingStepTwo">Prüfungen</div>
                    <div className="headingStepTwo">Wahlfächer</div>
                </div>
                <div className="inlineflex">
                    <div className="examsDroppable">
                        {renderExamsDroppable()}
                    </div>

                    <div className="examPackagesBox">
                        {renderElevativesBox()}
                    </div>

                </div>
            </DragDropContext>
        </div>
    )
}

export default ElevativeStep