import {BasicInformation, ExamPackages, Exams, SingleOption} from "./types"


const vb_basic_data: BasicInformation = {
    name: "Verkehrsbetriebswirtschaft und Logistik",
    weight: 120,
    ects: 0,
    beta: true,
    required_emphasis: 1,
    emphasis: [],
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
    }
}

const vb_ExamPackages: ExamPackages = {
    163300: {
        name: "Wahlfächer",
        weight: 10,
        required: [163301,163302,163303,163304]
    }
}


export const vb: SingleOption = {
    basics: vb_basic_data,
    exams: vb_exams,
    examPackages: vb_ExamPackages
}