import React, { ReactText } from "react"
import { Button } from "antd";
import { ExamCreationType } from "../types";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import ExamComponent from "../FormComponents/ExamComponent";

const keyGenerator = (): ReactText =>
    "_" + Math.random().toString(36).substr(2, 9);

interface iProps {
    data: ExamCreationType[],
    showEditButtons: boolean,
    onDeleteEdit?: Function,
    onSaveEdit?: Function,
    setEdit?: Function,
    onDeleteNotEdit?: Function
}

// render already created Exams
const RenderExams = (props: iProps) => {

    // render single Exam in Edit Mode
    const renderExamEditMode = (index: number, values: ExamCreationType) => {
        return (
            <div key={keyGenerator()}>
            <ExamComponent
                onDelete={() => props.onDeleteEdit(index)}
                onSave={(examData: ExamCreationType) => props.onSaveEdit(examData, index)}
                defaultValues={values}
            />
            </div>
        )
    }

    // render single Exam which is not in Edit Mode
    const renderExamNotEditMode = (index: number, values: ExamCreationType) => {
        return (
            <div key={keyGenerator()} className="degreeCreator_exam_noEdit">
                <div className="degreeCreator displayInline">
                    <p className="degreeCreator_exam_name bold">{values.name}</p>
                    <div className="degreeCreator_exam_editButtons">
                        <Button
                            size="small"
                            onClick={() => props.setEdit(index)}
                            shape="round"
                            icon={<EditOutlined />}>
                        </Button>

                        <Button
                            size="small"
                            danger
                            style={{ marginLeft: 5 }}
                            onClick={() => props.onDeleteNotEdit(index)}
                            shape="round"
                            icon={<DeleteOutlined />}>
                        </Button>
                    </div>
                </div>
                <div className="degreeCreator displayInline">
                    <p className="degreeCreator_exam_value">{values.semester}. Semester</p>
                    <p className="degreeCreator_exam_value">{values.ects} ECTS</p>
                    <p className="degreeCreator_exam_value">Gewichtung: {values.weight}</p>
                </div>

            </div>
        )
    }

    // render Exam without Buttons to Edit or Delete
    const renderExamModeNoEditButtons = (values: ExamCreationType) => {
        return(
            <div key={keyGenerator()} className="degreeCreator_exam_noEdit">
            <div className="degreeCreator displayInline">
                <p className="degreeCreator_exam_name bold">{values.name}</p>
            </div>
            <div className="degreeCreator displayInline">
                <p className="degreeCreator_exam_value">{values.semester}. Semester</p>
                <p className="degreeCreator_exam_value">{values.ects} ECTS</p>
                <p className="degreeCreator_exam_value">Gewichtung: {values.weight}</p>
            </div>

        </div>
        )
    }

    // parse all created Exams and display them with an create and delete option
    const renderExams = () => {
        return (props.data.map((value: ExamCreationType, index: number) => {
            if (!props.showEditButtons){
                return renderExamModeNoEditButtons(value)
            }
            if (value.editMode) {
                return renderExamEditMode(index, value)
            }
            else return renderExamNotEditMode(index, value)
        }))
    }

    // if length is null return info text
    if (props.data.length === 0) return (
        <div className="examPackages_noExams">
            bisher keine Prüfungen hinzugefügt
        </div>
    )
    return(
        <div>
            {renderExams()}
        </div>
    )
}

export default RenderExams