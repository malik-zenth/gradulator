import React, { useState } from 'react';
import PdfUpload from "../Components/PdfUpload"
import { Formular, AveragePage, Footer, Header, GradeInput, exportAsPdf, CardManualEntry, CardPdf } from "../Components"
import { UserInput, CalculationResult, Exam, DegreeOption } from "../Data/types";
import { Row, Col, Modal, Button, message, Card, Steps } from 'antd';
import { getDegreeByName, options, validateName } from "../Data";
import { MailLink } from "../Components/const"
import {isMobile, isTablet} from "react-device-detect"
const { Step } = Steps;
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
    invalidDegree?: string,
    displayFormular: boolean,
    showModal: boolean,
    instructionsVisible: boolean,
    current: number,
    notDisplayedEmphasis: number[],
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
            current: 0,
            notDisplayedEmphasis: [],
            invalidDegree: null
        }
    }

    componentDidMount(){
        if(isMobile || isTablet){
        const content= document.getElementsByClassName("content")[0]
        const height: number = window.innerHeight - 60
        content.setAttribute("style", `min-height: ${height}px`)
        }
    }

    displayAverage = (gradeInput: UserInput[], selectedOption: string, notDisplayedEmphasis: number[]): void => {
        this.setState({
            gradeInput: gradeInput,
            displayFormular: false,
            selectedOption: selectedOption,
            notDisplayedEmphasis: notDisplayedEmphasis
        })
    }

    newCalculation = () => {
        this.setState({
            displayFormular: true,
            inputValues: [],
            selectedDegree: null
        })
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
        if (validateName(selectedDegree)){
            const degree: DegreeOption = getDegreeByName(selectedDegree)
            if(degree.data.basics.spo){
                if(degree.data.basics.spo === spo){
                    if(degree.data.basics.beta){
                        this.displayWarningBETAVersion()
                    }
                    return true
                }else{
                    this.setState({ showModal: true, invalidDegree: degree.longName, wrongSPO: true })
                    return false
                }
            }else{
                if(degree.data.basics.beta){
                    this.displayWarningBETAVersion()
                }
                return true
            }
        }
        else {
            this.setState({ showModal: true, invalidDegree: selectedDegree })
            return false
        }
    }

    // Modal displayed if the detected degree is not supported
    renderModal() {
        const {invalidDegree, wrongSPO} = this.state
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
                {!wrongSPO && <p>Der Studiengang {invalidDegree} wird aktuell leider nicht unterstützt.</p>}
                {wrongSPO && <p>Der Studiengang {invalidDegree} wird in dieser SPO aktuell leider nicht unterstützt.</p>}
                <p>
                Lasse uns per E-Mail wissen, dass wir {invalidDegree} hinzufügen sollen und wir melden uns bei
          dir, sobald dein Studiengang unterstützt wird.
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
        const { inputValues, selectedDegree, gradeInput, displayFormular, selectedOption, showModal, notDisplayedEmphasis} = this.state

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
                                    <CardManualEntry setStateofInstruction={() => this.setStateofInstruction()}/>
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
                                        options={getDegreeByName(selectedDegree).data}
                                        inputGrades={inputValues}
                                        selectedOption={selectedDegree}
                                        notDisplayedEmphasis={notDisplayedEmphasis}
                                        displayAverage={(
                                            gradeValues: UserInput[], 
                                            selectedOption: string, 
                                            notDisplayedEmphasis: number[]) => this.displayAverage(gradeValues, selectedOption, notDisplayedEmphasis)}
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
                                selectedOption={getDegreeByName(selectedOption).data}
                                editCalculation={(grades: UserInput[]) => this.editGrades(grades)}
                                newCalculation={() => this.newCalculation()}
                                exportAsPdf={(input: CalculationResult) => exportAsPdf(input, getDegreeByName(selectedOption).longName)}
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