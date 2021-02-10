import {BasicInformation, ExamPackages, Exams, SingleOption} from "./types"

const mwi_basic_data: BasicInformation = {
    name: "Wirtschaftsinformatik - Digitale Transformation",
    weight: 90,
    ects: 90,
    required_emphasis: 0,
    emphasis: []
}

const mwi_exams: Exams = {
    510610: {
        semester: 1,
        ects: 5,
        weight: 5,
        name: "Wirtschaftsinformatik als Gestalter der digitalen Transformation",
        packageid: 510610
    },
    510620: {
        semester: 1,
        ects: 5,
        weight: 5,
        name: "Unternehmerische Exzellenz als strategischer Treiber der digitalen Transformation",
        packageid: 510620
    },
    510630: {
        semester: 1,
        ects: 5,
        weight: 5,
        name: "IT-Exzellenz als technischer Treiber der digitalen Transformation",
        packageid: 510630
    },
    510640: {
        semester: 1,
        ects: 8,
        weight: 5,
        name: "Projektarbeit I",
        packageid: 510640
    },
    510650: {
        semester: 2,
        ects: 5,
        weight: 5,
        name: "Strategisches Informationsmanagement",
        packageid: 510650
    },
    510660: {
        semester: 2,
        ects: 5,
        weight: 5,
        name: "Business Intelligence & Analytics",
        packageid: 510660
    },
    510670: {
        semester: 2,
        ects: 5,
        weight: 5,
        name: "Management betrieblicher Kernsysteme",
        packageid: 510670
    },
    510680: {
        semester: 2,
        ects: 8,
        weight: 5,
        name: "Projektarbeit II",
        packageid: 510680
    },
    510690: {
        semester: 3,
        ects: 5,
        weight: 5,
        name: "Strategien für die digitale Transformation",
        packageid: 510690
    },
    510700: {
        semester: 3,
        ects: 5,
        weight: 5,
        name: "Management digitaler Prozesse",
        packageid: 510700
    },
    510710: {
        semester: 3,
        ects: 5,
        weight: 5,
        name: "Management digitaler Erfolgskulturen",
        packageid: 510710
    },
    510720: {
        semester: 3,
        ects: 8,
        weight: 5,
        name: "Projektarbeit III",
        packageid: 510720
    },
    510730: {
        semester: 4,
        ects: 3,
        weight: 5,
        name: "Methodenkompetenz",
        packageid: 510730
    },
    510741: {
        semester: 4,
        ects: 3,
        weight: 5,
        name: "Studienwoche",
        packageid: 510740
    },
    510751: {
        semester: 4,
        ects: 15,
        weight: 5,
        name: "Master Thesis mit integriertem Kolloquium",
        packageid: 510750
    },
}

const mwi_ExamPackages: ExamPackages = {
    510610: {
        name: "Wirtschaftsinformatik als Gestalter der digitalen Transformation",
        weight: 5,
        required: [510610]
    },
    510620: {
        name: "Unternehmerische Exzellenz als strategischer Treiber der digitalen Transformation",
        weight: 5,
        required: [510620]
    },
    510630: {
        name: "IT-Exzellenz als technischer Treiber der digitalen Transformation",
        weight: 5,
        required: [510630]
    },
    510640: {
        name: "Projektarbeit I",
        weight: 8,
        required: [510640]
    },
    510650: {
        name: "Strategisches Informationsmanagement",
        weight: 5,
        required: [510650]
    },
    510660: {
        name: "Business Intelligence & Analytics",
        weight: 5,
        required: [510660]
    },
    510670: {
        name: "Management betrieblicher Kernsysteme",
        weight: 5,
        required: [510670]
    },
    510680: {
        name: "Projektarbeit II",
        weight: 8,
        required: [510680]
    },
    510690: {
        name: "Strategien für die digitale Transformation",
        weight: 5,
        required: [510690]
    },
    510700: {
        name: "Management digitaler Prozesse",
        weight: 5,
        required: [510700]
    },
    510710: {
        name: "Management digitaler Erfolgskulturen",
        weight: 5,
        required: [510710]
    },
    510720: {
        name: "Projektarbeit III",
        weight: 8,
        required: [510720]
    },
    510730: {
        name: "Methodenkompetenz",
        weight: 3,
        required: [510730]
    },
    510740: {
        name: "Studienwoche",
        weight: 3,
        required: [510741]
    },
    510750: {
        name: "Abschlussmodul Master Thesis mit integriertem Kolloquium",
        weight: 15,
        required: [510751]
    }
}

export const mwi: SingleOption = {
    basics: mwi_basic_data,
    exams: mwi_exams,
    examPackages: mwi_ExamPackages
}