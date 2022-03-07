import React, { ReactFragment, ReactText, useState } from "react"
import { Form, InputNumber, Input, Button, Tooltip } from "antd";
import { useContext } from "react";
import { CreatorContext } from "../CreatorContext";
import { ToolTipBasics } from "../../const";


const BasicInformations = () => {
    const { setBasicInformations, basicInformations } = useContext(CreatorContext)
    const [name, setName] = useState<string>(basicInformations.name)
    const [shortName, setShortName] = useState<string>(basicInformations.shortName)
    const [requiredEmphasis, setRequiredEmphasis] = useState<number>(basicInformations.amoundRequiredEmphasis)
    const [spo, setSPO] = useState<number>(basicInformations.spo)

    const layout = {
        labelCol: { span: 9 },
        wrapperCol: { span: 15 },
    };

    const onSubmit = (e: any) => {
        setBasicInformations({
            name: name,
            shortName: shortName,
            amoundRequiredEmphasis: requiredEmphasis,
            editMode: false,
            spo: spo
        })
    }

    const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
    }

    const onShortNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setShortName(e.target.value)
    }

    const onRequiredEmphasisChange = (e: number) => {
        setRequiredEmphasis(e)
    }

    const onSPOChange = (e: number) => {
        setSPO(e)
    }

    const InputFieldName = (): ReactFragment => {
        return (
            <Form.Item
                name="name"
                style={{ minHeight: "33px" }}
                {...layout}
                label="Name des Studiengangs"
            >
                <Input
                    style={{ width: "100%" }}
                    type="string"
                    onChange={onNameChange}
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
                style={{ minHeight: "33px" }}
                label="Kürzel des Studiengangs"
            >
                <Input
                    style={{ width: "100%" }}
                    type="string"
                    onChange={onShortNameChange}
                    placeholder="Kürzel der Studienganges"
                />
            </Form.Item>
        )
    }

    const InputAmoundEmphasis = (): ReactFragment => {
        return (
            <Form.Item
                name="amoundRequiredEmphasis"
                style={{ minHeight: "33px" }}
                label="Anzahl Schwerpunkte"
                {...layout}
            >
                <InputNumber
                    placeholder="Anzahl benötiger Schwerpunkte"
                    style={{ width: "100%" }}
                    onChange={onRequiredEmphasisChange}
                    min={0}
                    max={30}
                    step={1}
                />
            </Form.Item>
        )
    }

    const InputSPO = (): ReactFragment => {
        return (
            <Form.Item
                name="spo"
                style={{ minHeight: "33px" }}
                label="SPO"
                {...layout}
            >
                <InputNumber
                    placeholder="SPO"
                    style={{ width: "100%" }}
                    onChange={onSPOChange}
                    min={1}
                    max={30}
                    step={1}
                />
            </Form.Item>
        )
    }

    const renderButtonWithTooltip = (): ReactFragment => {
        if ((!name || !shortName || !spo)) {
            return (
                <Tooltip title={ToolTipBasics}>
                    <Button
                        type="primary"
                        htmlType="submit"
                        disabled={true}
                        onClick={onSubmit}>
                        Speichern
                    </Button>
                </Tooltip>
            )
        } else {
            return (
                <Button
                    type="primary"
                    htmlType="submit"
                    onClick={onSubmit}>
                    Speichern
                </Button>
            )
        }
    }


    return (
        <div className="creator_basicInformations">

            <div>
                <Form initialValues={basicInformations}>
                    {InputFieldName()}
                    {InputFieldShortName()}
                    {InputAmoundEmphasis()}
                    {InputSPO()}

                    <Form.Item>
                        <div className="buttonBasicInformations">
                        {renderButtonWithTooltip()}
                        </div>
                    </Form.Item>
                </Form>

            </div>
        </div>
    )
}

export default BasicInformations