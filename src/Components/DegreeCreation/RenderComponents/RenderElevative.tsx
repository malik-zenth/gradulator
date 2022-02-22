import React, { ReactFragment, ReactText, useState } from "react"
import { Button, Divider, Col } from "antd";
import { ElevativeCreationType } from "../types";
import RenderExams from "./RenderExam";
import { DeleteElevativeModal } from "../ModalMessages";
import ElevativeComponent from "../FormComponents/ElevativeComponent";

const keyGenerator = (): ReactText =>
    "_" + Math.random().toString(36).substr(2, 9);

interface iProps {
    data: ElevativeCreationType,
    onDelete: Function,
    setEdit: Function,
}

// render single Elevative
const RenderElevative = (props: iProps) => {
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false)

    const buttons = (): ReactFragment => {
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
                    onClick={() => props.setEdit(props.data.key)}>
                    Bearbeiten
                    </Button>
            </div>
        )
    }

    return (
        <Col xl={8} xxl={6} lg={8} md={12} sm={12} xs={24} key={keyGenerator()}>
            <DeleteElevativeModal
                visible={showDeleteModal}
                onDelete={() => props.onDelete(props.data.key)}
                onReturn={() => setShowDeleteModal(false)}
            />
            <div>
                <div className="form_min_height">
                    <p className="degreeCreator_exampackage_text bold">{props.data.name}</p>
                    <p className="degreeCreator_exampackage_text ">Gewichtung: {props.data.weight}</p>
                    <p className="degreeCreator_exampackage_text ">Einheit: {props.data.unit}</p>
                </div>

                <Divider>
                    <div className="elevatives_addExams">
                        <div className="elevatives_add_heading">Auswahlmöglichkeiten</div>
                    </div>
                </Divider>


            </div>
        </Col>
    )

}

export default RenderElevative