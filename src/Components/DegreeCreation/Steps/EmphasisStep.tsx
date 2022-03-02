import { Button, Col, Row } from "antd";
import React, { ReactFragment, ReactText, useContext } from "react"
import { DragDropContext, Droppable, DropResult, ResponderProvided } from "react-beautiful-dnd";
import { CreatorContext } from "../CreatorContext"
import EmphasisComponent from "../FormComponents/EmphasisComponent";
import { RenderElevativeDraggable, RenderEmphasis, RenderExamPackageDraggable } from "../RenderComponents";
import { ElevativeCreationType, ExamPackageCreationType } from "../types";

interface iProps {

}

const keyGenerator = (): ReactText =>
    "_" + Math.random().toString(36).substr(2, 9);

const EmphasisStep = (props: iProps) => {
    const { onDragEndEmphasis, emphasis, addEmphasis, examPackages, elevatives } = useContext(CreatorContext)

    const onDragEnd = (result: DropResult, provided: ResponderProvided) => {
        onDragEndEmphasis(result)
    }

    const renderExamPackages = () => {
        const notUsedExamPackages: ExamPackageCreationType[] = examPackages.filter(x => emphasis.filter(single => single.required.includes(x.key)).length === 0)
        return notUsedExamPackages.map((singleExam: ExamPackageCreationType, index: number) => {
            return (
                <Col xxl={12} xl={24} lg={24} md={24} sm={24} xs={24} key={keyGenerator()}>
                    <RenderExamPackageDraggable
                        singleExamPackage={singleExam}
                        index={index} />
                </Col>
            )
        })
    }

    const renderElevatives = () => {
        const notUsedElevatives: ElevativeCreationType[] = elevatives.filter(x => emphasis.filter(single => single.required.includes(x.key)).length === 0)
        return notUsedElevatives.map((singleExam: ElevativeCreationType, index: number) => {
            return (
                <Col xxl={12} xl={24} lg={24} md={24} sm={24} xs={24} key={keyGenerator()}>
                    <RenderElevativeDraggable
                        singleElevative={singleExam}
                        index={index} />
                </Col>
            )
        })
    }

    const renderExamPackagesDroppable = () => {
        return (
            <Droppable
                droppableId="examPackages"
                key={keyGenerator()}
                type="1">
                {(provided, snapshot) => (
                    <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    style={{ height: "100%" }}>
                    <Row gutter={[8, 8]}
                    >
                        {renderExamPackages()}
                        {renderElevatives()}
                        {provided.placeholder}
                    </Row>
                    </div>
                )}

            </Droppable>
        )
    }

    const addEmphasisButton = () => {
        const textAddMore = <p>Weitere Schwerpunkte hinzufügen</p>
        const textAddFirst = <p>Füge im zweiten Schritt alle Schwerpunkte des Studiengangs hinzu. Ordne anschließend alle für den Schwerpunkt benötigten Modulprüfungen per Drag-and-Drop zu<br></br>Sollte es keine Schwerpunkte geben kannst du zum nächsten Schritt weitergehen.<br></br> Klicke hier, um deinen ersten Schwerpunkt hinzuzufügen.</p>
        const text: ReactFragment = emphasis.length > 0 ? textAddMore : textAddFirst
        return (
            <Col xxl={8} xl={12} lg={24} md={24} sm={24} xs={24}>
                <Button
                    style={{ whiteSpace: "normal", height: "100%" }}
                    htmlType="submit"
                    className="minHeight300 addExamButton"
                    onClick={() => addEmphasis()}
                >
                    <div className="buttonTextAddExam">{text}</div>

                </Button>
            </Col>
        )
    }

    const renderEmphasis = () => {
        return emphasis.map(single => {
            if (single.editMode) {
                return (
                    <Col key={keyGenerator()} xxl={8} xl={12} lg={24} md={24} sm={24} xs={24}>
                        <EmphasisComponent
                            defaultValues={single}
                        />
                    </Col>
                )
            } else {
                return (
                    <Col key={keyGenerator()} xxl={8} xl={12} lg={24} md={24} sm={24} xs={24}>
                        <RenderEmphasis
                            data={single}                      
                        />
                    </Col>
                )
            }
        })
    }

    const renderEmphasisBox = () => {
        return (
            <Row gutter={[8, 8]}>
                {renderEmphasis()}
                {addEmphasisButton()}
            </Row>
        )
    }

    return (
        <div className="singleStepDegreeCreator">
            <DragDropContext
                onDragEnd={(result: DropResult, provided: ResponderProvided) => onDragEnd(result, provided)}
            >
                <div className="inlineflex">
                    <div className="headingStepTwo">Modulprüfungen</div>
                    <div className="headingStepTwo">Schwerpunkte</div>
                </div>
                <div className="inlineflex">
                    <div className="examsDroppable">
                        {renderExamPackagesDroppable()}
                    </div>

                    <div className="examPackagesBox">
                        {renderEmphasisBox()}
                    </div>
                </div>
            </DragDropContext>

        </div>
    )
}

export default EmphasisStep