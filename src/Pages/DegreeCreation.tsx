import React, { ReactFragment } from "react"
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


    // Buttons to create new Emphasis, ExamPackage and Elevative
    createButtons = (): ReactFragment => {
        return (
            <div className="create_degree_buttons position_center">
                <Button
                    type="primary"
                    style={{marginLeft: 7.5}}
                    onClick={() => { }}
                    size="middle"
                    icon={<PlusOutlined />}>
                    Modulprüfung hinzufügen
                </Button>

                <Button
                    type="primary"
                    size="middle"
                    style={{marginLeft: 7.5}}
                    onClick={() => { }}
                    icon={<PlusOutlined />}>
                    Schwerpunkt hinzufügen
                </Button>

                <Button
                    type="primary"
                    onClick={() => { }}
                    size="middle"
                    style={{marginLeft: 7.5}}
                    icon={<PlusOutlined />}>
                    Wahlpflichtfach hinzufügen
                </Button>
            </div>
        )
    }

    render() {
        const {generalInformation} = this.state
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

                    <ExamPackageComponent
                        onDelete={() => console.log("DELETE")}
                        onSave={() => console.log("SAVE")}
                    />
                </div>
                <Footer />
            </div>
        )
    }
}

export default DegreeCreation
