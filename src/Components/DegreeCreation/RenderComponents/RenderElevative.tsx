import React, { ReactFragment, ReactText, useState } from "react"
import { Button, Divider, Col, Row } from "antd";
import { ElevativeCreationType, ElevativeOptionType, ExamCreationType } from "../types";
import { DeleteElevativeModal } from "../Modals";
import { useContext } from "react";
import { CreatorContext } from "../CreatorContext";
import { RenderExamDraggable, RenderRequiredElevative } from ".";
import { Droppable } from "react-beautiful-dnd";

const keyGenerator = (): ReactText =>
    "_" + Math.random().toString(36).substr(2, 9);

interface iProps {
    data: ElevativeCreationType,
}

// render single Elevative
const RenderElevative = (props: iProps) => {
    const {setEditElevative, deleteElevative, exams} = useContext(CreatorContext)
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false)

    const buttons = (): ReactFragment => {
        return (
            <div className="create_degree_buttons position_center">
                <Button
                    htmlType="button"
                    danger
                    onClick={() => setShowDeleteModal(true)}>
                    Wahlpflichtfach löschen
                    </Button>
                <Button
                    style={{ marginLeft: 7.5, minWidth: "100px" }}
                    htmlType="submit"
                    onClick={() => setEditElevative(props.data.key)}>
                    Bearbeiten
                    </Button>
            </div>
        )
    }

    const renderOptions = (singleOption: ElevativeOptionType): ReactFragment => {
        const optionExams: ExamCreationType[] = exams.filter(single => singleOption.ids.includes(single.key))
        if (optionExams.length === 0) {
            return (
                <div className="addExamsDragAndDropText">Hier Prüfungen per Drag-and-Drop hinzufügen</div>
            )
        }

        return optionExams.map((singleExam: ExamCreationType) => {
            return (
                <Col span={24} key={keyGenerator()}>
                    <RenderExamDraggable
                        singleExam={singleExam}
                        index={singleExam.index}
                        additionalID={singleOption.key}
                    />
                </Col>
            )
        })
    }

    const renderOptionsDroppable = (): ReactFragment => {
        return props.data.options.map((singleOption: ElevativeOptionType) => {
            return (
                <Col span={12} key={keyGenerator()}>
                    <div className="singleOptionElevative">
                        <RenderRequiredElevative
                            defaultValues={singleOption}
                            elevativeKey={props.data.key}
                            unit={props.data.unit}
                        />
                        <Droppable
                            droppableId={singleOption.key}
                            type="1">
                            {(provided, snapshot) => (
                                <Col span={21}
                                    style={{ minWidth: "100%" }}
                                    className="examPackageDroppable"
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                >

                                    {renderOptions(singleOption)}
                                    {provided.placeholder}
                                </Col>
                            )}

                        </Droppable>
                        <div className="deleteOptionButton">
                            <Button
                                htmlType="button"
                                danger
                                disabled
                                onClick={() => {}}>
                                Option löschen
                            </Button>
                        </div>
                    </div>
                </Col>

            )
        })
    }

    return (
        <div className="minHeight300 examPackageElement">
            <DeleteElevativeModal
                visible={showDeleteModal}
                onDelete={() => deleteElevative(props.data.key)}
                onReturn={() => setShowDeleteModal(false)}
            />
            <div>
                <div className="form_min_height">
                    <p className="elevativeText degreeCreator_exampackage_text bold">{props.data.name}</p>
                    <p className="elevativeText degreeCreator_exampackage_text ">Gewichtung: {props.data.weight}</p>
                    <p className="elevativeText degreeCreator_exampackage_text ">Einheit: {props.data.unit}</p>
                </div>
                <Divider>Optionen</Divider>
                <Row gutter={[8, 8]}>
                {renderOptionsDroppable()}
                
                </Row>
                {buttons()}


            </div>
        </div>
    )

}

export default RenderElevative