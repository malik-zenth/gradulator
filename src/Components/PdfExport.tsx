import jsPDF from 'jspdf';
import {GradePackageAverage} from "../Components/Calculation/types"
import { CalculationResult, Exam } from "../Data/types";
import { message } from 'antd';
import {numToWord} from "num-words-de"

export const exportAsPdf = (averageData: CalculationResult, selectedOption: string) => {
    const key: string = 'updatable';
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
        addDataToPdf(averageData, pdf)
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

const addAverage = (averageData: CalculationResult, pdf: jsPDF, longitude: number) => {
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

const addDataToPdf = (averageData: CalculationResult, pdf: jsPDF) => {
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
            longitude += 10
            pdf.setTextColor("red")
            pdf.text("Modul erst zu " + single.completeness + "% abgeschlossen", 15, longitude)
            pdf.setTextColor("black")
            longitude += 10
            pdf.text("Folgende Noten fehlen noch:", 15, longitude)
            single.missing.forEach((x: Exam) => {
                longitude += 5
                pdf.text("- " + x.name, 15, longitude)
            })
        }
        // if their are elevative grades add them
        if (single.missingElevtiveGrades){
            longitude += 10
            pdf.text(numToWord(single.missingElevtiveGrades.amoundMissing, {indefinite_eine: true}) + " der folgenden Wahlfachnoten fehlt noch:", 15, longitude)
            single.missingElevtiveGrades.exams.forEach((x: Exam) => {
                longitude += 5
                pdf.text("- " + x.name, 15, longitude)
            })
        }
        longitude += 10
    })
    pdf.line(0, longitude, 290, longitude)
    longitude += 10
    addAverage(averageData, pdf, longitude)
    return pdf
}