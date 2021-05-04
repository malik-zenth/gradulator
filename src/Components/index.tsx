// this is where all Components get importet and exported, so we only need one Import inside of each Page
import Formular from "./Formular"
import AveragePage from "./AveragePage"
import Footer from "./Footer"
import Header from "./Header"
import GradeInput from "./GradeInput"
import ScrollToTop from "./ScrollToTop"
import {exportAsPdf} from "./PdfExport"
import CardManualEntry from "./Card_ManualEntry"
import CardPdf from "./Card_PdfUpload"

export {
    Formular,
    AveragePage,
    Footer,
    Header,
    GradeInput,
    ScrollToTop,
    exportAsPdf,
    CardManualEntry,
    CardPdf
}