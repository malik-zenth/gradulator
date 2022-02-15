import React, { ReactText, useState } from "react"
import { Button } from "antd";
import { ExamCreationType } from "../types";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { DeleteExamModal } from "../ModalMessages";

interface iProps {
    data: ExamCreationType,
    onDelete: Function,
    setEdit: Function,
}

// render already created Exams
const RenderExam = (props: iProps) => {
    const [showDeleteModal, setShowDeleteModal] = useState(false)


    // render single Exam which is not in Edit Mode
    const renderExam = (values: ExamCreationType) => {
        return (
            <div className="degreeCreator_exam_noEdit">
                <div className="createExamForm">
                    <p className="degreeCreator_examText bold">{values.name}</p>
                    <p className="degreeCreator_examText">{values.semester}. Semester</p>
                    <p className="degreeCreator_examText">{values.ects} ECTS</p>
                </div>
                <div className="create_degree_buttons">
                    <Button
                        htmlType="button"
                        danger
                        onClick={() => setShowDeleteModal(true)}>
                        Prüfung löschen
                    </Button>
                    <Button
                        style={{ marginLeft: 7.5 }}
                        htmlType="submit"
                        onClick={() => props.setEdit(values.key)}>
                        Bearbeiten
                    </Button>
                </div>
            </div>
        )
    }

    return (
        <div className="minHeight250">
            {renderExam(props.data)}
            <DeleteExamModal
                visible={showDeleteModal}
                onDelete={() => props.onDelete(props.data.key)}
                onReturn={() => setShowDeleteModal(false)}
            />
        </div>
    )
}

export default RenderExam