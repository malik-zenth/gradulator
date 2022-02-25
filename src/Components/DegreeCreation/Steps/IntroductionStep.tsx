import { List } from "antd"
import Avatar from "antd/lib/avatar/avatar"
import React, { useContext } from "react"
import { CreatorContext } from "../CreatorContext"

interface iProps{

}

const IntroductionStep = (props: iProps) => {
    
    const listData = [
        {
            titel: "Erklärung",
            desc: "Allgemeine Erklärung der Funktionalität"
        },
        {
            titel: "Prüfungen",
            desc: "In diesem Schritt werden alle einzelnen Prüfungen des Studiengangs hinzugefügt"
        },
        {
            titel: "Modulprüfungen",
            desc: "In diesem Schritt werden alle Modulprüfungen erstellt und die erstellten diesen zugeordnet. Beachte, dass Modulprüfungen, bei welchen es sich um Wahlfächer handelt erst im nächsten Schritt hinzugefügt werden."
        },
        { 
            titel: "Wahlfächer",
            desc: "In diesem Schritt werden alle Modulprüfungen, bei welchen es sich um Wahlfächer handelt hinzugefügt. Sollten keine Wahlfächer vorhanden sein, kann dieser übersprungen werden"
        },
        { 
            titel: "Schwerpunkte",
            desc: "In diesem Schritt werden alle Schwerpunkte des Studiengangs erstellt und ihnen die jeweiligen Modulprüfungen zugeordnet"
        },
        {
            titel: "Allgemeine Informationen",
            desc: "In diesem Schritt werden allgemeine Informationen zum Studiengang hinzugefügt"
        },
        {
            titel: "Übersicht",
            desc: "Der letzte Schritt bietet eine Übersicht über den erstellten Studiengang. Vergesse hier nicht die Daten abzuschicken."
        }
    ]

    return(
        <div className="singleStepDegreeCreator">
            <h2 className="imprint-heading">Studiengang hinzufügen</h2>
            <p>
                So funktionierts: Du nutzt diese Funktionalität, um alle notwendigen Informationen zu deinem Studiengang einzutragen und sendest und anschließend 
                alle Daten zu. Wir checken im Anschluss deine Daten gegen und versuchen die Eingaben mit Ansprechpartner:innen des Studiengangs entsprechend zu validieren.
                Unser Check dauert in der Regel nicht länger als eine Woche, sprich du und deine Kom­mi­li­to­nen können bereits nach kurzer Zeit ihren Durchschnitt über den
                Gradulator berechnen.
                <br></br><br></br>
                Alles was du benötigst, um deinen Studiengang hinzuzufügen ist die "Studien- und Prüfungsordnung" deines Studiengangs, welche du auf der Internetseite der 
                Hochschule-Heilbronn findest. Auf der Detailseite deines Studiengangs findest du die Studien- und Prüfungsordnung unterhalb unter Dokumente zum Studiengang. 
            </p>
            <h3 className="imprint-heading">Funktionalitäten</h3>
            <p>
                Im Header des Formulares kann der aktuelle Schritt eingesehen werden. Zusätzlich kann hier zwischen den Schritten navigiert werden. 
                Es ist ebenfalls möglich die aktuell eingetragenen Daten in einer lokalen Datei zwischenzuspeichern und eine Datei einzulesen, sollte an einem 
                Studiengang weitergearbeitet werden.
            </p>

            <h3 className="imprint-heading">Aufbau</h3>
            <p>
                Das Formular ist in die folgenden 7 Schritte aufgeteilt. Sollte dir die untere Beschreibung nicht genügen gibt es bei jedem Schritt eine Anleitung mit weiteren 
                Informationen.
            </p>
            <List
                dataSource={listData}
                itemLayout="horizontal"
                renderItem={(single, index) => (
                    <List.Item>
                        <List.Item.Meta
                            avatar={<Avatar style={{ color: 'white', backgroundColor: '#1890ff' }}>{index+1}</Avatar>}
                            title={single.titel}
                            description={single.desc}
                        />
                    </List.Item>
                )}
            >
            </List>

            

        </div>
    )
}

export default IntroductionStep