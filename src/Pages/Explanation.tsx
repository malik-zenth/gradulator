import React from "react"
import { Footer, Header } from "../Components"
import { isMobile, isTablet } from "react-device-detect"
import { Card, Row, Col } from 'antd';

class Explanation extends React.Component {

    componentDidMount() {
        if (isMobile || isTablet) {
            const content = document.getElementsByClassName("content")[0]
            const height: number = window.innerHeight - 60
            content.setAttribute("style", `min-height: ${height}px`)
        }
    }

    render() {
        return (
            <div>
                <div className="content">
                    <Header home={false} />

                    <Row>
                        <Col span={1}></Col>
                        <Col span={22}>
                            <Card title="Beta Studiengang" bordered={false} style={{ maxWidth: 1000 }}>
                                <p>
                                    Sobald wir einen neuen Studiengang hinzugefügt haben versuchen wir in Zusammenarbeit mit den entsprechenden Ansprechpartnern des
                                    Studienganges die von uns aus der Studien &amp; Prüfungsordnung ausgearbeitete Berechnung zu validieren. Dieser Schritt dient der
                                    Qualitätssicherung und soll sicherstellen, dass die Berechnung absolut korrekt ist.
                                    <br></br>
                                    Ist ein Studiengang als (Beta) gekennzeichnet, so bedeutet dies, dass die Berechnung sehr wahrscheinlich korrekt ist, jedoch noch nicht
                                    validiert wurde.
                                </p>
                            </Card>
                        </Col>
                        <Col span={1}></Col>
                    </Row>

                    <Row>
                        <Col span={1}></Col>
                        <Col span={22}>
                            <Card title="Geschätzte Noten" bordered={false} style={{ maxWidth: 1000 }}>
                                <p>Wenn eine Note noch nicht bekannt ist, kann hierfür eine erwartete Note eingetragen und diese anschließend über die
                                Checkbox darunter als Schätzung markiert werden. Wenn eine Note als Schätzung markiert ist, wird die entsprechende Modulnote, welche diese
                                Note beinhaltet 3x berechnet:
                                    </p>
                                <ul>
                                    <li>1x mit der Schätzung des Nutzers als Note (wird als Note für das Modul angezeigt)</li>
                                    <li>1x mit einer 1,0 als Note (Wird als Bestmögliche Note angezeigt)</li>
                                    <li>1x mit einer 4,0 als Note (Wird als Schlechteste Note angezeigt)</li>
                                </ul>
                                    Dies hat den Grund, dass diese beiden Noten unter normalen Umständen die Extremwerte darstellen und folglich ersichtlich ist, in welchem
                                    Rahmen sich die Note noch ändern kann. Des weiteren wird der Gesamtdurchschnitt nach dem selben Muster 3x berechnet und die entsprechenden Durchschnitte angezeigt.

                                    <p className="explaination_note">
                                    Hinweis: In einzelnen Fällen ist es möglich Noten auszugleichen und somit eine 5 als Note zu erhalten. Dies wird durch die Geschätzten Noten nicht
                                    abgebildet. Um hierfür ein exaktes Ergebnis zu erhalten, muss für die ausgeglichene Note manuell eine 5 eingetragen werden.
                                    </p>
                            </Card>
                        </Col>
                        <Col span={1}></Col>
                    </Row>

                    <Row>
                        <Col span={1}></Col>
                        <Col span={22}>
                            <Card title="Unvollständige Module" bordered={false} style={{ maxWidth: 1000 }}>
                                <p>
                                    Wenn einzelne Noten eines Modules nicht eingetragen werden, wird durch eine entsprechende Meldung angezeigt, zu wieviel Prozent das
                                    Modul abgeschlossen ist. Die aktuelle Note des Modules wird jedoch mit voller Wertigkeit in den Durchschnitt einberechnet. Folglich kann
                                    die Note eines einzelnen Modules, welches erst zu einem geringen Prozentsatz abgeschlossen ist noch stark variieren. Um ein genaueres Ergebnis
                                    zu erhalten muss eine Schätzung für die angezeigten fehlenden Noten eingetragen werden.
                                </p>
                            </Card>
                        </Col>
                        <Col span={1}></Col>
                    </Row>

                    <Row>
                        <Col span={1}></Col>
                        <Col span={22}>
                            <Card title="Wertungspunkte" bordered={false} style={{ maxWidth: 1000 }}>
                                <p> Wenn alle Noten eines Modules fehlen, so wird dies auf der Ergebnissseite nicht angezeigt und nicht für den Durchschnitt berücksichtigt.
                                    Da diese jedoch für den Durchschnitt relevant ist, besitzt der angezeigte Durchschnitt eine geringere Aussagekraft, umso weniger Noten
                                    eingegeben werden.
                                    Über die angezeigten Wertungspunkte kann eingesehen werden, wie viele der für den Durchschnitt relevanten Punkte im angezeigten Durchschnitt
                                    berücksichtigt wurden. Wenn Beispielsweise 50 von 100 Wertungspunkten berücksichtigt wurden bedeutet dies, dass der aktuell angezeigte
                                    Durchschnitt 50% des finalen Durchschnitts ausmacht.
                                    <br></br>
                                    In einzelnen Fällen ist es möglich, dass z.B. durch ein zusätzliches Semester im Ausland mehr Wertungspunkte erreicht werden,
                                    als in der Notenübersicht angezeigt.
                                </p>
                            </Card>
                        </Col>
                        <Col span={1}></Col>
                    </Row>

                    <Row>
                        <Col span={1}></Col>
                        <Col span={22}>
                            <Card title="Entfernung von Schwerpunkten" bordered={false} style={{ maxWidth: 1000 }}>
                                <p> Wenn Noten von mehr Schwerpunkten eingegeben werden, als für den Abschluss benötigt werden werden die Noten des
                                    Schwerpunktes, welcher am unvollständigsten ist automatisiert entfernt und für den Durchschnitt ignoriert. Sollte dies der Fall sein,
                                    wird dies über eine entsprechende Anzeige unter "Durchschnitt" dargestellt.
                                    Soll der Durchschnitt unter Berücksichtigung des entfernten Schwerpunktes berechnet werden muss die Noteneingabe entsprechend angepasst werden.
                                </p>
                            </Card>
                        </Col>
                        <Col span={1}></Col>
                    </Row>
                </div>
                <Footer />
            </div>
        )
    }

}

export default Explanation