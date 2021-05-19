import React, { ReactFragment, ReactText } from "react"
import { Button, Divider, Col } from "antd";
import { ExamPackageCreationType } from "../types";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { ExamPackageComponent } from ".."

const keyGenerator = (): ReactText =>
    "_" + Math.random().toString(36).substr(2, 9);

interface iProps {
    data: ExamPackageCreationType,
    index: number
    onDeleteEdit: Function,
    onSaveEdit: Function,
    setEdit: Function,
    onDeleteNotEdit: Function
}

// render single ExamPackage
const RenderExamPackage = (props: iProps) => {

    // if single ExamPackage is in edit Mode, render the Form
    const renderExamPackageEditMode = (index: number, values: ExamPackageCreationType) => {
        return (
            <ExamPackageComponent
                onDelete={() => props.onDeleteEdit(index)}
                onSave={(values: ExamPackageCreationType) => props.onSaveEdit(values, index)}
                defaultValues={values}
            />
        )
    }

    // if single ExamPackage is not in editMode, render the values of it
    const renderExamPackageNotEditMode = (index: number, values: ExamPackageCreationType) => {
        return (
            <div>
                <p>Name: {values.name}</p>
                <p>Gewichtung: {values.weight}</p>

                <Button
                    size="small"
                    onClick={() => props.setEdit(index)}
                    shape="round"
                    icon={<EditOutlined />}>
                </Button>

                <Button
                    size="small"
                    danger
                    onClick={() => props.onDeleteNotEdit(index)}
                    shape="round"
                    icon={<DeleteOutlined />}>
                </Button>
            </div>
        )

    }

    return (
        <Col xl={8} xxl={6} lg={8} md={12} sm={12} xs={24} key={keyGenerator()}>
            <div className="degreeCreator_singleElement">
                <Divider>Modulprüfung</Divider>
                {props.data.editMode && renderExamPackageEditMode(props.index, props.data)}
                {!props.data.editMode && renderExamPackageNotEditMode(props.index, props.data)}
            </div>
        </Col>
    )

}

export default RenderExamPackage