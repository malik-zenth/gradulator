import React, { ReactFragment, ReactText, useState } from "react"
import { Button, Divider, Col } from "antd";
import { EmphasisCreationType } from "../types";
import { DeleteEmphasisModal } from "../ModalMessages";
import RenderExamPackage from "./RenderExamPackage";
import EmphasisComponent from "../EmphasisComponent";

const keyGenerator = (): ReactText =>
    "_" + Math.random().toString(36).substr(2, 9);

interface iProps {
    data: EmphasisCreationType,
    index: number
    onDeleteEdit: Function,
    onSaveEdit: Function,
    setEdit: Function,
    onDeleteNotEdit: Function
}

// render single Elevative
const RenderEmphasis = (props: iProps) => {
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false)

    // if single elevative is in edit Mode, render the Form
    const renderemphasisEditMode = (index: number, values: EmphasisCreationType) => {
        return (
            <div>
                <EmphasisComponent
                    onDelete={() => props.onDeleteEdit(index)}
                    onSave={(values: EmphasisCreationType) => props.onSaveEdit(values, index)}
                    defaultValues={values}
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
                    Schwerpunkt löschen
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

    // if single elevative is not in editMode, render the values of it
    const renderelevativeNotEditMode = (index: number, values: EmphasisCreationType) => {
        return (
            <div>
                <p className="degreeCreator_elevative_text bold">{values.name}</p>
                <p className="degreeCreator_elevative_text">Gewichtung: {values.weight}</p>

                <Divider>
                    <div className="elevatives_addExams">
                        <div className="elevatives_add_heading">Modulprüfungen</div>
                    </div>
                </Divider>

                {values.options.map((single, _) => {
                    return(
                    <RenderExamPackage
                        data={single}
                        isChildComponent={true}
                        showEditButtons={false}
                    />
                    )
                })}

                <Divider />
                {buttons(index)}


            </div>
        )

    }

    return (
        <Col xl={8} xxl={6} lg={8} md={12} sm={12} xs={24} key={keyGenerator()}>
            {DeleteEmphasisModal(
                showDeleteModal,
                () => props.onDeleteNotEdit(props.index),
                () => setShowDeleteModal(false)
            )}
            <div className="degreeCreator_singleElement">
                <Divider>Schwerpunkt</Divider>
                {props.data.editMode && renderemphasisEditMode(props.index, props.data)}
                {!props.data.editMode && renderelevativeNotEditMode(props.index, props.data)}
            </div>
        </Col>
    )

}

export default RenderEmphasis