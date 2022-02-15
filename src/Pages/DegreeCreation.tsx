import React, { ReactFragment, ReactText, useState } from "react"
import { Footer, Header } from "../Components"
import { Button, Divider, Row, Form, Tooltip, Steps, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { BasicInformations } from "../Components/DegreeCreation/FormComponents"
import { CreatedData, ElevativeCreationType, EmphasisCreationType, ExamPackageCreationType, GeneralInformationsCreationType, ExamCreationType } from "../Components/DegreeCreation/types";
import { ToolTipSaveDegreeCreator, ToolTipUploadDegreeCreator } from "../Components/const";
import CheckInput from "../Components/DegreeCreation/CheckInput";
import { FileUploadModal } from "../Components/DegreeCreation/FileUploadModal";
import { ExamsStep } from "../Components/DegreeCreation/Steps"


const { Step } = Steps

const keyGenerator = (): ReactText =>
    "_" + Math.random().toString(36).substr(2, 9);

const keyGeneratorString = (): string =>
    "_" + Math.random().toString(36).substr(2, 9);



const DegreeCreation = () => {
    const [form] = Form.useForm()
    // created Data
    const [createdData, setCreatedData] = useState<CreatedData>()
    // created Exams
    const [createdExams, setCreatedExams] = useState<ExamCreationType[]>([])
    // basic Informations
    const [basicInformations, setBasicInformations] = useState<GeneralInformationsCreationType>({ editMode: true })
    // if Page is shown to visualize all input
    const [showSubmitPage, setShowSubmit] = useState<boolean>(false)
    // if Upload Modal is shown
    const [showUploadModal, setShowUploadModal] = useState<boolean>(false)
    // selected Step
    const [currentStep, setCurrentStep] = useState(0)

    const nextStep = () => {
        setCurrentStep(currentStep + 1)
    }

    const prevStep = () => {
        setCurrentStep(currentStep - 1)
    }

    // all Functions for Examns

    const addExam = () => {
        setCreatedExams([...createdExams, { editMode: true, key: keyGeneratorString() }])
    }

    const deleteExam = (key: string) => {
        setCreatedExams(createdExams.filter(exam => exam.key != key))
    }

    const updateExam = (newExam: ExamCreationType) => {
        setCreatedExams(createdExams.map(single => single.key == newExam.key ? newExam : single))
    }

    const setEditExam = (key: string) => {
        const newExams = createdExams.map(single => {
            if (single.key === key) {
                single.editMode = true
            }
            return single
        })
        setCreatedExams(newExams)
    }

    const headerButtons = (): ReactFragment => {
        return (
            <div>
                <div className="create_degree_buttons position_center">
                    <Button
                        style={{ marginLeft: 7.5, width: 220 }}
                        htmlType="submit"
                        disabled={currentStep == 0}
                        onClick={() => prevStep()}
                    >
                        Letzter Schritt
                    </Button>
                    <Tooltip title={ToolTipUploadDegreeCreator}>
                        <Button
                            style={{ marginLeft: 7.5, width: 220 }}
                            htmlType="submit"
                            onClick={() => setShowUploadModal(true)}
                        >
                            An Datei weiterarbeiten
                        </Button>
                    </Tooltip>
                    <Button
                        style={{ marginLeft: 7.5, width: 220 }}
                        htmlType="submit"
                        onClick={() => { }}
                    >
                        Anleitung
                    </Button>
                    <Tooltip title={ToolTipSaveDegreeCreator}>
                        <Button
                            style={{ marginLeft: 7.5, width: 220 }}
                            htmlType="submit"
                            href={`data:text/json;charset=utf-8,${encodeURIComponent(
                                JSON.stringify({ data: createdData, basics: basicInformations })
                            )}`}
                            download="data_gradulator.json"
                        >
                            Zwischenspeichern
                        </Button>
                    </Tooltip>
                    <Button
                        style={{ marginLeft: 7.5, width: 220 }}
                        htmlType="submit"
                        type="primary"
                        disabled={currentStep == steps.length - 1}
                        onClick={() => nextStep()}
                    >
                        Nächster Schritt
                    </Button>
                </div>
            </div>
        )
    }

    const steps = [
        {
            title: "Prüfungen",
            content: <ExamsStep
                onUpdate={(exam: ExamCreationType) => updateExam(exam)}
                onDelete={(key: string) => deleteExam(key)}
                addExam={() => addExam()}
                setEdit={(key: string) => setEditExam(key)}
                defaultValues={createdExams}
            />
        },
        {
            title: "Modulprüfungen",
            content: <div>2</div>
        },
        {
            title: "Wahlfächer",
            content: <div>3</div>
        },
        {
            title: "Schwerpunkte",
            content: <div>4</div>
        },
        {
            title: "Allgemeine Informationen",
            content: <BasicInformations
                defaultValues={basicInformations}
                onSave={(values: GeneralInformationsCreationType) => setBasicInformations(values)}
            />
        },
    ]


    if (showSubmitPage) {
        return (
            <div>
                <div className="content">
                    <Header home={false} />
                    <CheckInput
                        basicInformations={basicInformations}
                        data={createdData}
                        onReturn={() => setShowSubmit(false)}
                    />
                </div>
                <Footer />
            </div>
        )
    }
    return (
        <div>
            <div className="content degreeCreator">
                <Header home={false} />
                <FileUploadModal
                    visible={showUploadModal}
                    onReturn={() => setShowUploadModal(false)}
                    returnData={(data: CreatedData) => {
                        setShowUploadModal(false)
                        setCreatedData(data)
                    }}
                />
                {headerButtons()}
                <Steps current={currentStep}>
                    {steps.map(single => (
                        <Step key={keyGenerator()} title={single.title} />
                    ))}
                </Steps>

                <div>
                    <div>{steps[currentStep].content}</div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default DegreeCreation
