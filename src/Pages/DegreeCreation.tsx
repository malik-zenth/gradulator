import React, { ReactFragment, ReactText } from "react"
import { Footer, Header } from "../Components"
import { Form, InputNumber, Input, Button, Divider } from "antd";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { BasicInformations, ExamComponent, ExamPackageComponent } from "../Components/DegreeCreation"
import { ElevativeCreationType, EmphasisCreationType, ExamPackageCreationType, GeneralInformationsCreationType } from "../Components/DegreeCreation/types";

interface iProps { }

interface iState {
    createdEmphasis: EmphasisCreationType[],
    createdElevative: ElevativeCreationType[],
    createdExamPackages: ExamPackageCreationType[],
    generalInformation?: GeneralInformationsCreationType,
    editMode_BasicInformation: boolean

}

const keyGenerator = (): ReactText =>
    "_" + Math.random().toString(36).substr(2, 9);

class DegreeCreation extends React.Component<iProps, iState>{
    constructor(props: iProps) {
        super(props);
        this.state = {
            createdEmphasis: [],
            createdExamPackages: [],
            createdElevative: [],
            editMode_BasicInformation: false
        }
    }

    // all add functions
    createExamPackage = () => {
        this.setState({createdExamPackages: [...this.state.createdExamPackages, {editMode: true, exams: []}]})
    }

    createElevative = () => {
        this.state.createdElevative.push({editMode: true, examOptions: []})
    }

    createEmphasis = () => {
        this.state.createdEmphasis.push({editMode: true, options: []})
    }

    // all delete functions
    deleteExamPackage = (itemToRemove: number) => {
        const newState: ExamPackageCreationType[] = this.state.createdExamPackages.filter((value, index) => index != itemToRemove)
        this.setState({createdExamPackages: newState})
    }


    // all update functions
    updateExamPackage = (examPackage: ExamPackageCreationType, index: number) => {
        const newState: ExamPackageCreationType[] = this.state.createdExamPackages
        newState[index] = examPackage
        this.setState({createdExamPackages: newState})
    }


    // Buttons to create new Emphasis, ExamPackage and Elevative
    createButtons = (): ReactFragment => {
        return (
            <div className="create_degree_buttons position_center">
                <Button
                    type="primary"
                    style={{marginLeft: 7.5}}
                    onClick={() => this.createExamPackage()}
                    size="middle"
                    icon={<PlusOutlined />}>
                    Modulprüfung hinzufügen
                </Button>

                <Button
                    type="primary"
                    size="middle"
                    style={{marginLeft: 7.5}}
                    onClick={() => this.createEmphasis()}
                    icon={<PlusOutlined />}>
                    Schwerpunkt hinzufügen
                </Button>

                <Button
                    type="primary"
                    onClick={() => this.createElevative()}
                    size="middle"
                    style={{marginLeft: 7.5}}
                    icon={<PlusOutlined />}>
                    Wahlpflichtfach hinzufügen
                </Button>
            </div>
        )
    }

    renderExamPackages = (examPackages: ExamPackageCreationType[]): ReactFragment => {
        return(examPackages.map((single, index) => {
            return(
                <div key={keyGenerator()}>
                    <ExamPackageComponent
                        onDelete={() => this.deleteExamPackage(index)}
                        onSave={(values: ExamPackageCreationType) => this.updateExamPackage(values, index)}
                        defaultValues={single}

                    />
                </div>
            )
        }))
    }

    render() {
        const {generalInformation, createdElevative, createdEmphasis, createdExamPackages} = this.state
        return (
            <div>
                <div className="content">
                    <Header home={false} />
                    <BasicInformations
                        defaultValues={generalInformation}
                        onSave={(values: GeneralInformationsCreationType) => this.setState({generalInformation: values})}
                    />
                    {this.createButtons()}
                    <Divider/>
                    {this.renderExamPackages(createdExamPackages)}
                </div>
                <Footer />
            </div>
        )
    }
}

export default DegreeCreation
