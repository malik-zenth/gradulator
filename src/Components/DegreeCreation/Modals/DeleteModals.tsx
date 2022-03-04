import React from 'react';
import { Modal, Button } from "antd"

interface iProps{
    visible: boolean,
    onDelete: Function,
    onReturn: Function
}


// Modal if Exam should be deleted
export const DeleteExamModal = (props: iProps) => {
    return (
        <Modal
            title="Möchtest du die Prüfung wirklich löschen?"
            onCancel={() => props.onReturn()}
            visible={props.visible}
            footer={[
                <Button
                    key="return"
                    type="default"
                    onClick={() => props.onReturn()}>Nicht löschen
                </Button>,
                <Button
                    key="submit"
                    danger
                    type="primary"
                    onClick={() => props.onDelete()}>Löschen
                </Button>
            ]}>
            <p>Diese Aktion kann nicht Rückgängig gemacht werden.</p>
        </Modal>
    );
}

// Modal if Semester Choise should be deleted
export const DeleteSemsterChoiseModal = (props: iProps) => {
    return (
        <Modal
            title="Möchtest du die Zuordnungsgruppe wirklich löschen?"
            onCancel={() => props.onReturn()}
            visible={props.visible}
            footer={[
                <Button
                    key="return"
                    type="default"
                    onClick={() => props.onReturn()}>Nicht löschen
                </Button>,
                <Button
                    key="submit"
                    danger
                    type="primary"
                    onClick={() => props.onDelete()}>Löschen
                </Button>
            ]}>
            <p>Die Gruppe wird ebenfalls von allen Prüfungen, welche ihr zugeordnet sind entfernt.</p>
        </Modal>
    );
}

// Modal if ExamPackage should be deleted
export const DeleteExamPackageModal = (props: iProps) => {
    return (
        <Modal
            title="Möchtest du die Modulprüfung wirklich löschen?"
            onCancel={() => props.onReturn()}
            visible={props.visible}
            footer={[
                <Button
                key="return"
                type="default"
                onClick={() => props.onReturn()}>Nicht löschen
                </Button>,
                <Button
                    key="submit"
                    danger
                    type="primary"
                    onClick={() => props.onDelete()}>Löschen
                </Button>
            ]}>
            <p>Diese Aktion kann nicht Rückgängig gemacht werden.</p>
        </Modal>
    );
}

// Modal if Elevative should be deleted
export const DeleteElevativeModal = (props: iProps) => {
    return (
        <Modal
            title="Möchtest du die Modulprüfung wirklich löschen?"
            onCancel={() => props.onReturn()}
            visible={props.visible}
            footer={[
                <Button
                key="return"
                type="default"
                onClick={() => props.onReturn()}>Nicht löschen
                </Button>,
                <Button
                    key="submit"
                    danger
                    type="primary"
                    onClick={() => props.onDelete()}>Löschen
                </Button>
            ]}>
            <p>Dadurch werden ebenfalls alle Prüfungen innerhalb des Wahlpflichtfaches gelöscht.</p>
        </Modal>
    );
}

// Modal if Elevative should be deleted
export const DeleteElevativeOptionModal = (props: iProps) => {
    return (
        <Modal
            title="Möchtest du die Option wirklich löschen?"
            onCancel={() => props.onReturn()}
            visible={props.visible}
            footer={[
                <Button
                key="return"
                type="default"
                onClick={() => props.onReturn()}>Nicht löschen
                </Button>,
                <Button
                    key="submit"
                    danger
                    type="primary"
                    onClick={() => props.onDelete()}>Löschen
                </Button>
            ]}>
            <p>Diese Aktion kann nicht Rückgängig gemacht werden.</p>    
        </Modal>
    );
}

// Modal if Elevative should be deleted
export const DeleteEmphasisModal = (props: iProps) => {
    return (
        <Modal
            title="Möchtest du die Modulprüfung wirklich löschen?"
            onCancel={() => props.onReturn()}
            visible={props.visible}
            footer={[
                <Button
                key="return"
                type="default"
                onClick={() => props.onReturn()}>Nicht löschen
                </Button>,
                <Button
                    key="submit"
                    danger
                    type="primary"
                    onClick={() => props.onDelete()}>Löschen
                </Button>
            ]}>
            <p>Dadurch werden ebenfalls alle Modulprüfungen innerhalb des Schwerpunktes gelöscht.</p>
        </Modal>
    );
}