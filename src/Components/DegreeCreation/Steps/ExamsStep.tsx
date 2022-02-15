import React, { ReactFragment, ReactText, useState } from "react"
import { ExamCreationType } from "../types"
import { Row, Col, Button, Form } from "antd"
import { ExamComponent } from "../FormComponents"
import { RenderExam } from "../RenderComponents";

interface iProps {
    onUpdate: Function,
    onDelete: Function,
    addExam: Function,
    setEdit: Function,
    defaultValues?: ExamCreationType[]
}

const keyGenerator = (): ReactText =>
    "_" + Math.random().toString(36).substr(2, 9);


const ExamsStep = (props: iProps) => {


    const addExamButton = (): ReactFragment => {
        const textAddMore = "Weitere Prüfung hinzufügen"
        const textAddFirst = "Füge im ersten Schritt alle einzelnen Prüfungen des Studiengangs hinzu. Klicke hier, um deine erste Prüfung hinzuzufügen."
        const text: string = props.defaultValues.length > 0 ? textAddMore : textAddFirst
        return (
            <Col span={6}>
                    <Button
                        style={{whiteSpace: "normal"}}
                        htmlType="submit"
                        className="minHeight250 addExamButton"
                        onClick={() => props.addExam()}
                    >
                    <p className="buttonTextAddExam">{text}</p>

                    </Button>
            </Col>
        )
    }

    const renderCreatedExams = (): ReactFragment => {
        return props.defaultValues.map((singleExam: ExamCreationType) => {
            if (singleExam.editMode) {
                return (
                    <Col span={6} key={keyGenerator()}>
                        <ExamComponent
                            onDelete={(key: string) => props.onDelete(key)}
                            onSave={(exam: ExamCreationType) => props.onUpdate(exam)}
                            defaultValues={singleExam}
                        />
                    </Col>
                )
            }
            else {
                return (
                    <Col span={6} key={keyGenerator()}>
                        <RenderExam
                            data={singleExam}
                            onDelete={(key: string) => props.onDelete(key)}
                            setEdit={(key: string) => props.setEdit(key)}
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