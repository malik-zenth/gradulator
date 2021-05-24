import React, { ReactFragment, ReactText, useState } from "react"
import { Footer, Header } from "../Components"
import { Button, Divider, Row, Form, Tooltip } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { BasicInformations } from "../Components/DegreeCreation/FormComponents"
import { CreatedPackages, ElevativeCreationType, EmphasisCreationType, ExamPackageCreationType, GeneralInformationsCreationType, SavingType } from "../Components/DegreeCreation/types";
import { RenderExamPackage, RenderElevative, RenderEmphasis } from "../Components/DegreeCreation/RenderComponents";
import { ToolTipSaveDegreeCreator, ToolTipUploadDegreeCreator } from "../Components/const";
import CheckInput from "../Components/DegreeCreation/CheckInput";
import { FileUploadModal } from "../Components/DegreeCreation/FileUploadModal";

const keyGenerator = (): ReactText =>
    "_" + Math.random().toString(36).substr(2, 9);

const DegreeCreation = () => {
    const [form] = Form.useForm()
    const [createdData, setCreatedData] = useState<CreatedPackages[]>([])
    const [basicInformations, setBasicInformations] = useState<GeneralInformationsCreationType>({ editMode: true })
    // if Page is shown to visualize all input
    const [showSubmitPage, setShowSubmit] = useState<boolean>(false)
    // if Upload Modal is shown
    const [showUploadModal, setShowUploadModal] = useState<boolean>(false)

    // all add functions
    const createExamPackage = () => {
        setCreatedData([...createdData, { examPackage: { editMode: true, exams: [] } }])
    }

    const createElevative = () => {
        setCreatedData([...createdData, { elevative: { editMode: true, exams: [] } }])
    }

    const createEmphasis = () => {
        setCreatedData([...createdData, { emphasis: { editMode: true, options: [] } }])
    }

    // delete Element by ID
    const deleteElement = (itemToRemove: number) => {
        setCreatedData(createdData.filter((_, index) => index != itemToRemove))
    }

    // all update functions
    const updateExamPackage = (examPackage: ExamPackageCreationType, indexToUpdate: number) => {
        setCreatedData(createdData.map((value, index) => {
            if (index === indexToUpdate) return { examPackage: examPackage }
            return value
        }))
    }

    const updateElevative = (elevative: ElevativeCreationType, indexToUpdate: number) => {
        setCreatedData(createdData.map((value, index) => {
            if (index === indexToUpdate) return { elevative: elevative }
            return value
        }))
    }

    const updateEmphasis = (emphasis: EmphasisCreationType, indexToUpdate: number) => {
        setCreatedData(createdData.map((value, index) => {
            if (index === indexToUpdate) return { emphasis: emphasis }
            return value
        }))
    }


    // all set Edit Mode functions
    const setEditExamPackage = (editValue: boolean, indexToUpdate: number) => {
        const newCreatedData: CreatedPackages[] = createdData.map((value, index) => {
            if (indexToUpdate === index) {
                value.examPackage.editMode = editValue
                return value
            }
            return value
        })
        setCreatedData(newCreatedData)
    }

    const setEditElevative = (editValue: boolean, indexToUpdate: number) => {
        const newCreatedData: CreatedPackages[] = createdData.map((value, index) => {
            if (indexToUpdate === index) {
                value.elevative.editMode = editValue
                return value
            }
            return value
        })
        setCreatedData(newCreatedData)
    }

    const setEditEmphasis = (editValue: boolean, indexToUpdate: number) => {
        const newCreatedData: CreatedPackages[] = createdData.map((value, index) => {
            if (indexToUpdate === index) {
                value.emphasis.editMode = editValue
                return value
            }
            return value
        })
        setCreatedData(newCreatedData)
    }

    // go through all data and render each component
    const renderCreatedData = (createdData: CreatedPackages[]): ReactFragment => {
        // if no Data is created, render explaination
        if (createdData.length === 0) {
            return (
                <div>
                    ERKLÄRUNG DER FUNKTIONALITÄT
                </div>
            )
        }
        // else iterate over our createed Data and render it depending on its type
        return createdData.map((single, index) => {
            if (single.elevative) {
                return (
                    <RenderElevative
                        key={keyGenerator()}
                        data={single.elevative}
                        index={index}
                        showEditButtons={true}
                        onDelete={(index: number) => deleteElement(index)}
                        onSaveEdit={(values: ElevativeCreationType, index: number) => updateElevative(values, index)}
                        setEdit={(index: number) => setEditElevative(true, index)}
                    />
                )
            }
            if (single.emphasis) {
                return (
                    <RenderEmphasis
                        key={keyGenerator()}
                        data={single.emphasis}
                        index={index}
                        onDeleteEdit={(index: number) => deleteElement(index)}
                        onSaveEdit={(values: EmphasisCreationType, index: number) => updateEmphasis(values, index)}
                        setEdit={(index: number) => setEditEmphasis(true, index)}
                        onDeleteNotEdit={(index: number) => deleteElement(index)}
                        form={form}
                    />
                )
            }
            if (single.examPackage) {
                return (
                    <RenderExamPackage
                        key={keyGenerator()}
                        data={single.examPackage}
                        index={index}
                        showEditButtons={true}
                        onDeleteEdit={(index: number) => deleteElement(index)}
                        onSaveEdit={(values: ExamPackageCreationType, index: number) => updateExamPackage(values, index)}
                        setEdit={(index: number) => setEditExamPackage(true, index)}
                        onDeleteNotEdit={(index: number) => deleteElement(index)}
                    />
                )
            }
        })
    }

    // Buttons to create new Emphasis, ExamPackage and Elevative
    const createButtons = (): ReactFragment => {
        return (
            <div className="create_degree_buttons position_center">
                <Button
                    type="primary"
                    style={{ marginLeft: 7.5, width: 220 }}
                    onClick={() => createExamPackage()}
                    size="middle"
                    icon={<PlusOutlined />}>
                    Modulprüfung hinzufügen
                    </Button>

                <Button
                    type="primary"
                    size="middle"
                    style={{ marginLeft: 7.5, width: 220 }}
                    onClick={() => createEmphasis()}
                    icon={<PlusOutlined />}>
                    Schwerpunkt hinzufügen
                    </Button>

                <Button
                    type="primary"
                    onClick={() => createElevative()}
                    size="middle"
                    style={{ marginLeft: 7.5, width: 220 }}
                    icon={<PlusOutlined />}>
                    Wahlpflichtfach hinzufügen
                </Button>
            </div>
        )
    }

    const saveButtons = (): ReactFragment => {
        return (
            <div>
                <div className="create_degree_buttons position_center">
                    <Tooltip title={ToolTipUploadDegreeCreator}>
                        <Button
                            style={{ marginLeft: 7.5, width: 220 }}
                            htmlType="submit"
                            onClick={() => setShowUploadModal(true)}
                        >
                            An Datei weiterarbeiten
                    </Button>
                    </Tooltip>
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
                        type="primary"
                        disabled={createdData.length === 0}
                        htmlType="submit"
                        onClick={() => setShowSubmit(true)}
                    >
                        Absenden
                    </Button>
                </div>
            </div>
        )
    }

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
            <div className="content">
                <Header home={false} />
                <FileUploadModal
                    visible={showUploadModal}
                    onReturn={() => setShowUploadModal(false)}
                    returnData={(data: SavingType) => {
                        setShowUploadModal(false)
                        setBasicInformations(data.basics)
                        setCreatedData(data.data)
                    }}
                />
                <BasicInformations
                    defaultValues={basicInformations}
                    onSave={(values: GeneralInformationsCreationType) => setBasicInformations(values)}
                />
                {createButtons()}
                {saveButtons()}
                <Divider />
                <Form>
                    <Row className="examPackages_degreeCreator">
                        {renderCreatedData(createdData)}
                    </Row>
                </Form>
            </div>
            <Footer />
        </div>
    )
}

export default DegreeCreation
