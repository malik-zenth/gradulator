import {BasicInformation, ExamPackages, Exams, SingleOption} from "./types"


const vb_basic_data: BasicInformation = {
    name: "Verkehrsbetriebswirtschaft und Logistik",
    weight: 120,
    ects: 120,
    spo: 4,
    required_emphasis: 1,
    emphasis: [
        {
            ids: [163200],
            name: "Vertiefung Marketing",
            weight: 10,
            emphasisid: 1
        },
        {
            ids: [163210],
            name: "Vertiefung Controlling",
            weight: 10,
            emphasisid: 2
        },
        {
            ids: [163220],
            name: "Vertiefung Führung",
            weight: 10,
            emphasisid: 3
        }
    ],
    elevtive: [{
        ids: [163301,163302,163303,163304],
        required: 2,
        examid: 163300,
    }]
}

const vb_exams: Exams = {
    163301: {
        semester: 4,
        ects: 5,
        weight: 5,
        name: "Internationale Logistik",
        packageid: 163300
    },
    163302: {
        semester: 4,
        ects: 5,
        weight: 5,
        name: "IT Fallstudien Logistik",
        packageid: 163300
    },
    163303: {
        semester: 4,
        ects: 5,
        weight: 5,
        name: "Logistische Dienstleistungen",
        packageid: 163300
    },
    163304: {
        semester: 4,
        ects: 5,
        weight: 5,
        name: "Produktionslogistik",
        packageid: 163300
    },
    163101: {
        semester: 3,
        ects: 2.5,
        weight: 5,
        name: "Strategisches Management",
        packageid: 163100,
    },
    163102: {
        semester: 3,
        ects: 2.5,
        weight: 5,
        name: "BWL-Seminar",
        packageid: 163100,
    },
    163106: {
        semester: 3,
        ects: 5,
        weight: 5,
        name: "Einführung in das Controlling",
        packageid: 163105,
    },
    163111: {
        semester: 3,
        ects: 5,
        weight: 5,
        name: "Einführung in das Marketing",
        packageid: 163110,
    },
    163116: {
        semester: 3,
        ects: 5,
        weight: 5,
        name: "IT in der Logistik I",
        packageid: 163115,
    },
    163121: {
        semester: 3,
        ects: 5,
        weight: 5,
        name: "SCM Planspiel",
        packageid: 163120,
    },
    163126: {
        semester: 3,
        ects: 5,
        weight: 5,
        name: "Wirtschaftsprivarecht II",
        packageid: 163125,
    },
    163117: {
        semester: 4,
        ects: 5,
        weight: 5,
        name: "IT in der Logistik II",
        packageid: 163115,
    },
    163129: {
        semester: 4,
        ects: 5,
        weight: 5,
        name: "Arbeitsrecht und Transportrecht",
        packageid: 163125,
    },
    163131: {
        semester: 4,
        ects: 5,
        weight: 5,
        name: "Personal und Führung (HRM)",
        packageid: 163130,
    },
    163138: {
        semester: 4,
        ects: 5,
        weight: 5,
        name: "Mikroökonomie und Makroökonomie",
        packageid: 163135,
    },
    163139: {
        semester: 6,
        ects: 5,
        weight: 5,
        name: "Verkehrspolitik",
        packageid: 163135,
    },
    163141: {
        semester: 6,
        ects: 2.5,
        weight: 2,
        name: "Nachhaltigkeit",
        packageid: 163140,
    },
    163142: {
        semester: 6,
        ects: 2.5,
        weight: 2,
        name: "Compliance",
        packageid: 163140,
    },
    163146: {
        semester: 6,
        ects: 5,
        weight: 5,
        name: "Projektstudien",
        packageid: 163145,
    },
    163151: {
        semester: 6,
        ects: 2.5,
        weight: 5,
        name: "Strategische Netzwerkplanung",
        packageid: 163150,
    },
    163152: {
        semester: 6,
        ects: 2.5,
        weight: 5,
        name: "Transportplanung",
        packageid: 163150,
    },
    163147: {
        semester: 7,
        ects: 5,
        weight: 5,
        name: "Seminar Verkehr und Logistik",
        packageid: 163145,
    },
    163156: {
        semester: 7,
        ects: 10,
        weight: 10,
        name: "Planspiel ABWL",
        packageid: 163155,
    },
    163401: {
        semester: 7,
        ects: 3,
        weight: 3,
        name: "Mündliche Prüfung",
        packageid: 163400,
    },
    163501: {
        semester: 7,
        ects: 12,
        weight: 12,
        name: "Bachelorthesis",
        packageid: 163500,
    },
    163201: {
        semester: 4,
        ects: 5,
        weight: 5,
        name: "Konzeptionelles Marketing",
        packageid: 163200,
        emphasisid: 1
    },
    163202: {
        semester: 6,
        ects: 2.5,
        weight: 2.5,
        name: "Analytisches Marketing",
        packageid: 163200,
        emphasisid: 1
    },
    163203: {
        semester: 6,
        ects: 2.5,
        weight: 2.5,
        name: "Marketing-Anwendungen",
        packageid: 163200,
        emphasisid: 1
    },
    163211: {
        semester: 4,
        ects: 5,
        weight: 5,
        name: "Controlling-Konzepte",
        packageid: 163210,
        emphasisid: 2
    },
    163212: {
        semester: 6,
        ects: 2.5,
        weight: 2.5,
        name: "Controlling-Anwendungen",
        packageid: 163210,
        emphasisid: 2
    },
    163213: {
        semester: 6,
        ects: 2.5,
        weight: 2.5,
        name: "Controlling IT-Anwendungen",
        packageid: 163210,
        emphasisid: 2
    },
    163221: {
        semester: 4,
        ects: 5,
        weight: 5,
        name: "Führungspraxis",
        packageid: 163220,
        emphasisid: 3
    },
    163222: {
        semester: 6,
        ects: 2.5,
        weight: 2.5,
        name: "Personalrecht",
        packageid: 163220,
        emphasisid: 3
    },
    163223: {
        semester: 6,
        ects: 2.5,
        weight: 2.5,
        name: "Internationales HRM",
        packageid: 163220,
        emphasisid: 3
    },
}

const vb_ExamPackages: ExamPackages = {
    163300: {
        name: "Wahlfächer",
        weight: 10,
        required: [163301,163302,163303,163304]
    },
    163100: {
        name: "Aspekte des Managements",
        weight: 5,
        required: [163101,163102]
    },
    163105: {
        name: "Grundlagen des Contrllings",
        weight: 5,
        required: [163106]
    },
    163110: {
        name: "Grundlagen des Marketings",
        weight: 5,
        required: [163111]
    },
    163115: {
        name: "IT-Anwendungen in der Logistik",
        weight: 10,
        required: [163116,163117]
    },
    163120: {
        name: "Supply Chain Management",
        weight: 5,
        required: [163121]
    },
    163125: {
        name: "Wirtschaftsrecht",
        weight: 10,
        required: [163126,163129]
    },
    163130: {
        name: "Personalmanagement",
        weight: 5,
        required: [163131]
    },
    163135: {
        name: "Volkswirtschaftslehre",
        weight: 10,
        required: [163138,163139]
    },
    163140: {
        name: "Wirtschaftsethik",
        weight: 5,
        required: [163141,163142]
    },
    163145: {
        name: "Projektmanagement in der Logistik",
        weight: 10,
        required: [163146,163147]
    },
    163150: {
        name: "Planung von Logistiknetzwerken",
        weight: 5,
        required: [163151,163152]
    },
    163155: {
        name: "Angewandte Unternehmensführung",
        weight: 10,
        required: [163156]
    },
    163400: {
        name: "Mündliche Prüfung",
        weight: 3,
        required: [163401]
    },
    163500: {
        name: "Bachelorthesis",
        weight: 12,
        required: [163501]
    },
    163200: {
        name: "Vertiefungsrichtung Marketing",
        weight: 10,
        required: [163201,163202,163203]
    },
    163210: {
        name: "Vertiefungsrichtung Controlling",
        weight: 10,
        required: [163211,163212,163213]
    },
    163220: {
        name: "Vertiefungsrichtung Führung",
        weight: 10,
        required: [163221,163222,163223]
    },
}


export const vb: SingleOption = {
    basics: vb_basic_data,
    exams: vb_exams,
    examPackages: vb_ExamPackages
}