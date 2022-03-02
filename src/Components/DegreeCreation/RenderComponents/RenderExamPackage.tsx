import React, { ReactFragment, ReactText, useState } from "react"
import { Button, Col, Divider, Row } from "antd";
import { ExamCreationType, ExamPackageCreationType } from "../types";
import { DeleteExamPackageModal } from "../Modals";
import { RenderExamDraggable } from ".";
import { Droppable } from "react-beautiful-dnd";
import { useContext } from "react";
import { CreatorContext } from "../CreatorContext";


const keyGenerator = (): ReactText =>
    "_" + Math.random().toString(36).substr(2, 9);

const keyGeneratorString = (): string =>
    "_" + Math.random().toString(36).substr(2, 9);


interface iProps {
    data: ExamPackageCreationType,
}

// render single ExamPackage
const RenderExamPackage = (props: iProps) => {
    const {exams, deleteExamPackage, setEditExamPackage } = useContext(CreatorContext)

    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false)

    const examsDroppable = (): ReactFragment => {
        return (
            <Droppable
                droppableId={props.data.key}
                type="1">
                {(provided, snapshot) => (
                    <Row gutter={[0, 8]} justify="space-around"
                        className="examPackageDroppable"
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
        if(props.data.required.length === 0){
            return(
                <div className="addExamsDragAndDropText">Hier Prüfungen per Drag-and-Drop hinzufügen</div>
            )
        }
        const examData: ExamCreationType[] = props.data.required.map(id => exams.filter(x => x.key === id).shift())
        const orderedExamData: ExamCreationType[] = examData.sort((a,b) => (a.index > b.index) ? 1 : ((b.index > a.index) ? -1 : 0))
        return orderedExamData.map(singleExam => {
            return (
                <Col span={16} key={keyGenerator()}>
                    <RenderExamDraggable
                        noWeight={false}
                        singleExam={singleExam}
                        index={singleExam.index}
                    />
                </Col>
            )
        })
    }

    return (
        <div className="examPackageElement">
            <DeleteExamPackageModal
                visible={showDeleteModal}
                onDelete={() => deleteExamPackage(props.data.key)}
                onReturn={() => setShowDeleteModal(false)}
            />
            <div className="examPackageInformation">
                <div>
                    <div>
                        <p className="degreeCreator_exampackage_text bold">{props.data.name}</p>
                        <p className="degreeCreator_exampackage_text">Modulnummer: {props.data.examPackageID}</p>
                        <p className="degreeCreator_exampackage_text">Gewichtung: {props.data.weight}</p>
                    </div>
                    <Divider>
                        Prüfungen
                    </Divider>
                    {examsDroppable()}

                    <div className="create_degree_buttons position_center">
                        <Button
                            htmlType="button"
                            danger
                            onClick={() => setShowDeleteModal(true)}>
                            Modulprüfung löschen
                        </Button>
                        <Button
                            style={{ marginLeft: 7.5, minWidth: "100px" }}
                            htmlType="submit"
                            onClick={() => setEditExamPackage(props.data.key)}>
                            Bearbeiten
                        </Button>
                    </div>


                </div>
            </div>
        </div>
    )

}

export default RenderExamPackage