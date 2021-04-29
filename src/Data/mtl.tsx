import {BasicInformation, ExamPackages, Exams, SingleOption} from "./types"


const mtl_basic_data: BasicInformation = {
    name: "Master in Transport und Logistik Management",
    weight: 90,
    ects: 85,
    required_emphasis: 0,
    emphasis: [],
    beta: true
}

const mtl_exams: Exams = {
    161101: {
        semester: 1,
        ects: 5,
        weight: 5,
        name: "Integrität und Recht",
        packageid: 161100
    },
    161111: {
        semester: 1,
        ects: 2.5,
        weight: 5,
        name: "Controlling",
        packageid: 161110
    },
    161112: {
        semester: 1,
        ects: 2.5,
        weight: 5,
        name: "Finanzmanagement",
        packageid: 161110
    },
    161121: {
        semester: 1,
        ects: 5,
        weight: 5,
        name: "Gestaltung internationaler Wertschöpfungsketten",
        packageid: 161120
    },
    161131: {
        semester: 1,
        ects: 5,
        weight: 5,
        name: "Management internationaler Transporte",
        packageid: 161130
    },
    161141: {
        semester: 1,
        ects: 5,
        weight: 5,
        name: "Operations Research",
        packageid: 161140
    },
    161151: {
        semester: 1,
        ects: 5,
        weight: 5,
        name: "Wissenschafts- und Forschungsmethoden",
        packageid: 161150
    },
    161161: {
        semester: 2,
        ects: 5,
        weight: 5,
        name: "Netzwerkdesign und Bestandsmanagement",
        packageid: 161160,
    },
    161171: {
        semester: 2,
        ects: 5,
        weight: 5,
        name: "Projektstudie: Management von Transportnetzwerken",
        packageid: 161170,
    },
    161181: {
        semester: 2,
        ects: 5,
        weight: 5,
        name: "Marktorientierte Unternehmensführung",
        packageid: 161180,
    },
    161191: {
        semester: 2,
        ects: 5,
        weight: 5,
        name: "Gestaltung digitaler und nachhaltiger Geschäftsmodelle",
        packageid: 161190,
    },
    161201: {
        semester: 2,
        ects: 5,
        weight: 5,
        name: "Leadership & Enterpreneurship",
        packageid: 161200,
    },
    161211: {
        semester: 2,
        ects: 5,
        weight: 5,
        name: "Forschungsstudie: Zukünftige Logistiklösungen",
        packageid: 161210
    },
    161241: {
        semester: 3,
        ects: 20,
        weight: 20,
        name: "Master-Thesis",
        packageid: 161240
    },
    161232: {
        semester: 3,
        ects: 5,
        weight: 5,
        name: "Thesis-Kolloquium",
        packageid: 161230
    },
    161221: {
        semester: 4,
        ects: 30,
        weight: 30,
        name: "Management-Fähigkeiten",
        packageid: 161220
    }
}

const mtl_ExamPackages: ExamPackages = {
    161100: {
        name: "Integrität und Recht",
        weight: 5,
        required: [161101]
    },
    161110: {
        name: "Controlling & Finanzmanagement",
        weight: 5,
        required: [161111,161112]
    },
    161120: {
        name: "Gestaltung internationaler Wertschöpfungsketten",
        weight: 5,
        required: [161121]
    },
    161130: {
        name: "Management internationaler Transporte",
        weight: 5,
        required: [161131]
    },
    161140: {
        name: "Operations Research",
        weight: 5,
        required: [161141]
    },
    161150: {
        name: "Wissenschafts- und Forschungsmethoden",
        weight: 5,
        required: [161151]
    },
    161160: {
        name: "Netzwerkdesign und Bestandsmanagement",
        weight: 5,
        required: [161161]
    },
    161170: {
        name: "Projektstudie: Management von Transportnetzwerken",
        weight: 5,
        required: [161171]
    },
    161180: {
        name: "Marktorientierte Unternehmensführung",
        weight: 5,
        required: [161181]
    },
    161190: {
        name: "Gestaltung digitaler und nachhaltiger Geschäftsmodelle",
        weight: 5,
        required: [161191]
    },
    161200: {
        name: "Leadership & Entrepreneurship",
        weight: 5,
        required: [161201]
    },
    161210: {
        name: "Forschungsstudie: Zukünftige Logistiklösungen",
        weight: 5,
        required: [161211]
    },
    161220: {
        name: "Management-Fähigkeiten",
        weight: 30,
        required: [161221]
    },
    161230: {
        name: "Kolloquium und Persönlichkeitskompetenzen",
        weight: 5,
        required: [161232]
    },
    161240: {
        name: "Master Thesis",
        weight: 25,
        required: [161241]
    }
}

export const mtl: SingleOption = {
    basics: mtl_basic_data,
    exams: mtl_exams,
    examPackages: mtl_ExamPackages
}
