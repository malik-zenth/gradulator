import React from 'react';
import { Modal, Button } from "antd"


// Modal if Exam should be deleted
export const DeleteExamModal = (visible: boolean, onDelete: Function, onReturn: Function) => {
    return (
        <Modal
            title="Möchtest du die Prüfung wirklich löschen?"
            visible={visible}
            footer={[
                <Button
                    key="return"
                    type="default"
                    onClick={() => onReturn()}>Nicht löschen
                </Button>,
                <Button
                    key="submit"
                    danger
                    type="primary"
                    onClick={() => onDelete()}>Löschen
                </Button>
            ]}>
            <p>Diese Aktion kann nicht Rückgängig gemacht werden.</p>
        </Modal>
    );
}

// Modal if ExamPackage should be deleted
export const DeleteExamPackageModal = (visible: boolean, onDelete: Function, onReturn: Function) => {
    return (
        <Modal
            title="Möchtest du die Modulprüfung wirklich löschen?"
            visible={visible}
            footer={[
                <Button
                key="return"
                type="default"
                onClick={() => onReturn()}>Nicht löschen
                </Button>,
                <Button
                    key="submit"
                    danger
                    type="primary"
                    onClick={() => onDelete()}>Löschen
                </Button>
            ]}>
            <p>Dadurch werden ebenfalls alle Prüfungen innerhalb der Modulprüfung gelöscht.</p>
        </Modal>
    );
}
