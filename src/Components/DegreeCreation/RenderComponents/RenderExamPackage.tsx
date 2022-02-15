import React, { ReactFragment, ReactText, useState } from "react"
import { Button, Divider, Col } from "antd";
import { ExamPackageCreationType } from "../types";
import { ExamPackageComponent } from "../FormComponents"
import RenderExams from "./RenderExam";
import { DeleteExamPackageModal } from "../ModalMessages";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";


const keyGenerator = (): ReactText =>
    "_" + Math.random().toString(36).substr(2, 9);

interface iProps {
    data: ExamPackageCreationType,
    // if edit Buttons should be displayed or not
    showEditButtons: boolean,
    // if ExamPackage is child of Emphasis change its style a little bit
    isChildComponent?: boolean,
    index?: number
    onDeleteEdit?: Function,
    onSaveEdit?: Function,
    setEdit?: Function,
    onDeleteNotEdit?: Function,
    parentsIndex?: number
}

// render single ExamPackage
const RenderExamPackage = (props: iProps) => {
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false)

    // if single ExamPackage is in edit Mode, render the Form
    const renderExamPackageEditMode = (index: number, values: ExamPackageCreationType) => {
        return (
            <div>
                <ExamPackageComponent
                    onDelete={() => props.onDeleteEdit(index)}
                    isChildComponent={props.isChildComponent}
                    onSave={(values: ExamPackageCreationType) => props.onSaveEdit(values, index)}
                    defaultValues={values}
                    index={index}
                    parentsIndex={props.parentsIndex}
                />
            </div>
        )
    }

    const buttons = (index: number): ReactFragment => {
        return (
            <div className="create_degree_buttons position_center">
                <Button
                    htmlType="button"
                    danger
                    onClick={() => setShowDeleteModal(true)}>
                    Modulprüfung löschen
                    </Button>
                <Button
                    style={{ marginLeft: 7.5 }}
                    htmlType="submit"
                    onClick={() => props.setEdit(index)}>
                    Bearbeiten
                </Button>
            </div>
        )
    }

    // if single ExamPackage is not in editMode, render the values of it
    const renderExamPackageNotEditMode = (index: number, values: ExamPackageCreationType) => {
        return (
            <div>
                <div className="form_min_height">
                    <p className="degreeCreator_exampackage_text bold">{values.name}</p>
                    <p className="degreeCreator_exampackage_text">Gewichtung: {values.weight}</p>
                </div>
                <Divider>
                    <div className="examPackages_addExams">
                        <div className="examPackages_add_heading">Prüfungen</div>
                    </div>
                </Divider>
{/*
                <RenderExams
                    data={values.exams}
                    showEditButtons={false}
                />
*/}
                <Divider />
                {props.showEditButtons && buttons(index)}


            </div>
        )
    }

    const renderExamPackageNoEditModeChildOfEmphasis = (index: number, values: ExamPackageCreationType) => {
        return (
            <div>
                <div className="min_height_120">
                    <div className="degreeCreator displayInline">
                        <p className="degreeCreator_exam_name bold">{values.name}</p>
                        {props.showEditButtons &&
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
                                    onClick={() => setShowDeleteModal(true)}
                                    shape="round"
                                    icon={<DeleteOutlined />}>
                                </Button>
                            </div>
                        }
                    </div>
                    <p >Gewichtung: {values.weight}</p>
                </div>
                <Divider>Prüfungen</Divider>
                {values.exams.length === 0 &&
                    <div className="examPackages_noExams">
                        keine Prüfungen hinzugefügt
                    </div>}
                {values.exams.map((single, _) => {
                    return (
                        <div key={keyGenerator()}>
                            <p className="bold">{single.name}</p>
                            <div className="degreeCreator displayInline">
                                <p className="degreeCreator_exam_value">{single.semester}. Semester</p>
                                <p className="degreeCreator_exam_value">{single.ects} ECTS</p>
                                <p className="degreeCreator_exam_value">Gewichtung: {single.weight}</p>
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }

    // if it is the child of the Emphasis Component Render it differently if it is not in Edit Mode
    if (props.isChildComponent) {
        return (
            <Col xl={12} xxl={12} lg={12} md={12} sm={12} xs={12} key={keyGenerator()}>
                <DeleteExamPackageModal
                    visible={showDeleteModal}
                    onDelete={() => props.onDeleteNotEdit(props.index)}
                    onReturn={() => setShowDeleteModal(false)}
                />

                <div >
                    {props.data.editMode && renderExamPackageEditMode(props.index, props.data)}
                    {!props.data.editMode && renderExamPackageNoEditModeChildOfEmphasis(props.index, props.data)}
                </div>
            </Col>
        )
    }

    return (
        <Col xl={8} xxl={6} lg={8} md={12} sm={12} xs={24} key={keyGenerator()}>
            <DeleteExamPackageModal
                visible={showDeleteModal}
                onDelete={() => props.onDeleteNotEdit(props.index)}
                onReturn={() => setShowDeleteModal(false)}
            />
            <div className="degreeCreator_singleElement">
                <Divider><div className="divider_large_text">Modulprüfung</div></Divider>
                {props.data.editMode && renderExamPackageEditMode(props.index, props.data)}
                {!props.data.editMode && renderExamPackageNotEditMode(props.index, props.data)}
            </div>
        </Col>
    )

}

export default RenderExamPackage