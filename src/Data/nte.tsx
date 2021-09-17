import { BasicInformation, ExamPackages, Exams, SingleOption } from "./types";

const nte_basicData: BasicInformation = {
    name: "Nachhaltige Tourismusentwicklung",
    spo: 1,
    beta: true,
    ects: 90,
    weight: 90,
    required_emphasis: 0,
    emphasis: [],
    elevtive: []
}

const nte_exams: Exams = {
    270001: {
        name: "Quantitative Methods",
        semester: 1,
        ects: 2.5,
        weight: 2.5,
        packageid: 270000,
    },
    270002: {
        name: "Qualitative Methods",
        semester: 1,
        ects: 2.5,
        weight: 2.5,
        packageid: 270000,
    },
    270006: {
        name: "Contemporary Issues in International Tourism Management",
        semester: 1,
        ects: 5,
        weight: 5,
        packageid: 270005,
    },
    270007: {
        name: "Grundlagen der Tourismusgeographie",
        semester: 1,
        ects: 5,
        weight: 5,
        packageid: 270005,
    },
    270010: {
        name: "Nachhaltiges Tourismusmanagement I",
        semester: 1,
        ects: 7.5,
        weight: 7.5,
        packageid: 270010,
    },
    270016: {
        name: "Kommunalwirtschaft und Public Management",
        semester: 1,
        ects: 7.5,
        weight: 7.5,
        packageid: 270015,
    },
    270021: {
        name: "Tourism Policy, Planning & Development",
        semester: 2,
        ects: 5,
        weight: 5,
        packageid: 270020,
    },
    270022: {
        name: "Sustainable Tourism Management",
        semester: 2,
        ects: 2.5,
        weight: 2.5,
        packageid: 270020,
    },
    270023: {
        name: "Intercultural Management in Tourism",
        semester: 2,
        ects: 2.5,
        weight: 2.5,
        packageid: 270020,
    },
    270025: {
        name: "Planung und Recht",
        semester: 2,
        ects: 7.5,
        weight: 7.5,
        packageid: 270025,
    },
    270030: {
        name: "Projekt Nachhaltige Tourismusentwicklung",
        semester: 2,
        ects: 10,
        weight: 10,
        packageid: 270030,
    },
    270036: {
        name: "Quantitative Methods/Econometrics",
        semester: 2,
        ects: 2.5,
        weight: 2.5,
        packageid: 270035,
    },
    270041: {
        name: "Master Thesis",
        semester: 3,
        ects: 30,
        weight: 30,
        packageid: 270040,
    }
}

const nte_examPackages: ExamPackages = {
    270000: {
        name: "Forschungsmethoden I",
        weight: 5,
        required: [270001,270002]
    },
    270005: {
        name: "Grundlagen der Tourismuswirtschaft",
        weight: 10,
        required: [270006,270007]
    },
    270010: {
        name: "Nachhaltiges Tourismusmanagement I",
        weight: 7.5,
        required: [270010]
    },
    270015: {
        name: "Öffentliche Wirtschaft",
        weight: 7.5,
        required: [270016]
    },
    270020: {
        name: "Nachhaltiges Tourismusmanagement II",
        weight: 10,
        required: [270021, 270022,270023]
    },
    270025: {
        name: "Planung und Recht",
        weight: 7.5,
        required: [270025]
    },
    270030: {
        name: "Projekt Nachhaltige Tourismusentwicklung",
        weight: 10,
        required: [270030]
    },
    270035: {
        name: "Forschungsmethoden II",
        weight: 2.5,
        required: [270036]
    },
    270040: {
        name: "Master Thesis",
        weight: 30,
        required: [270041]
    }
}

export const nte: SingleOption ={
    basics: nte_basicData,
    examPackages: nte_examPackages,
    exams: nte_exams
}