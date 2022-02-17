import React, { ReactFragment, ReactText, useState } from "react"
import { Button, Divider, Col, Row, FormInstance } from "antd";
import { EmphasisCreationType } from "../types";
import { DeleteEmphasisModal } from "../ModalMessages";
import RenderExamPackage from "./RenderExamPackage";
import EmphasisComponent from "../FormComponents/EmphasisComponent";
import RenderElevative from "./RenderElevative";

const keyGenerator = (): ReactText =>
    "_" + Math.random().toString(36).substr(2, 9);

interface iProps {
    data: EmphasisCreationType,
    index: number
    onDeleteEdit: Function,
    onSaveEdit: Function,
    setEdit: Function,
    onDeleteNotEdit: Function,
    form: FormInstance
}

// render single Elevative
const RenderEmphasis = (props: iProps) => {
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false)

    // if single elevative is in edit Mode, render the Form
    const renderemphasisEditMode = (index: number, values: EmphasisCreationType) => {
        return (
            <EmphasisComponent
                onDelete={() => props.onDeleteEdit(index)}
                onSave={(values: EmphasisCreationType) => props.onSaveEdit(values, index)}
                defaultValues={values}
                index={index}
            />
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
    const renderemphasisNotEditMode = (index: number, values: EmphasisCreationType) => {
        return (
            <div className="emphasis_component">
                <div className="form_min_height">
                    <p className="degreeCreator_exampackage_text bold">{values.name}</p>
                    <p className="degreeCreator_exampackage_text">Gewichtung: {values.weight}</p>
                </div>
                <Divider>
                    <div className="elevatives_addExams">
                        <div className="elevatives_add_heading">Modulprüfungen</div>
                    </div>
                </Divider>

                <Row gutter={[20, 40]}>
                    {values.options.map((single, index) => {
                        if(single.examPackage){
                        return (
                            <RenderExamPackage
                                key={keyGenerator()}
                                index={index}
                                data={single.examPackage}
                            />
                        )
                        }else if(single.elevative){
                            return(
                                <RenderElevative
                                    key={keyGenerator()}
                                    index={index}
                                    data={single.elevative}
                                    isChildComponent={true}
                                    showEditButtons={false}
                                />
                                )
                        }
                    })}
                </Row>
                <Divider />
                {buttons(index)}
            </div>
        )

    }

    return (
        <Col xl={16} xxl={12} lg={16} md={12} sm={12} xs={24} key={keyGenerator()}>
            <DeleteEmphasisModal
                visible={showDeleteModal}
                onDelete={() => props.onDeleteNotEdit(props.index)}
                onReturn={() => setShowDeleteModal(false)}
            />
            <div className="degreeCreator_singleElement">
                <Divider><div className="divider_large_text">Schwerpunkt</div></Divider>
                {props.data.editMode && renderemphasisEditMode(props.index, props.data)}
                {!props.data.editMode && renderemphasisNotEditMode(props.index, props.data)}
            </div>
        </Col>
    )

}

export default RenderEmphasis