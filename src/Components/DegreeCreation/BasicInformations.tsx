import React, { ReactFragment, ReactText, useState } from "react"
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { GeneralInformationsCreationType } from "./types";
import { Form, InputNumber, Input, Button } from "antd";

interface iProps {
    defaultValues: GeneralInformationsCreationType
    onSave: Function
}

const keyGenerator = (): ReactText =>
    "_" + Math.random().toString(36).substr(2, 9);


const BasicInformations = (props: iProps) => {
    const [form] = Form.useForm()
    const [editMode, setEditMode] = useState<boolean>(true)
    const [currentValues, setCurrentValues] = useState<GeneralInformationsCreationType>(props.defaultValues)

    const onSubmit = (e: any) => {
        e.preventDefault()
        form
            .validateFields()
            .then((values: GeneralInformationsCreationType) => {
                setCurrentValues(values)
                setEditMode(false)
                props.onSave(values)
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const InputFieldName = (): ReactFragment => {
        return (
            <Form.Item
                name="name"
                style={{ marginLeft: 7.5 }}
                rules={[
                    {
                        required: true,
                        message: "Name fehlt!"
                    }
                ]}
            >
                <Input
                    type="string"
                    placeholder="Name der Studienganges"
                    style={{ width: 300 }}
                />
            </Form.Item>
        )
    }

    const InputAmoundEmphasis = (): ReactFragment => {
        return (
            <Form.Item
                name="amoundRequiredEmphasis"
                style={{ marginLeft: 7.5 }}
            >
                <InputNumber
                    placeholder="Anzahl benötiger Schwerpunkte"
                    min={1}
                    max={30}
                    step={1}
                    style={{ width: 300 }}
                />
            </Form.Item>
        )
    }

    const InputSPO = (): ReactFragment => {
        return (
            <Form.Item
                name="spo"
                style={{ marginLeft: 7.5 }}
                rules={[
                    {
                        required: true,
                        message: "SPO fehlt!"
                    }
                ]}
            >
                <InputNumber
                    placeholder="SPO"
                    min={1}
                    max={30}
                    step={1}
                    style={{ width: 300 }}
                />
            </Form.Item>
        )
    }


    return (
        <div className="creator_basicInformations position_center">
            {editMode &&
                <div className="creator_basicinformation_box_edit">
                    <Form style={{display: "inline-flex"}} form={form} initialValues={props.defaultValues}>
                        {InputFieldName()}
                        {InputAmoundEmphasis()}
                        {InputSPO()}
                    </Form>

                    <Button style={{marginLeft: 7.5}} type="primary" htmlType="submit" onClick={onSubmit}>
                    Speichern
                    </Button>
                </div>
            }
            {!editMode &&
                <div className="creator_basicinformation_box_show">
                    <div className="creator_heading">Studiengang: {currentValues.name}</div>
                    <div className="creator_text">Anzahl benötigerer Schwerpunkte: {currentValues.amoundRequiredEmphasis ? currentValues.amoundRequiredEmphasis : 0}</div>
                    <div className="creator_text">SPO: {currentValues.spo ? currentValues.spo : 1}</div>

                    <Button
                        size="middle"
                        style={{marginLeft: 7.5}}
                        onClick={() => setEditMode(true)}
                        shape="round"
                        icon={<EditOutlined />}>
                    </Button>
                </div>

            }
        </div>
    )
}

export default BasicInformations