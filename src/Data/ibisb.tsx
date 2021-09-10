import { BasicInformation, ExamPackages, Exams, SingleOption } from "./types";

const ibisb_basicData: BasicInformation = {
    name: "Internationale Betriebswirtschaft - Interkulturelle Studien",
    spo: 5,
    beta: true,
    ects: 0,
    weight: 0,
    required_emphasis: 1,
    emphasis: [
        {
            name: "Orient (including North Africa) & Arabic",
            emphasisid: 1,
            multipleGrades: true,
            ids: [255410, 255440]
        },
        {
            name: "Eastern Europe & Russian",
            emphasisid: 2,
            multipleGrades: true,
            ids: [255610, 255640]
        }
    ],
    elevtive: [
        {
            ids: [255151, 255152, 255153],
            required: 2,
            examid: 255150
        },
        {
            options: [
                {
                    ids: [255921, 255922],
                    required: 2
                },
                {
                    ids: [255931, 255932],
                    required: 2
                }
            ],
            examid: 255920
        },
        {
            ids: [255941, 255951],
            examid: 255940,
            required: 1
        },
        {
            options: [
                {
                    ids: [255411, 255421],
                    required: 2
                },
                {
                    ids: [255611, 255621],
                    required: 2
                },
                {
                    ids: [255711, 255721],
                    required: 2
                },
                {
                    ids: [255811, 255821],
                    required: 2
                }
            ],
            examid: 255400
        },
        {
            options: [
                {
                    ids: [255441, 255442, 255461],
                    required: 3
                },
                {
                    ids: [255471,255472,255481],
                    required: 3
                }
            ],
            emphasis_elevtive: true,
            emphasisid: 1,
            examid: 888888,

        }
    ]
}

const ibisb_exams: Exams = {
    255111: {
        name: "Introduction to Management Accounting",
        weight: 2.5,
        ects: 2.5,
        semester: 3,
        packageid: 255110
    },
    255112: {
        name: "Strategic Management",
        weight: 2.5,
        ects: 2.5,
        semester: 3,
        packageid: 255110
    },
    255113: {
        name: "Marketing Case Studies",
        weight: 2.5,
        ects: 2.5,
        semester: 3,
        packageid: 255110
    },
    255133: {
        name: "Corporate Social Responsibility",
        weight: 5,
        ects: 5,
        semester: 3,
        packageid: 255130
    },
    255141: {
        name: "Models and Methods of Data Assessment",
        weight: 2.5,
        ects: 2.5,
        semester: 3,
        packageid: 255140
    },
    255151: {
        name: "Microeconomics",
        weight: 2.5,
        semester: 3,
        ects: 2.5,
        packageid: 255150
    },
    255152: {
        name: "Macroeconomics",
        weight: 2.5,
        semester: 3,
        ects: 2.5,
        packageid: 255150
    },
    255153: {
        name: "International Economics",
        weight: 2.5,
        semester: 3,
        ects: 2.5,
        packageid: 255150
    },
    255921: {
        name: "Business Communication I, B1/B2",
        weight: 2.5,
        semester: 3,
        ects: 2.5,
        packageid: 255920
    },
    255931: {
        name: "Business Communication I B2/c1",
        weight: 2.5,
        semester: 3,
        ects: 2.5,
        packageid: 255920
    },
    255114: {
        name: "Digital Economy Business Case Studies/Business Case Studies",
        weight: 5,
        semester: 4,
        ects: 5,
        packageid: 255110
    },
    255161: {
        name: "Law II",
        weight: 2.5,
        semester: 4,
        ects: 2.5,
        packageid: 255160
    },
    255121: {
        name: "Business Seminar",
        semester: 6,
        weight: 7.5,
        ects: 7.5,
        packageid: 255120
    },
    255122: {
        name: "Business Simulation",
        semester: 7,
        weight: 7.5,
        ects: 7.5,
        packageid: 255120
    },
    255941: {
        name: "English Language and Culture, B2",
        semester: 7,
        weight: 5,
        ects: 5,
        packageid: 255940
    },
    255951: {
        name: "English Language and Culture, C1",
        semester: 7,
        weight: 5,
        ects: 5,
        packageid: 255940
    },
    255211: {
        name: "International Law/International Relations",
        semester: 7,
        weight: 2.5,
        ects: 2.5,
        packageid: 255210
    },
    255521: {
        name: "Bachelor Thesis",
        semester: 7,
        weight: 12,
        ects: 12,
        packageid: 255520
    },
    255711: {
        name: "Economic Studies of the Francophone World",
        semester: 3,
        weight: 2.5,
        ects: 2.5,
        packageid: 255400
    },
    255721: {
        name: "Intercultural Communication and Management in Francophone Countries",
        semester: 6,
        weight: 5,
        ects: 5,
        packageid: 255400
    },
    255811: {
        name: "Economic Studies: Hispanic Countries",
        semester: 3,
        weight: 2.5,
        ects: 2.5,
        packageid: 255400
    },
    255821: {
        name: "Intercultural Communication and Management: Hispanic Countries",
        semester: 6,
        weight: 5,
        ects: 5,
        packageid: 255400
    },
    255411: {
        name: "Economic Studies: Orient",
        semester: 3,
        weight: 2.5,
        ects: 2.5,
        emphasisid: 1,
        packageid: 255410
    },
    255421: {
        name: "Intercultural Communication and Management: Orient",
        semester: 6,
        weight: 5,
        ects: 5,
        emphasisid: 1,
        packageid: 255410
    },
    255441: {
        name: "Arabisch im Alltag, A1.2",
        semester: 3,
        weight: 5,
        ects: 5,
        emphasisid: 1,
        packageid: 888888
    },
    255442: {
        name: "Wirtschaftsarabisch I, A2.1",
        semester: 4,
        weight: 5,
        ects: 5,
        emphasisid: 1,
        packageid: 888888
    },
    255461: {
        name: "Wirtschaftsarabisch II, A2.2",
        semester: 6,
        weight: 2.5,
        ects: 2.5,
        emphasisid: 1,
        packageid: 888888
    },
    255471: {
        name: "Wirtschaftskommunikation Arabisch I, B1",
        semester: 3,
        weight: 5,
        ects: 5,
        emphasisid: 1,
        packageid: 888888
    },
    255472: {
        name: "Wirtschaftskommunikation Arabisch II, B1",
        semester: 4,
        weight: 5,
        ects: 5,
        emphasisid: 1,
        packageid: 888888
    },
    255481: {
        name: "Verhandeln auf Arabisch, 82",
        semester: 6,
        weight: 2.5,
        ects: 2.5,
        emphasisid: 1,
        packageid: 888888
    },
    255611: {
        name: "Economic Studies: Eastern Europe",
        semester: 3,
        weight: 2.5,
        ects: 2.5,
        emphasisid: 2,
        packageid: 255610
    },
    255621: {
        name: "Intercultural Communication and Management: Eastern Europe",
        semester: 5,
        weight: 5,
        ects: 5,
        emphasisid: 2,
        packageid: 255610
    },
    255641: {
        name: "Russisch im Alltag, A1.2",
        semester: 3,
        weight: 5,
        ects: 5,
        emphasisid: 2,
        packageid: 255640
    },
    255642: {
        name: "Wirtschaftsrussisch I A2.1",
        semester: 4,
        weight: 5,
        ects: 5,
        emphasisid: 2,
        packageid: 255640
    },
    255651: {
        name: "Wirtschaftsrussisch II A2.2",
        semester: 6,
        weight: 2.5,
        ects: 2.5,
        emphasisid: 2,
        packageid: 255640
    },
    888888: {
        name: "Language Area Studies",
        weight: 12.5,
        ects: 12.5,
        packageid: 255440,
        emphasisid: 1,
        ignored: true
    }


}


const ibisb_examPackages: ExamPackages = {
    255110: {
        name: "Business Administration",
        weight: 12.5,
        required: [255111, 255112, 255113, 255114]
    },
    255130: {
        name: "Corporate Social Responsibility",
        weight: 5,
        required: [255131, 255132]
    },
    255140: {
        name: "Research Methods",
        weight: 2.5,
        required: [255141]
    },
    255150: {
        name: "Economics",
        weight: 5,
        required: [255151, 255152, 255153]
    },
    255920: {
        name: "Professional Communication",
        weight: 5,
        required: [255921, 255922, 255931, 255932]
    },
    255160: {
        name: "Law",
        weight: 2.5,
        required: [255161]
    },
    255520: {
        name: "Bachelor Thesis",
        weight: 15,
        required: [255521]
    },
    255210: {
        name: "International Law/International Relations",
        weight: 2.5,
        required: [255211]
    },
    255940: {
        name: "English Language and Culture",
        weight: 5,
        required: [255941, 255951]
    },
    255120: {
        name: "Advanced Business Administation",
        weight: 15,
        required: [255121, 255122]
    },
    255410: {
        name: "Economic and Cultural Area Studies",
        weight: 7.5,
        required: [255411, 255421]
    },
    255440: {
        name: "Language Area Studies",
        weight: 12.5,
        required: [255441, 255442, 255461, 255471,255472,255481]
    },
    255610: {
        name: "Economic and Cultural Area Studies",
        weight: 7.5,
        required: [255611, 255621]
    },
    255640: {
        name: "Language Area Studies",
        weight: 12.5,
        required: [255641, 255642, 255651]
    }
}


export const ibisb: SingleOption = {
    basics: ibisb_basicData,
    examPackages: ibisb_examPackages,
    exams: ibisb_exams
}