import React, { useState } from 'react';
import PdfUpload from "../Components/PdfUpload"
import ManualDataEntry from "../Components/ManualDataEntry"
import CardPdf from "../Components/Card_PdfUpload"
import { Formular, AveragePage, Footer, Header, GradeInput } from "../Components"
import { UserInput, CalculationResult, Exam } from "../Data/types";
import {GradePackageAverage} from "../Components/Calculation/types"
import { Row, Col, Modal, Button, message, Card, Steps } from 'antd';
const { Step } = Steps;
import { options } from "../Data";
import { MailLink } from "../Components/const"
import jsPDF from 'jspdf';
import {isMobile, isTablet} from "react-device-detect"

const ref: any = React.createRef();

const handleClick = () =>
    ref.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
    });

interface IProps { }

// selectedDegree -> Degree from PDF Reader for GradeInput Formular
// inputValues -> InputValues from PDF for GradeInput Formular
// gradeInput -> GradeInput from User from GradeInput Formular
// displayFormular -> If Grade Input Formular should be displayed
// selectedOption -> Selected Degree from GradeInput Formular
interface IState {
    selectedDegree?: string
    inputValues?: UserInput[],
    gradeInput?: UserInput[],
    selectedOption: string,
    displayFormular: boolean,
    showModal: boolean,
    instructionsVisible: boolean,
    current: number,
    wrongSPO: boolean
}

// Home Page
class Home extends React.Component<IProps, IState>{
    constructor(props: IProps) {
        super(props);
        this.state = {
            displayFormular: true,
            showModal: false,
            selectedOption: null,
            instructionsVisible: false,
            wrongSPO: false,
            current: 0
        }
    }

    componentDidMount(){
        if(isMobile || isTablet){
        const content= document.getElementsByClassName("content")[0]
        const height: number = window.innerHeight - 60
        content.setAttribute("style", `min-height: ${height}px`)
        }
    }

    displayAverage = (gradeInput: UserInput[], selectedOption: string): void => {
        this.setState({
            gradeInput: gradeInput,
            displayFormular: false,
            selectedOption: selectedOption,
        })
    }

    newCalculation = () => {
        this.setState({
            displayFormular: true,
            inputValues: [],
            selectedDegree: null
        })
    }

    exportAsPdf = (averageData: CalculationResult, selectedOption: string) => {
        const key = 'updatable';
        try {
            const pdf = new jsPDF();
            // if the name of the selected option is to long, we need to split the text "Aktueller Notenschnitt" from the selected option
            if (selectedOption.length > 40) {
                pdf.text("Aktueller Notenschnitt", 10, 15)
                pdf.text(selectedOption, 10, 20)
            } else {
                pdf.text("Aktueller Notenschnitt " + selectedOption, 100, 20, { align: "center" })
            }
            // add first diagonal line
            pdf.line(0, 25, 290, 25)
            // add the content to the pdf
            this.addDataToPdf(averageData, pdf)
            // add the footer
            pdf.setFontSize(8)
            pdf.text("Dokument automatisiert auf www.gradulator.de erstellt. Alle Angaben ohne Gewähr", 10, 280)
            pdf.text("Dieses Dokument ist kein Prüfungszeugnis, sondern ausschließlich eine Übersicht über bisher erreichte Leistungen auf Basis der Eingaben des Nutzers. ", 10, 285)
            pdf.save('Gradulator_Notenschrift.pdf');
            message.success({ content: 'PDF Datei wurde erstellt und wird heruntergeladen', key, duration: 2 });
        } catch {
            // if their is an error, display error
            message.error({ content: "PDF konnte nicht erstellt werden", key, duration: 2 })
        }

    }

    addAverage = (averageData: CalculationResult, pdf: jsPDF, longitude: number) => {
        // add the average of the user and all other stuff displayed on average page
        pdf.setFontSize(15)
        pdf.text("Durchschnitt: " + averageData.grade.toString(), 10, longitude)
        longitude += 5
        pdf.setFontSize(12)
        if (averageData.bestAverage || averageData.worstAverage) {
            pdf.setTextColor("green")
            pdf.text("Bestmöglicher Durchschnitt: " + averageData.bestAverage, 10, longitude)
            pdf.setTextColor("red")
            pdf.text("Schlechtester Möglicher Durchschnitt: " + averageData.worstAverage, 100, longitude)
            pdf.setTextColor("black")
            longitude += 10
        }
        longitude += 5
        if(averageData.requiredEmphasis > 0){
        pdf.text(averageData.completedEmphasis.toString() + " von " + averageData.requiredEmphasis.toString() + " benötigten Schwerpunkten abgeschlossen", 10, longitude)
        longitude += 5
        }
        pdf.text(averageData.observedWeight.toString() + " von " + averageData.overallWeight.toString() + " Wertungspunkten für den Durchschnitt berücksichtigt", 10, longitude)
        longitude += 5
        pdf.text(averageData.achivedECTS.toString() + " von " + averageData.requiredECTS.toString() + " für den Durchschnitt relevanten ECTS erreicht", 10, longitude)
        return pdf
    }

    addDataToPdf = (averageData: CalculationResult, pdf: jsPDF) => {
        let longitude = 35
        // go through all single Grades and add them to the pdf.
        averageData.singleGrades.forEach((single: GradePackageAverage) => {
            pdf.setFontSize(15)
            pdf.text(single.name, 10, longitude)
            pdf.text(single.grade.toString(), 180, longitude)
            pdf.setFontSize(12)
            // if their are best of worst possible Grades given add them
            if (single.bestPossibleGrade || single.worstPossibleGrade) {
                longitude += 5
                pdf.text("Note enthält geschätzte Noten", 15, longitude)
                pdf.setTextColor("red")
                pdf.text("Bestmögliche Note: " + single.bestPossibleGrade.toString(), 75, longitude)
                pdf.setTextColor("green")
                pdf.text("Schlechteste Note: " + single.worstPossibleGrade.toString(), 125, longitude)
                pdf.setTextColor("black")
            }
            // if some grades are incomplete add them
            if (single.incomplete) {
                longitude += 5
                pdf.setTextColor("red")
                pdf.text("Modul erst zu " + single.completeness + "% abgeschlossen", 15, longitude)
                pdf.setTextColor("black")
                longitude += 5
                pdf.text("Folgende Noten fehlen noch:", 15, longitude)
                single.missing.forEach((x: Exam) => {
                    longitude += 5
                    pdf.text("- " + x.name, 15, longitude)
                })
            }
            longitude += 10
        })
        pdf.line(0, longitude, 290, longitude)
        longitude += 10
        this.addAverage(averageData, pdf, longitude)
        return pdf
    }

    editGrades = (gradeInput: UserInput[]) => {
        this.setState({
            displayFormular: true,
            inputValues: gradeInput
        })
    }

    resetInputGrades = () => {
        this.setState({
            inputValues: []
        })
    }

    resetInputGradesAndUpdateSelectedDegree = (selectedDegree: string) => {
        this.setState({
            inputValues: [],
            selectedDegree: selectedDegree
        })
    }

    setGrades = (gradeInput: UserInput[], selectedDegree: string, spo: number) => {
        if (this.validateDegreeFromPdf(selectedDegree, spo)) {
            this.setState({
                inputValues: gradeInput,
                selectedDegree: selectedDegree,
                displayFormular: true
            })
            handleClick()
        }
    }

    displayWarningBETAVersion = () => {
        message.warning("Dieser Studiengang befindet sich aktuell in einer BETA-Version", 5)
    }

    validateDegreeFromPdf = (selectedDegree: string, spo: number) => {
        if (Object.keys(options).includes(selectedDegree)){
            if(options[selectedDegree].basics.spo){
                if(options[selectedDegree].basics.spo === spo){
                    if(options[selectedDegree].basics.beta){
                        this.displayWarningBETAVersion()
                    }
                    return true
                }else{
                    this.setState({ showModal: true, selectedDegree: selectedDegree, wrongSPO: true })
                    return false
                }
            }else{
                if(options[selectedDegree].basics.beta){
                    this.displayWarningBETAVersion()
                }
                return true
            }
        }
        else {
            this.setState({ showModal: true, selectedDegree: selectedDegree })
            return false
        }
    }

    // Modal displayed if the detected degree is not supported
    renderModal() {
        const {selectedDegree, wrongSPO} = this.state
        return (
            <Modal
                title="Studiengang wird nicht unterstützt"
                visible={this.state.showModal}
                footer={[
                    <Button
                        key="submit"
                        type="primary"
                        onClick={() => this.setState({ showModal: false, selectedDegree: null, wrongSPO: false })}>Ok
          </Button>,
                ]}>
                {!wrongSPO && <p>Der Studiengang {selectedDegree} wird aktuell leider nicht unterstützt.</p>}
                {wrongSPO && <p>Der Studiengang {selectedDegree} wird in dieser SPO aktuell leider nicht unterstützt.</p>}
                <p>
                    Lasse uns über einen der unteren Wege wissen, dass wir
          {selectedDegree} hinzufügen sollen und wir melden uns bei
          dir, sollten wir ihn hinzufügen haben.
        </p>
                <a className="modal_link" onClick={() => (window.location.href = MailLink)}>E-Mail</a> kontakt@gradulator.de
            </Modal>
        );
    }

    //State handle for instruction modal
    setStateofInstruction() {
        this.setState({ instructionsVisible: true })
        this.setState({ current: 0 })
    }

    //Will render the instructions in a modal
    renderInstructions() {
        const steps = [
            {
                title: 'Studentenportal',
                content:
                    <Row>
                        <Col xs={0} sm={0} md={0} lg={24} xl={24}>
                            <div>
                                <h2>Rufe das Studentenportal auf und melde dich an</h2>
                                <p>Hinweis: Das Studentenportal erreichts du unter <a target="_blank" rel="noopener noreferrer" href="https://stud.zv.hs-heilbronn.de/">https://stud.zv.hs-heilbronn.de/</a></p>
                                <img src="static/login_portal.jpg"></img>
                            </div>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={0} xl={0}>
                            <ol style={{ paddingLeft: '16px' }}>
                                <li>Rufe das Studentenportal auf</li>
                                <li>Melde dich mit deinem Hochschulaccount an</li>
                            </ol>
                            <p>Hinweis: Das Studentenportal erreichts du unter <a target="_blank" rel="noopener noreferrer" href="https://stud.zv.hs-heilbronn.de/">https://stud.zv.hs-heilbronn.de/</a></p>
                        </Col>
                    </Row>
            },
            {
                title: 'Navigation',
                content:
                    <Row>
                        <Col xs={0} sm={0} md={0} lg={24} xl={24}>
                            <div>
                                <h2>Navigiere zur Prüfungsverwaltung und wähle anschließend den Notenspiegel aus</h2>
                                <img src="static/navigate_to_pdf.jpg"></img>
                            </div>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={0} xl={0}>
                            <ol style={{ paddingLeft: '16px' }}>
                                <li>Klicke auf Prüfungsverwaltung</li>
                                <li>Wähle anschließend Notenspiegel aus</li>
                            </ol>
                        </Col>
                    </Row>
            },
            {
                title: 'Studium',
                content:
                    <Row>
                        <Col xs={0} sm={0} md={0} lg={24} xl={24}>
                            <div>
                                <h2>Wähle anschließend deinen Studiengang aus, indem du auf das "i" klickst</h2>
                                <p>Hinweis: Klicke hierfür das kleine "i"</p>
                                <img src="static/select_studies.jpg"></img>
                            </div>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={0} xl={0}>
                            <ol style={{ paddingLeft: '16px' }}>
                                <li>Wähle anschließend deinen Studiengang aus, indem du auf das "i" klickst</li>
                            </ol>
                            <p>Hinweis: Klicke hierfür das kleine "i"</p>
                        </Col>
                    </Row>
            },
            {
                title: 'Notenspiegel',
                content:
                    <Row>
                        <Col xs={0} sm={0} md={0} lg={24} xl={24}>
                            <div>
                                <h2>Lade deinen Notenspiegel herunter</h2>
                                <p>Hinweis: Deinen Notenspiegel kannst du entweder für das Hauptstudium oder für das Grund- und Hauptstudium herunterladen</p>
                                <img src="static/download_grades.jpg"></img>
                            </div>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={0} xl={0}>
                            <ol style={{ paddingLeft: '16px' }}>
                                <li>Lade deinen Notenspiegel herunter</li>
                            </ol>
                            <p>Hinweis: Deinen Notenspiegel kannst du entweder für das Hauptstudium oder für das Grund- und Hauptstudium herunterladen</p>
                        </Col>
                    </Row>
            },
            {
                title: 'Einlesen',
                content:
                    <Row>
                        <Col xs={0} sm={0} md={0} lg={24} xl={24}>
                            <div>
                                <h2>Lese abschließend deinen Notenspiegel als .pdf auf Gradulator ein</h2>
                                <p>Hinweis: Alternativ kannst du auch gerne manuell deinen Noten eingeben</p>
                                <img src="static/upload_to_gradulator.png"></img>
                            </div>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={0} xl={0}>
                            <ol style={{ paddingLeft: '16px' }}>
                                <li>Lese abschließend deinen Notenspiegel als .pdf auf Gradulator ein</li>
                            </ol>
                            <p>Hinweis: Alternativ kannst du auch gerne manuell deinen Noten eingeben</p>
                        </Col>
                    </Row>
            },
        ];

        const next = () => {
            this.setState({ current: this.state.current + 1 });
        };

        const prev = () => {
            this.setState({ current: this.state.current - 1 })
        };

        return (
                <Modal
                    title="Anleitung zur Notenberechnung"
                    centered
                    visible={this.state.instructionsVisible}
                    width={1000}
                    onCancel={() => this.setState({ instructionsVisible: false })}
                    footer={null}
                >
                    <Row>
                        <Col xs={0} sm={0} md={0} lg={24} xl={24}>
                            <Steps current={this.state.current}>
                                {steps.map(item => (
                                    <Step key={item.title} title={item.title} />
                                ))}
                            </Steps>
                        </Col>
                    </Row>
                    <div className="steps-content">{steps[this.state.current].content}</div>
                    <div className="steps-action">
                        {this.state.current < steps.length - 1 && (
                            <Button type="primary" onClick={() => next()}>
                                Weiter
                            </Button>
                        )}
                        {this.state.current > 0 && this.state.current < steps.length && (
                            <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
                                Zurück
                            </Button>
                        )}
                        {this.state.current == steps.length && (
                            <Button onClick={() => prev()}>
                                Zurück
                            </Button>
                        )}
                    </div>
                </Modal>
        )
    }

    render() {
        const { inputValues, selectedDegree, gradeInput, displayFormular, selectedOption, showModal } = this.state

        return (
            <div>
                <div className="content">
                    {this.renderModal()}
                    {this.renderInstructions()}

                    <Header
                        home={displayFormular}
                        showHome={() => this.newCalculation()} />
                    {displayFormular &&
                        <div>
                            <Row>
                                <Col xs={2} sm={2} md={2} lg={2} xl={2}></Col>
                                <Col xs={20} sm={20} md={20} lg={9} xl={9}>
                                    <CardPdf setStateofInstruction={() => this.setStateofInstruction()}/>
                                </Col>
                                <Col xs={2} sm={2} md={2} lg={2} xl={2}></Col>
                                <Col xs={2} sm={2} md={2} lg={0} xl={0}></Col>
                                <Col xs={20} sm={20} md={20} lg={0} xl={0}>
                                    <PdfUpload
                                        setGrades={(grades: UserInput[], selectedDegree: string, spo: number) => this.setGrades(grades, selectedDegree, spo)}
                                    />
                                </Col>
                                <Col xs={2} sm={2} md={2} lg={0} xl={0}></Col>
                                <Col xs={2} sm={2} md={2} lg={0} xl={0}></Col>
                                <Col xs={20} sm={20} md={20} lg={9} xl={9}>
                                    <ManualDataEntry setStateofInstruction={() => this.setStateofInstruction()}/>
                                </Col>
                                <Col xs={2} sm={2} md={2} lg={2} xl={2}></Col>
                                <Col xs={2} sm={2} md={2} lg={0} xl={0}></Col>
                                <Col xs={20} sm={20} md={20} lg={0} xl={0}>
                                    <Formular
                                        options={options}
                                        selected={selectedDegree}
                                        inputGrades={inputValues}
                                        resetInputGradesAndUpdateSelectedDegree={(selectedDegree: string) => this.resetInputGradesAndUpdateSelectedDegree(selectedDegree)}
                                    />
                                </Col>
                                <Col xs={2} sm={2} md={2} lg={0} xl={0}></Col>
                            </Row>
                            <Row>
                                <Col xs={0} sm={0} md={0} lg={2} xl={2}></Col>
                                <Col xs={0} sm={0} md={0} lg={9} xl={9}>
                                    <PdfUpload
                                        setGrades={(grades: UserInput[], selectedDegree: string, spo: number) => this.setGrades(grades, selectedDegree, spo)}
                                    />
                                </Col>
                                <Col xs={0} sm={0} md={0} lg={2} xl={2}></Col>
                                <Col xs={0} sm={0} md={0} lg={9} xl={9}>
                                    <Formular
                                        options={options}
                                        selected={selectedDegree}
                                        inputGrades={inputValues}
                                        resetInputGradesAndUpdateSelectedDegree={(selectedDegree: string) => this.resetInputGradesAndUpdateSelectedDegree(selectedDegree)}
                                    />
                                </Col>
                                <Col xs={0} sm={0} md={0} lg={2} xl={2}></Col>
                            </Row>

                            {(selectedDegree && !showModal) &&
                                <div ref={ref as React.RefObject<HTMLDivElement>} style={{ paddingTop: 50 }}>
                                    <GradeInput
                                        options={options[selectedDegree]}
                                        inputGrades={inputValues}
                                        selectedOption={selectedDegree}
                                        displayAverage={(gradeValues: UserInput[], selectedOption: string) => this.displayAverage(gradeValues, selectedOption)}
                                        resetInputGrades={() => this.resetInputGrades()}
                                    />
                                </div>
                            }

                        </div>
                    }
                    {(!displayFormular && selectedOption) &&
                        <div id="capture">
                            <AveragePage
                                inputGrades={gradeInput}
                                selectedOption={options[selectedOption]}
                                editCalculation={(grades: UserInput[]) => this.editGrades(grades)}
                                newCalculation={() => this.newCalculation()}
                                exportAsPdf={(input: CalculationResult) => this.exportAsPdf(input, selectedOption)}
                            />
                        </div>
                    }
                </div>
                <Footer />
            </div>
        )
    }
}

export default Home