import { Form, InputNumber } from "antd";
import React, { ReactFragment } from "react"
import { ElevativeCreationType, ExamCreationType } from "../types";

interface iProps {
    exams: ExamCreationType[]
    defaultValues: ElevativeCreationType
}

const RenderOptionsElevative = (props: iProps) => {

    const amountField = (): ReactFragment => {
        return (
            <Form.Item
                name={"amount"}
                label="Anzahl"
            >
                <InputNumber
                    placeholder="Benötigte Anzahl"
                    min={1}
                    max={30}
                    onChange={(e: number) => { }}
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

)
}

export default RenderOptionsElevative