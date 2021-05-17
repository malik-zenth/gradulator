import React, { ReactFragment, useState } from "react"
import { Form, InputNumber, Input, Button } from "antd";
import { ExamCreationType } from "./types";


interface iProps {
    onDelete: Function,
    onSave: Function,
    defaultValues?: ExamCreationType
}

const ExamComponent = (props: iProps) => {
    const [form] = Form.useForm();

    const nameInputField = (): ReactFragment => {
        return (
            <Form.Item
                name="name"
                style={{marginLeft: 7.5}}
                rules={[
                    {
                        required: true,
                        message: "Name fehlt!"
                    }
                ]}
            >
                <Input
                    type="string"
                    placeholder="Name der Prüfung"
                    style={{ width: 285 }}
                />
            </Form.Item>
        )
    }

    const semesterField = (): ReactFragment => {
        return (
            <Form.Item
                name="semester"
                style={{marginLeft: 7.5}}
                rules={[
                    {
                        required: true,
                        message: "Semester fehlt!"
                    }
                ]}
            >
                <InputNumber
                    type="string"
                    placeholder="Semester"
                    min={1}
                    max={10}
                    step={1}
                    style={{ width: 90}}
                    parser={(value) => {
                        if (value.includes(".")) {
                            return value.substring(0, value.indexOf("."))
                        }
                        return value
                    }}
                />
            </Form.Item>
        )
    }

    const ectsField = (): ReactFragment => {
        return (
            <Form.Item
                name="ects"
                style={{marginLeft: 7.5}}
                rules={[
                    {
                        required: true,
                        message: "ECTS fehlen!"
                    }
                ]}
            >
                <InputNumber
                    placeholder="ECTS"
                    min={1}
                    max={30}
                    step={0.5}
                    style={{ width: 80}}
                    parser={(value) => {
                        value = value.replace(",", ".")
                        if (value.indexOf(".") + 2 < value.length) {
                            value = value.substring(0, value.indexOf(".") + 2)
                        }
                        // we only allow floats with .5as those are the only values that are possible
                        if (value.includes(".") && !value.endsWith(".") && !(value.endsWith("0") || value.endsWith("5"))) {
                            value = value.substring(0, value.indexOf(".") + 1)
                        }
                        return value
                    }}
                />
            </Form.Item>
        )
    }

    const weightField = (): ReactFragment => {
        return (
            <Form.Item
                name="weight"
                style={{marginLeft: 7.5}}
                rules={[
                    {
                        required: true,
                        message: "Gewichtung fehlt!"
                    }
                ]}
            >
                <InputNumber
                    placeholder="Gewichtung"
                    min={1}
                    max={30}
                    step={0.5}
                    style={{ width: 100}}
                    parser={(value) => {
                        value = value.replace(",", ".")
                        if (value.indexOf(".") + 2 < value.length) {
                            value = value.substring(0, value.indexOf(".") + 2)
                        }
                        // we only allow floats with .5as those are the only values that are possible
                        if (value.includes(".") && !value.endsWith(".") && !(value.endsWith("0") || value.endsWith("5"))) {
                            value = value.substring(0, value.indexOf(".") + 1)
                        }
                        return value
                    }}
                />
            </Form.Item>
        )
    }

    const onSubmit = (e: any) => {
        e.preventDefault()
        form
            .validateFields()
            .then((values: ExamCreationType) => {
                props.onSave(values)
            })
            .catch((error) => {
                console.log(error);
              });
    }

    const buttons = (): ReactFragment => {
        return (
                <div>
                    <Button htmlType="button" danger onClick={() => props.onDelete()}>
                        Löschen
                    </Button>
                    <Button type="primary" htmlType="submit" onClick={onSubmit}>
                        Speichern
                    </Button>
                </div>
            )
    }

    const renderForm = () => {
        return (
            <Form form={form} initialValues={props.defaultValues}>
                {nameInputField()}
                <div className="number-input-exam">
                {semesterField()}
                {ectsField()}
                {weightField()}
                </div>
            </Form>
        )
    }

    return (
        <div className="examComponent">
            {renderForm()}
            {buttons()}
        </div>
    )
}

export default ExamComponent