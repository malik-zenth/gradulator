import { CheckOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Form, InputNumber } from "antd";
import React, { ReactFragment, useContext, useState } from "react"
import { CreatorContext } from "../CreatorContext";
import { ElevativeOptionType, ExamCreationType } from "../types";
import { numToWord } from "num-words-de"

interface iProps {
    defaultValues: ElevativeOptionType,
    elevativeKey: string,
    unit: string,
}

const RenderRequiredElevative = (props: iProps) => {
    const { saveAmountElevative, setEditElevativeOption } = useContext(CreatorContext)
    const [amount, setAmount] = useState<number>(props.defaultValues.required)
    
    const onAmountChange = (e: number) => {
        setAmount(e)
    }

    const saveAmount = () => {
        saveAmountElevative(amount, props.elevativeKey, props.defaultValues.key)
    }

    const amountField = (): ReactFragment => {
        return (
            <Form.Item
                name={"required"}
                label={"Anzahl"}
            >
                <InputNumber
                    placeholder="Anzahl"
                    min={1}
                    max={30}
                    onChange={(e: number) => onAmountChange(e)}
                />
            </Form.Item>
        )
    }

    return (
        <div className="optionElevative">
            {props.defaultValues.editMode &&
                <Form className="inline" initialValues={props.defaultValues} style={{width: "100%"}}>
                    <div style={{width: "70%"}}>
                        {amountField()}
                    </div>
                    <Button
                        size="small"
                        type="primary"
                        disabled={amount ? false : true}
                        className="saveWeightButton"
                        onClick={() => saveAmount()}
                        shape="round"
                        icon={<CheckOutlined />}>
                    </Button>
                </Form>
            }
            {!props.defaultValues.editMode &&
                <div className="degreeCreator_exampackage_text inline" style={{width: "100%"}}>
                    {props.unit === "ECTS" &&
                        <p style={{width: "70%", paddingTop: "4px"}}>{numToWord(amount, { indefinite_ein: true })} {props.unit} benötigt</p>
                    }
                    {props.unit === "Prüfungen" &&
                        <p style={{width: "70%", paddingTop: "4px"}}>{numToWord(amount, { indefinite_eine: true })} {props.unit} benötigt</p>
                    }
                    <Button
                        size="small"
                        className="saveWeightButton"
                        onClick={() => setEditElevativeOption(props.elevativeKey, props.defaultValues.key)}
                        shape="round"
                        icon={<EditOutlined />}>
                    </Button>
                </div>
            }
        </div >
    )
}

export default RenderRequiredElevative