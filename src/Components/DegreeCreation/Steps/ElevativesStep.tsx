import { Button, Col, Row } from "antd";
import React, { ReactFragment, ReactText } from "react"
import { DragDropContext, Droppable, DropResult, ResponderProvided } from "react-beautiful-dnd";
import { ElevativeComponent } from "../FormComponents";
import { RenderElevative, RenderExamDraggable } from "../RenderComponents";
import { ElevativeCreationType, ExamCreationType } from "../types";

interface iProps {
    defaultValues: ElevativeCreationType[],
    exams: ExamCreationType[],
    setExamWeight: Function,
    setExamEdit: Function,
    addElevative: Function
    onDeleteElevative: Function,
    onSaveElevative: Function,
    setEditElevative: Function,
    onSaveExam: Function,
    setEditExam: Function
}

const keyGenerator = (): ReactText =>
    "_" + Math.random().toString(36).substr(2, 9);


const ElevativeStep = (props: iProps) => {

    const onDragEnd = (result: DropResult, provided: ResponderProvided) => {

    }

    const renderExamsDroppable = () => {
        return (
            <Droppable
                droppableId="exams"
                type="1">
                {(provided, snapshot) => (
                    <Row gutter={[8, 8]}
                        style={{ height: "100%" }}
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

    const addElevativeButton = (): ReactFragment => {
        const textAddMore = <p>Weitere Wahlfächer hinzufügen</p>
        const textAddFirst = <p>Füge im dritten Schritt alle Modulprüfungen, bei welchen es sich um Wahlfächer handelt hinzu.
            <br></br>Füge für alle die jeweiligen Optionen das Modul zu erfüllen hinzu und ordne anschließend Prüfungen per Drag-and-Drop einer Option zu.
            <br></br>Gehe weiter zum nächsten Schritt, sollte es keine Wahlfächer geben.<br></br> Klicke hier, um dein erstes Wahlfach hinzuzufügen.
        </p>
        const text: ReactFragment = props.defaultValues.length > 0 ? textAddMore : textAddFirst
        return (
            <Col span={12}>
                <Button
                    style={{ whiteSpace: "normal", height: "100%" }}
                    htmlType="submit"
                    className="minHeight300 addExamButton"
                    onClick={() => props.addElevative()}
                >
                    <div className="buttonTextAddExam">{text}</div>

                </Button>
            </Col>
        )
    }

    const elevatives = (): ReactFragment => {
        return props.defaultValues.map(single => {
            if (single.editMode) {
                return (
                    <Col span={12} key={keyGenerator()}>
                        <ElevativeComponent
                            defaultValues={single}
                            onSave={(elevative: ElevativeCreationType) => props.onSaveElevative(elevative)}
                            onDelete={(key: string) => props.onDeleteElevative(key)}
                            exams={props.exams}
                            onSaveExam={(weight: number, key: string) => props.onSaveExam(weight, Number)}
                            setEditExam={(key: string) => props.setEditExam(key)}
                        />

                    </Col>
                )
            }
            else {
                return (
                    <Col key={keyGenerator()} span={12}>
                        <RenderElevative
                            data={single}
                            onDelete={(key: string) => props.onDeleteElevative(key)}
                            setEdit={(key: string) => props.setEditElevative(key)}
                        />
                    </Col>
                )
            }
        })
    }

    const renderElevatives = () => {
        return (
            <Row gutter={[8, 8]}>
                {elevatives()}
                {addElevativeButton()}
            </Row>
        )
    }

    return (
        <div>
            <DragDropContext
                onDragEnd={(result: DropResult, provided: ResponderProvided) => onDragEnd(result, provided)}
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
                        {renderElevatives()}
                    </div>

                </div>
            </DragDropContext>
        </div>
    )
}

export default ElevativeStep