import { BasicInformation, ExamPackages, Exams, SingleOption } from "./types";

const tmb_basic_data: BasicInformation = {
    name: "Tourismusmanagement",
    weight: 120,
    beta: true,
    ects: 117,
    spo: 6,
    required_emphasis: 0,
    emphasis: [],
    semesterChoices: {
        1: "Wahlfach Tourismusmanagement",
        2: "Wahlfach Auslandssemester",
        5: "Wahlfach Englisch und Sprachen",
        4: "BWL-Spezialisierungen II. Teil",
        3: "BWL-Spezialisierungen I. Teil",
    },
    elevtive: [
        {
            ids: [186151, 186152, 186153],
            required: 1,
            examid: 186150
        },
        {
            ids: [186233, 186235, 186237, 186239, 186241, 186243, 186245, 186247],
            required: 1,
            examid: 186250,
            choiseID: 1
        },
        {
            ids: [186231, 186233, 186235, 186237, 186239, 186241, 186243, 186245, 186247],
            required: 1,
            examid: 186260,
            choiseID: 1
        },
        {
            ids: [186231, 186233, 186235, 186237, 186239, 186241, 186243, 186245, 186247],
            required: 1,
            examid: 186270,
            choiseID: 1
        },
        {
            // I1
            options: [
                {
                    ids: [186531, 186532, 186533, 186534, 186535, 186536],
                    required: 2,
                },
                {
                    ids: [186431, 186461, 186631, 186661, 186731, 186761, 186831, 186861],
                    required: 1,
                    optionId: 1
                },
                { 
                    ids: [186901,186902,186911,186921,186922,186931,186932,186951,186952],
                    required: 1,
                    optionId: 1
                }
            ],
            examid: 186530,
            multiOption: true,
            choiseID: 2
        },
        {
            // I2
            options: [
                {
                    ids: [186541, 186542, 186543],
                    required: 1,
                },
                {
                    ids: [186312,186314,186315,186316,186317,186318,186319],
                    required: 3,
                },
                {
                    ids: [186322,186323,186324,186325],
                    required: 3,
                },
                {
                    ids: [186332,186333,186334],
                    required: 3
                },
                {
                    ids: [186342,186343,186344],
                    required: 3
                },
                {
                    ids: [186352,186353,186354,186355,186356,186357],
                    required: 3
                }
            ],
            examid: 186540,
        },
        {
            // I3
            ids: [186531, 186532, 186533, 186534, 186535, 186536, 186551, 186552, 186553, 186554, 186432,186462,186632,186662,186732,186762,186832,186862],
            required: 1,
            examid: 186550,
            multiOption: true,
            choiseID: 2
        },
        {
            // I4
            ids: [186534, 186535, 186536, 186561, 186562, 186563, 186311, 186321, 186331, 186341, 186351],
            required: 1,
            examid: 186560,
            multiOption: true,
            choiseID: 2
        },
        {
            // I5
            ids: [186571, 186572, 186573, 186574, 186575, 186576, 186577, 186578, 186901, 186902, 186911, 186912, 186921, 186922, 186931, 186932, 186951, 186952],
            required: 1,
            examid: 186570,
            multiOption: true,
            choiseID: 2
        },
        {
            // I6
            ids: [186551, 186552, 186553, 186554, 186581, 186582, 186583, 186584, 186585, 186586, 186587, 186441, 186471, 186641, 186671, 186741, 186771, 186841, 186871],
            required: 1,
            examid: 186580,
            multiOption: true,
            choiseID: 2
        },
        {
            ids: [186341, 186471, 186641, 186671, 186741, 186771, 186841, 186871, 186311, 186321, 186331, 186341, 186351],
            required: 1,
            examid: 186400,
            multiOption: true,
            choiseID: 2
        }
    ]
}

const tmb_exams: Exams = {
    186111: {
        semester: 3,
        ects: 2.5,
        weight: 2,
        name: "Controlling",
        packageid: 186110
    },
    186112: {
        semester: 3,
        ects: 2.5,
        weight: 2,
        name: "Strategisches Management",
        packageid: 186110
    },
    186141: {
        semester: 3,
        ects: 2.5,
        weight: 2,
        name: "Modelle und Methoden der Datenanalyse",
        packageid: 186140
    },
    186151: {
        semester: 3,
        ects: 2.5,
        weight: 2.5,
        name: "Mikroökonomie",
        packageid: 186150
    },
    186152: {
        semester: 3,
        ects: 2.5,
        weight: 2.5,
        name: "Makroökonomie",
        packageid: 186150
    },
    186153: {
        semester: 3,
        ects: 2.5,
        weight: 2.5,
        name: "Internationale VWL",
        packageid: 186150
    },
    186203: {
        semester: 3,
        ects: 5,
        weight: 2,
        name: "Recht in Tourismus und Hospitality / Tourismuspolitische Rahmenbedingungen ",
        packageid: 186200
    },
    186531: {
        semester_choise: 2,
        ects: 5,
        weight: 5,
        name: "Internationale BWL 1",
        packageOptions: [186530, 186550]
    },
    186532: {
        semester_choise: 2,
        ects: 5,
        weight: 5,
        name: "Managementprozesse I",
        packageOptions: [186530, 186550]
    },
    186533: {
        semester_choise: 2,
        ects: 5,
        weight: 5,
        name: "Tourismusmanagement I",
        packageOptions: [186530, 186550]
    },
    186534: {
        semester_choise: 2,
        ects: 5,
        weight: 5,
        name: "Internationale BWL II",
        packageOptions: [186530, 186550, 186560],
    },
    186535: {
        semester_choise: 2,
        ects: 5,
        weight: 5,
        name: "Managementprozesse II",
        packageOptions: [186530, 186550, 186560]
    },
    186536: {
        semester_choise: 2,
        ects: 5,
        weight: 5,
        name: "Tourismusmanagement II",
        packageOptions: [186530, 186550, 186560]
    },
    186551: {
        semester_choise: 2,
        ects: 5,
        weight: 5,
        name: "VWL I (5 ECTS)",
        packageOptions: [186550, 186580]
    },
    186552: {
        semester_choise: 2,
        ects: 5,
        weight: 5,
        name: "Recht I (5 ECTS)",
        packageOptions: [186550, 186580]
    },
    186553: {
        semester_choise: 2,
        ects: 5,
        weight: 5,
        name: "Methoden I (5 ECTS)",
        packageOptions: [186550, 186580]
    },
    186554: {
        semester_choise: 2,
        ects: 5,
        weight: 5,
        name: "Studium Generale I (5 ECTS)",
        packageOptions: [186550, 186580]
    },
    186581: {
        semester_choise: 2,
        ects: 5,
        weight: 5,
        name: "VWL II (5 ECTS)",
        packageOptions: [186580]
    },
    186582: {
        semester_choise: 2,
        ects: 5,
        weight: 5,
        name: "Recht II (5 ECTS)",
        packageOptions: [186580]
    },
    186583: {
        semester_choise: 2,
        ects: 5,
        weight: 5,
        name: "Methoden II (5 ECTS)",
        packageOptions: [186580]
    },
    186584: {
        semester_choise: 2,
        ects: 5,
        weight: 5,
        name: "Studium Generale II (5 ECTS)",
        packageOptions: [186580]
    },
    186585: {
        semester_choise: 2,
        ects: 5,
        weight: 5,
        name: "Englisch",
        packageOptions: [186580]
    },
    186586: {
        semester_choise: 2,
        ects: 5,
        weight: 5,
        name: "Französisch",
        packageOptions: [186580]
    },
    186587: {
        semester_choise: 2,
        ects: 5,
        weight: 5,
        name: "Spanisch",
        packageOptions: [186580]
    },
    186561: {
        semester_choise: 2,
        ects: 5,
        weight: 5,
        name: "Internationale BWL III",
        packageOptions: [186560, 186560]
    },
    186562: {
        semester_choise: 2,
        ects: 5,
        weight: 5,
        name: "Managementprozesse III",
        packageOptions: [186560, 186560]
    },
    186563: {
        semester_choise: 2,
        ects: 5,
        weight: 5,
        name: "Tourismusmanagement III",
        packageOptions: [186560, 186560]
    },
    186231: {
        semester_choise: 1,
        ects: 5,
        weight: 5,
        name: "Destinationsmanagement",
        packageOptions: [186250, 186260, 186270],
    },
    186233: {
        semester_choise: 1,
        ects: 5,
        weight: 5,
        name: "Nachhaltigkeit im Tourismus",
        packageOptions: [186250, 186260, 186270]
    },
    186235: {
        semester_choise: 1,
        ects: 5,
        weight: 5,
        name: "Geschäftstourismus",
        packageOptions: [186250, 186260, 186270]
    },
    186237: {
        semester_choise: 1,
        ects: 5,
        weight: 5,
        name: "MICE Industrie und Eventmanagement",
        packageOptions: [186250, 186260, 186270]
    },
    186239: {
        semester_choise: 1,
        ects: 5,
        weight: 5,
        name: "Reiseveranstaltung",
        packageOptions: [186250, 186260, 186270]
    },
    186241: {
        semester_choise: 1,
        ects: 5,
        weight: 5,
        name: "Touristikmarketing",
        packageOptions: [186250, 186260, 186270]
    },
    186243: {
        semester_choise: 1,
        ects: 5,
        weight: 5,
        name: "Verkehrträgermanagement",
        packageOptions: [186250, 186260, 186270]
    },
    186245: {
        semester_choise: 1,
        ects: 5,
        weight: 5,
        name: "Gesundheitsmanagement",
        packageOptions: [186250, 186260, 186270]
    },
    186247: {
        semester_choise: 1,
        ects: 5,
        weight: 5,
        name: "Hotel- und Restaurantmanagement",
        packageOptions: [186250, 186260, 186270]
    },
    186541: {
        semester: 4,
        ects: 7.5,
        weight: 7.5,
        name: "Internationale BWL I",
        packageid: 186540
    },
    186542: {
        semester: 4,
        ects: 7.5,
        weight: 7.5,
        name: "Managementprozesse I",
        packageid: 186540
    },
    186543: {
        semester: 4,
        ects: 7.5,
        weight: 7.5,
        name: "Tourismusmanagement I",
        packageid: 186540
    },
    186311: {
        semester_choise: 3,
        ects: 5,
        weight: 5,
        name: "International Financial & Management Accounting",
        packageOptions: [186560, 186400]
    },
    186321: {
        semester_choise: 3,
        ects: 5,
        weight: 5,
        name: "International Finance",
        packageOptions: [186560, 186400]
    },
    186331: {
        semester_choise: 3,
        ects: 5,
        weight: 5,
        name: "International Human Resource Management",
        packageOptions: [186560, 186400]
    },
    186341: {
        semester_choise: 3,
        ects: 5,
        weight: 5,
        name: "International Management",
        packageOptions: [186560, 186400]
    },
    186351: {
        semester_choise: 3,
        ects: 5,
        weight: 5,
        name: "International Marketing",
        packageOptions: [186560, 186400]
    },
    186571: {
        semester_choise: 2,
        ects: 2.5,
        weight: 2.5,
        name: "VWL I (2.5 ECTS)",
        packageOptions: [186570]
    },
    186572: {
        semester_choise: 2,
        ects: 2.5,
        weight: 2.5,
        name: "Recht I (2.5 ECTS)",
        packageOptions: [186570]
    },
    186573: {
        semester_choise: 2,
        ects: 2.5,
        weight: 2.5,
        name: "Methoden I (2.5 ECTS)",
        packageOptions: [186570]
    },
    186574: {
        semester_choise: 2,
        ects: 2.5,
        weight: 2.5,
        name: "Studium Generale I (2.5 ECTS)",
        packageOptions: [186570]
    },
    186575: {
        semester_choise: 2,
        ects: 2.5,
        weight: 2.5,
        name: "VWL II (2.5 ECTS)",
        packageOptions: [186570]
    },
    186576: {
        semester_choise: 2,
        ects: 2.5,
        weight: 2.5,
        name: "Recht II (2.5 ECTS)",
        packageOptions: [186570]
    },
    186577: {
        semester_choise: 2,
        ects: 2.5,
        weight: 2.5,
        name: "Methoden II (2.5 ECTS)",
        packageOptions: [186570]
    },
    186578: {
        semester_choise: 2,
        ects: 2.5,
        weight: 2.5,
        name: "Studium Generale II (2.5 ECTS)",
        packageOptions: [186570]
    },
    186441: {
        ects: 5,
        weight: 5,
        name: "Arabisch im Alltag, A1.2",
        packageOptions: [186400, 186580],
        semester_choise: 5
    },
    186471: {
        ects: 5,
        weight: 5,
        name: "Wirtschaftskommunikation Arabisch I, B1",
        packageOptions: [186400, 186580],
        semester_choise: 5
    },
    186641: {
        ects: 5,
        weight: 5,
        name: "Russisch im Alltag A1.2",
        packageOptions: [186400, 186580],
        semester_choise: 5
    },
    186671: {
        ects: 5,
        weight: 5,
        name: "Wirtschaftskommunikation Russisch I, B1",
        packageOptions: [186400, 186580],
        semester_choise: 5
    },
    186741: {
        ects: 5,
        weight: 5,
        name: "Français professionnel II, B1",
        packageOptions: [186400, 186580],
        semester_choise: 5
    },
    186771: {
        ects: 5,
        weight: 5,
        name: "Langue et civilisation II, B2",
        packageOptions: [186400, 186580],
        semester_choise: 5
    },
    186841: {
        ects: 5,
        weight: 5,
        name: "El Español de la Empresa III, A2",
        packageOptions: [186400, 186580],
        semester_choise: 5
    },
    186871: {
        ects: 5,
        weight: 5,
        name: "El Español de los Negocios I, B2",
        packageOptions: [186400, 186580],
        semester_choise: 5
    },
    186131: {
        ects: 5,
        weight: 5,
        name: "Nachhaltigkeit und Ethik in der Tourismusindustrie",
        packageid: 186130,
        semester: 4
    },
    186161: {
        ects: 2.5,
        weight: 2.5,
        name: "Recht II",
        semester: 6,
        packageid: 186160
    },
    186171: {
        ects: 2.5,
        weight: 2.5,
        name: "E-Business in Tourismus und Hospitality",
        semester: 6,
        packageid: 186170
    },
    186181: {
        ects: 7.5,
        weight: 7.5,
        name: "Projekt Tourismus",
        semester: 6,
        packageid: 186180
    },
    186191: {
        ects: 2.5,
        weight: 2.5,
        name: "Entrepreneurship und Innovation",
        semester: 6,
        packageid: 186190
    },
    186221: {
        ects: 5,
        weight: 5,
        name: "Fallstudien der digitalen Wirtschaft",
        semester: 6,
        packageid: 186220
    },
    186121: {
        ects: 7.5,
        weight: 7.5,
        name: "Unternehmensplanspiel",
        semester: 7,
        packageid: 186120
    },
    186211: {
        ects: 7.5,
        weight: 7.5,
        name: "Seminar Tourismus",
        semester: 7,
        packageid: 186210
    },
    186521: {
        ects: 12,
        weight: 12,
        name: "Bachelor Thesis",
        semester: 7,
        packageid: 186520
    },
    186901: {
        semester_choise: 5,
        ects: 2.5,
        weight: 2.5,
        name: "Business English I, B1",
        packageOptions: [186570, 186530]
    },
    186902: {
        semester_choise: 5,
        ects: 2.5,
        weight: 2.5,
        name: "Business English II, B1",
        packageOptions: [186570, 186530]
    },
    186911: {
        semester_choise: 5,
        ects: 2.5,
        weight: 2.5,
        name: "Business English I, B2",
        packageOptions: [186570, 186530]
    },
    186912: {
        semester_choise: 5,
        ects: 2.5,
        weight: 2.5,
        name: "Business English II, B2",
        packageOptions: [186570, 186530]
    },
    186921: {
        semester_choise: 5,
        ects: 2.5,
        weight: 2.5,
        name: "Business Communication I, B1/B2",
        packageOptions: [186570, 186530]
    },
    186922: {
        semester_choise: 5,
        ects: 2.5,
        weight: 2.5,
        name: "Business Communication II, B1/B2",
        packageOptions: [186570, 186530]
    },
    186931: {
        semester_choise: 5,
        ects: 2.5,
        weight: 2.5,
        name: "Business Communication I, B2/C1",
        packageOptions: [186570, 186530]
    },
    186932: {
        semester_choise: 5,
        ects: 2.5,
        weight: 2.5,
        name: "Business Communication II, B2/C1",
        packageOptions: [186570, 186530]
    },
    186951: {
        semester_choise: 5,
        ects: 2.5,
        weight: 2.5,
        name: "English Language and Culture I, C1",
        packageOptions: [186570, 186530]
    },
    186952: {
        semester_choise: 5,
        ects: 2.5,
        weight: 2.5,
        name: "English Language and Culture II, C1",
        packageOptions: [186570, 186530]
    },
    186312: {
        semester_choise: 4,
        ects: 2.5,
        weight: 2.5,
        name: "Consolidated Financial Statements",
        packageid: 186540
    },
    186314: {
        semester_choise: 4,
        ects: 2.5,
        weight: 2.5,
        name: "Taxes",
        packageid: 186540
    },
    186315: {
        semester_choise: 4,
        ects: 2.5,
        weight: 2.5,
        name: "Management Accounting for Services",
        packageid: 186540
    },
    186316: {
        semester_choise: 4,
        ects: 2.5,
        weight: 2.5,
        name: "Strategic Management Accounting",
        packageid: 186540
    },
    186317: {
        semester_choise: 4,
        ects: 2.5,
        weight: 2.5,
        name: "Functional Management Accounting",
        packageid: 186540
    },
    186318: {
        semester_choise: 4,
        ects: 2.5,
        weight: 2.5,
        name: "IT-Tools",
        packageid: 186540
    },
    186319: {
        semester_choise: 4,
        ects: 2.5,
        weight: 2.5,
        name: "Mergers and Acquisitions",
        packageid: 186540
    },
    186322: {
        semester_choise: 4,
        ects: 2.5,
        weight: 2.5,
        name: "Derivatives",
        packageid: 186540
    },
    186323: {
        semester_choise: 4,
        ects: 2.5,
        weight: 2.5,
        name: "Corporate Finance",
        packageid: 186540
    },
    186324: {
        semester_choise: 4,
        ects: 2.5,
        weight: 2.5,
        name: "Financial Risk Management",
        packageid: 186540
    },
    186325: {
        semester_choise: 4,
        ects: 2.5,
        weight: 2.5,
        name: "Specific Issues in Finance",
        packageid: 186540
    },
    186332: {
        semester_choise: 4,
        ects: 2.5,
        weight: 2.5,
        name: "Specific Issues in International Human Resource Management",
        packageid: 186540
    },
    186333: {
        semester_choise: 4,
        ects: 2.5,
        weight: 2.5,
        name: "Employment Law",
        packageid: 186540
    },
    186334: {
        semester_choise: 4,
        ects: 2.5,
        weight: 2.5,
        name: "International Human Resource Management Case Studies",
        packageid: 186540
    },
    186342: {
        semester_choise: 4,
        ects: 2.5,
        weight: 2.5,
        name: "Change Management",
        packageid: 186540
    },
    186343: {
        semester_choise: 4,
        ects: 2.5,
        weight: 2.5,
        name: "Specific Issues in International Management",
        packageid: 186540
    },
    186344: {
        semester_choise: 4,
        ects: 2.5,
        weight: 2.5,
        name: "Global Leadership",
        packageid: 186540
    },
    186352: {
        semester_choise: 4,
        ects: 2.5,
        weight: 2.5,
        name: "B2C-Marketing",
        packageid: 186540
    },
    186353: {
        semester_choise: 4,
        ects: 2.5,
        weight: 2.5,
        name: "B2B-Marketing",
        packageid: 186540
    },
    186354: {
        semester_choise: 4,
        ects: 2.5,
        weight: 2.5,
        name: "Service Marketing",
        packageid: 186540
    },
    186355: {
        semester_choise: 4,
        ects: 2.5,
        weight: 2.5,
        name: "E-Marketing",
        packageid: 186540
    },
    186356: {
        semester_choise: 4,
        ects: 2.5,
        weight: 2.5,
        name: "Market Research",
        packageid: 186540
    },
    186357: {
        semester_choise: 4,
        ects: 2.5,
        weight: 2.5,
        name: "Specific Isuses in International Marketing",
        packageid: 186540
    },
    186431: {
        semester_choise: 5,
        ects: 2.5,
        weight: 2.5,
        name: "Arabische Sprache I A1.1",
        packageid: 186530
    },
    186461: {
        semester_choise: 5,
        ects: 2.5,
        weight: 2.5,
        name: "Allgemeine Sprache und Wirtschaftsarabisch I, B1",
        packageid: 186530
    },
    186631: {
        semester_choise: 5,
        ects: 2.5,
        weight: 2.5,
        name: "Russische Sprache I, A1.1",
        packageid: 186530
    },
    186661: {
        semester_choise: 5,
        ects: 2.5,
        weight: 2.5,
        name: "Allgemeine Sprache und Wirtschaftsrussisch I, B1",
        packageid: 186530
    },
    186731: {
        semester_choise: 5,
        ects: 2.5,
        weight: 2.5,
        name: "Français de l'entreprise, A2",
        packageid: 186530
    },
    186761: {
        semester_choise: 5,
        ects: 2.5,
        weight: 2.5,
        name: "Français professionnel II, B1",
        packageid: 186530
    },
    186831: {
        semester_choise: 5,
        ects: 2.5,
        weight: 2.5,
        name: "El Español de la Empresa I, A1",
        packageid: 186530
    },
    186861: {
        semester_choise: 5,
        ects: 2.5,
        weight: 2.5,
        name: "El Español Profesional I, B1",
        packageid: 186530
    },
    186432: {
        semester_choise: 5,
        ects: 5,
        weight: 5,
        name: "Arabische Sprache II, A1.2",
        packageid: 186550
    },
    186462: {
        semester_choise: 5,
        ects: 5,
        weight: 5,
        name: "Allgemeine Sprache und Wirtschaftsarabisch II, B1",
        packageid: 186550
    },
    186632: {
        semester_choise: 5,
        ects: 5,
        weight: 5,
        name: "Russische Sprache II, A1.2",
        packageid: 186550
    },
    186662: {
        semester_choise: 5,
        ects: 5,
        weight: 5,
        name: "Allgemeine Sprache und Wirtschaftsrussisch II, B1",
        packageid: 186550
    },
    186732: {
        semester_choise: 5,
        ects: 5,
        weight: 5,
        name: "Français professionnel I, A2/B1",
        packageid: 186550
    },
    186762: {
        semester_choise: 5,
        ects: 5,
        weight: 5,
        name: "Langue et civilisation I, B1/B2",
        packageid: 186550
    },
    186832: {
        semester_choise: 5,
        ects: 5,
        weight: 5,
        name: "El Español de la Empresa II, A1/A2",
        packageid: 186550
    },
    186862: {
        semester_choise: 5,
        ects: 5,
        weight: 5,
        name: "El Español Profesional II, B1/B2",
        packageid: 186550
    },
}


const tmb_ExamPackages: ExamPackages = {
    186110: {
        name: "Strategisches Management und Controlling",
        weight: 5,
        required: [186111, 186112]
    },
    186140: {
        name: "Forschungsmethoden",
        weight: 2.5,
        required: [186141]
    },
    186200: {
        name: "Politik und Recht im Tourismus",
        weight: 5,
        required: [186203]
    },
    186150: {
        name: "VWL",
        weight: 2.5,
        required: [186151, 186152, 186153]
    },
    186530: {
        name: "Internationale Spezialisierung 1",
        weight: 5,
        required: [186531, 186532, 186533, 186534, 186535, 186536]
    },
    186540: {
        name: "Internationale Spezialisierung 2",
        weight: 7.5,
        required: [186541, 186542, 186543]
    },
    186550: {
        name: "Internationale Spezialisierung 3",
        weight: 5,
        required: [186531, 186532, 186533, 186534, 186535, 186536, 186551, 186552, 186553, 186554, 186432,186462,186632,186662,186732,186762,186832,186862]
    },
    186560: {
        name: "Internationale Spezialisierung 4",
        weight: 5,
        required: [186534, 186535, 186536, 186561, 186562, 186563, 186311, 186321, 186331, 186341, 186351]
    },
    186570: {
        name: "Internationale Spezialisierung 5",
        weight: 2.5,
        required: [186571, 186572, 186573, 186574, 186575, 186576, 186577, 186578, 186901, 186902, 186911, 186912, 186921, 186922, 186931, 186932, 186951, 186952]
    },
    186580: {
        name: "Internationale Spezialisierung 6",
        weight: 5,
        required: [186551, 186552, 186553, 186554, 186581, 186582, 186583, 186584, 186585, 186586, 186587, 186441, 186471, 186641, 186671, 186741, 186771, 186841, 186871]
    },
    186250: {
        name: "Schwerpunkt Tourismusmanagement I",
        weight: 5,
        required: [186231, 186233, 186235, 186237, 186239, 186241, 186243, 186245, 186247]
    },
    186260: {
        name: "Schwerpunkt Tourismusmanagement II",
        weight: 5,
        required: [186231, 186233, 186235, 186237, 186239, 186241, 186243, 186245, 186247]
    },
    186270: {
        name: "Schwerpunkt Tourismusmanagement III",
        weight: 5,
        required: [186231, 186233, 186235, 186237, 186239, 186241, 186243, 186245, 186247]
    },
    186400: {
        name: "Sprachlich-betriebswirtschaftlicher Wahlbereich 2",
        weight: 5,
        required: [186341, 186471, 186641, 186671, 186741, 186771, 186841, 186871, 186311, 186321, 186331, 186341, 186351]
    },
    186130: {
        name: "Nachhaltigkeit und Ethik in der Tourismusindustrie",
        weight: 5,
        required: [186131]
    },
    186160: {
        name: "Handels- und Wirtschaftsrecht",
        weight: 2.5,
        required: [186161]
    },
    186170: {
        name: "E-Business im Tourismus",
        weight: 2.5,
        required: [186171]
    },
    186180: {
        name: "Projekt Tourismus",
        weight: 7.5,
        required: [186181]
    },
    186190: {
        name: "Entrepreneurship und Innovation",
        weight: 2.5,
        required: [186191]
    },
    186220: {
        name: "Fallstudien der digitalen Wirtschaft",
        weight: 5,
        required: [186221]
    },
    186120: {
        name: "Simulationen in der BWL",
        weight: 7.5,
        required: [186121]
    },
    186210: {
        name: "Seminar Tourismus",
        weight: 7.5,
        required: [186211]
    },
    186520: {
        name: "Bachelor Thesis",
        weight: 15,
        required: [186521]
    }
}

export const tmb: SingleOption = {
    basics: tmb_basic_data,
    exams: tmb_exams,
    examPackages: tmb_ExamPackages
}
