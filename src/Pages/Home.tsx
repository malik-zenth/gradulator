import React from "react"
import PdfUpload from "../Components/PdfUpload"
import ManualDataEntry from "../Components/ManualDataEntry"
import { Formular, AveragePage, Footer, Header, GradeInput } from "../Components"
import { UserInput, SingleOption } from "../Data/types";
import { Row, Col, Modal, Button, message } from 'antd';
import { options } from "../Data";
import {MailLink} from "../Components/const"
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

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

    exportAsPdf = () => {
        const key = 'updatable';
        const input = document.getElementById('capture');
        const resultPage = document.querySelector('.result-page')
        // @ts-ignore: Unreachable code error
        html2canvas(resultPage, {scrollY: -window.scrollY})
        .then(function(canvas: any) {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF();
            const imgProps= pdf.getImageProperties(imgData);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
            pdf.addImage(imgData, 'PNG', 0, 20, pdfWidth, pdfHeight);
            pdf.save('Gradulator_Notenschrift.pdf');
        });
          message.success({ content: 'PDF Datei wurde erstellt und wird heruntergeladen', key, duration: 2 });
        ;
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
                                <Col span={2}></Col>
                                <Col span={9}>
                                    <PdfUpload
                                        setGrades={(grades: UserInput[], selectedDegree: string) => this.setGrades(grades, selectedDegree)}
                                    />
                                </Col>
                                <Col span={2}></Col>
                                <Col span={9}>
                                    <ManualDataEntry/>

                                    <Formular
                                    options={options}
                                    selected={selectedDegree}
                                    inputGrades={inputValues}
                                    resetInputGradesAndUpdateSelectedDegree={(selectedDegree: string) => this.resetInputGradesAndUpdateSelectedDegree(selectedDegree)}
                                />

                                </Col>
                                <Col span={2}></Col>
                            </Row>

                        {(selectedDegree && !showModal) &&
                        <GradeInput
                            options={options[selectedDegree]}
                            inputGrades={inputValues}
                            selectedOption={selectedDegree}
                            displayAverage={(gradeValues: UserInput[], selectedOption: string) => this.displayAverage(gradeValues, selectedOption)}
                            resetInputGrades={() => this.resetInputGrades()}
                        />
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
                            exportAsPdf={() => this.exportAsPdf()}
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