import React, { ReactFragment, ReactText, useState } from "react"
import { Footer, Header } from "../Components"
import { Button, Form, Tooltip, Steps } from "antd";
import { BasicInformations } from "../Components/DegreeCreation/FormComponents"
import { CreatedData, ElevativeCreationType, EmphasisCreationType, ExamPackageCreationType, GeneralInformationsCreationType, ExamCreationType } from "../Components/DegreeCreation/types";
import { ToolTipSaveDegreeCreator, ToolTipUploadDegreeCreator, ToolTipFirstStep, ToolTipSecondStep } from "../Components/const";
import CheckInput from "../Components/DegreeCreation/CheckInput";
import { FileUploadModal } from "../Components/DegreeCreation/FileUploadModal";
import { ExamsStep, ExamPackagesStep, ElevativeStep } from "../Components/DegreeCreation/Steps"
import { DropResult } from "react-beautiful-dnd";

interface iNextStepButton {
    enabled: boolean,
    tooltip?: string
}

const { Step } = Steps

const keyGenerator = (): ReactText =>
    "_" + Math.random().toString(36).substr(2, 9);

const keyGeneratorString = (): string =>
    "_" + Math.random().toString(36).substr(2, 9);

const defaultExams: ExamCreationType[] = [
    {
        name: "Test",
        examid: 302010,
        key: "123",
        editMode: false,
        index: 0
    },
    {
        name: "Einführung in die WIN",
        examid: 203040,
        key: "456",
        editMode: true,
        index: 1
    }
]

const defaultExamPackages: ExamPackageCreationType[] = [
    {
        name: "Test",
        weight: 10,
        key: keyGeneratorString(),
        editMode: true,
        required: []
    },
    {
        name: "Modulprüfung",
        weight: 10,
        key: keyGeneratorString(),
        editMode: false,
        required: ["456", "123"]
    }
]

const defaultElevatives: ElevativeCreationType[] = [
    {
        name: "Wahlfach A",
        key: keyGeneratorString(),
        editMode: true,
        options: [{
            required: 1,
            ids: ["456"],
            key: keyGeneratorString()
        }],
    },
    {
        name: "Wahlfach A",
        key: keyGeneratorString(),
        editMode: true,
        options: [],
        unit: "ects"
    }
]

const DegreeCreation = () => {
    // created Exams
    const [createdExams, setCreatedExams] = useState<ExamCreationType[]>(defaultExams)
    // created ExamPackages
    const [createdExamPackages, setCreatedExamPackages] = useState<ExamPackageCreationType[]>(defaultExamPackages)
    // created Elevatives
    const [createdElevatives, setCreatedElevatives] = useState<ElevativeCreationType[]>(defaultElevatives)
    // basic Informations
    const [basicInformations, setBasicInformations] = useState<GeneralInformationsCreationType>({ editMode: true })
    // if Page is shown to visualize all input
    const [showSubmitPage, setShowSubmit] = useState<boolean>(false)
    // if Upload Modal is shown
    const [showUploadModal, setShowUploadModal] = useState<boolean>(false)
    // selected Step
    const [currentStep, setCurrentStep] = useState(2)

    const setCreatedData = (data: CreatedData) => {
        setCreatedExamPackages(data.examPackages)
        setCreatedExams(data.exams)
    }

    const nextStep = () => {
        setCurrentStep(currentStep + 1)
    }

    const prevStep = () => {
        setCurrentStep(currentStep - 1)
    }

    // all Functions for Elevatives 

    const addElevative = () => {
        setCreatedElevatives([...createdElevatives, {editMode: true, key: keyGeneratorString(), options: []}])
    }

    const updateElevative = (newElevative: ElevativeCreationType) => {
        setCreatedElevatives(createdElevatives.map(single => single.key == newElevative.key ? newElevative : single))
    }

    const deleteElevative = (key: string) => {
        setCreatedElevatives(createdElevatives.filter(exam => exam.key != key))
    }

    const setEditElevative = (key: string) => {
        const newElevatives: ElevativeCreationType[] = createdElevatives.map(single => {
            if (single.key === key) {
                single.editMode = true
            }
            return single
        })
        setCreatedElevatives(newElevatives)
    }

    // all Functions for ExamPackages

    const addExamPackage = () => {
        setCreatedExamPackages([...createdExamPackages, { editMode: true, key: keyGeneratorString(), required: [] }])
    }

    const updateExamPackage = (newExamPackage: ExamPackageCreationType) => {
        setCreatedExamPackages(createdExamPackages.map(single => single.key == newExamPackage.key ? newExamPackage : single))
    }

    const deleteExamPackage = (key: string) => {
        setCreatedExamPackages(createdExamPackages.filter(exam => exam.key != key))
    }

    const setEditExamPackage = (key: string) => {
        const newExamPackages: ExamPackageCreationType[] = createdExamPackages.map(single => {
            if (single.key === key) {
                single.editMode = true
            }
            return single
        })
        setCreatedExamPackages(newExamPackages)
    }

    const updateRequiredExamPackage = (key: string, required: string[]) => {
        const newExamPackages: ExamPackageCreationType[] = createdExamPackages.map(single => {
            if (single.key === key) {
                single.required = required
            }
            return single
        })
        setCreatedExamPackages(newExamPackages)
    }

    const removeExamFromRequired = (key: string) => {
        const newExamPackages: ExamPackageCreationType[] = createdExamPackages.map(single => {
            single.required = single.required.filter(x => x != key)
            return single
        })
        setCreatedExamPackages(newExamPackages)
    }

    const onDragEndExamPackages = (result: DropResult) => {
        // ignore the drag it there is no destination
        if (result.destination) {
            const droppedExam: ExamCreationType = createdExams.filter(x => x.key === result.draggableId).shift()
            // update the index of the moved element
            updateIndexExam(droppedExam.key, result.destination.index)
            if (result.destination.droppableId != result.source.droppableId) {
                if (result.source.droppableId != "exams") {
                    const oldExamPackage: ExamPackageCreationType = createdExamPackages.filter(x => x.key === result.source.droppableId).shift()
                    // remove the required from the old destination
                    const newRequiredFromSource = oldExamPackage.required.filter(x => x != droppedExam.key)
                    updateRequiredExamPackage(oldExamPackage.key, newRequiredFromSource)
                }

                // update the required from the restination - if it is exams we dont need to do anything
                if (result.destination.droppableId != "exams") {
                    const newExamPackage: ExamPackageCreationType = createdExamPackages.filter(x => x.key === result.destination.droppableId).shift()
                    const newRequiredFromDestination: string[] = ([...newExamPackage.required, droppedExam.key])
                    updateRequiredExamPackage(newExamPackage.key, newRequiredFromDestination)
                }
            }
        }
    }

    // all Functions for Exams

    const addExam = () => {
        setCreatedExams([...createdExams, { editMode: true, key: keyGeneratorString(), index: createdExams.length }])
    }

    const deleteExam = (key: string) => {
        // remove Exam from all ExamPackages
        removeExamFromRequired(key)
        setCreatedExams(createdExams.filter(exam => exam.key != key))
    }

    const updateIndexExam = (key: string, index: number) => {
        const newExams: ExamCreationType[] = createdExams.map(single => {
            if (single.key === key) {
                single.index = index
            }
            return single
        })
        setCreatedExams(newExams)
    }

    const updateExam = (newExam: ExamCreationType) => {
        setCreatedExams(createdExams.map(single => single.key == newExam.key ? newExam : single))
    }

    const setExamWeight = (weight: number, key: string) => {
        const newExams: ExamCreationType[] = createdExams.map(single => {
            if (single.key === key) {
                single.weight = weight
                single.editMode = false
            }
            return single
        })
        setCreatedExams(newExams)
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
                                JSON.stringify({
                                    exams: createdExams,
                                    basics: basicInformations,
                                    examPackages: createdExamPackages,
                                })
                            )}`}
                            download="data_gradulator.json"
                        >
                            Zwischenspeichern
                        </Button>
                    </Tooltip>
                    {nextStepButton()}
                </div>
            </div>
        )
    }

    const nextStepButton = () => {
        if (currentStep == steps.length - 1) {
            return (
                <Button
                    style={{ marginLeft: 7.5, width: 220 }}
                    htmlType="submit"
                    type="primary"
                    disabled={true}
                    onClick={() => nextStep()}
                >
                    Nächster Schritt
                </Button>
            )
        }
        const buttonInformation: iNextStepButton = checkIfNextStepButtonDisabled()
        if (buttonInformation.enabled) {
            return (
                <Button
                    style={{ marginLeft: 7.5, width: 220 }}
                    htmlType="submit"
                    type="primary"
                    onClick={() => nextStep()}
                >
                    Nächster Schritt
                </Button>
            )
        } else {
            return (
                <Tooltip title={buttonInformation.tooltip}>
                    <Button
                        style={{ marginLeft: 7.5, width: 220 }}
                        htmlType="submit"
                        type="primary"
                        disabled={true}
                        onClick={() => nextStep()}
                    >
                        Nächster Schritt
                    </Button>
                </Tooltip>
            )
        }
    }

    const checkIfNextStepButtonDisabled = () => {
        if (currentStep == 0) {
            const editModeExams: number = createdExams.filter(x => x.editMode).length
            if (editModeExams > 0) {
                return ({
                    enabled: false,
                    tooltip: ToolTipFirstStep
                })
            }
        }
        if (currentStep == 1) {
            const editModeExamPackages: number = createdExamPackages.filter(x => x.editMode).length
            if (editModeExamPackages > 0) {
                return ({
                    enabled: false,
                    tooltip: ToolTipSecondStep
                })
            }
        }
        return ({
            enabled: true
        })
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
            content: <ExamPackagesStep
                onDeleteExamPackage={(key: string) => deleteExamPackage(key)}
                addExamPackage={() => addExamPackage()}
                setEditExamPackage={(key: string) => setEditExamPackage(key)}
                saveExamPackage={(examPackage: ExamPackageCreationType) => updateExamPackage(examPackage)}
                setExamWeight={(weight: number, key: string) => setExamWeight(weight, key)}
                setExamEdit={(key: string) => setEditExam(key)}
                defaultValues={createdExamPackages}
                exams={createdExams}
                onDragEnd={(result: DropResult) => onDragEndExamPackages(result)}
            />
        },
        {
            title: "Wahlfächer",
            content: <ElevativeStep
                defaultValues={createdElevatives}
                exams={createdExams}
                setExamWeight={(weight: number, key: string) => setExamWeight(weight, key)}
                setExamEdit={(key: string) => setEditExam(key)}
                addElevative={() => addElevative()}
                onSaveElevative={(elevative: ElevativeCreationType) => updateElevative(elevative)}
                onDeleteElevative={(key: string) => deleteElevative(key)}
                setEditElevative={(key: string) => setEditElevative(key)}
                setEditExam={(key: string) => setEditExam(key)}
                onSaveExam={(weight: number, key: string) => setExamWeight(weight, key)}
            />
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
