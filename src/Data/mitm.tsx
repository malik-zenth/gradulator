import {BasicInformation, ExamPackages, Exams, SingleOption} from "./types"

const mitm_basic_data: BasicInformation = {
    name: "International Tourism Management",
    weight: 90,
    ects: 90,
    beta: true,
    spo: 3,
    required_emphasis: 0,
    emphasis: []
}

const mitm_exams: Exams = {
    182211: {
        name: "Quantitative Methods",
        semester: 1,
        ects: 2.5,
        weight: 2.5,
        packageid: 182210
    },
    182212: {
        name: "Qualitative Methods",
        semester: 1,
        ects: 2.5,
        weight: 2.5,
        packageid: 182210
    },
    182221: {
        name: "Contemporary Issues in International Tourism Management",
        semester: 1,
        ects: 5,
        weight: 5,
        packageid: 182220 
    },
    182222: {
        name: "E-Tourism",
        semester: 1,
        ects: 2.5,
        weight: 2.5,
        packageid: 182220
    },
    182231: {
        name: "Business Simulation in Tourism Management",
        semester: 1,
        ects: 5,
        weight: 5,
        packageid: 182230 
    },
    182241: {
        name: "Specific Issues of International Management",
        semester: 1,
        ects: 5,
        weight: 5,
        packageid: 182240 
    },
    182242: {
        name: "Global Talent Management",
        semester: 1,
        ects: 2.5,
        weight: 2.5,
        packageid: 182240
    },
    182243: {
        name: "Financial Analysis",
        semester: 1,
        ects: 5,
        weight: 5,
        packageid: 182240 
    },
    182251: {
        name: "Tourism Policy, Planning & Development",
        semester: 2,
        ects: 5,
        weight: 5,
        packageid: 182250 
    },
    182252: {
        name: "Sustainable Tourism Management",
        semester: 2,
        ects: 2.5,
        weight: 2.5,
        packageid: 182250
    },
    182253: {
        name: "Intercultural Management in Tourism",
        semester: 2,
        ects: 2.5,
        weight: 2.5,
        packageid: 182250
    },
    182261: {
        name: "Destination Marketing",
        semester: 2,
        ects: 2.5,
        weight: 2.5,
        packageid: 182260
    },
    182262: {
        name: "Hospitality Marketing",
        semester: 2,
        ects: 2.5,
        weight: 2.5,
        packageid: 182260
    },
    182263: {
        name: "Tour Operator Marketing",
        semester: 2,
        ects: 2.5,
        weight: 2.5,
        packageid: 182260
    },
    182271: {
        name: "Leading International Projects",
        semester: 2,
        ects: 2.5,
        weight: 2.5,
        packageid: 182270
    },
    182272: {
        name: "Integrated Tourism Projects",
        semester: 2,
        ects: 7.5,
        weight: 7.5,
        packageid: 182270
    },
    182281: {
        name: "Quantitative Methods/Econometrics",
        semester: 2,
        ects: 2.5,
        weight: 2.5,
        packageid: 182280
    },
    182290: {
        name: "Master Thesis",
        semester: 3,
        ects: 30,
        weight: 30,
        packageid: 182290 
    }
}

const mitm_ExamPackages: ExamPackages = {
    182210: {
        name: "Research Methods",
        weight: 5,
        required: [182211,182212]
    },
    182220: {
        name: "International Tourism Studies I",
        weight: 7.5,
        required: [182221,182222]
    },
    182230: {
        name: "Business Simulation",
        weight: 5,
        required: [182231]
    },
    182240: {
        name: "International Management Studies",
        weight: 12.5,
        required: [182241,182242,182243]
    },
    182250: {
        name: "International Tourism Studies II",
        weight: 10,
        required: [182251,182252,182253]
    },
    182260: {
        name: "Marketing in International Tourism",
        weight: 7.5,
        required: [182261,182262,182263]
    },
    182270: {
        name: "Integrated Tourism Project",
        weight: 10,
        required: [182271,182272]
    },
    182280: {
        name: "Advanced Research Methods",
        weight: 2.5,
        required: [182281]
    },
    182290: {
        name: "Master Thesis",
        weight: 30,
        required: [182290]
    }

}

export const mitm: SingleOption = {
    basics: mitm_basic_data,
    exams: mitm_exams,
    examPackages: mitm_ExamPackages
}