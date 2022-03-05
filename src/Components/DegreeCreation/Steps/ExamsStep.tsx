import React, { ReactFragment, ReactText, useContext, useState } from "react"
import { ExamCreationType } from "../types"
import { Row, Col, Button, Form } from "antd"
import { ExamComponent } from "../FormComponents"
import { RenderExam } from "../RenderComponents";
import { CreatorContext } from "../CreatorContext";

const keyGenerator = (): ReactText =>
    "_" + Math.random().toString(36).substr(2, 9);


const ExamsStep = () => {
    const {exams, addExam, deleteExam, updateExam, setEditExam} = useContext(CreatorContext)

    const addExamButton = (): ReactFragment => {
        const textAddMore = <p>Weitere Prüfung hinzufügen</p>
        const textAddFirst = <p>Füge im ersten Schritt alle einzelnen Prüfungen des Studiengangs hinzu. <br></br> Klicke hier, um deine erste Prüfung hinzuzufügen.</p>
        const text: ReactFragment = exams.length > 0 ? textAddMore : textAddFirst
        return (
            <Col xxl={6} xl={12} lg={12} md={24} sm={24} xs={24}>
                    <Button
                        style={{whiteSpace: "normal", height: "100%"}}
                        htmlType="submit"
                        className="minHeight300 addExamButton"
                        onClick={() => addExam()}
                    >
                    <div className="buttonTextAddExam">{text}</div>

                    </Button>
            </Col>
        )
    }

    const renderCreatedExams = (): ReactFragment => {
        return exams.map((singleExam: ExamCreationType) => {
            if (singleExam.editMode) {
                return (
                    <Col xxl={6} xl={12} lg={12} md={24} sm={24} xs={24} key={keyGenerator()}>
                        <ExamComponent
                            onDelete={(key: string) => deleteExam(key)}
                            onSave={(exam: ExamCreationType) => updateExam(exam)}
                            defaultValues={singleExam}
                        />
                    </Col>
                )
            }
            else {
                return (
                    <Col xxl={6} xl={12} lg={12} md={24} sm={24} xs={24} key={keyGenerator()}>
                        <RenderExam
                            data={singleExam}
                            onDelete={(key: string) => deleteExam(key)}
                            setEdit={(key: string) => setEditExam(key)}
                        />
                    </Col>
                )
            }
        })
    }

    return (
        <div className="examsStep singleStepDegreeCreator">
            <Row gutter={[10, 10]}>
                {renderCreatedExams()}
                {addExamButton()}
            </Row>
        </div>
    )

}

export default ExamsStep