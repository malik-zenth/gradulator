import { BasicInformation, ExamPackages, Exams, SingleOption } from "./types";

const se_basic_data: BasicInformation = {
    name: "Software Engineering",
    weight: 120,
    ects: 114.5,
    spo: 4,
    required_emphasis: 1,
    emphasis: [{
        ids: [262150, 262151],
        name: "Digitale Transformation",
        weight: 18,
        emphasisid: 1
    },
    {
        ids: [262191, 262190],
        name: "Games Engineering",
        weight: 18,
        emphasisid: 2
    },
    {
        ids: [262145, 262149],
        name: "Systems Enginerring",
        weight: 18,
        emphasisid: 3
    }]
}

const se_exams: Exams = {
    262057: {
        semester: 3,
        ects: 3,
        weight: 3,
        name: "Signalverarbeitung 2",
        packageid: 262070
    }, 262024:
    {
        semester: 3,
        ects: 3,
        weight: 3,
        name: "Datensicherheit und Kryptographie",
        packageid: 262070
    }, 262052:
    {
        semester: 3,
        ects: 6,
        weight: 0,
        name: "Algorithmen und Datenstrukturen",
        packageid: 262050
    }, 262055:
    {
        semester: 3,
        ects: 3,
        weight: 3,
        name: "Grundlagen verteilter Systeme",
        packageid: 262050
    }, 262058:
    {
        semester: 3,
        ects: 5,
        weight: 5,
        name: "Datenbanken 1",
        packageid: 262060
    }, 262051:
    {
        semester: 3,
        ects: 3,
        weight: 0,
        name: "Developer-Tools des SE",
        packageid: 262060
    }, 262063:
    {
        semester: 3,
        ects: 4,
        weight: 0,
        name: "Projektmanagement und Tools des SW Engineering",
        packageid: 262060
    }, 262061:
    {
        semester: 3,
        ects: 3,
        weight: 3,
        name: "Software Engineering komplexer Systeme",
        packageid: 262060
    }, 262053:
    {
        semester: 4,
        ects: 6,
        weight: 6,
        name: "Theoretische Informatik",
        packageid: 262050
    }, 262062:
    {
        semester: 4,
        ects: 3,
        weight: 3,
        name: "DevOps",
        packageid: 262050,
    }, 262009:
    {
        semester: 4,
        ects: 6,
        weight: 6,
        name: "Logik und Künstliche Intelligenz",
        packageid: 262070,
    }, 262147:
    {
        semester: 4,
        ects: 3,
        weight: 3,
        name: "Informationssicherheit",
        packageid: 262070,
    }, 262081:
    {
        semester: 4,
        ects: 12,
        weight: 12,
        name: "Labor für Software-Projekte und Project Skills",
        packageid: 262110,
    }, 262123:
    {
        semester: 6,
        ects: 6,
        weight: 6,
        name: "ERP-Systeme",
        packageid: 262150,
        emphasisid:1
    }, 262125:
    {
        semester: 6,
        ects: 6,
        weight: 6,
        name: "Datenanalyse in Unternehmen",
        packageid: 262150,
        emphasisid:1
    }, 262124:
    {
        semester: 7,
        ects: 6,
        weight: 6,
        name: "Data Science im Unternehmenskontext",
        packageid: 262151,
        emphasisid:1
    }, 262194:
    {
        semester: 6,
        ects: 9,
        weight: 9,
        name: "Games Engines",
        packageid: 262191,
        emphasisid:2
    }, 262193:
    {
        semester: 7,
        ects: 9,
        weight: 9,
        name: "Labor Games",
        packageid: 262190,
        emphasisid:2
    }
    , 262142:
    {
        semester: 6,
        ects: 12,
        weight: 12,
        name: "Embedded Systems",
        packageid: 262145,
        emphasisid:3
    }, 262143:
    {
        semester: 7,
        ects: 6,
        weight: 6,
        name: "Integrated Sensors",
        packageid: 262149,
        emphasisid:3
    }, 262159:
    {
        semester: 7,
        ects: 2,
        weight: 0,
        name: "Bachelorkolloquium",
        packageid: 262910,
    }, 262160:
    {
        semester: 7,
        ects: 10,
        weight: 1,
        name: "Bachelor Thesis",
        packageid: 262910,
    }, 262135:
    {
        semester: 5,
        ects: 30,
        weight: 0,
        name: "Praktisches Studiensemester und Praktikantenkolloquium",
        packageid: 262135,
        ignored: true
    },
    262170: {
        semester: 6,
        ects: 6,
        weight: 0,
        name: "Studium Generale",
        packageid: 262170,
        ignored: true
    }
}

const se_ExamPackages: ExamPackages = {
    262070: {
        name: "Angewandte Mathematik",
        weight: 15,
        required: [262009,262057, 262024, 262147]
    }, 262050:
    {
        name: "Algorithmen, Theorie und Verteilung",
        weight: 18,
        required: [262053,262055, 262062]
    }, 262060:
    {
        name: "Labor für Softwareentwicklung 1",
        weight: 15,
        required: [262058, 262061, 262051, 262063]
    }, 262110:
    {
        name: "Labor für Softwareentwicklung 2",
        weight: 12,
        required: [262081]
    }, 262150:
    {
        name: "Digitale Transformation 1",
        weight: 12,
        required: [262123,262125]
    }, 262151:
    {
        name: "Digitale Transformation 2",
        weight: 6,
        required: [262124]
    }, 262191:
    {
        name: "Games Engineering 1",
        weight: 9,
        required: [262194]
    }, 262199:
    {
        name: "Games Engineering 2",
        weight: 9,
        required: [262193]
    }, 262145:
    {
        name: "Systems Engineering 1",
        weight: 12,
        required: [262142]
    },
    262149: {
        name: "Systems Engineering 2",
        weight: 6,
        required: [262143]
    }, 262910:
    {
        name: "Bachelor Thesis und Kolloquium",
        weight: 18,
        required: [262160, 262170, 262159]
    },
    262135: {
        name: "Praktisches Studiensemester und Praktikantenkolloqium",
        weight: 0,
        required: [262135],
        ignored: true
    }
}

export const se : SingleOption = {
    basics: se_basic_data,
    exams: se_exams,
    examPackages: se_ExamPackages
}