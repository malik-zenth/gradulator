import { BasicInformation, ExamPackages, Exams, SingleOption } from "./types";

const vb_pv_basic_data: BasicInformation = {
    name: "Verkehrsbetriebswirtschaft und Personenverkehr",
    weight: 120,
    ects: 120,
    spo: 1,
    required_emphasis: 0,
    emphasis: []
}

const vb_pv_exams: Exams = {
    370071: {
        semester: 3,
        ects: 5,
        weight: 5,
        name: "ÖPNV/SPNV",
        packageid: 370070
    }, 370076:
    {
        semester: 3,
        ects: 5,
        weight: 5,
        name: "Luftverkehr (Airline) ",
        packageid: 370075
    }, 370081:
    {
        semester: 3,
        ects: 4,
        weight: 0,
        name: "Verkehrsverhalten/Freizeitverkehre",
        packageid: 370080,
        ignored: true
    }, 370086:
    {
        semester: 3,
        ects: 3,
        weight: 3,
        name: "Betriebliche Steuerlehre ",
        packageid: 370085
    }, 370087:
    {
        semester: 3,
        ects: 3,
        weight: 3,
        name: "Betriebliche Anwendungen der Statistik",
        packageid: 370085
    }, 370091:
    {
        semester: 3,
        ects: 4,
        weight: 4,
        name: "Vertiefung Wirtschaftsprivatrecht",
        packageid: 370090
    }, 370096:
    {
        semester: 3,
        ects: 3,
        weight: 0,
        name: "Wirtschaftspolitik",
        packageid: 370095,
        ignored: true
    }, 370097:
    {
        semester: 3,
        ects: 3,
        weight: 3,
        name: "Makroökonomie",
        packageid: 370095,
    }, 370077:
    {
        semester: 4,
        ects: 4,
        weight: 4,
        name: "Luftverkehr (Airport) ",
        packageid: 370075
    }, 370078:
    {
        semester: 4,
        ects: 3,
        weight: 0,
        name: "Netzmanagement / Kapazitätsund Flugplanung ",
        packageid: 370075,
        ignored: true
    }, 370072:
    {
        semester: 4,
        ects: 4,
        weight: 4,
        name: "ÖPNV Marketing ",
        packageid: 370070,
    }, 370073:
    {
        semester: 4,
        ects: 3,
        weight: 0,
        name: "Nahverkehrs- und Raumplanung ",
        packageid: 370070,
        ignored: true
    }, 370092:
    {
        semester: 4,
        ects: 3,
        weight: 0,
        name: "Rechtliche Aspekte des SPNV/ÖPNV",
        packageid: 370090,
        ignored: true
    }, 370093:
    {
        semester: 4,
        ects: 3,
        weight: 0,
        name: "Reiserecht",
        packageid: 370090,
        ignored: true
    }, 370082:
    {
        semester: 4,
        ects: 5,
        weight: 5,
        name: "Verkehrspolitik",
        packageid: 370080,
    }, 370101:
    {
        semester: 4,
        ects: 5,
        weight: 5,
        name: "Ergänzungsfach 1",
        packageid: 370100,
    }, 370150:
    {
        semester: 5,
        ects: 30,
        weight: 0,
        name: "Praktisches Studiensemester und Praktikantenkolloquium",
        packageid: 370165,
        ignored: true
    }, 370111:
    {
        semester: 6,
        ects: 3,
        weight: 3,
        name: "Human Resource Management ",
        packageid: 370110,
    }, 370112:
    {
        semester: 6,
        ects: 3,
        weight: 3,
        name: "Marktorientierte Unternehmensführung ",
        packageid: 370110,
    }, 370116:
    {
        semester: 6,
        ects: 5,
        weight: 5,
        name: "Controlling",
        packageid: 370115,
    }, 370117:
    {
        semester: 6,
        ects: 3,
        weight: 0,
        name: "Projektmanagement",
        packageid: 370115,
        ignored: true
    }, 370121:
    {
        semester: 6,
        ects: 6,
        weight: 6,
        name: "Seminar zum Personenverkehr",
        packageid: 370120,
    }, 370122:
    {
        semester: 6,
        ects: 3,
        weight: 0,
        name: "Verkehrsmanagement",
        packageid: 370120,
        ignored: true
    }, 370126:
    {
        semester: 6,
        ects: 4,
        weight: 4,
        name: "Schienenfernverkehr",
        packageid: 370125,
    }, 370127:
    {
        semester: 6,
        ects: 3,
        weight: 0,
        name: "Fahr- und Dienstplangestaltung",
        packageid: 370125,
        ignored: true
    }, 370131:
    {
        semester: 7,
        ects: 6,
        weight: 6,
        name: "Planspiel",
        packageid: 370130,
    }, 370132:
    {
        semester: 7,
        ects: 5,
        weight: 0,
        name: "Projektstudien Personenverkehr",
        packageid: 370130,
        ignored: true
    }, 370102:
    {
        semester: 7,
        ects: 5,
        weight: 5,
        name: "Ergänzungsfach 2",
        packageid: 370100
    }, 370166:
    {
        semester: 7,
        ects: 12,
        weight: 12,
        name: "Bachelorthesis",
        packageid: 370165
    }, 370161:
    {
        semester: 7,
        ects: 2,
        weight: 2,
        name: "Mündliche Bachelorprüfung",
        packageid: 370160,
    }
}

const vb_pv_ExamPackages: ExamPackages = {
    370070: {
        name: "Nahverkehr",
        weight: 12,
        required: [370071, 370072]
    }, 370075: {
        name: "Luftverkehr",
        weight: 12,
        required: [370076, 370077]
    }, 370080: {
        name: "Verkehrswirtschaft in der Volkswirtschaft",
        weight: 9,
        required: [370082, 370081]
    }, 370085: {
        name: "Betriebswirtschaft III",
        weight: 6,
        required: [370087, 370086]
    }, 370090: {
        name: "Recht im Personenverkehr",
        weight: 10,
        required: [370091]
    }, 370095: {
        name: "Volkswirtschaftslehre",
        weight: 6,
        required: [370097, 370096]
    }, 370100: {
        name: "Ergänzungsfach",
        weight: 10,
        required: [370101, 370102]
    }, 370110: {
        name: "Betriebliches Management I",
        weight: 6,
        required: [370111, 370112]
    }, 370115:
    {
        name: "Betriebliches Management II ",
        weight: 8,
        required: [370116]
    }, 370120: {
        name: "Ausgewählte Fragen des Personenverkehrs",
        weight: 9,
        required: [370121]
    }, 370125: {
        name: "Schienenverkehr",
        weight: 7,
        required: [370126]
    }, 370130: {
        name: "Unternehmensführung",
        weight: 11,
        required: [370131]
    }, 370160: {
        name: "Mündliche Bachelorprüfung",
        weight: 2,
        required: [370161]
    }, 370165: {
        name: "Bachelorthesis",
        weight: 12,
        required: [370166]
    }
}

export const vb_pv : SingleOption = {
    basics: vb_pv_basic_data,
    exams: vb_pv_exams,
    examPackages: vb_pv_ExamPackages
}