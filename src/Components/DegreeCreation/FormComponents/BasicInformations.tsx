import React, { ReactFragment, ReactText, useState } from "react"
import { EditOutlined } from "@ant-design/icons";
import { GeneralInformationsCreationType } from "../types";
import { Form, InputNumber, Input, Button } from "antd";

interface iProps {
    defaultValues: GeneralInformationsCreationType
    onSave: Function
}
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

    const onReset = () => {
        // due to defaultValues beeing given we need to hardreset die Fields
        form.setFieldsValue({
            name: null,
            shortName: null,
            amoundRequiredEmphasis: null,
            amoundRequiredElevatives: null,
            spo: null
        })
    }

    const layout = {
        labelCol: { span: 9 },
        wrapperCol: { span: 15 },
    };



    const InputFieldName = (): ReactFragment => {
        return (
            <Form.Item
                name="name"
                {...layout}
                label="Name des Studiengangs"
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
                />
            </Form.Item>
        )
    }

    const InputFieldShortName = (): ReactFragment => {
        return (
            <Form.Item
                {...layout}
                name="shortName"
                label="Kürzel des Studiengangs"
                rules={[
                    {
                        required: true,
                        message: "Kürzel fehlt!"
                    }
                ]}
            >
                <Input
                    type="string"
                    placeholder="Kürzel der Studienganges"
                    style={{ width: 300 }}
                />
            </Form.Item>
        )
    }

    const InputAmoundEmphasis = (): ReactFragment => {
        return (
            <Form.Item
                name="amoundRequiredEmphasis"
                label="Anzahl Schwerpunkte"
                {...layout}
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

    const InputAmoundElevative = (): ReactFragment => {
        return (
            <Form.Item
                name="amoundRequiredElevative"
                label="Anzahl Wahlpflichtfächer"
                {...layout}
            >
                <InputNumber
                    placeholder="Anzahl benötiger Wahlpflichtfächer"
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
                label="SPO"
                {...layout}
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
                    <Form form={form} initialValues={props.defaultValues}>
                        {InputFieldName()}
                        {InputFieldShortName()}
                        {InputAmoundEmphasis()}
                        {InputAmoundElevative()}
                        {InputSPO()}

                        <Form.Item {...{ wrapperCol: { span: 16, offset: 9 } }}>
                        <Button type="primary" htmlType="submit" onClick={onSubmit}>
                                Speichern
                            </Button>
                            <Button style={{marginLeft: 7.5}} htmlType="submit" onClick={onReset}>
                                Zurücksetzen
                            </Button>
                        </Form.Item>
                    </Form>

                </div>
            }
            {!editMode &&
                <div className="creator_basicinformation_box_show">
                    <div className="creator_heading">Studiengang: {currentValues.name} ({currentValues.shortName})</div>
                    <div className="creator_text">Anzahl benötigerer Schwerpunkte: {currentValues.amoundRequiredEmphasis ? currentValues.amoundRequiredEmphasis : 0}</div>
                    <div className="creator_text">Anzahl benötigerer Wahlpflichtfächer: {currentValues.amoundRequiredElevative ? currentValues.amoundRequiredElevative : 0}</div>
                    <div className="creator_text">SPO: {currentValues.spo ? currentValues.spo : 1}</div>

                    <Button
                        size="middle"
                        style={{ marginLeft: 7.5 }}
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