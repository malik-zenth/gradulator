import { BasicInformation, ExamPackages, Exams, SingleOption } from "./types";

const ibisb_basicData: BasicInformation = {
    name: "Internationale Betriebswirtschaft - Interkulturelle Studien",
    spo: 5,
    ects: 117,
    weight: 120,
    semesterChoices: {
        1: "Major / Minor"
    },
    required_emphasis: 1,
    emphasis: [
        {
            name: "Orient (including North Africa) & Arabic",
            emphasisid: 1,
            weight: 20,
            multipleGrades: true,
            ids: [255410, 255440]
        },
        {
            name: "Eastern Europe & Russian",
            emphasisid: 2,
            weight: 20,
            multipleGrades: true,
            ids: [255610, 255640]
        },
        {
            name: "Francophone World & French",
            emphasisid: 3,
            weight: 20,
            multipleGrades: true,
            ids: [255710, 255740]
        },
        {
            name: "Hispanic Countries & Spanish",
            emphasisid: 4,
            weight: 20,
            multipleGrades: true,
            ids: [255810, 255840]
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
            // Multiple Languages Emphasis Orient & Arabic
            options: [
                {
                    ids: [255441, 255442, 255451],
                    required: 3
                },
                {
                    ids: [255471, 255472, 255481],
                    required: 3
                }
            ],
            emphasisid: 1,
            examid: 255440,
        },
        {
            // Multiple Languages Emphasis Europe & Russian
            options: [
                {
                    ids: [255641, 255642, 255651],
                    required: 3
                },
                {
                    ids: [255671, 255672, 255681],
                    required: 3
                }
            ],
            emphasisid: 2,
            examid: 255640
        },
        {
            // Multiple Languages Emphasis World & French
            options: [
                {
                    ids: [255741, 255742, 255751],
                    required: 3
                },
                {
                    ids: [255771, 255772, 255781],
                    required: 3
                }
            ],
            emphasisid: 3,
            examid: 255740
        },
        {
            // Multiple Languages Emphasis Hispanic Countries
            options: [
                {
                    ids: [255841, 255842, 255851],
                    required: 3
                },
                {
                    ids: [255871, 255872, 255881],
                    required: 3
                }
            ],
            emphasisid: 4,
            examid: 255840
        },
        {
            // Major
            options: [
                {
                    ids: [255311, 255220],
                    required: 2,
                    optionId: 1
                },
                {
                    ids: [255312, 255313, 255314, 255315, 255316, 255317, 255318, 255319],
                    required: 3,
                    optionId: 1
                },
                {
                    ids: [255321, 255326],
                    required: 2,
                    optionId: 2
                },
                {
                    ids: [255322, 255323, 255324, 255325],
                    required: 3,
                    optionId: 2
                },
                {
                    ids: [255331, 255335],
                    required: 2,
                    optionId: 3
                },
                {
                    ids: [255332, 255333, 255334],
                    required: 3,
                    optionId: 3
                },
                {
                    ids: [255341, 255345],
                    required: 2,
                    optionId: 4
                },
                {
                    ids: [255342, 255343, 255344],
                    required: 3,
                    optionId: 4
                },
                {
                    ids: [255351, 255358],
                    required: 2,
                    optionId: 5
                },
                {
                    ids: [255352, 255353, 255354, 255355, 255356, 255357],
                    required: 3,
                    optionId: 5
                }
            ],
            multiOption: true,
            choiseID: 1,
            examid: 999999
        },
        {
            // Minor
            options: [
                {
                    ids: [255311],
                    required: 1,
                    optionId: 1
                },
                {
                    ids: [255312, 255313, 255314, 255315, 255316, 255317, 255318, 255319],
                    required: 2,
                    optionId: 1
                },
                {
                    ids: [255321],
                    required: 1,
                    optionId: 2
                },
                {
                    ids: [255322, 255323, 255324, 255325],
                    required: 2,
                    optionId: 2
                },
                {
                    ids: [255331],
                    required: 1,
                    optionId: 3
                },
                {
                    ids: [255332, 255333, 255334],
                    required: 2,
                    optionId: 3
                },
                {
                    ids: [255341],
                    required: 1,
                    optionId: 4
                },
                {
                    ids: [255342, 255343, 255344],
                    required: 2,
                    optionId: 4
                },
                {
                    ids: [255351],
                    required: 1,
                    optionId: 5
                },
                {
                    ids: [255352, 255353, 255354, 255355, 255356, 255357],
                    required: 2,
                    optionId: 5
                }
            ],
            multiOption: true,
            choiseID: 1,
            examid: 888888
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
        name: "Business Communication I B2/C1",
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
        emphasisid: 3,
        packageid: 255710
    },
    255721: {
        name: "Intercultural Communication and Management in Francophone Countries",
        semester: 6,
        weight: 5,
        emphasisid: 3,
        ects: 5,
        packageid: 255710
    },
    255811: {
        name: "Economic Studies: Hispanic Countries",
        semester: 3,
        weight: 2.5,
        emphasisid: 4,
        ects: 2.5,
        packageid: 255810
    },
    255821: {
        name: "Intercultural Communication and Management: Hispanic Countries",
        semester: 6,
        emphasisid: 4,
        weight: 5,
        ects: 5,
        packageid: 255810
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
        packageid: 255440
    },
    255442: {
        name: "Wirtschaftsarabisch I, A2.1",
        semester: 4,
        weight: 5,
        ects: 5,
        emphasisid: 1,
        packageid: 255440
    },
    255451: {
        name: "Wirtschaftsarabisch II, A2.2",
        semester: 6,
        weight: 2.5,
        ects: 2.5,
        emphasisid: 1,
        packageid: 255440
    },
    255471: {
        name: "Wirtschaftskommunikation Arabisch I, B1",
        semester: 3,
        weight: 5,
        ects: 5,
        emphasisid: 1,
        packageid: 255440
    },
    255472: {
        name: "Wirtschaftskommunikation Arabisch II, B1",
        semester: 4,
        weight: 5,
        ects: 5,
        emphasisid: 1,
        packageid: 255440
    },
    255481: {
        name: "Verhandeln auf Arabisch, B2",
        semester: 6,
        weight: 2.5,
        ects: 2.5,
        emphasisid: 1,
        packageid: 255440
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
        semester: 6,
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
    255671: {
        name: "Wirtschaftskommunikation Russisch I, B1",
        semester: 3,
        weight: 5,
        ects: 5,
        emphasisid: 2,
        packageid: 255640
    },
    255672: {
        name: "Wirtschaftskommunikation Russisch II, B1",
        semester: 4,
        weight: 5,
        ects: 5,
        emphasisid: 2,
        packageid: 255640
    },
    255681: {
        name: "Verhandeln auf Russisch, B2",
        semester: 6,
        weight: 2.5,
        ects: 2.5,
        emphasisid: 2,
        packageid: 255640
    },
    255922: {
        name: "Business Communication II, B1/B2",
        weight: 2.5,
        semester: 4,
        ects: 2.5,
        packageid: 255920
    },
    255932: {
        name: "Business Communication II B2/C1",
        weight: 2.5,
        semester: 4,
        ects: 2.5,
        packageid: 255920
    },
    255741: {
        name: "Wirtschaftsfranzösisch 3",
        weight: 5,
        ects: 5,
        semester: 3,
        emphasisid: 3,
        packageid: 255740
    },
    255742: {
        name: "Wirtschaftsfranzösisch 4 a",
        weight: 5,
        ects: 5,
        semester: 4,
        emphasisid: 3,
        packageid: 255740
    },
    255751: {
        name: "Wirtschaftsfranzösisch 4 b",
        weight: 2.5,
        ects: 2.5,
        semester: 6,
        emphasisid: 3,
        packageid: 255740
    },
    255771: {
        name: "Wirtschaftsfranzösisch 5",
        weight: 5,
        ects: 5,
        semester: 3,
        emphasisid: 3,
        packageid: 255740
    },
    255772: {
        name: "Wirtschaftsfranzösisch 6 a",
        weight: 5,
        ects: 5,
        semester: 4,
        emphasisid: 3,
        packageid: 255740
    },
    255781: {
        name: "Wirtschaftsfranzösisch 6 b",
        weight: 2.5,
        ects: 2.5,
        semester: 6,
        emphasisid: 3,
        packageid: 255740
    },
    255841: {
        name: "EI Espariol de la empresa III, A2",
        weight: 5,
        ects: 5,
        semester: 3,
        emphasisid: 4,
        packageid: 255840
    },
    255842: {
        name: "EI Espariol de la empresa IV, A2/B1",
        weight: 5,
        ects: 5,
        semester: 4,
        emphasisid: 4,
        packageid: 255840
    },
    255851: {
        name: "Los Negocios en Espariol, B1",
        weight: 2.5,
        ects: 2.5,
        semester: 6,
        emphasisid: 4,
        packageid: 255840
    },
    255871: {
        name: "EI Espariol de los Negocios I, B2",
        weight: 5,
        ects: 5,
        semester: 3,
        emphasisid: 4,
        packageid: 255840
    },
    255872: {
        name: "EI Espariol de los Negocios II, B2/C1",
        weight: 5,
        ects: 5,
        semester: 4,
        emphasisid: 4,
        packageid: 255840
    },
    255881: {
        name: "Estudios Hispanicos Aplicados, C1",
        weight: 2.5,
        ects: 2.5,
        semester: 6,
        emphasisid: 4,
        packageid: 255840
    },
    255311: {
        name: "International Financial & Management Accounting",
        weight: 5,
        ects: 5,
        semester_choise: 1,
        packageOptions: [888888, 999999]
    },
    255312: {
        name: "Consolidated Financial Statements",
        weight: 2.5,
        ects: 2.5,
        semester_choise: 1,
        packageOptions: [888888, 999999]
    },
    255313: {
        name: "Financial Statement Analysis",
        weight: 2.5,
        ects: 2.5,
        semester_choise: 1,
        packageOptions: [888888, 999999]
    },
    255314: {
        name: "Taxes",
        weight: 2.5,
        ects: 2.5,
        semester_choise: 1,
        packageOptions: [888888, 999999]
    },
    255315: {
        name: "Management Accounting for Services",
        weight: 2.5,
        ects: 2.5,
        semester_choise: 1,
        packageOptions: [888888, 999999]
    },
    255316: {
        name: "Strategic Management Accounting",
        weight: 2.5,
        ects: 2.5,
        semester_choise: 1,
        packageOptions: [888888, 999999]
    },
    255317: {
        name: "Functional Management Accounting",
        weight: 2.5,
        ects: 2.5,
        semester_choise: 1,
        packageOptions: [888888, 999999]
    },
    255318: {
        name: "IT-Tools",
        weight: 2.5,
        ects: 2.5,
        semester_choise: 1,
        packageOptions: [888888, 999999]
    },
    255319: {
        name: "Mergers & Acquisitions",
        weight: 2.5,
        ects: 2.5,
        semester_choise: 1,
        packageOptions: [888888, 999999]
    },
    255220: {
        name: "Financial & Management Accounting Projects",
        weight: 7.5,
        ects: 7.5,
        semester_choise: 1,
        packageid: 999999
    },
    255321: {
        name: "International Finance",
        weight: 5,
        ects: 5,
        semester_choise: 1,
        packageOptions: [888888, 999999]
    },
    255322: {
        name: "Derivates",
        weight: 2.5,
        ects: 2.5,
        semester_choise: 1,
        packageOptions: [888888, 999999]
    },
    255323: {
        name: "Corporate Finance",
        weight: 2.5,
        ects: 2.5,
        semester_choise: 1,
        packageOptions: [888888, 999999]
    },
    255324: {
        name: "Financial Risk Management",
        weight: 2.5,
        ects: 2.5,
        semester_choise: 1,
        packageOptions: [888888, 999999]
    },
    255325: {
        name: "Specific Issues in Finance",
        weight: 2.5,
        ects: 2.5,
        semester_choise: 1,
        packageOptions: [888888, 999999]
    },
    255326: {
        name: "Finance Projets",
        weight: 7.5,
        ects: 7.5,
        semester_choise: 1,
        packageid: 999999
    },
    255331: {
        name: "International Human Resource Management",
        weight: 5,
        ects: 5,
        semester_choise: 1,
        packageOptions: [888888, 999999]
    },
    255332: {
        name: "Specific Issues in International Human Resource Management",
        weight: 2.5,
        ects: 2.5,
        semester_choise: 1,
        packageOptions: [888888, 999999]
    },
    255333: {
        name: "Employment Law",
        weight: 2.5,
        ects: 2.5,
        semester_choise: 1,
        packageOptions: [888888, 999999]
    },
    255334: {
        name: "International Human Resource Management Case Studies",
        weight: 2.5,
        ects: 2.5,
        semester_choise: 1,
        packageOptions: [888888, 999999]
    },
    255335: {
        name: "International Human Resource Management Projects",
        weight: 7.5,
        ects: 7.5,
        semester_choise: 1,
        packageid: 999999
    },
    255341: {
        name: "International Management",
        weight: 5,
        ects: 5,
        semester_choise: 1,
        packageOptions: [888888, 999999]
    },
    255342: {
        name: "Change Management",
        weight: 2.5,
        ects: 2.5,
        semester_choise: 1,
        packageOptions: [888888, 999999]
    },
    255343: {
        name: "Specific Issues in International Management",
        weight: 2.5,
        ects: 2.5,
        semester_choise: 1,
        packageOptions: [888888, 999999]
    },
    255344: {
        name: "Global Leadership",
        weight: 2.5,
        ects: 2.5,
        semester_choise: 1,
        packageOptions: [888888, 999999]
    },
    255345: {
        name: "International Management Projects",
        weight: 7.5,
        ects: 7.5,
        semester_choise: 1,
        packageid: 999999
    },
    255351: {
        name: "International Marketing",
        weight: 5,
        ects: 5,
        semester_choise: 1,
        packageOptions: [888888, 999999]
    },
    255352: {
        name: "B2C-Marketing",
        weight: 2.5,
        ects: 2.5,
        semester_choise: 1,
        packageOptions: [888888, 999999]
    },
    255353: {
        name: "B2B-Marketing",
        weight: 2.5,
        ects: 2.5,
        semester_choise: 1,
        packageOptions: [888888, 999999]
    },
    255354: {
        name: "Service Marketing",
        weight: 2.5,
        ects: 2.5,
        semester_choise: 1,
        packageOptions: [888888, 999999]
    },
    255355: {
        name: "E-Marketing",
        weight: 2.5,
        ects: 2.5,
        semester_choise: 1,
        packageOptions: [888888, 999999]
    },
    255356: {
        name: "Market Research",
        weight: 2.5,
        ects: 2.5,
        semester_choise: 1,
        packageOptions: [888888, 999999]
    },
    255357: {
        name: "Specific Issues in International Marketing",
        weight: 2.5,
        ects: 2.5,
        semester_choise: 1,
        packageOptions: [888888, 999999]
    },
    255358: {
        name: "International Marketing Projects",
        weight: 7.5,
        ects: 7.5,
        semester_choise: 1,
        packageid: 999999
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
        required: [255133]
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
    255610: {
        name: "Economic and Cultural Area Studies",
        weight: 7.5,
        required: [255611, 255621]
    },
    255710: {
        name: "Economic and Cultural Area Studies",
        weight: 7.5,
        required: [255711, 255721]
    },
    255810: {
        name: "Economic and Cultural Area Studies",
        weight: 7.5,
        required: [255811, 255821]
    },
    255440: {
        name: "Language Area Studies",
        weight: 12.5,
        required: [255441, 255442, 255451, 255471, 255472, 255481]
    },
    255640: {
        name: "Language Area Studies",
        weight: 12.5,
        required: [255641, 255642, 255651, 255671, 255672, 255681]
    },
    255740: {
        name: "Language Area Studies",
        weight: 12.5,
        required: [255741, 255742, 255751, 255771, 255772, 255781]
    },
    255840: {
        name: "Language Area Studies",
        weight: 12.5,
        required: [255841, 255842, 255851, 255871, 255872, 255881]
    },
    888888: {
        name: "Minor",
        weight: 10,
        required: [255311, 255312, 255313, 255314, 255315, 255316, 255317, 255341, 255342, 255343, 255344,
            255318, 255319, 255321, 255322, 255323, 255324, 255325,255331, 255332, 255333, 255334, 
            255351, 255352, 255353, 255354, 255355, 255356, 255357]
    },
    999999: {
        name: "Major",
        weight: 20,
        required: [255311, 255312, 255313, 255314, 255315, 255316, 255317, 255341, 255342, 255343, 255344, 255345,
            255318, 255319, 255220, 255321, 255322, 255323, 255324, 255325, 255326,255331, 255332, 255333, 255334, 
            255335, 255351, 255352, 255353, 255354, 255355, 255356, 255357, 255358]
    }
}


export const ibisb: SingleOption = {
    basics: ibisb_basicData,
    examPackages: ibisb_examPackages,
    exams: ibisb_exams
}