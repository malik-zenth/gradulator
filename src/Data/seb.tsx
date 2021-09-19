import { BasicInformation, ExamPackages, Exams, SingleOption } from "./types";

const seb_basic_data: BasicInformation = {
    name: "Angewandte Informatik",
    weight: 120,
    ects: 114.5,
    spo: 2,
    required_emphasis: 1,
    emphasis: [{
        ids: [173130,173140,173150],
        name: "Angewandte Informatik",
        weight: 30,
        emphasisid: 1
    },
    {
        ids: [173170, 173180, 173184],
        name: "Mobile Computing",
        weight: 30,
        emphasisid: 2
    }]
}

const seb_exams: Exams = {
    173051: {
        semester: 3,
        ects: 5,
        weight: 5,
        name: "Mathematische Grundlagen der Informatik 2",
        packageid: 173050
    }, 173052:
    {
        semester: 3,
        ects: 2,
        weight: 2,
        name: "Angewandte Kryptographie",
        packageid: 173050
    }, 173053:
    {
        semester: 3,
        ects: 5,
        weight: 5,
        name: "Theoretische Informatik",
        packageid: 173050
    }, 173061:
    {
        semester: 3,
        ects: 2,
        weight: 2,
        name: "Betriebsysteme",
        packageid: 173060
    }, 173062:
    {
        semester: 3,
        ects: 5,
        weight: 5,
        name: "Datenbanken 1",
        packageid: 173060
    }, 173063:
    {
        semester: 3,
        ects: 3,
        weight: 3,
        name: "Datenbanken 1",
        packageid: 173060
    }, 173064:
    {
        semester: 3,
        ects: 2,
        weight: 2,
        name: "Verteilte Syste,e",
        packageid: 173060
    }, 173071:
    {
        semester: 3,
        ects: 0,
        weight: 0,
        name: "Projektmanagement",
        packageid: 173070
    }, 173072:
    {
        semester: 4,
        ects: 0,
        weight: 0,
        name: "Tools des SW Engineering",
        packageid: 173070
    }, 173073:
    {
        semester: 4,
        ects: 4,
        weight: 4,
        name: "Software Engineering komplexer Systeme",
        packageid: 173070,
    }, 173081:
    {
        semester: 4,
        ects: 0,
        weight: 0,
        name: "Software-Labor",
        packageid: 173080,
    }, 173091:
    {
        semester: 4,
        ects: 0,
        weight: 0,
        name: "Labor für Softwareprojekte und Project Skills",
        packageid: 173090,
    }, 173101:
    {
        semester: 4,
        ects: 3,
        weight: 3,
        name: "Informationssicherheit",
        packageid: 173100,
    }, 173102:
    {
        semester: 6,
        ects: 2,
        weight: 2,
        name: "IT und Gesellschaft",
        packageid: 173100,
    }, 173111:
    {
        semester: 6,
        ects: 0,
        weight: 0,
        name: "Studium Generale",
        packageid: 173200,
        ignored: true
    }, 173112:
    {
        semester: 7,
        ects: 1,
        weight: 1,
        name: "Bachelor Thesis",
        packageid: 173200,
    }, 173113:
    {
        semester: 6,
        ects: 0,
        weight: 0,
        name: "Bachelorkolloquium",
        packageid: 173200,
    }, 173131:
    {
        semester: 3,
        ects: 3,
        weight: 3,
        name: "Grundlagen empirischer Forschung 2",
        packageid: 173130,
        emphasisid:1
    }
    , 173132:
    {
        semester: 4,
        ects: 3,
        weight: 3,
        name: "Social Media",
        packageid: 173130,
        emphasisid:1
    }, 173141:
    {
        semester: 6,
        ects: 6,
        weight: 6,
        name: "Forschungs- und Anwendungsgebiete Psychologie",
        packageid: 173140,
        emphasisid:1
    }, 173142:
    {
        semester: 6,
        ects: 6,
        weight: 6,
        name: "Sozial- und Medienpsychologie",
        packageid: 173140,
        emphasisid:1
    }, 173151:
    {
        semester: 7,
        ects: 6,
        weight: 6,
        name: "Org.-, Arbeits- Personalpsychologie",
        packageid: 173150,
    }, 173171:
    {
        semester: 3,
        ects: 3,
        weight: 3,
        name: "Grundalgen der Visualisierung",
        packageid: 173170,
    },
    173172: {
        semester: 4,
        ects: 3,
        weight: 3,
        name: "Parallele Programmierung",
        packageid: 173170,
    },
    173181: {
        semester: 6,
        ects: 4,
        weight: 4,
        name: "Mobile Devices",
        packageid: 173180,
    },
    173182: {
        semester: 6,
        ects: 4,
        weight: 4,
        name: "Mobile Applications",
        packageid: 173180,
    },
    173183: {
        semester: 6,
        ects: 2,
        weight: 2,
        name: "Mobile Project Concepts",
        packageid: 173180,
    },
    173185: {
        semester: 7,
        ects: 8,
        weight: 8,
        name: "Mobile Project Lab",
        packageid: 173184,
    }
}

const seb_ExamPackages: ExamPackages = {
    173050: {
        name: "Grundlagen der Informatik 2",
        weight: 12,
        required: [173051,173052, 173053]
    }, 173060:
    {
        name: "Praktische Informatik",
        weight: 12,
        required: [173061,173062,173063,173064]
    }, 173070:
    {
        name: "Software-Projektmanagement",
        weight: 15,
        required: [173071, 173072, 173073]
    }, 173080:
    {
        name: "Labor für Softwareentwicklung 1",
        weight: 9,
        required: [173081]
    }, 173090:
    {
        name: "Labor für Softwareentwicklung 2",
        weight: 11,
        required: [173091]
    }, 173100:
    {
        name: "Gesellschaftliche Aspekte der IT",
        weight: 5,
        required: [173101, 173102]
    }, 173200:
    {
        name: "Bachelor Thesis und Kolloquium",
        weight: 16,
        required: [173111,173112,173113]
    }, 173130:
    {
        name: "Psychologie und Informatik 1",
        weight: 2,
        required: [173131, 173132]
    }, 173140:
    {
        name: "Psychologie und Informatik 2",
        weight: 4,
        required: [173141, 173142]
    },173150:
    {
        name: "Psychologie und Informatik 3",
        weight: 4,
        required: [173141, 173142]
    },173170:
    {
        name: "Mobile Computing 1",
        weight: 4,
        required: [173171, 173172]
    },173180:
    {
        name: "Mobile Computing 2",
        weight: 4,
        required: [173181, 173182,173183]
    },173184:
    {
        name: "Mobile Computing 3",
        weight: 4,
        required: [173185]
    },
    173119: {
        name: "Praktisches Studiensemester und Praktikantenkolloqium",
        weight: 0,
        required: [173119],
        ignored: true
    }
}

export const seb : SingleOption = {
    basics: seb_basic_data,
    exams: seb_exams,
    examPackages: seb_ExamPackages
}