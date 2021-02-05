import {BasicInformation, ExamPackages, Exams, SingleOption} from "./types"

const mid_basic_data: BasicInformation = {
    name: "Master Wirtschaftsinformatik",
    weight: 90,
    ects: 90,
    required_emphasis: 0,
    emphasis: []
}

const mid_exams: Exams = {
    285101: {
        semester: 1,
        ects: 5,
        weight: 5,
        name: "Data Science Grundlagen",
        packageid: 285100
    },
    285102: {
        semester: 1,
        ects: 5,
        weight: 5,
        name: "Data Science Management",
        packageid: 285100
    },
    285111: {
        semester: 1,
        ects: 5,
        weight: 5,
        name: "Strategisches Informationsmanagement",
        packageid: 285110
    },
    285112: {
        semester: 1,
        ects: 5,
        weight: 5,
        name: "Projektstudie Informationsmanagement",
        packageid: 285110
    },
    285121: {
        semester: 1,
        ects: 5,
        weight: 5,
        name: "Digitale Geschäftsmodelle",
        packageid: 285120
    },
    285122: {
        semester: 2,
        ects: 5,
        weight: 5,
        name: "Leadership & Entrepreneurship",
        packageid: 285120
    },
    285131: {
        semester: 1,
        ects: 5,
        weight: 5,
        name: "Wissenschafts- und Forschungsmethoden",
        packageid: 285130
    },
    285132: {
        semester: 2,
        ects: 5,
        weight: 5,
        name: "Forschungsstudie: Digitale Unternehmen",
        packageid: 285130
    },
    285141: {
        semester: 2,
        ects: 5,
        weight: 5,
        name: "Skalierbares IT-Management",
        packageid: 285140
    },
    285142: {
        semester: 2,
        ects: 5,
        weight: 5,
        name: "Skalierbare IT-Systemarchitekturen",
        packageid: 285140
    },
    285151: {
        semester: 2,
        ects: 5,
        weight: 5,
        name: "Datengetriebene Produkte",
        packageid: 285150
    },
    285152: {
        semester: 2,
        ects: 5,
        weight: 5,
        name: "Projektstudie Datengetriebene Produkte",
        packageid: 285150
    },
    285161: {
        semester: 3,
        ects: 5,
        weight: 5,
        name: "Persönlichkeits- und Teamkompetenzen",
        packageid: 285160
    },
    285162: {
        semester: 3,
        ects: 5,
        weight: 5,
        name: "Masterkolloquium",
        packageid: 285160
    },
    285163: {
        semester: 3,
        ects: 5,
        weight: 5,
        name: "Master Thesis",
        packageid: 285160
    }
}

const mid_ExamPackages: ExamPackages = {
    285100: {
        name: "Data Science als Grundlage für datengetriebene Produkte",
        weight: 10,
        required: [285101,285102]
    },
    285110: {
        name: "Informationsmanagement als Basis der Digitalisierung",
        weight: 10,
        required: [285111,285112]
    },
    285120: {
        name: "Digitale Geschäftsmodelle und Leadership",
        weight: 10,
        required: [285121,285122]
    },
    285130: {
        name: "Methoden der Wirtchaftsinformatik",
        weight: 10,
        required: [285131,285132]
    },
    285140: {
        name: "Skalierbares IT-Management und Systemarchitekturen",
        weight: 10,
        required: [285141,285142]
    },
    285150: {
        name: "Datengetriebene Produkte für die Digitalisierung",
        weight: 10,
        required: [285151, 285152]
    },
    285160: {
        name: "Abschlussmodul Master",
        weight: 30,
        required: [285161,285162,285163]
    }
}

export const mid: SingleOption = {
    basics: mid_basic_data,
    exams: mid_exams,
    examPackages: mid_ExamPackages
}