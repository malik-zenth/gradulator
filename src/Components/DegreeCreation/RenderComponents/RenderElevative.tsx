import React, { ReactFragment, ReactText, useState } from "react"
import { Button, Divider, Col } from "antd";
import { ElevativeCreationType } from "../types";
import RenderExams from "./RenderExams";
import { DeleteElevativeModal } from "../ModalMessages";
import ElevativeComponent from "../ElevativeComponent";

const keyGenerator = (): ReactText =>
    "_" + Math.random().toString(36).substr(2, 9);

interface iProps {
    data: ElevativeCreationType,
    index: number
    onDeleteEdit: Function,
    onSaveEdit: Function,
    setEdit: Function,
    onDeleteNotEdit: Function
}

// render single Elevative
const RenderElevative = (props: iProps) => {
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false)

    // if single elevative is in edit Mode, render the Form
    const renderelevativeEditMode = (index: number, values: ElevativeCreationType) => {
        return (
            <div>
                <ElevativeComponent
                    onDelete={() => props.onDeleteEdit(index)}
                    onSave={(values: ElevativeCreationType) => props.onSaveEdit(values, index)}
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
                    Wahlpflichtfach löschen
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
    const renderelevativeNotEditMode = (index: number, values: ElevativeCreationType) => {
        return (
            <div>
                <p className="degreeCreator_elevative_text bold">{values.name}</p>
                <p className="degreeCreator_elevative_text">Gewichtung: {values.weight}</p>
                <p className="degreeCreator_elevative_text">Benötige Anzahl: {values.amount}</p>

                <Divider>
                    <div className="elevatives_addExams">
                        <div className="elevatives_add_heading">Auswahlmöglichkeiten</div>
                    </div>
                </Divider>

                <RenderExams
                    data={values.exams}
                    showEditButtons={false}
                />
                <Divider />
                {buttons(index)}


            </div>
        )

    }

    return (
        <Col xl={8} xxl={6} lg={8} md={12} sm={12} xs={24} key={keyGenerator()}>
            {DeleteElevativeModal(
                showDeleteModal,
                () => props.onDeleteNotEdit(props.index),
                () => setShowDeleteModal(false)
            )}
            <div className="degreeCreator_singleElement">
                <Divider>Wahlpflichtfach</Divider>
                {props.data.editMode && renderelevativeEditMode(props.index, props.data)}
                {!props.data.editMode && renderelevativeNotEditMode(props.index, props.data)}
            </div>
        </Col>
    )

}

export default RenderElevative