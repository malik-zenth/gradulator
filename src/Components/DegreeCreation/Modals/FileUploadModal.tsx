import React, { useState } from 'react';
import { Upload,Button, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import Modal from 'antd/lib/modal/Modal';
import { UploadChangeParam } from 'antd/lib/upload';
import { CreatedData } from '../types';
const { Dragger } = Upload;

interface iProps{
    onReturn: Function,
    visible: boolean,
    returnData: Function
}

export const FileUploadModal = (props: iProps) => {
    const [errorHasBeenDisplayed, setErrorDisplayed] = useState<boolean>(false)

    const handleChange = (info: UploadChangeParam) => {
        if(info.file.type != "application/json"){
            info.file.status = "error"
            if(!errorHasBeenDisplayed){
                setErrorDisplayed(true)
                message.error(`${info.file.name} ist keine .json Datei`);
            }
            return
        }
        try{
            const file = info.file.originFileObj
            const fileReader = new FileReader()
            fileReader.readAsText(file)
            let data: CreatedData
            fileReader.onload = (e: any) => {
                const data: CreatedData = JSON.parse(e.target.result)
                props.returnData(data)
            }

        }catch (e){
            message.error("Die Datei konnte nicht eingelesen werden")
        }


    }

    const dragger = () => {
        return(
            <Dragger onChange={(e) => handleChange(e)} showUploadList={false} style={{minHeight: '217px'}}>
            <p className="ant-upload-drag-icon">
                <InboxOutlined />
            </p>
            <p className="ant-upload-text">Zwischengespeicherte Datei per Drag & Drop einlesen</p>
        </Dragger>
        )
    }

    return(
        <Modal
            title="Datei einlesen"
            visible={props.visible}
            onCancel={() => props.onReturn()}
            footer={[
                <Button
                    key="return"
                    type="default"
                    onClick={() => props.onReturn()}>Zurück
                </Button>
            ]}>
            {dragger()}
        </Modal>
    )
}