import { BasicInformation, ExamPackages, Exams, SingleOption } from "./types";

const mibim_basicData: BasicInformation = {
    name: "International Business & Intercultural Management",
    spo: 4,
    beta: true,
    ects: 90,
    weight: 90,
    required_emphasis: 0,
    emphasis: [],
    elevtive: []
}

const mibim_exams: Exams = {
    252211: {
        name: "Quantitative Methods",
        weight: 2.5,
        semester: 1,
        ects: 2.5,
        packageid: 252210
    },
    252212: {
        name: "Qualitative Methods",
        weight: 2.5,
        semester: 1,
        ects: 2.5,
        packageid: 252210 
    },
    252221: {
        name: "International Economics",
        semester: 1,
        weight: 2.5,
        ects: 2.5,
        packageid: 252220 
    },
    252222: {
        name: "Corporate Governance & CSR",
        semester: 1,
        weight: 2.5,
        ects: 2.5,
        packageid: 252220 
    },
    252231: {
        name: "Specific Issues of International Management",
        semester: 1,
        weight: 5,
        ects: 5,
        packageid: 252230 
    },
    252232: {
        name: "Global Talent Management",
        semester: 1,
        weight: 2.5,
        ects: 2.5,
        packageid: 252230 
    },
    252233: {
        name: "Financial Analysis",
        semester: 1,
        weight: 5,
        ects: 5,
        packageid: 252230 
    },
    252241: {
        name: "Intercultural Communication: Theories and Methods",
        semester: 1,
        weight: 7.5,
        ects: 7.5,
        packageid: 252240 
    },
    252251: {
        name: "Global Marketing - Multinational Cases",
        semester: 2,
        weight: 7.5,
        ects: 7.5,
        packageid: 252250 
    },
    252252: {
        name: "Intercultural Management - Cases and Regions",
        semester: 2,
        weight: 10,
        ects: 10,
        packageid: 252250 
    },
    252253: {
        name: "Global leadership",
        semester: 2,
        weight: 2.5,
        ects: 2.5,
        packageid: 252250 
    },
    252260: {
        semester: 2,
        name: "Advanced Sustainability Studies",
        weight: 7.5,
        ects: 7.5,
        packageid: 252260 
    },
    252271: {
        name: "Quantitative Methods / Econometrics",
        weight: 2.5,
        semester: 2,
        ects: 2.5,
        packageid: 252270 
    },
    252280: {
        name: "Master Thesis",
        semester: 3,
        weight: 30,
        ects: 30,
        packageid: 252280 
    }
}

const mibim_ExamPackages: ExamPackages = {
    252210: {
        name: "Research Methods",
        weight: 5,
        required: [252211,252212]
    },
    252220: {
        name: "Business Environment Studies",
        weight: 5,
        required: [252221,252222]
    },
    252230: {
        name: "International Management Studies",
        weight: 12.5,
        required: [252231,252232,252233]
    },
    252240: {
        name: "Intercultural Studies",
        weight: 7.5,
        required: [252241]
    },
    252250: {
        name: "Advanced International and Intercultural Management Studies",
        weight: 20,
        required: [252251,252252,252253]
    },
    252260: {
        name: "Advanced Sustainability Studies",
        weight: 7.5,
        required: [252260]
    },
    252270: {
        name: "Advanced Search Methods",
        weight: 2.5,
        required: [252271]
    },
    252280: {
        name: "Master Thesis",
        weight: 30,
        required: [252280]
    }
}

export const mibim:SingleOption = {
    basics: mibim_basicData,
    exams: mibim_exams,
    examPackages: mibim_ExamPackages
}
