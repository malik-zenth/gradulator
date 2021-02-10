import React from "react"
import PdfUpload from "../Components/PdfUpload"
import ManualDataEntry from "../Components/ManualDataEntry"
import CardPdf from "../Components/Card_PdfUpload"
import { Formular, AveragePage, Footer, Header, GradeInput } from "../Components"
import { UserInput, SingleOption, CalculationResult, Exam } from "../Data/types";
import {GradePackageAverage} from "../Components/Calculation/types"
import { Row, Col, Modal, Button, message, Card } from 'antd';
import { options } from "../Data";
import {MailLink} from "../Components/const"
import jsPDF from 'jspdf';

const ref:any = React.createRef();

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
    showModal: boolean
}

// Home Page
class Home extends React.Component<IProps, IState>{
    constructor(props: IProps) {
        super(props);
        this.state = {
            displayFormular: true,
            showModal: false, 
            selectedOption: null
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
        try{
            const pdf = new jsPDF();
            // if the name of the selected option is to long, we need to split the text "Aktueller Notenschnitt" from the selected option
            if(selectedOption.length > 40){
                pdf.text("Aktueller Notenschnitt", 10, 15)
                pdf.text(selectedOption, 10, 20)
            }else{
                pdf.text("Aktueller Notenschnitt " + selectedOption, 100, 20, {align: "center"})
            }
            // add first diagonal line
            pdf.line(0, 25, 290, 25)
            // add the content to the pdf
            this.addDataToPdf(averageData, pdf)
            // add the footer
            pdf.setFontSize(8)
            pdf.text("Dokument automatisiert auf www.gradulator.de erstellt. Alle Angaben ohne Gewähr",10,280)
            pdf.text("Dieses Dokument ist kein Prüfungszeugnis, sondern ausschließlich eine Übersicht über bisher erreichte Leistungen auf Basis der Eingaben des Nutzers. ",10,285)
            pdf.save('Gradulator_Notenschrift.pdf');
            message.success({ content: 'PDF Datei wurde erstellt und wird heruntergeladen', key, duration: 2 });
        }catch{
            // if their is an error, display error
            message.error({content: "PDF konnte nicht erstellt werden", key, duration: 2})
        }

    }

    addAverage = (averageData: CalculationResult, pdf: jsPDF, longitude: number) => {
        // add the average of the user and all other stuff displayed on average page
        pdf.setFontSize(15)
        pdf.text("Durchschnitt: " + averageData.grade.toString(), 10, longitude)
        longitude+=5
        pdf.setFontSize(12)
        if(averageData.bestAverage || averageData.worstAverage){
            pdf.setTextColor("green")
            pdf.text("Bestmöglicher Durchschnitt: " + averageData.bestAverage, 10, longitude)
            pdf.setTextColor("red")
            pdf.text("Schlechtester Möglicher Durchschnitt: " + averageData.worstAverage, 100, longitude)
            pdf.setTextColor("black")
            longitude+=10
        }
        longitude+=5
        pdf.text(averageData.completedEmphasis.toString() + " von " + averageData.requiredEmphasis.toString() + " benötigten Schwerpunkten abgeschlossen", 10, longitude)
        longitude+=5
        pdf.text(averageData.observedWeight.toString() + " von " + averageData.overallWeight.toString() + " Wertungspunkten für den Durchschnitt berücksichtigt", 10, longitude)
        longitude+=5
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
            if(single.bestPossibleGrade || single.worstPossibleGrade){
                longitude+=5
                pdf.text("Note enthält geschätzte Noten", 15, longitude)
                pdf.setTextColor("red")
                pdf.text("Bestmögliche Note: " + single.bestPossibleGrade.toString(), 75, longitude)
                pdf.setTextColor("green")
                pdf.text("Schlechteste Note: " + single.worstPossibleGrade.toString(), 125, longitude)
                pdf.setTextColor("black")
            }
            // if some grades are incomplete add them
            if(single.incomplete){
                longitude+=5
                pdf.setTextColor("red")
                pdf.text("Modul erst zu " + single.completeness + "% abgeschlossen", 15, longitude)
                pdf.setTextColor("black")
                longitude+=5
                pdf.text("Folgende Noten fehlen noch:", 15, longitude)
                single.missing.forEach((x: Exam) => {
                    longitude+=5
                    pdf.text("- " + x.name, 15, longitude)
                } )
            }
            longitude+=10
        })
        pdf.line(0, longitude, 290, longitude)
        longitude+=10
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

    setGrades = (gradeInput: UserInput[], selectedDegree: string) => {
        if(this.validateDegreeFromPdf(selectedDegree)){
        this.setState({
            inputValues: gradeInput,
            selectedDegree: selectedDegree,
            displayFormular: true
        })
        handleClick()
        }
    }

    validateDegreeFromPdf = (selectedDegree: string) => {
        if(Object.keys(options).includes(selectedDegree)) return true
        else{
            this.setState({showModal: true, selectedDegree: selectedDegree})
            return false
        }
    }

      // Modal displayed if the detected degree is not supported
  renderModal() {
    return (
      <Modal
        title="Studiengang wird nicht unterstützt"
        visible={this.state.showModal}
        footer={[
          <Button
            key="submit"
            type="primary"
            onClick={() => this.setState({ showModal: false, selectedDegree: null })}>Ok
          </Button>,
        ]}>
        <p>Der Studiengang {this.state.selectedDegree} wird aktuell leider nicht unterstützt</p>
        <p>
          Lasse uns einen der unteren Wege wissen, dass wir
          {this.state.selectedDegree} hinzufügen sollen und wir melden uns bei
          dir, sollten wir ihn hinzufügen
        </p>
        <a className="modal_link" onClick={() => (window.location.href = MailLink)}>per E-Mail</a>
        <a className="modal_link" onClick={() => window.open("https://www.linkedin.com/in/benjamin-zenth-6290681ba/","_blank")}>
          über LinkedIn
        </a>
      </Modal>
    );
  }



    render() {
        const { inputValues, selectedDegree, gradeInput, displayFormular, selectedOption, showModal } = this.state

        return (
            <div>
                <div className="content">
                    {this.renderModal()}
                    <Header
                        home={displayFormular}
                        showHome={() => this.newCalculation()} />
                    {displayFormular &&
                        <div>
                            <Row>
                                <Col xs={2} sm={2} md={2} lg={2} xl={2}></Col>
                                <Col xs={20} sm={20} md={20} lg={9} xl={9}>
                                    <CardPdf />
                                </Col>
                                <Col xs={2} sm={2} md={2} lg={2} xl={2}></Col>
                                <Col xs={2} sm={2} md={2} lg={0} xl={0}></Col>
                                <Col xs={20} sm={20} md={20} lg={0} xl={0}>
                                    <PdfUpload
                                            setGrades={(grades: UserInput[], selectedDegree: string) => this.setGrades(grades, selectedDegree)}
                                        />
                                </Col>
                                <Col xs={2} sm={2} md={2} lg={0} xl={0}></Col>
                                <Col xs={2} sm={2} md={2} lg={0} xl={0}></Col>
                                <Col xs={20} sm={20} md={20} lg={9} xl={9}>
                                    <ManualDataEntry/>
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
                                        setGrades={(grades: UserInput[], selectedDegree: string) => this.setGrades(grades, selectedDegree)}
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
                        <div ref={ref as React.RefObject<HTMLDivElement>} style={{paddingTop: 50}}>
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