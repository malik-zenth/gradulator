import { BasicInformation, ExamPackages, Exams, SingleOption } from "./types";

const bu_basic_data: BasicInformation = {
    name: "Betriebswirtschaft und Unternehmensführung",
    weight: 118,
    ects: 118,
    spo: 3,
    required_emphasis: 1,
    beta: true,
    emphasis: [{
        ids: [152501, 152502],
        name: "Finance, Accounting, Controlling and Taxation",
        weight: 35,
        emphasisid: 1
    },
    {
        ids: [152601, 152602, 152603, 152604, 152605],
        name: "Marketing und Vertrieb",
        weight: 35,
        emphasisid: 2
    },
    {
        ids: [152701, 152702, 152703],
        name: "Produktions- und Logistikmanagement",
        weight: 35,
        emphasisid: 3
    },
    {
        ids: [152801, 152802, 152803],
        name: "Personalmanagement",
        weight: 35,
        emphasisid: 4
    },
    {
        ids: [152901, 152902],
        name: "International Management",
        weight: 35,
        emphasisid: 5
    }]
}

const bu_exams: Exams = {
    152231: {
        semester: 3,
        ects: 3,
        weight: 3,
        name: "Wirtschaftsinformatik II",
        packageid: 152204
    }, 152232:
    {
        semester: 3,
        ects: 2,
        weight: 2,
        name: "Produktion und Logistik II",
        packageid: 152205
    }, 152233:
    {
        semester: 3,
        ects: 5,
        weight: 5,
        name: "Marketing II",
        packageid: 152205
    }, 152234:
    {
        semester: 3,
        ects: 5,
        weight: 5,
        name: "Controlling",
        packageid: 152206
    }, 152235:
    {
        semester: 3,
        ects: 5,
        weight: 5,
        name: "Finanzwirtschaft",
        packageid: 152206
    }, 152236:
    {
        semester: 3,
        ects: 5,
        weight: 5,
        name: "Steuern",
        packageid: 152206
    }, 152237:
    {
        semester: 3,
        ects: 5,
        weight: 5,
        name: "Wirtschaftsprivatrecht II",
        packageid: 152207
    }, 152241:
    {
        semester: 4,
        ects: 2,
        weight: 0,
        name: "Studium Generale II",
        packageid: 152201,
        ignored: true
    }, 152242:
    {
        semester: 4,
        ects: 4,
        weight: 4,
        name: "Project Management and Organizational Concepts",
        packageid: 152203
    }, 152243:
    {
        semester: 4,
        ects: 2,
        weight: 2,
        name: "Business Process Reengineering",
        packageid: 152204,
    }, 152244:
    {
        semester: 4,
        ects: 2,
        weight: 2,
        name: "Arbeitsrecht",
        packageid: 152207,
    }, 152245:
    {
        semester: 4,
        ects: 5,
        weight: 5,
        name: "Volkswirtschaftslehre II",
        packageid: 152208,
    }, 152541:
    {
        semester: 4,
        ects: 5,
        weight: 5,
        name: "Finanzierung und Unternehmensbesteuerung",
        packageid: 152501,
        emphasisid: 1
    }, 152542:
    {
        semester: 4,
        ects: 5,
        weight: 5,
        name: "IFRS Rechnungslegung",
        packageid: 152501,
        emphasisid: 1
    }, 152543:
    {
        semester: 4,
        ects: 5,
        weight: 5,
        name: "Controlling Konzepte",
        packageid: 152501,
        emphasisid: 1
    }, 152641:
    {
        semester: 4,
        ects: 1,
        weight: 1,
        name: "Rhetorik im Vertrieb",
        packageid: 152601,
        emphasisid: 2
    }, 152642:
    {
        semester: 4,
        ects: 5,
        weight: 5,
        name: "Marketing und Vertriebsrecht",
        packageid: 152601,
        emphasisid: 2
    }, 152643:
    {
        semester: 4,
        ects: 9,
        weight: 9,
        name: "Marktforschung und Durchführung einer Marktforschungsstudie",
        packageid: 152602,
        emphasisid: 2
    }, 152741:
    {
        semester: 4,
        ects: 5,
        weight: 5,
        name: "Beschaffungslogistik",
        packageid: 152701,
        emphasisid: 3
    }, 152742:
    {
        semester: 4,
        ects: 5,
        weight: 5,
        name: "Produktionslogistik",
        packageid: 152701,
        emphasisid: 3
    }, 152743:
    {
        semester: 4,
        ects: 5,
        weight: 5,
        name: "Informationslogistik und Logistiksysteme",
        packageid: 152701,
        emphasisid: 3
    }, 152841:
    {
        semester: 4,
        ects: 3,
        weight: 3,
        name: "Rechtsfälle der Personal- und Führungspraxis",
        packageid: 152801,
        emphasisid: 4
    }, 152842:
    {
        semester: 4,
        ects: 4,
        weight: 4,
        name: "Personaleinsatz und -bindung",
        packageid: 152801,
        emphasisid: 4
    }, 152843:
    {
        semester: 4,
        ects: 5,
        weight: 5,
        name: "Personalbeschaffung und -entwicklung",
        packageid: 152801,
        emphasisid: 4
    }, 152844:
    {
        semester: 4,
        ects: 3,
        weight: 3,
        name: "Kollektives Arbeitsrecht",
        packageid: 152802,
        emphasisid: 4
    }, 152961:
    {
        semester: 4,
        ects: 5,
        weight: 5,
        name: "Principles of International Management",
        packageid: 152901,
        emphasisid: 5
    }, 152251:
    {
        semester: 5,
        ects: 30,
        weight: 0,
        name: "Praktisches Studiensemester und Praktikantenkolloquium",
        packageid: 152201,
        ignored: true
    }, 152261:
    {
        semester: 6,
        ects: 5,
        weight: 5,
        name: "Strategische Unternehmensführung",
        packageid: 152202
    }, 152262:
    {
        semester: 6,
        ects: 5,
        weight: 5,
        name: "International Management and Business Ethics",
        packageid: 152203
    }, 152503:
    {
        semester: 6,
        ects: 16,
        weight: 16,
        name: "Wahlpflichtfächer",
        packageid: 152502,
        emphasisid: 1
    }, 152504:
    {
        semester: 6,
        ects: 4,
        weight: 4,
        name: "Projektstudie FACT",
        packageid: 152502,
        emphasisid: 1
    }, 152661:
    {
        semester: 6,
        ects: 5,
        weight: 5,
        name: "Digitales Marketing",
        packageid: 152603,
        emphasisid: 2
    }, 152662:
    {
        semester: 6,
        ects: 5,
        weight: 5,
        name: "Businessplanung für Neuprodukte",
        packageid: 152603,
        emphasisid: 2
    }, 152663:
    {
        semester: 6,
        ects: 5,
        weight: 5,
        name: "International Marketing",
        packageid: 152604,
        emphasisid: 2
    }, 152664:
    {
        semester: 6,
        ects: 5,
        weight: 5,
        name: "Marketing- und Vertriebsprojektstudie",
        packageid: 152605,
        emphasisid: 2
    }, 152761:
    {
        semester: 6,
        ects: 5,
        weight: 5,
        name: "Distributions- und Entsorgungslogistik",
        packageid: 152702,
        emphasisid: 3
    }, 152762:
    {
        semester: 6,
        ects: 5,
        weight: 5,
        name: "Supply Chain Management",
        packageid: 152702,
        emphasisid: 3
    }, 152763:
    {
        semester: 6,
        ects: 5,
        weight: 5,
        name: "Produktions- und LogistikControlling",
        packageid: 152702,
        emphasisid: 3
    }, 152764:
    {
        semester: 6,
        ects: 5,
        weight: 5,
        name: "Supply Chain Management Projektstudie",
        packageid: 152703,
        emphasisid: 3
    }, 152861:
    {
        semester: 6,
        ects: 5,
        weight: 5,
        name: "Personalcontrolling",
        packageid: 152802,
        emphasisid: 4
    }, 152862:
    {
        semester: 6,
        ects: 5,
        weight: 5,
        name: "Seminar Unternehmensrecht und Führung",
        packageid: 152802,
        emphasisid: 4
    }, 152863:
    {
        semester: 6,
        ects: 5,
        weight: 5,
        name: "Advanced Human Resource Management",
        packageid: 152803,
        emphasisid: 4
    }, 152864:
    {
        semester: 6,
        ects: 5,
        weight: 5,
        name: "Personalmanagement Projektstudie",
        packageid: 152803,
        emphasisid: 4
    }, 152962:
    {
        semester: 6,
        ects: 10,
        weight: 10,
        name: "International Management I",
        packageid: 152902,
        emphasisid: 5
    }, 152963:
    {
        semester: 6,
        ects: 10,
        weight: 10,
        name: "International Management II",
        packageid: 152902,
        emphasisid: 5
    }, 152964:
    {
        semester: 6,
        ects: 10,
        weight: 10,
        name: "International Management III",
        packageid: 152902,
        emphasisid: 5
    }, 152271:
    {
        semester: 7,
        ects: 12,
        weight: 12,
        name: "Bachelor Thesis",
        packageid: 152201
    }, 152272:
    {
        semester: 7,
        ects: 3,
        weight: 3,
        name: "Mündliche Bachelorprüfung",
        packageid: 152201
    }, 152273:
    {
        semester: 7,
        ects: 5,
        weight: 5,
        name: "Business Simulation",
        packageid: 152202
    }, 152274:
    {
        semester: 7,
        ects: 5,
        weight: 5,
        name: "Seminar zur Unternehmensführung",
        packageid: 152202
    }, 152275:
    {
        semester: 7,
        ects: 5,
        weight: 5,
        name: "Leadership Communication",
        packageid: 152203
    }
}

const bu_ExamPackages: ExamPackages = {
    152201: {
        name: "Modulprüfung Bachelorarbeit und -prüfung",
        weight: 15,
        required: [152271, 152272]
    }, 152202: {
        name: "Modulprüfung Unternehmensführung",
        weight: 15,
        required: [152261, 152273, 152274]
    }, 152203: {
        name: "Modulprüfung Leadership Skills",
        weight: 14,
        required: [152242, 152262, 152275]
    }, 152204: {
        name: "Modulprüfung Informationsmanagement",
        weight: 5,
        required: [152231, 152243]
    }, 152205: {
        name: "Modulprüfung Produktion und Marketing",
        weight: 7,
        required: [152232, 152233]
    }, 152206: {
        name: "Modulprüfung Controlling, Finanzwirtschaft und Steuern",
        weight: 15,
        required: [152234, 152235, 152236]
    }, 152207: {
        name: "Modulprüfung Recht",
        weight: 7,
        required: [152237, 152244]
    }, 152208: {
        name: "Modulprüfung Volkswirtschaft",
        weight: 5,
        required: [152245]
    }, 152501:
    {
        name: "Modulprüfung Basiskompetenzen FACT",
        weight: 15,
        required: [152541, 152542, 152543]
    }, 152502: {
        name: "Modulprüfung Vertiefungskompetenzen FACT",
        weight: 20,
        required: [152503, 152504]
    }, 152601: {
        name: "Modulprüfung Marketing und Vertriebsrecht / Rhetorik im Vertrieb",
        weight: 6,
        required: [152641, 152642]
    }, 152602: {
        name: "Modulprüfung Marktforschung – Theorie, Methoden, Projekt",
        weight: 9,
        required: [152643]
    }, 152603: {
        name: "Modulprüfung Digitales Marketing / Businessplanung für Neuprodukte",
        weight: 10,
        required: [152661, 152662]
    }, 152604: {
        name: "Modulprüfung International Marketing",
        weight: 5,
        required: [152663]
    }, 152605: {
        name: "Modulprüfung Marketing- und Vertriebsprojektstudie",
        weight: 5,
        required: [152664]
    }, 152701: {
        name: "Modulprüfung Logistik",
        weight: 15,
        required: [152741, 152742, 152743]
    }, 152702: {
        name: "Modulprüfung Strategisches Supply Chain Management",
        weight: 15,
        required: [152761, 152762, 152763]
    }, 152703: {
        name: "Modulprüfung Produktions- und Logistikprojektstudie",
        weight: 5,
        required: [152764]
    }, 152801: {
        name: "Modulprüfung Kernprozesse des Personalmanagements",
        weight: 12,
        required: [152841, 152842, 152843]
    }, 152802: {
        name: "Modulprüfung Querschnittsprozesse des Personalmanagements",
        weight: 13,
        required: [152844, 152861, 152862]
    }, 152803: {
        name: "Modulprüfung Führungsprozesse des Personalmanagements",
        weight: 10,
        required: [152863, 152864]
    }, 152901: {
        name: "Modulprüfung Principles of International Management",
        weight: 5,
        required: [152961]
    }, 152902: {
        name: "Modulprüfung International Management (erbracht an einer Partnerhochschule)",
        weight: 30,
        required: [152962, 152963, 152964]
    }
}

export const bu : SingleOption = {
    basics: bu_basic_data,
    exams: bu_exams,
    examPackages: bu_ExamPackages
}