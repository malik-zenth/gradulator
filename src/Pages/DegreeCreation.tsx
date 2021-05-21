import React, { ReactFragment, ReactText } from "react"
import { Footer, Header } from "../Components"
import { Form, InputNumber, Input, Button, Divider, Col, Row } from "antd";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { BasicInformations, ExamComponent, ExamPackageComponent } from "../Components/DegreeCreation"
import { CreatedPackages, ElevativeCreationType, EmphasisCreationType, ExamPackageCreationType, GeneralInformationsCreationType } from "../Components/DegreeCreation/types";
import { RenderExamPackage, RenderElevative, RenderEmphasis } from "../Components/DegreeCreation/RenderComponents";

interface iProps { }

interface iState {
    createdData: CreatedPackages[],
    generalInformation?: GeneralInformationsCreationType,
    editMode_BasicInformation: boolean

}

const keyGenerator = (): ReactText =>
  "_" + Math.random().toString(36).substr(2, 9);

class DegreeCreation extends React.Component<iProps, iState>{
    constructor(props: iProps) {
        super(props);
        this.state = {
            createdData: [{
                emphasis: {
                    editMode: true,
                    options: [{
                        name: "WIN",
                        weight: 5,
                        exams: [{
                            name: "Einführung",
                            weight: 10,
                            semester: 5,
                            ects: 5,
                            editMode: false
                        }],
                        editMode: false
                    }]
                }
            },{
                    examPackage: {
                        editMode: false,
                        exams: [
                            {
                                name: "Einführung",
                                weight: 10,
                                semester: 5,
                                ects: 5,
                                editMode: false
                            }
                        ]
                    }
                }
            ],
            editMode_BasicInformation: false
        }
    }

    // all add functions
    createExamPackage = () => {
        this.setState({ createdData: [...this.state.createdData, { examPackage: { editMode: true, exams: [] } }] })
    }

    createElevative = () => {
        this.setState({ createdData: [...this.state.createdData, { elevative: { editMode: true, exams: [] } }] })
    }

    createEmphasis = () => {
        this.setState({ createdData: [...this.state.createdData, { emphasis: { editMode: true, options: [] } }] })
    }

    // delete Element by ID
    deleteElement = (itemToRemove: number) => {
        const newState: CreatedPackages[] = this.state.createdData.filter((_, index) => index != itemToRemove)
        this.setState({ createdData: newState })
    }

    // all update functions
    updateExamPackage = (examPackage: ExamPackageCreationType, index: number) => {
        const newState: CreatedPackages[] = this.state.createdData
        newState[index] = { examPackage: examPackage }
        this.setState({ createdData: newState })
    }

    updateElevative = (elevative: ElevativeCreationType, index: number) => {
        const newState: CreatedPackages[] = this.state.createdData
        newState[index] = { elevative: elevative }
        this.setState({ createdData: newState })
    }

    updateEmphasis = (elevative: EmphasisCreationType, index: number) => {
        const newState: CreatedPackages[] = this.state.createdData
        newState[index] = { emphasis: elevative }
        this.setState({ createdData: newState })
    }


    // all set Edit Mode functions
    setEditExamPackage = (editValue: boolean, indexToUpdate: number) => {
        const newState: CreatedPackages[] = this.state.createdData.map((value, index) => {
            if (indexToUpdate === index) {
                value.examPackage.editMode = editValue
                return value
            }
            return value
        })
        this.setState({ createdData: newState })
    }

    setEditElevative = (editValue: boolean, indexToUpdate: number) => {
        const newState: CreatedPackages[] = this.state.createdData.map((value, index) => {
            if (indexToUpdate === index) {
                value.elevative.editMode = editValue
                return value
            }
            return value
        })
        this.setState({ createdData: newState })
    }

    setEditEmphasis = (editValue: boolean, indexToUpdate: number) => {
        const newState: CreatedPackages[] = this.state.createdData.map((value, index) => {
            if (indexToUpdate === index) {
                value.emphasis.editMode = editValue
                return value
            }
            return value
        })
        this.setState({ createdData: newState })
    }

    // go through alll data and render each component
    renderCreatedData = (createdData: CreatedPackages[]): ReactFragment => {
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
                        onDeleteEdit={(index: number) => this.deleteElement(index)}
                        onSaveEdit={(values: ElevativeCreationType, index: number) => this.updateElevative(values, index)}
                        setEdit={(index: number) => this.setEditElevative(true, index)}
                        onDeleteNotEdit={(index: number) => this.deleteElement(index)}
                    />
                )
            }
            if (single.emphasis) {
                return (
                    <RenderEmphasis
                        key={keyGenerator()}
                        data={single.emphasis}
                        index={index}
                        onDeleteEdit={(index: number) => this.deleteElement(index)}
                        onSaveEdit={(values: EmphasisCreationType, index: number) => this.updateEmphasis(values, index)}
                        setEdit={(index: number) => this.setEditEmphasis(true, index)}
                        onDeleteNotEdit={(index: number) => this.deleteElement(index)}
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
                        onDeleteEdit={(index: number) => this.deleteElement(index)}
                        onSaveEdit={(values: ExamPackageCreationType, index: number) => this.updateExamPackage(values, index)}
                        setEdit={(index: number) => this.setEditExamPackage(true, index)}
                        onDeleteNotEdit={(index: number) => this.deleteElement(index)}
                    />
                )
            }
        })
    }

    // Buttons to create new Emphasis, ExamPackage and Elevative
    createButtons = (): ReactFragment => {
        return (
            <div className="create_degree_buttons position_center">
                <Button
                    type="primary"
                    style={{ marginLeft: 7.5 }}
                    onClick={() => this.createExamPackage()}
                    size="middle"
                    icon={<PlusOutlined />}>
                    Modulprüfung hinzufügen
                    </Button>

                <Button
                    type="primary"
                    size="middle"
                    style={{ marginLeft: 7.5 }}
                    onClick={() => this.createEmphasis()}
                    icon={<PlusOutlined />}>
                    Schwerpunkt hinzufügen
                    </Button>

                <Button
                    type="primary"
                    onClick={() => this.createElevative()}
                    size="middle"
                    style={{ marginLeft: 7.5 }}
                    icon={<PlusOutlined />}>
                    Wahlpflichtfach hinzufügen
                    </Button>
            </div>
        )
    }


    render() {
        const { generalInformation, createdData } = this.state
        return (
            <div>
                <div className="content">
                    <Header home={false} />
                    <BasicInformations
                        defaultValues={generalInformation}
                        onSave={(values: GeneralInformationsCreationType) => this.setState({ generalInformation: values })}
                    />
                    {this.createButtons()}
                    <Divider />
                    <Row className="examPackages_degreeCreator">
                        {this.renderCreatedData(createdData)}
                    </Row>
                </div>
                <Footer />
            </div>
        )
    }
}

export default DegreeCreation
