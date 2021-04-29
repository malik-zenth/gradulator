import { BasicInformation, ExamPackages, Exams, SingleOption } from "./types";

const mu_basic_data: BasicInformation = {
    name: "Master in Unternehmensführung",
    weight: 90,
    ects: 90,
    spo: 3,
    beta: true,
    emphasis: [],
    required_emphasis: 0
}

const mu_exams: Exams = {
    151201: {
        semester: 1,
        ects: 5,
        weight: 4,
        name: "Organizational Behaviour",
        packageid: 151200
    },
    151211: {
        semester: 1,
        ects: 5,
        weight: 4,
        name: "Compliance & Ethik",
        packageid: 151210
    },
    151221: {
        semester: 1,
        ects: 5,
        weight: 4,
        name: "Research Methods",
        packageid: 151220
    },
    151231: {
        semester: 1,
        ects: 5,
        weight: 4,
        name: "Wahlpflichtfach 1",
        packageid: 151230
    },
    151232: {
        semester: 1,
        ects: 5,
        weight: 4,
        name: "Wahlpflichtfach 2",
        packageid: 151230
    },
    151233: {
        semester: 1,
        ects: 5,
        weight: 4,
        name: "Wahlpflichtfach 3",
        packageid: 151230
    },
    151271: {
        semester: 2,
        ects: 5,
        weight: 4,
        name: "Innovation Management",
        packageid: 151270
    },
    151261: {
        semester: 2,
        ects: 5,
        weight: 4,
        name: "Strategic Management",
        packageid: 151260
    },
    151251: {
        semester: 2,
        ects: 5,
        weight: 4,
        name: "Leadership",
        packageid: 151250
    },
    151241: {
        semester: 2,
        ects: 5,
        weight: 4,
        name: "Forschungsstudie Unternehmensführung",
        packageid: 151240
    },
    151281: {
        semester: 2,
        ects: 5,
        weight: 4,
        name: "Wahlpflichtfach 4",
        packageid: 151280
    },
    151282: {
        semester: 2,
        ects: 5,
        weight: 4,
        name: "Wahlpflichtfach 5",
        packageid: 151280
    },
    151291: {
        semester: 4,
        ects: 30,
        weight: 30,
        name: "Management-Fähigkeiten",
        packageid: 151290
    },
    151311: {
        semester: 3,
        ects: 20,
        weight: 20,
        name: "Master-Thesis",
        packageid: 151310
    },
    151302: {
        semester: 3,
        ects: 5,
        weight: 5,
        name: "Thesis-Kolloquium",
        packageid: 151300
    }
}

const mu_ExamPackages: ExamPackages = {
    151200: {
        name: "Organizational Behaviour",
        weight: 5,
        required: [151201]
    },
    151210: {
        name: "Compliance & Ethik",
        weight: 5,
        required: [151211]
    },
    151220: {
        name: "Wissenschaftsmethoden",
        weight: 5,
        required: [151221]
    },
    151230: {
        name: "Unternehmensführung I",
        weight: 15,
        required: [151231,151232,151233]
    },
    151240: {
        name: "Forschungsstudie Unternehmensführung",
        weight: 5,
        required: [151241]
    },
    151250: {
        name: "Leadership",
        weight: 5,
        required: [151251]
    },
    151260: {
        name: "Strategic Management",
        weight: 5,
        required: [151261]
    },
    151270: {
        name: "Innovationsmanagement",
        weight: 5,
        required: [151271]
    },
    151280: {
        name: "Unternehmensführung II",
        weight: 10,
        required: [151281,151282]
    },
    151290: {
        name: "Management-Fähigkeiten",
        weight: 30,
        required: [151291]
    },
    151300: {
        name: "Kolloquium und Persönlichkeitskompetenzen",
        weight: 5,
        required: [151302]
    },
    151310: {
        name: "Master Thesis",
        weight: 25,
        required: [151311]
    }
}

export const mu: SingleOption = {
    basics: mu_basic_data,
    exams: mu_exams,
    examPackages: mu_ExamPackages
}