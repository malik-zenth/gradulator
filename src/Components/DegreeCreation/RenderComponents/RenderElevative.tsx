import React, { ReactFragment, ReactText, useState } from "react"
import { Button, Divider, Col } from "antd";
import { ElevativeCreationType } from "../types";
import RenderExams from "./RenderExams";
import { DeleteElevativeModal } from "../ModalMessages";
import ElevativeComponent from "../FormComponents/ElevativeComponent";

const keyGenerator = (): ReactText =>
    "_" + Math.random().toString(36).substr(2, 9);

interface iProps {
    data: ElevativeCreationType,
    index: number
    onDelete?: Function,
    onSaveEdit?: Function,
    setEdit?: Function,
    isChildComponent?: boolean,
    showEditButtons: boolean
}

// render single Elevative
const RenderElevative = (props: iProps) => {
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false)

    // if single elevative is in edit Mode, render the Form
    const renderelevativeEditMode = (index: number, values: ElevativeCreationType) => {
        return (
            <div>
                <ElevativeComponent
                    onDelete={() => props.onDelete(index)}
                    onSave={(values: ElevativeCreationType) => props.onSaveEdit(values, index)}
                    defaultValues={values}
                    index={index}
                    isChildComponent={props.isChildComponent}
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
                <div className="form_min_height">
                    <p className="degreeCreator_exampackage_text bold">{values.name}</p>
                    <p className="degreeCreator_exampackage_text ">Gewichtung: {values.weight}</p>
                    <p className="degreeCreator_exampackage_text ">Benötige Anzahl: {values.amount}</p>
                </div>

                <Divider>
                    <div className="elevatives_addExams">
                        <div className="elevatives_add_heading">Auswahlmöglichkeiten</div>
                    </div>
                </Divider>

                <RenderExams
                    data={values.exams}
                    showEditButtons={false}
                    parentIndex={props.index}
                />
                <Divider />
                {buttons(index)}


            </div>
        )

    }

    if(props.isChildComponent){
        return(
            <Col xl={12} xxl={12} lg={12} md={12} sm={12} xs={12} key={keyGenerator()}>
            <DeleteElevativeModal
                visible={showDeleteModal}
                onDelete={() => props.onDelete(props.index)}
                onReturn={() => setShowDeleteModal(false)}
            />

            <div className="degreeCreator_singleElement">
                {props.data.editMode && renderelevativeEditMode(props.index, props.data)}
                {!props.data.editMode && renderelevativeNotEditMode(props.index, props.data)}
            </div>
        </Col>
        )
    }

    return (
        <Col xl={8} xxl={6} lg={8} md={12} sm={12} xs={24} key={keyGenerator()}>
            <DeleteElevativeModal
                visible={showDeleteModal}
                onDelete={() => props.onDelete(props.index)}
                onReturn={() => setShowDeleteModal(false)}
            />

            <div className="degreeCreator_singleElement">
                <Divider><div className="divider_large_text">Wahlpflichtfach</div></Divider>
                {props.data.editMode && renderelevativeEditMode(props.index, props.data)}
                {!props.data.editMode && renderelevativeNotEditMode(props.index, props.data)}
            </div>
        </Col>
    )

}

export default RenderElevative