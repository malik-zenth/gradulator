import React, { ReactFragment, ReactText, useState } from "react"
import { Footer, Header } from "../Components"
import { Button, Tooltip, Steps, message } from "antd";
import { CreatedData, ElevativeCreationType, EmphasisCreationType, ExamPackageCreationType, GeneralInformationsCreationType, ExamCreationType, ElevativeOptionType, SemesterChoiseType } from "../Components/DegreeCreation/types";
import { ToolTipSaveDegreeCreator, ToolTipUploadDegreeCreator, ToolTipFirstStep, ToolTipSecondStep, ToolTipThirdStep, ToolTipFourthStep, ToolTipFifthStep } from "../Components/const";
import { FileUploadModal } from "../Components/DegreeCreation/Modals/FileUploadModal";
import { Explaination } from "../Components/DegreeCreation/Modals/ExplainationModals";
import { ExamsStep, ExamPackagesStep, ElevativeStep, BasicsStep, OverviewStep, EmphasisStep, IntroductionStep } from "../Components/DegreeCreation/Steps"
import { DropResult } from "react-beautiful-dnd";
import { CreatorContext } from "../Components/DegreeCreation/CreatorContext";
import ErrorBoundary from "../Components/DegreeCreation/ErrorBoundary";
import FileSaver, { saveAs } from 'file-saver';
import SemesterChoisesStep from "../Components/DegreeCreation/Steps/SemesterChoisesStep";

interface iNextStepButton {
    enabled: boolean,
    tooltip?: string
}

const { Step } = Steps

const keyGenerator = (): ReactText =>
    "_" + Math.random().toString(36).substr(2, 9);

const keyGeneratorString = (): string =>
    "_" + Math.random().toString(36).substr(2, 9);

const DegreeCreation = () => {
    // created Exams
    const [createdExams, setCreatedExams] = useState<ExamCreationType[]>([])
    // created ExamPackages
    const [createdExamPackages, setCreatedExamPackages] = useState<ExamPackageCreationType[]>([])
    // created Elevatives
    const [createdElevatives, setCreatedElevatives] = useState<ElevativeCreationType[]>([])
    // created Emphasis
    const [createdEmphasis, setCreatedEmphasis] = useState<EmphasisCreationType[]>([])
    // basic Informations
    const [basicInformations, setBasicInformations] = useState<GeneralInformationsCreationType>({ editMode: true })
    // semester Choise Data
    const [semesterChoises, setSemesterChoises] = useState<SemesterChoiseType[]>([{editMode: false, name: "Wahlpflichtfach 1", key: "1"}, {editMode: false, name: "Wahlpflichtfach 2", key: "2"}])
    
    // if Upload Modal is shown
    const [showUploadModal, setShowUploadModal] = useState<boolean>(false)
    // selected Step
    const [currentStep, setCurrentStep] = useState(2)
    // show explaination
    const [showExplaination, setShowExplaination] = useState<boolean>(false)

    const setCreatedData = (data: CreatedData) => {
        setCurrentStep(1)
        data.examPackages && setCreatedExamPackages(data.examPackages)
        data.exams && setCreatedExams(data.exams)
        data.elevatives && setCreatedElevatives(data.elevatives)
        data.emphasis && setCreatedEmphasis(data.emphasis)
        data.basicInformation && setBasicInformations(data.basicInformation)
        data.semesterChoises && setSemesterChoises(data.semesterChoises)
    }

    const nextStep = () => {
        setCurrentStep(currentStep + 1)
    }

    const prevStep = () => {
        setCurrentStep(currentStep - 1)
    }

    // all Functions for Basics
    const setEditBasics = () => {
        const newBasics: GeneralInformationsCreationType = { ...basicInformations, editMode: true }
        setBasicInformations(newBasics)
    }

    // all Functions for Emphasis

    const addEmphasis = () => {
        setCreatedEmphasis([...createdEmphasis, { editMode: true, key: keyGeneratorString(), required: [], multiGrades: true }])
    }

    const updateEmphasis = (updatedEmphasis: EmphasisCreationType) => {
        setCreatedEmphasis(createdEmphasis.map(single => single.key === updatedEmphasis.key ? updatedEmphasis : single))
    }

    const setEditEmphasis = (key: string) => {
        const newEmphasis: EmphasisCreationType[] = createdEmphasis.map(single => {
            if (single.key === key) {
                single.editMode = true
            }
            return single
        })
        setCreatedEmphasis(newEmphasis)
    }

    const deleteEmphasis = (key: string) => {
        setCreatedEmphasis(createdEmphasis.filter(emphasis => emphasis.key != key))
    }

    const updateRequiredEmphasis = (key: string, required: string[]) => {
        const newEmphasis: EmphasisCreationType[] = createdEmphasis.map(single => {
            if (single.key === key) {
                single.required = required
            }
            return single
        })
        setCreatedEmphasis(newEmphasis)
    }

    // all Functions for Elevatives 

    const addElevative = () => {
        setCreatedElevatives([...createdElevatives, { editMode: true, key: keyGeneratorString(), options: [], unit: "ECTS" }])
    }

    const updateElevative = (newElevative: ElevativeCreationType) => {
        setCreatedElevatives(createdElevatives.map(single => single.key == newElevative.key ? newElevative : single))
    }

    const updateOptionElevative = (key: string, options: ElevativeOptionType[]) => {
        const newElevatives: ElevativeCreationType[] = createdElevatives.map(single => {
            if (single.key === key) {
                single.options = options
            }
            return single
        })
        setCreatedElevatives(newElevatives)
    }

    const deleteElevative = (key: string) => {
        setCreatedElevatives(createdElevatives.filter(exam => exam.key != key))
    }

    const addElevativeOption = (key: string) => {
        const newElevatives: ElevativeCreationType[] = createdElevatives.map(single => {
            if (single.key === key) {
                const newOptions: ElevativeOptionType[] = [...single.options, { key: keyGeneratorString(), editMode: true, ids: [], required: 1 }]
                single.options = newOptions
            }
            return single
        })
        setCreatedElevatives(newElevatives)
    }

    const deleteElevativeOption = (elevativeKey: string, optionKey: string) => {
        const newElevatives: ElevativeCreationType[] = createdElevatives.map(single => {
            if (single.key === elevativeKey) {
                const newOptions: ElevativeOptionType[] = single.options.filter(x => x.key != optionKey)
                single.options = newOptions
            }
            return single
        })
        setCreatedElevatives(newElevatives)
    }

    const setEditElevativeOption = (elevativeKey: string, optionKey: string) => {
        const newElevatives: ElevativeCreationType[] = createdElevatives.map(single => {
            if (single.key === elevativeKey) {
                const newOptions: ElevativeOptionType[] = single.options.map(option => {
                    if (option.key === optionKey) {
                        option.editMode = true
                    }
                    return option
                })
            }
            return single
        })
        setCreatedElevatives(newElevatives)
    }

    const saveAmountElevative = (amount: number, elevativeKey: string, optionKey: string) => {
        const newElevatives: ElevativeCreationType[] = createdElevatives.map(single => {
            if (single.key === elevativeKey) {
                const newOptions: ElevativeOptionType[] = single.options.map(option => {
                    if (option.key === optionKey) {
                        option.required = amount
                        option.editMode = false
                    }
                    return option
                })
            }
            return single
        })
        setCreatedElevatives(newElevatives)
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
        setCreatedExamPackages([...createdExamPackages, { editMode: true, key: keyGeneratorString(), required: []}])
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

    const onDragEndElevatives = (result: DropResult) => {
        if (result.destination) {
            if (result.destination.droppableId != result.source.droppableId) {
                let draggableID = result.draggableId
                if (draggableID.includes("-")) {
                    draggableID = draggableID.substring(0, draggableID.indexOf("-"))
                }
                if (result.source.droppableId != "exams") {
                    // remove from old elevative option
                    const elevativeWithThisOption: ElevativeCreationType = createdElevatives.filter(
                        elev => elev.options.filter(opt => opt.key === result.source.droppableId).length != 0).shift()
                    const newOptions = elevativeWithThisOption.options.map(x => {
                        if (x.key === result.source.droppableId) {
                            x.ids = x.ids.filter(x => x != draggableID)
                        }
                        return x
                    })
                    updateOptionElevative(elevativeWithThisOption.key, newOptions)
                }
                if (result.destination.droppableId != "exams") {
                    // add to new option
                    const elevativeWithThisOption: ElevativeCreationType = createdElevatives.filter(
                        elev => elev.options.filter(opt => opt.key === result.destination.droppableId).length != 0).shift()
                    const newOptions = elevativeWithThisOption.options.map(x => {
                        if (x.key === result.destination.droppableId) {
                            x.ids.push(draggableID)
                        }
                        return x
                    })
                    updateOptionElevative(elevativeWithThisOption.key, newOptions)
                }
            }
        }
    }

    const onDragEndEmphasis = (result: DropResult) => {
        if (result.destination) {
            if (result.destination.droppableId != result.source.droppableId) {
                if (result.source.droppableId != "examPackages") {
                    const emphasisWithThisOption: EmphasisCreationType = createdEmphasis.filter(
                        elev => elev.required.includes(result.draggableId)).shift()
                    const newRequired = emphasisWithThisOption.required.filter(x => x != result.draggableId)
                    updateRequiredEmphasis(emphasisWithThisOption.key, newRequired)
                }
                if (result.destination.droppableId != "examPackages") {
                    const newEmphasis: EmphasisCreationType = createdEmphasis.filter(x => x.key === result.destination.droppableId).shift()
                    const newRequired: string[] = ([...newEmphasis.required, result.draggableId])
                    updateRequiredEmphasis(newEmphasis.key, newRequired)
                }
            }
        }
    }

    // all Functions for Exams

    const addExam = () => {
        setCreatedExams([...createdExams, { editMode: true, key: keyGeneratorString(), index: createdExams.length }])
    }

    const resetEditExam = (key: string) => {
        const newExams = createdExams.map(single => {
            if (single.key === key) {
                single.editMode = false
            }
            return single
        })
        setCreatedExams(newExams)
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

    // semester Choise Functions
    const addSemesterChoise = () => {
        setSemesterChoises([...semesterChoises, {key: keyGeneratorString(), editMode: true}])
    }

    const updateSemesterChoise = (newData: SemesterChoiseType) => {
        const newChoises: SemesterChoiseType[] = semesterChoises.map(single => {
            if (single.key === newData.key) {
                return newData
            }
            return single
        })
        setSemesterChoises(newChoises)
    }

    const setEditSemesterChoise = (key: string) => {
        const newChoises: SemesterChoiseType[] = semesterChoises.map(single => {
            if (single.key === key) {
                single.editMode = true
                return single
            }
            return single
        })
        setSemesterChoises(newChoises)
    }

    const resetEditSemesterChoise = (key: string) => {
        const newChoises: SemesterChoiseType[] = semesterChoises.map(single => {
            if (single.key === key) {
                single.editMode = false
                return single
            }
            return single
        })
        setSemesterChoises(newChoises)
    }

    const deleteSemesterChoise = (key: string) => {
        setSemesterChoises(semesterChoises.filter(x => x.key != key))
        // also remove choise from all exams
        const newExams: ExamCreationType[] = createdExams.map(x => {
            if(x.semesterChoiseKey === key){
                delete x.semesterChoiseKey
            }
            return x
        })
        setCreatedExams(newExams)
    }

    const downloadDataOnError = () => {
        const jsondata: string = JSON.stringify({
            exams: createdExams,
            basics: basicInformations,
            emphasis: createdEmphasis,
            elevatives: createdElevatives,
            examPackages: createdExamPackages,
            semesterChoises: semesterChoises
        })
        const newblob = new Blob([jsondata], {type: "text/json;charset=utf-8,"})
        FileSaver.saveAs(newblob, "data_gradulator.json")

    }

    const headerButtons = (): ReactFragment => {
        return (
            <div>
                <div className="create_degree_buttons position_center">
                    <Button
                        style={{ marginLeft: 7.5, maxWidth: 220 }}
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
                        disabled={!(currentStep != 0)}
                        onClick={() => setShowExplaination(true)}
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
                                    emphasis: createdEmphasis,
                                    elevatives: createdElevatives,
                                    examPackages: createdExamPackages,
                                    semesterChoises: semesterChoises
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
                    style={{ marginLeft: 7.5, maxWidth: 220 }}
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
                    style={{ marginLeft: 7.5, maxWidth: 220 }}
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
                        style={{ marginLeft: 7.5, maxWidth: 220 }}
                        htmlType="submit"
                        type="primary"
                        disabled={true}
                    >
                        Nächster Schritt
                    </Button>
                </Tooltip>
            )
        }
    }

    const checkIfNextStepButtonDisabled = () => {
        // exams
        if (currentStep == 2) {
            const editModeExams: number = createdExams.filter(x => x.editMode).length
            if (editModeExams > 0) {
                return ({
                    enabled: false,
                    tooltip: ToolTipFirstStep
                })
            }
        }
        // exam packages
        if (currentStep == 3) {
            const editModeExamPackages: number = createdExamPackages.filter(x => x.editMode).length
            if (editModeExamPackages > 0) {
                return ({
                    enabled: false,
                    tooltip: ToolTipSecondStep
                })
            }
        }
        // elevatives
        if (currentStep == 4) {
            const editModeElevatives: number = createdElevatives.filter(x => x.editMode).length
            if (editModeElevatives > 0) {
                return ({
                    enabled: false,
                    tooltip: ToolTipThirdStep
                })
            }
        }
        // emphasis
        if (currentStep == 5) {
            const editModeEmphasis: number = createdEmphasis.filter(x => x.editMode).length
            if (editModeEmphasis > 0) {
                return ({
                    enabled: false,
                    tooltip: ToolTipFourthStep
                })
            }
        }
        // basic informations
        if (currentStep == 6) {
            const editModeBasics: boolean = !(basicInformations.name && basicInformations.shortName && basicInformations.spo)
            if (editModeBasics) {
                return ({
                    enabled: false,
                    tooltip: ToolTipFifthStep
                })
            }
        }
        return ({
            enabled: true
        })
    }

    const steps = [
        {
            title: "Erklärung",
            content: <IntroductionStep />
        },
        {
            title: "Zuordnung",
            content: <SemesterChoisesStep/>
        },
        {
            title: "Prüfungen",
            content: <ExamsStep />
        },
        {
            title: "Modulprüfungen",
            content: <ExamPackagesStep />
        },
        {
            title: "Wahlfächer",
            content: <ElevativeStep />
        },
        {
            title: "Schwerpunkte",
            content: <EmphasisStep />
        },
        {
            title: "Basics",
            content: <BasicsStep />
        },
        {
            title: "Übersicht",
            content: <OverviewStep />
        },
    ]

    if (window.innerWidth <= 1024) {
        return (
            <div>
                <Header home={false} />
                <div className="content degreeCreator">
                    <h2 className="imprint-heading">Studiengang hinzufügen</h2>

                    <p className="center">
                        Die Funktionalität "Studiengang hinzufügen" ist nur auf Bildschirmen mit einer Breite größer
                        als 1024px verfügbar. Bitte verwende deinen PC oder einen entsprechenden Bildschirm, um diese Funktionalität nutzen :)
                    </p>
                </div>
                <Footer />
            </div>
        )
    }

    return (
        <ErrorBoundary
            saveData={() => downloadDataOnError()}
        >
        <CreatorContext.Provider value={{
            addEmphasis,
            onDragEndEmphasis,
            updateEmphasis,
            updateRequiredEmphasis,
            deleteEmphasis,
            setEditEmphasis,
            updateElevative,
            addElevative,
            addElevativeOption,
            saveAmountElevative,
            deleteElevative,
            deleteElevativeOption,
            setEditElevativeOption,
            setEditElevative,
            addExamPackage,
            updateExamPackage,
            deleteExamPackage,
            setEditExamPackage,
            resetEditExam,
            updateRequiredExamPackage,
            removeExamFromRequired,
            onDragEndExamPackages,
            onDragEndElevatives,
            addExam,
            deleteExam,
            updateIndexExam,
            updateExam,
            setExamWeight,
            setEditExam,
            setBasicInformations,
            setEditBasics,
            setEditSemesterChoise,
            addSemesterChoise,
            deleteSemesterChoise,
            resetEditSemesterChoise,
            updateSemesterChoise,
            semesterChoises,
            basicInformations: basicInformations,
            exams: createdExams,
            examPackages: createdExamPackages,
            elevatives: createdElevatives,
            emphasis: createdEmphasis
        }}>
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
                <Explaination
                    currentStep={currentStep}
                    visible={showExplaination}
                    setShowExplaination={(newValue: boolean) => setShowExplaination(newValue)}
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
        </CreatorContext.Provider>
        </ErrorBoundary>
    )
}

export default DegreeCreation
