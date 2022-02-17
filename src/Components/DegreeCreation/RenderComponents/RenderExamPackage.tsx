import React, { ReactFragment, ReactText, useState } from "react"
import { Button, Divider, Col } from "antd";
import { ExamPackageCreationType } from "../types";
import { ExamPackageComponent } from "../FormComponents"
import RenderExams from "./RenderExam";
import { DeleteExamPackageModal } from "../ModalMessages";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";


const keyGenerator = (): ReactText =>
    "_" + Math.random().toString(36).substr(2, 9);

interface iProps {
    data: ExamPackageCreationType,
    index?: number
    onDelete?: Function,
    onSaveEdit?: Function,
    setEdit?: Function,
}

// render single ExamPackage
const RenderExamPackage = (props: iProps) => {
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false)

    // if single ExamPackage is not in editMode, render the values of it
    const renderExamPackage = () => {
        return (
            <div>
                <div className="form_min_height">
                    <p className="degreeCreator_exampackage_text bold">{props.data.name}</p>
                    <p className="degreeCreator_exampackage_text">Gewichtung: {props.data.weight}</p>
                </div>
                <Divider>
                    <div className="examPackages_addExams">
                        <div className="examPackages_add_heading">Prüfungen</div>
                    </div>
                </Divider>

                <div className="create_degree_buttons position_center">
                <Button
                    htmlType="button"
                    danger
                    onClick={() => setShowDeleteModal(true)}>
                    Modulprüfung löschen
                    </Button>
                <Button
                    style={{ marginLeft: 7.5 }}
                    htmlType="submit"
                    onClick={() => props.setEdit(props.index)}>
                    Bearbeiten
                </Button>
            </div>


            </div>
        )
    }
    return (
        <Col span={8} key={keyGenerator()}>
            <DeleteExamPackageModal
                visible={showDeleteModal}
                onDelete={() => props.onDelete(props.index)}
                onReturn={() => setShowDeleteModal(false)}
            />
            <div className="degreeCreator_singleElement">
                {renderExamPackage()}
            </div>
        </Col>
    )

}

export default RenderExamPackage