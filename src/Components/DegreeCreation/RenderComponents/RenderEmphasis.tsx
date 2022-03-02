import React, { ReactFragment, ReactText, useContext, useState } from "react"
import { Button, Divider, Col, Row, Switch, Form } from "antd";
import { ElevativeCreationType, EmphasisCreationType, ExamPackageCreationType } from "../types";
import { DeleteEmphasisModal } from "../Modals";
import { CreatorContext } from "../CreatorContext";
import { Droppable } from "react-beautiful-dnd";
import { RenderElevativeDraggable, RenderExamPackageDraggable } from ".";

const keyGenerator = (): ReactText =>
    "_" + Math.random().toString(36).substr(2, 9);

interface iProps {
    data: EmphasisCreationType,
}

const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 15 },
};

// render single Elevative
const RenderEmphasis = (props: iProps) => {
    const { setEditEmphasis, deleteEmphasis, examPackages, elevatives } = useContext(CreatorContext)
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false)

    const examPackagesDroppable = (): ReactFragment => {
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
                        {renderExamPackages()}
                        {renderElevatives()}
                        {provided.placeholder}
                    </Row>
                )}

            </Droppable>
        )
    }

    const renderExamPackages = () => {
        if (props.data.required.length === 0) {
            return (
                <div className="addExamsDragAndDropText">Hier Modulprüfungen per Drag-and-Drop hinzufügen</div>
            )
        }
        const examPackageData: ExamPackageCreationType[] = examPackages.filter(x => props.data.required.includes(x.key))
        return examPackageData.map((singleExam: ExamPackageCreationType, index: number) => {
            return (
                <Col span={16} key={keyGenerator()}>
                    <RenderExamPackageDraggable
                        singleExamPackage={singleExam}
                        index={index}
                    />
                </Col>
            )
        })
    }

    const renderElevatives = () => {
        const elevativesData: ElevativeCreationType[] = elevatives.filter(x => props.data.required.includes(x.key))
        return elevativesData.map((singleExam: ElevativeCreationType, index: number) => {
            return (
                <Col span={16} key={keyGenerator()}>
                    <RenderElevativeDraggable
                        singleElevative={singleExam}
                        index={index}
                    />
                </Col>
            )
        })
    }

    const multiGradesSwitch = (): ReactFragment => {
        return (
            <Form>
                <Form.Item
                    name={"multiGrades"}
                    style={{ minWidth: "100%", minHeight: "33px" }}
                    {...layout}
                    label="Eine Note"
                >
                    <Switch
                        disabled
                        defaultChecked={props.data.multiGrades}
                    />
                </Form.Item>
            </Form>
        )
    }

    const buttons = (): ReactFragment => {
        return (
            <div className="create_degree_buttons position_center">
                <Button
                    htmlType="button"
                    danger
                    onClick={() => setShowDeleteModal(true)}>
                    Schwerpunkt löschen
                </Button>
                <Button
                    style={{ marginLeft: 7.5, minWidth: "100px" }}
                    htmlType="submit"
                    onClick={() => setEditEmphasis(props.data.key)}>
                    Bearbeiten
                </Button>
            </div>
        )
    }

    return (
        <div className="examPackageElement">
            <DeleteEmphasisModal
                visible={showDeleteModal}
                onDelete={() => deleteEmphasis(props.data.key)}
                onReturn={() => setShowDeleteModal(false)}
            />
            <div>
                <div>
                    <p className="elevativeText degreeCreator_exampackage_text bold">{props.data.name}</p>
                    <p className="elevativeText degreeCreator_exampackage_text">Gewichtung: {props.data.weight}</p>
                    {multiGradesSwitch()}
                </div>
                <Divider>Modulprüfungen</Divider>
                <Row gutter={[8, 8]}>
                    {examPackagesDroppable()}
                </Row>
                {buttons()}
            </div>
        </div>
    )

}

export default RenderEmphasis