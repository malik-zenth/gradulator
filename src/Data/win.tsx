import { BasicInformation, ExamPackages, Exams, SingleOption } from "./types";

const win_basic_data: BasicInformation = {
    ects: 114.5,
    required_emphasis: 2,
    emphasis: [{
        ids: [282060, 282061, 282062, 282063],
        name: "Entwicklung webbasierter und mobiler Systeme",
        weight: 35,
        emphasisid: 1
    },
    {
        ids: [282080, 282081, 282082, 282083],
        name: "IT-Management",
        weight: 35,
        emphasisid: 2
    },
    {
        ids: [282090, 282091, 282092, 282093],
        name: "Social Media Management",
        weight: 35,
        emphasisid: 3
    }]
}

const win_exams: Exams = {
    282130: {
        semester: 3,
        ects: 5,
        weight: 5,
        name: "Softwaretechnik und mobile Systeme",
        packageid: 282010
    }, 282011:
    {
        semester: 3,
        ects: 5,
        weight: 5,
        name: "Praxis betrieblicher Informationssysteme",
        packageid: 282011
    }, 282133:
    {
        semester: 3,
        ects: 4,
        weight: 4,
        name: "Praktische Anwendung des Online-Marketings",
        packageid: 282012
    }, 282134:
    {
        semester: 3,
        ects: 2,
        weight: 2,
        name: "Marktforschung",
        packageid: 282012
    }, 282135:
    {
        semester: 3,
        ects: 4,
        weight: 4,
        name: "Betriebwirtschaftliche Datenanalyse",
        packageid: 282012
    }, 282136:
    {
        semester: 3,
        ects: 2.5,
        weight: 2.5,
        name: "Proseminar",
        packageid: 282013
    }, 282014:
    {
        semester: 3,
        ects: 5,
        weight: 5,
        name: "IT-Recht und IT-Sicherheit",
        packageid: 282014
    }, 282171:
    {
        semester: 7,
        ects: 5,
        weight: 5,
        name: "Bachelorkolloquium",
        packageid: 282015
    }, 282172:
    {
        semester: 7,
        ects: 12,
        weight: 12,
        name: "Bachelor Thesis",
        packageid: 282015
    }, 282160:
    {
        semester: 4,
        ects: 5,
        weight: 5,
        name: "Projektstudie Entwicklung von mobilen Unternehmensanwendungen",
        packageid: 282060,
        emphasisid:1
    }, 282161:
    {
        semester: 4,
        ects: 5,
        weight: 5,
        name: "Fallstudie Entwicklungswerkzeuge",
        packageid: 282061,
        emphasisid:1
    }, 282162:
    {
        semester: 4,
        ects: 5,
        weight: 5,
        name: "Seminar Unternehmensanwendungen",
        packageid: 282061,
        emphasisid:1
    }, 282163:
    {
        semester: 6,
        ects: 5,
        weight: 5,
        name: "Enterprice Information Systems Architectures",
        packageid: 282062,
        emphasisid:1
    }, 282164:
    {
        semester: 6,
        ects: 5,
        weight: 5,
        name: "Project Study Enerprice Information Systems",
        packageid: 282062,
        emphasisid:1
    }, 282166:
    {
        semester: 7,
        ects: 5,
        weight: 5,
        name: "Projektstudie IT-Systeme",
        packageid: 282063,
        emphasisid:1
    }, 282165:
    {
        semester: 6,
        ects: 5,
        weight: 5,
        name: "Seminar IT-Systems",
        packageid: 282063,
        emphasisid:1
    }, 282180:
    {
        semester: 4,
        ects: 5,
        weight: 5,
        name: "Projektstudie Informationsmanagement",
        packageid: 282080,
        emphasisid:2
    }, 282181:
    {
        semester: 4,
        ects: 5,
        weight: 5,
        name: "Geschäftsprozessmanagement",
        packageid: 282081,
        emphasisid:2
    }
    , 282182:
    {
        semester: 4,
        ects: 5,
        weight: 5,
        name: "Fallstudie IT Strategie und Service Management",
        packageid: 282081,
        emphasisid:2
    }, 282183:
    {
        semester: 6,
        ects: 5,
        weight: 5,
        name: "Business Intelligence",
        packageid: 282082,
        emphasisid:2
    }, 282184:
    {
        semester: 6,
        ects: 5,
        weight: 5,
        name: "Project Study Analytic Information Systems and Data Science",
        packageid: 282082,
        emphasisid:2
    }, 282185:
    {
        semester: 6,
        ects: 5,
        weight: 5,
        name: "Seminar IT Management and Compliance",
        packageid: 282083,
        emphasisid:2
    }, 282186:
    {
        semester: 7,
        ects: 5,
        weight: 5,
        name: "Projektstudie IT Management",
        packageid: 282083,
        emphasisid:2
    }, 282190:
    {
        semester: 4,
        ects: 5,
        weight: 5,
        name: "Projektstudie Social Relationship Management",
        packageid: 282090,
        emphasisid:3
    }, 282191:
    {
        semester: 4,
        ects: 2.5,
        weight: 2.5,
        name: "Social Relationship Management",
        packageid: 282090,
        emphasisid:3
    }, 282193:
    {
        semester: 4,
        ects: 5,
        weight: 5,
        name: "Usability und audiovisuelle Kommunikation",
        packageid: 282092,
        emphasisid:3
    }, 282192:
    {
        semester: 4,
        ects: 2.5,
        weight: 2.5,
        name: "Social Media Intelligence",
        packageid: 282090,
        emphasisid:3
    }, 282194:
    {
        semester: 6,
        ects: 5,
        weight: 5,
        name: "Social Media Management",
        packageid: 282091,
        emphasisid:3
    }, 282195:
    {
        semester: 6,
        ects: 5,
        weight: 5,
        name: "Seminar Social Media Management and Intelligence",
        packageid: 282091,
        emphasisid:3
    }, 282196:
    {
        semester: 6,
        ects: 5,
        weight: 5,
        name: "Project Study Social Media Management and Audiovisual Communication",
        packageid: 282092,
        emphasisid:3
    }, 282197:
    {
        semester: 7,
        ects: 5,
        weight: 5,
        name: "Projektstudie Social Media im Unternehmenskontext",
        packageid: 282093,
        emphasisid:3
    }
}

const win_ExamPackages: ExamPackages = {
    282010: {
        name: "Grundlagen der Softwaretechnik",
        weight: 5,
        required: [282130]
    }, 282011:
    {
        name: "Einführung in betriebliche Informationssysteme",
        weight: 5,
        required: [282011]
    }, 282012:
    {
        name: "Online-Marketing, Datenanalyse und Marktforschung",
        weight: 10,
        required: [282133, 282134, 282135]
    }, 282013:
    {
        name: "Proseminar und Studium Generale",
        weight: 5,
        required: [282136]
    }, 282014:
    {
        name: "IT-Recht und IT-Sicherheit",
        weight: 5,
        required: [282014]
    }, 282015:
    {
        name: "Abschlussmodul",
        weight: 20,
        required: [282171, 282172]
    }, 282090:
    {
        name: "Social Relationship Management",
        weight: 10,
        required: [282190, 282191, 282192]
    }, 282091:
    {
        name: "Social Media Management and Intelligence",
        weight: 10,
        required: [282194, 282195]
    }, 282092:
    {
        name: "Usability und audiovisuelle Kommunikation",
        weight: 10,
        required: [282193, 282196]
    },
    202093: {
        name: "Projektstudie Social Media",
        weight: 5,
        required: [282197]
    }, 282080:
    {
        name: "Informationsmanagement",
        weight: 5,
        required: [282180]
    }, 282081:
    {
        name: "IT-Strategie und Servicemanagement",
        weight: 10,
        required: [282181, 282182]
    }, 282082:
    {
        name: "Analytic Information Systems",
        weight: 10,
        required: [282183, 282184]
    },
    282083: {
        name: "IT Management",
        weight: 10,
        required: [282185, 282186]
    }, 282060:
    {
        name: "Praxis mobiler Unternehmensanwendungen",
        weight: 5,
        required: [282160]
    }, 282061:
    {
        name: "Entwicklung und Anwendung von Unternehmensanwendungen",
        weight: 10,
        required: [282161, 282162]
    }, 282062:
    {
        name: "Design of Information Systems",
        weight: 10,
        required: [282163, 282164]
    },
    282063: {
        name: "Entwicklung und Anwendung von IT-Systemen",
        weight: 10,
        required: [282165, 282166]
    }
}

export const win : SingleOption = {
    basics: win_basic_data,
    exams: win_exams,
    examPackages: win_ExamPackages
}