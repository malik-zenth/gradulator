import { Button } from "antd"
import Modal from "antd/lib/modal/Modal"
import React from "react"

interface iProps{
    setShowExplaination: Function,
    currentStep: number,
    visible: boolean
}

export const Explaination = (props: iProps) => {
    if(props.currentStep === 1){
        return(
            <Modal
                title="Zuordnung"
                onCancel={() => props.setShowExplaination(false)}
                visible={props.visible}
                footer={[
                    <Button
                    key="return"
                    type="default"
                    onClick={() => props.setShowExplaination(false)}
                    >
                    Zurück
                    </Button>
                ]}
            >
                <div>
                    <p>Im Normalfall (was dir sicher bekannt ist, wenn du dir schon einmal das Formular zur Notenberechnung angeschaut hast) können die Prüfungen
                        einem eindeutigen Semester zugeordnet werden, in welchem diese laut Studien- und Prüfungsordnung absolviert werden sollten.
                        <br></br>
                        In einzelnen Fällen kann es jedoch vorkommen, dass eine Prüfung z.B. im Rahmen eines Wahlfaches in mehreren unterschiedlichen Semester erfüllt werden kann.
                        Ein solcher Fall ist unterhalb am Beispiel des Studiengangs "Tourismusmanagement" dargestellt. 
                        <img className="imageDegreeCreatorExplaination" src="static/degreeCreatorSemesterChoises.png"></img>
                        Hier werden die Noten für das Wahlfach losgelöst von den 
                        Semester angezeigt. Sollte im Studiengang, welchen du hinzufügen möchtest ebenfalls eine solche alternative Zuordnung benötigt sein kannst du in diesem 
                        Schritt diese Gruppen erstellen, welchen zu im nächsten Schritt dann einzelne Prüfungen bei der Erstellung zuordnen kannst.
                        <br></br>
                        Sollte dies nicht der Fall sein kannst du direkt mit dem nächsten Schritt fortfahren.
                        
                    </p>
                </div>
            </Modal>
        )
    }
    if(props.currentStep === 2){
        return(
            <Modal
                title="Prüfungen"
                onCancel={() => props.setShowExplaination(false)}
                visible={props.visible}
                footer={[
                    <Button
                    key="return"
                    type="default"
                    onClick={() => props.setShowExplaination(false)}
                    >
                    Zurück
                    </Button>
                ]}
            >
                <div>
                    <p>Füge in diesem Schritt alle einzelnen Prüfungen des Studiengangs hinzu. Du findest diese in der Regel in 
                        einer oder mehreren Tabellen im Kapitel Hauptstudium. Das Grundstudium ist für den Durchschnitt nicht relevant und kann deswegen ignoriert werden.
                        <br></br>
                        Gehe am besten die einzelnen Semester durch und füge jede einzelne Prüfung hinzu. Denke hierbei auch an Prüfungen, welche in weiteren Tabellen 
                        der Studien- und Prüfungsordnung abgebildet sind. Dies können zum Beispiel Prüfungen sein, welche für einen Schwerpunkt oder ein Wahlfach benötigt werden.
                        <br></br>
                        Prüfungen, wie z.B. das Praxissemester, welche zwar abgeschlossen werden müssen, aber nicht für den Durchschnitt relevant sind müssen nicht hinzugefügt werden.
                        <br></br>
                        <img className="imageDegreeCreatorExplaination" src="static/degreeCreatorExam.png"></img>
                        Trage für jede Prüfung die Prüfungsnummer (Ist für den PDF-Upload relevant), den Namen, das vorgesehene Semester (oder wähle alternativ eine Zuordnungsgruppe aus) und die ECTS ein. 
                        
                    </p>
                </div>
            </Modal>
        )
    }
    if(props.currentStep === 3){
        return(
            <Modal
                title="Modulprüfungen"
                onCancel={() => props.setShowExplaination(false)}
                visible={props.visible}
                footer={[
                    <Button
                    key="return"
                    type="default"
                    onClick={() => props.setShowExplaination(false)}
                    >
                    Zurück
                    </Button>
                ]}
            >
                <div>
                    <p>Füge in diesem Schritt alle Modulprüfungen hinzu. Bei einer Modulprüfung handelt es sich um ein Modul bzw. eine Gruppierung mehrerer einzelner Prüfungsleistungen.
                        <br></br>
                        Modulprüfungen sind typischerweise die Noten, welche später im Zeugnis zu sehen und für den Durchschnitt relevant sind. Beachte, dass du Modulprüfungen, bei 
                        welchen es sich um Wahlfächer handelt erst im nächsten Schritt hinzufügen musst. Ignoriere diese in diesem Schritt.
                        <br></br>
                        <img className="imageDegreeCreatorExplaination" src="static/degreeCreatorExamPackages.png"></img>
                        Du findest die Modulprüfungen typischerweise in einer seperaten Tabelle. Trage für jede Modulprüfung den Name, die EDV-Nummer und die Gewichtung ein. Bei der 
                        Gewichtung handelt es sich um den Anteil, welchen die Modulprüfung an Gesamtschnitt hat.
                        <br></br>
                        Ordne der Modulprüfung per Drag-and-Drop einzelne Prüfungen hinzu und trage für jede Prüfung die Gewichtung (grün) innerhalb der Modulprüfung ein. Im oberen
                        Beispiel besitzen 2 Prüfungen eine Gewichtung von 4, während die 3. eine Gewichtung von 2 besitzt. Das Gesamte Modul zählt mit 10 Gewichtungspunkten 
                        in den Gesamtschnitt.
                    </p>
                </div>
            </Modal>
        )
    }
    if(props.currentStep === 4){
        return(
            <Modal
                title="Wahlfächer"
                onCancel={() => props.setShowExplaination(false)}
                visible={props.visible}
                footer={[
                    <Button
                    key="return"
                    type="default"
                    onClick={() => props.setShowExplaination(false)}
                    >
                    Zurück
                    </Button>
                ]}
            >
                <div>
                    <p>Füge in diesem Schritt alle Modulprüfungen hinzu, bei welchen es sich um Wahlfächer handelt. Eine Modulprüfung ist ein Wahlfach, 
                        wenn z.B. aus einer Auswahl von 5 Prüfungen 2 abgeschlossen werden müssen, um die Modulprüfung zu vollenden.
                        <br></br>
                        Typischerweise findest du Wahlfächer und deren Optionen innerhalb seperater Tabellen. Trage für jedes Wahlfach den Name, die EDV-Nummer 
                        und die Gewichtung ein. Wähle außerdem die Einheit, in welcher das abschließen der Modulprüfung gemessen wird.
                        <br></br>
                        Erstelle im nächsten Schritt Optionen, über welche die Modulprüfung abgeschlossen werden kann. In den meisten Fällen wird es nur eine 
                        Option geben (z.B. aus einer Auswahl von 10 Prüfungen müssen 2 abgeschlossen werden). In einzelnen Studiengängen kann ein Wahlfach über 
                        mehrere Optionen abgeschlossen werden. In diesen Fällen können mehrere Optionen hinzugefügt werden und allen jeweils die entsprechenden 
                        Prüfungen zugeordnet. Beispiel für so einen Fall ist, wenn z.B. entweder 2 Buchhaltungsprüfungen oder 2 Marketingprüfungen abgeschlossen werden
                        müssen.
                    </p>
                </div>
            </Modal>
        )
    }
    if(props.currentStep === 5){
        return(
            <Modal
                title="Schwerpunkte"
                onCancel={() => props.setShowExplaination(false)}
                visible={props.visible}
                footer={[
                    <Button
                    key="return"
                    type="default"
                    onClick={() => props.setShowExplaination(false)}
                    >
                    Zurück
                    </Button>
                ]}
            >
                <div>
                    <p>Füge in diesem Schritt ggf. vorhandene Schwerpunkte des Studiengangs hinzu. Bei Schwerpunkten handelt es sich um Vertiefungsmöglichkeiten, 
                        welche typischerweise über mehrere Semester oder das gesamte Studium hinweggehen.
                        <br></br>
                        Trage für jeden Schwerpunkt den Name und die Gewichtung innerhalb des Gesamtschnittes ein. 
                        Die Checkbox "Eine Note" legt fest, ob der Schwerpunkt als eine Modulnote für den Gesamtschnitt und das Zeugnis
                        zählt oder ob jede Modulnote einzeln gezählt wird.
                        <br></br>
                        Ordne anschließend dem Schwerpunkt seine 
                        Modulprüfungen hinzu. Die benötigten Informationen für die Schwerpunkte findest du typischerweise in extra Tabellen innerhalb der 
                        Studien- und Prüfungsordnung.
                    </p>
                </div>
            </Modal>
        )
    }
    if(props.currentStep === 6){
        return(
            <Modal
                title="Allgemeine Informationen"
                onCancel={() => props.setShowExplaination(false)}
                visible={props.visible}
                footer={[
                    <Button
                    key="return"
                    type="default"
                    onClick={() => props.setShowExplaination(false)}
                    >
                    Zurück
                    </Button>
                ]}
            >
                <div>
                    <p>
                        Trage in diesem vorletzten Schritt einige allgemeine Informationen zu deinem Studiengang ein. Diese sind der Name, das Kürzel des Studiengangs,
                        die benötigte Anzahl an Schwerpunkten, welche abgeschlossen werden müssen (wenn keine Schwerpunkte vorhanden sind 0) und die SPO.
                    </p>
                </div>
            </Modal>
        )
    }
    if(props.currentStep === 7){
        return(
            <Modal
                title="Übersicht"
                onCancel={() => props.setShowExplaination(false)}
                visible={props.visible}
                footer={[
                    <Button
                    key="return"
                    type="default"
                    onClick={() => props.setShowExplaination(false)}
                    >
                    Zurück
                    </Button>
                ]}
            >
                <div>
                    <p>
                        Glückwunsch - Du hast den Studiengang erfolgreich erstellt! Kontrolliere in dieser Übersicht deine Eingaben und sende anschließend die Informationen 
                        an unsere Kontaktdaten. Wir werden die Daten innerhalb kürzester Zeit (in der Regel weniger als eine Woche) überprüfen und anschließend vorläufig 
                        auf der Seite veröffentlichen. 
                        <br></br>
                        Ferner werden wir versuchen die Daten mit entsprechenden Ansprechpartnern des Studiengangs zu validieren.
                    </p>
                </div>
            </Modal>
        )
    }
    return <div/>

}
