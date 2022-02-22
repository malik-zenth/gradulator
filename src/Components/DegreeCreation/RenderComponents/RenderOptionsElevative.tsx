import { CheckOutlined } from "@ant-design/icons";
import { Button, Form, InputNumber } from "antd";
import React, { ReactFragment, useState } from "react"
import { ElevativeOptionType, ExamCreationType } from "../types";

interface iProps {
    exams: ExamCreationType[]
    defaultValues: ElevativeOptionType,
    unit: string,
    saveAmountRequired: Function
}

const RenderOptionsElevative = (props: iProps) => {
    const [amount, setAmount] = useState<number>(props.defaultValues.required)

    const onAmountChange = (e: number) => {
        setAmount(e)
    }

    const saveAmount = () => {
        props.saveAmountRequired(amount)
    }

    const amountField = (): ReactFragment => {
        return (
            <Form.Item
                name={"required"}
                label="Anzahl"
            >
                <InputNumber
                    placeholder="Benötigte Anzahl"
                    min={1}
                    max={30}
                    onChange={(e: number) => onAmountChange(e)}
                    style={{ minWidth: "100%" }}
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

    return (
        <div>
            {props.defaultValues.editMode &&
                <Form initialValues={props.defaultValues}>
                        {amountField()}
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
        </div >
    )
}

export default RenderOptionsElevative