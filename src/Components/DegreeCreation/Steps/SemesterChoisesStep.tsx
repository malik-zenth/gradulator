import { CheckOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons"
import { Button, Form, Input, List } from "antd"
import React, { ReactText, useContext, useState } from "react"
import { CreatorContext } from "../CreatorContext"
import { DeleteSemsterChoiseModal } from "../Modals/DeleteModals";

interface iProps { }


const keyGenerator = (): ReactText =>
    "_" + Math.random().toString(36).substr(2, 9);

const SemesterChoisesStep = (props: iProps) => {
    const { addSemesterChoise, updateSemesterChoise, deleteSemesterChoise, semesterChoises, setEditSemesterChoise, resetEditSemesterChoise } = useContext(CreatorContext)
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false)
    const [choiseKeyToDelete, setChoiseKeyToDelete] = useState<string>()


    const addChoiseButton = () => {
        return (
            <Button
                style={{ marginLeft: 7.5, maxWidth: 220 }}
                htmlType="submit"
                type="primary"
                onClick={() => addSemesterChoise()}
            >
                Neue Zuordnung hinzufügen
            </Button>
        )
    }

    const setDeleteModal = (key: string, value: string) => {
        if(value){
            setShowDeleteModal(true)
            setChoiseKeyToDelete(key)
        }
        else{
            deleteSemesterChoise(key)
        }
    }

    const renderChoises = () => {
        return semesterChoises.map(single => {
            if (single.editMode) {
                return (
                    <div key={keyGenerator()}>
                        <Form
                            onFinish={(values) => {
                                if (values.name) {
                                    updateSemesterChoise({ name: values.name, editMode: false, key: single.key })
                                }
                                else (
                                    resetEditSemesterChoise(single.key)
                                )
                            }
                            }
                        >
                            <div className="semesterChoiseInline">
                                <div className="semesterChoiseText">
                                    <Form.Item
                                        name="name"
                                        label="Name der Zuordnungsgruppe"
                                        style={{ minHeight: "33px", marginBottom: "0px" }}
                                    >

                                        <Input
                                            type="string"
                                            placeholder="Name"
                                            defaultValue={single.name}
                                            required
                                            style={{ minWidth: "70%" }}

                                        />
                                    </Form.Item>
                                </div>
                                <div className="semesterChoiseButtons">
                                    <Button
                                        size="small"
                                        htmlType="submit"
                                        type="primary"
                                        className="saveWeightButton"
                                        shape="round"
                                        icon={<CheckOutlined />}>
                                    </Button>
                                    <Button
                                        size="small"
                                        danger
                                        className="saveWeightButton"
                                        onClick={() => setDeleteModal(single.key, single.name)}
                                        shape="round"
                                        icon={<DeleteOutlined />}>
                                    </Button>
                                </div>
                            </div>
                        </Form>
                    </div>
                )

            }
            if (!single.editMode) {
                return (
                    <div key={keyGenerator()} className="semesterChoiseInline">
                        <div className="semesterChoiseText">{single.name}</div>
                        <div className="semesterChoiseButtons">
                            <Button
                                size="small"
                                className="saveWeightButton"
                                onClick={() => setEditSemesterChoise(single.key)}
                                shape="round"
                                icon={<EditOutlined />}>
                            </Button>
                            <Button
                                size="small"
                                danger
                                className="saveWeightButton"
                                onClick={() => setDeleteModal(single.key, single.name)}
                                shape="round"
                                icon={<DeleteOutlined />}>
                            </Button>
                        </div>
                    </div>
                )
            }
        })
    }

    return (
        <div className="creator_basicInformations">
            <DeleteSemsterChoiseModal
            visible={showDeleteModal}
            onDelete={() => {
                deleteSemesterChoise(choiseKeyToDelete )
                setShowDeleteModal(false)
            }}
            onReturn={() => {
                setChoiseKeyToDelete("")
                setShowDeleteModal(false)
            }}
            />
            {renderChoises()}
            <div className="buttonBasicInformations">
                {addChoiseButton()}
            </div>
        </div>
    )

}

export default SemesterChoisesStep
