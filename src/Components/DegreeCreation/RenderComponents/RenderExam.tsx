import React, {useContext, useState } from "react"
import { Button } from "antd";
import { ExamCreationType } from "../types";
import { DeleteExamModal } from "../Modals";
import { CreatorContext } from "../CreatorContext";

interface iProps {
    data: ExamCreationType,
    onDelete: Function,
    setEdit: Function,
}

// render already created Exams
const RenderExam = (props: iProps) => {
    const {semesterChoises} = useContext(CreatorContext)
    const [showDeleteModal, setShowDeleteModal] = useState(false)


    // render single Exam which is not in Edit Mode
    const renderExam = (values: ExamCreationType) => {
        return (
            <div className="degreeCreator_exam_noEdit">
                <div className="createExamForm">
                    <p className="degreeCreator_examText bold">{values.name}</p>
                    <p className="degreeCreator_examText">Prüfungsnummer: {values.examid}</p>
                    <p className="degreeCreator_examText">{values.ects} ECTS</p>
                    <p className="degreeCreator_examText">{values.semester ? values.semester + ". Semester" : ""}</p>
                    <p className="degreeCreator_examText">{values.semesterChoiseKey ? semesterChoises.filter(x => x.key === values.semesterChoiseKey).map(x => x.name) : ""}</p>
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
        <div className="minHeight300 dashedBorder">
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