import { BasicInformation, ExamPackages, Exams, SingleOption } from "./types";

const wmm_basicData: BasicInformation = {
    name: "Weinmarketing und Management",
    spo: 1,
    weight: 120,
    beta: true,
    ects: 117,
    semesterChoices: {
        1: "Wahlfach Auslandssemester",
        2: "Wahlfach Englisch und Sprachen",
        4: "BWL Spezialisierungen"
    },
    required_emphasis: 0,
    emphasis: [],
    elevtive: [
        {
            required: 1,
            ids: [204151, 204152, 204153],
            examid: 204150
        },
        {
            // I1
            options: [
                {
                    ids: [204531, 204532, 204533, 204534, 204535, 204536],
                    required: 1
                },
                {
                    ids: [204431,204461,204631,204661,204731,204761,204831,204861],
                    required: 1,
                    optionId: 1
                },
                {
                    ids: [204901,204911,204921,204931,204951],
                    required: 1,
                    optionId: 1
                }
            ],
            multiOption: true,
            choiseID: 1,
            examid: 204530
        },
        {
            // BWL Wahlbereich 2
            ids: [204441,204471,204641,204671,204741,204771,204841,204871,204311,204321,204331,204341,204351],
            required: 1,
            multiOption: true,
            choiseID: 1,
            examid: 204400
        },
        {
            // I2
            options: [
                {
                    ids: [204541,204542,204543],
                    required: 1
                },
                {
                    ids: [204312,204314,204315,204316,204317,204318,204319],
                    required: 3
                },
                {
                    ids: [204322,204323,204324,204325],
                    required: 3
                },
                {
                    ids: [204332,204333,204334],
                    required: 3
                },
                {
                    ids: [204342,204343,204344],
                    required: 3
                },
                {
                    ids: [204352,204353,204354,204355,204356,204357],
                    required: 3
                }
            ],
            examid: 204540
        },
        {
            // I3
            ids: [204531,204532,204533,204534,204535,204536,204551,204552,204553,204554,204432,204462,204632,204662,204732,204762,204832,204862],
            examid: 204550,
            multiOption: true,
            choiseID: 1
        },
        {
            // I4
            ids: [204534,204535,204536,204561,204562,204563, 204311,204321,204331,204341,204351],
            examid: 204560,
            multiOption: true,
            choiseID: 1
        },
        {
            // I5
            ids: [204571,204572,204573,204574,204575,204576,204577,204578],
            examid: 204570,
            required: 1
        },
        {
            // I6
            ids: [204551,204552,204553,204554,204582,204583,204581,204582,204584,204585,204586,204587,
                204441,204471,204641,204671,204741,204771,204841,204871],
            examid: 204580,
            required: 1,
            multiOption: true,
            choiseID: 1
        },
        {
            // Schwerpunkt Weinmanagement
            ids: [204236,204237,204238,204239,204999],
            examid: 204235,
            required: 1
        }
    ]
}

const wmm_exams: Exams = {
    204111: {
        name: "Controlling",
        weight: 2.5,
        ects: 2.5,
        semester: 3,
        packageid: 204110
    },
    204112: {
        name: "Strategisches Management",
        weight: 2.5,
        ects: 2.5,
        semester: 3,
        packageid: 204110
    },
    204141: {
        name: "Modelle und Methoden der Datenanalyse",
        weight: 2.5,
        ects: 2.5,
        semester: 3,
        packageid: 204140
    },
    204151: {
        name: "Mikroökonomie",
        weight: 2.5,
        ects: 2.5,
        semester: 3,
        packageid: 204150
    },
    204152: {
        name: "Makroökonomie",
        weight: 2.5,
        ects: 2.5,
        semester: 3,
        packageid: 204150
    },
    204153: {
        name: "Internationale VWL",
        weight: 2.5,
        ects: 2.5,
        semester: 3,
        packageid: 204150
    },
    204201: {
        name: "Weinmarketing und E-Commerce",
        weight: 5,
        ects: 5,
        semester: 3,
        packageid: 204200
    },
    204241: {
        name: "Internationale Weinmärkte und Weinprofile",
        weight: 5,
        ects: 5,
        semester: 3,
        packageid: 204240
    },
    204531: {
        name: "Internationale BWL I",
        weight: 5,
        ects: 5,
        semester_choise: 1,
        packageOptions: [204530, 204550]
    },
    204532: {
        name: "Managementprozesse I",
        weight: 5,
        ects: 5,
        semester_choise: 1,
        packageOptions: [204530, 204550]
    },
    204533: {
        name: "Weinmanagement I",
        weight: 5,
        ects: 5,
        semester_choise: 1,
        packageOptions: [204530, 204550]
    },
    204534: {
        name: "Internationale BWL II",
        weight: 5,
        ects: 5,
        semester_choise: 1,
        packageOptions: [204530, 204550, 204560]
    },
    204535: {
        name: "Managementprozesse II",
        weight: 5,
        ects: 5,
        semester_choise: 1,
        packageOptions: [204530, 204550, 204560]
    },
    204536: {
        name: "Weinmanagement II",
        weight: 5,
        ects: 5,
        semester_choise: 1,
        packageOptions: [204530, 204550, 204560]
    },
    204431: {
        name: "Arabische Sprache I, A1.1",
        weight: 2.5,
        ects: 2.5,
        semester_choise: 2,
        packageid: 204530
    },
    204461: {
        name: "Allgemeine Sprache und Wirtschaftsarabisch I, B1",
        weight: 2.5,
        ects: 2.5,
        semester_choise: 2,
        packageid: 204530
    },
    204631: {
        name: "Russische Sprache I, A1.1",
        weight: 2.5,
        ects: 2.5,
        semester_choise: 2,
        packageid: 204530
    },
    204661: {
        name: "Allgemeine Sprache und Wirtschaftsrussisch I, B1",
        weight: 2.5,
        ects: 2.5,
        semester_choise: 2,
        packageid: 204530
    },
    204731: {
        name: "Francais de l'entreprise, A2",
        weight: 2.5,
        ects: 2.5,
        semester_choise: 2,
        packageid: 204530
    },
    204761: {
        name: "Francais professionnel II, B1",
        weight: 2.5,
        ects: 2.5,
        semester_choise: 2,
        packageid: 204530
    },
    204831: {
        name: "EI Espariol de la Empresa I, A1",
        weight: 2.5,
        ects: 2.5,
        semester_choise: 2,
        packageid: 204530
    },
    204861: {
        name: "EI Espariol Profesional I, B1",
        weight: 2.5,
        ects: 2.5,
        semester_choise: 2,
        packageid: 204530
    },
    204432: {
        name: "Arabische Sprache II, A1.2",
        weight: 2.5,
        ects: 2.5,
        semester_choise: 2,
        packageid: 204550
    },
    204462: {
        name: "Allgemeine Sprache und Wirtschaftsarabisch II, B1",
        weight: 2.5,
        ects: 2.5,
        semester_choise: 2,
        packageid: 204550
    },
    204632: {
        name: "Russische Sprache II, A1.1",
        weight: 2.5,
        ects: 2.5,
        semester_choise: 2,
        packageid: 204550
    },
    204662: {
        name: "Allgemeine Sprache und Wirtschaftsrussisch II, B1",
        weight: 2.5,
        ects: 2.5,
        semester_choise: 2,
        packageid: 204550
    },
    204732: {
        name: "Francais professionnel 1, A2/B1",
        weight: 2.5,
        ects: 2.5,
        semester_choise: 2,
        packageid: 204550
    },
    204762: {
        name: "Langue et civilisation 1, B1/B2",
        weight: 2.5,
        ects: 2.5,
        semester_choise: 2,
        packageid: 204550
    },
    204832: {
        name: "EI Espariol de la Empresa II, A1/B2",
        weight: 2.5,
        ects: 2.5,
        semester_choise: 2,
        packageid: 204550
    },
    204862: {
        name: "EI Espariol Profesional II, B1/B2",
        weight: 2.5,
        ects: 2.5,
        semester_choise: 2,
        packageid: 204550
    },
    204901: {
        name: "Business English I, B1",
        weight: 2.5,
        ects: 2.5,
        semester_choise: 2,
        packageid: 204530
    },
    204911: {
        name: "Business English I, B2",
        weight: 2.5,
        ects: 2.5,
        semester_choise: 2,
        packageid: 204530
    },
    204921: {
        name: "Business Communication I, B1/B2",
        weight: 2.5,
        ects: 2.5,
        semester_choise: 2,
        packageid: 204530
    },
    204931: {
        name: "Business Communication I, B2/C1",
        weight: 2.5,
        ects: 2.5,
        semester_choise: 2,
        packageid: 204530
    },
    204951: {
        name: "English Language and Culture I, C1",
        weight: 2.5,
        ects: 2.5,
        semester_choise: 2,
        packageid: 204530
    },
    204902: {
        name: "Business English II, B1",
        weight: 2.5,
        ects: 2.5,
        semester_choise: 2,
        packageid: 204570
    },
    204912: {
        name: "Business English II, B2",
        weight: 2.5,
        ects: 2.5,
        semester_choise: 2,
        packageid: 204570
    },
    204922: {
        name: "Business Communication II, B1/B2",
        weight: 2.5,
        ects: 2.5,
        semester_choise: 2,
        packageid: 204570
    },
    204932: {
        name: "Business Communication II, B2/C1",
        weight: 2.5,
        ects: 2.5,
        semester_choise: 2,
        packageid: 204570
    },
    204952: {
        name: "English Language and Culture II, C1",
        weight: 2.5,
        ects: 2.5,
        semester_choise: 2,
        packageid: 204570
    },
    204441: {
        name: "Arabisch im Alltag, A1.2",
        weight: 5,
        ects: 5,
        semester_choise: 2,
        packageOptions: [204400,204580]
    },
    204471: {
        name: "Wirtschaftskommunikation Arabisch I, B1",
        weight: 5,
        ects: 5,
        semester_choise: 2,
        packageOptions: [204400,204580]
    },
    204641: {
        name: "Russisch im Alltag, A1.2",
        weight: 5,
        ects: 5,
        semester_choise: 2,
        packageOptions: [204400,204580]
    },
    204671: {
        name: "Wirtschaftskommunikation Russisch I, B1",
        weight: 5,
        ects: 5,
        semester_choise: 2,
        packageOptions: [204400,204580]
    },
    204741: {
        name: "Francais professionnel II, B1",
        weight: 5,
        ects: 5,
        semester_choise: 2,
        packageOptions: [204400,204580]
    },
    204771: {
        name: "Lanque et civilisation II, B2",
        weight: 5,
        ects: 5,
        semester_choise: 2,
        packageOptions: [204400,204580]
    },
    204841: {
        name: "EI Espariol de la Empresa III, A2",
        weight: 5,
        ects: 5,
        semester_choise: 2,
        packageOptions: [204400,204580]
    },
    204871: {
        name: "EI Espanol de los Negocios 1, B2",
        weight: 5,
        ects: 5,
        semester_choise: 2,
        packageOptions: [204400,204580]
    },
    204311: {
        name: "International Financial & Management Accounting",
        weight: 5,
        ects: 5,
        semester_choise: 4,
        packageOptions: [204400, 204560]
    },
    204321: {
        name: "International Finance",
        weight: 5,
        ects: 5,
        semester_choise: 4,
        packageOptions: [204400, 204560]
    },
    204331: {
        name: "International Human Resource Management",
        weight: 5,
        ects: 5,
        semester_choise: 4,
        packageOptions: [204400, 204560]
    },
    204341: {
        name: "International Management",
        weight: 5,
        ects: 5,
        semester_choise: 4,
        packageOptions: [204400, 204560]
    },
    204351: {
        name: "International Marketing",
        weight: 5,
        ects: 5,
        semester_choise: 4,
        packageOptions: [204400, 204560]
    },
    204161: {
        name: "Recht II",
        weight: 2.5,
        ects: 2.5,
        semester: 4,
        packageid: 204160
    },
    204171: {
        name: "E-Business",
        weight: 2.5,
        ects: 2.5,
        semester: 4,
        packageid: 204170
    },
    204251: {
        name: "Weinhandelsmarketing",
        weight: 5,
        ects: 5,
        semester: 4,
        packageid: 204250
    },
    204541: {
        name: "Internationale BWL I",
        weight: 7.5,
        ects: 7.5,
        semester_choise: 1,
        packageid: 204540
    },
    204542: {
        name: "Managementprozesse I",
        weight: 7.5,
        ects: 7.5,
        semester_choise: 1,
        packageid: 204540
    },
    204543: {
        name: "Weinmanagement I",
        weight: 7.5,
        ects: 7.5,
        semester_choise: 1,
        packageid: 204540
    },
    204312: {
        semester_choise: 4,
        ects: 2.5,
        weight: 2.5,
        name: "Consolidated Financial Statements",
        packageid: 204540
    },
    204314: {
        semester_choise: 4,
        ects: 2.5,
        weight: 2.5,
        name: "Taxes",
        packageid: 204540
    },
    204315: {
        semester_choise: 4,
        ects: 2.5,
        weight: 2.5,
        name: "Management Accounting for Services",
        packageid: 204540
    },
    204316: {
        semester_choise: 4,
        ects: 2.5,
        weight: 2.5,
        name: "Strategic Management Accounting",
        packageid: 204540
    },
    204317: {
        semester_choise: 4,
        ects: 2.5,
        weight: 2.5,
        name: "Functional Management Accounting",
        packageid: 204540
    },
    204318: {
        semester_choise: 4,
        ects: 2.5,
        weight: 2.5,
        name: "IT-Tools",
        packageid: 204540
    },
    204319: {
        semester_choise: 4,
        ects: 2.5,
        weight: 2.5,
        name: "Mergers and Acquisitions",
        packageid: 204540
    },
    204322: {
        semester_choise: 4,
        ects: 2.5,
        weight: 2.5,
        name: "Derivatives",
        packageid: 204540
    },
    204323: {
        semester_choise: 4,
        ects: 2.5,
        weight: 2.5,
        name: "Corporate Finance",
        packageid: 204540
    },
    204324: {
        semester_choise: 4,
        ects: 2.5,
        weight: 2.5,
        name: "Financial Risk Management",
        packageid: 204540
    },
    204325: {
        semester_choise: 4,
        ects: 2.5,
        weight: 2.5,
        name: "Specific Issues in Finance",
        packageid: 204540
    },
    204332: {
        semester_choise: 4,
        ects: 2.5,
        weight: 2.5,
        name: "Specific Issues in International Human Resource Management",
        packageid: 204540
    },
    204333: {
        semester_choise: 4,
        ects: 2.5,
        weight: 2.5,
        name: "Employment Law",
        packageid: 204540
    },
    204334: {
        semester_choise: 4,
        ects: 2.5,
        weight: 2.5,
        name: "International Human Resource Management Case Studies",
        packageid: 204540
    },
    204342: {
        semester_choise: 4,
        ects: 2.5,
        weight: 2.5,
        name: "Change Management",
        packageid: 204540
    },
    204343: {
        semester_choise: 4,
        ects: 2.5,
        weight: 2.5,
        name: "Specific Issues in International Management",
        packageid: 204540
    },
    204344: {
        semester_choise: 4,
        ects: 2.5,
        weight: 2.5,
        name: "Global Leadership",
        packageid: 204540
    },
    204352: {
        semester_choise: 4,
        ects: 2.5,
        weight: 2.5,
        name: "B2C-Marketing",
        packageid: 204540
    },
    204353: {
        semester_choise: 4,
        ects: 2.5,
        weight: 2.5,
        name: "B2B-Marketing",
        packageid: 204540
    },
    204354: {
        semester_choise: 4,
        ects: 2.5,
        weight: 2.5,
        name: "Service Marketing",
        packageid: 204540
    },
    204355: {
        semester_choise: 4,
        ects: 2.5,
        weight: 2.5,
        name: "E-Marketing",
        packageid: 204540
    },
    204356: {
        semester_choise: 4,
        ects: 2.5,
        weight: 2.5,
        name: "Market Research",
        packageid: 204540
    },
    204357: {
        semester_choise: 4,
        ects: 2.5,
        weight: 2.5,
        name: "Specific Isuses in International Marketing",
        packageid: 204540
    },
    204551: {
        semester_choise: 1,
        ects: 5,
        weight: 5,
        name: "VWL I (5 ECTS)",
        packageOptions: [204550, 204580]
    },
    204552: {
        semester_choise: 1,
        ects: 5,
        weight: 5,
        name: "Recht I (5 ECTS)",
        packageOptions: [204550, 204580]
    },
    204553: {
        semester_choise: 1,
        ects: 5,
        weight: 5,
        name: "Methoden I (5 ECTS)",
        packageOptions: [204550, 204580]
    },
    204554: {
        semester_choise: 1,
        ects: 5,
        weight: 5,
        name: "Studium Generale I (5 ECTS)",
        packageOptions: [204550, 204580]
    },
    204561: {
        semester_choise: 1,
        ects: 5,
        weight: 5,
        name: "Internationale BWL III",
        packageid: 204560
    },
    204562: {
        semester_choise: 1,
        ects: 5,
        weight: 5,
        name: "Managementprozesse III",
        packageid: 204560
    },
    204563: {
        semester_choise: 1,
        ects: 5,
        weight: 5,
        name: "Weinmanagement III",
        packageid: 204560
    },
    204571: {
        semester_choise: 1,
        ects: 2.5,
        weight: 2.5,
        name: "VWL I (2.5 ECTS)",
        packageid: 204570
    },
    204572: {
        semester_choise: 1,
        ects: 2.5,
        weight: 2.5,
        name: "Recht I (2.5 ECTS)",
        packageid: 204570
    },
    204573: {
        semester_choise: 1,
        ects: 2.5,
        weight: 2.5,
        name: "Methoden I (2.5 ECTS)",
        packageid: 204570
    },
    204574: {
        semester_choise: 1,
        ects: 2.5,
        weight: 2.5,
        name: "Studium Generale I (2.5 ECTS)",
        packageid: 204570
    },
    204575: {
        semester_choise: 1,
        ects: 2.5,
        weight: 2.5,
        name: "VWL II (2.5 ECTS)",
        packageid: 204570
    },
    204576: {
        semester_choise: 1,
        ects: 2.5,
        weight: 2.5,
        name: "Recht II (2.5 ECTS)",
        packageid: 204570
    },
    204577: {
        semester_choise: 1,
        ects: 2.5,
        weight: 2.5,
        name: "Methoden II (2.5 ECTS)",
        packageid: 204570
    },
    204578: {
        semester_choise: 1,
        ects: 2.5,
        weight: 2.5,
        name: "Studium Generale II (2.5 ECTS)",
        packageid: 204570
    },
    204581: {
        name: "VWL II (5 ECTS)",
        ects: 5,
        weight: 5,
        packageid: 204580,
        semester_choise: 1
    },
    204582: {
        name: "Recht II (5 ECTS)",
        ects: 5,
        weight: 5,
        packageid: 204580,
        semester_choise: 1
    },
    204583: {
        name: "Methoden II (5 ECTS)",
        ects: 5,
        weight: 5,
        packageid: 204580,
        semester_choise: 1
    },
    204584: {
        name: "Studium Generale II (5 ECTS)",
        ects: 5,
        weight: 5,
        packageid: 204580,
        semester_choise: 1
    },
    204585: {
        name: "Englisch",
        ects: 5,
        weight: 5,
        packageid: 204580,
        semester_choise: 1
    },
    204586: {
        name: "Französisch",
        ects: 5,
        weight: 5,
        packageid: 204580,
        semester_choise: 1
    },
    204587: {
        name: "Spanisch",
        ects: 5,
        weight: 5,
        packageid: 204580,
        semester_choise: 1
    },
    204133: {
        name: "Nachhaltigkeit und Ethik in der globalen Weinwirtschaft",
        weight: 5,
        ects: 5,
        semester: 6,
        packageid: 204130
    },
    204181: {
        name: "Projekt Wein",
        weight: 7.5,
        ects: 7.5,
        semester: 6,
        packageid: 204180
    },
    204191: {
        name: "Entrepreneurship und Innovation",
        weight: 2.5,
        ects: 2.5,
        semester: 6,
        packageid: 204190
    },
    204221: {
        name: "Fallstudien der digitalen Wirtschaft",
        weight: 5,
        ects: 5,
        semester: 6,
        packageid: 204220
    },
    204121: {
        name: "Unternehmensplanspiel",
        weight: 7.5,
        ects: 7.5,
        semester: 7,
        packageid: 204120
    },
    204211: {
        name: "Seminar Wein",
        weight: 7.5,
        ects: 7.5,
        semester: 7,
        packageid: 204210
    },
    204521: {
        name: "Bachelor Thesis",
        weight: 12,
        ects: 12,
        semester: 7,
        packageid: 204520
    },
    204236: {
        name: "Luxury & Craftsmanship, Wine & Beverage Management",
        weight: 5,
        ects: 5,
        semester: 6,
        packageid: 204235
    },
    204237: {
        name: "Weintourismus",
        weight: 5,
        ects: 5,
        semester: 6,
        packageid: 204235
    },
    204238: {
        name: "B2B Vertrieb, (System)Gastronomie, Getränkemanagement",
        weight: 5,
        ects: 5,
        semester: 6,
        packageid: 204235
    },
    204239: {
        name: "MICE Industrie und Event Management",
        weight: 5,
        ects: 5,
        semester: 6,
        packageid: 204235
    },
    204999: {
        name: "Hotel- und Restaurantmanagement",
        weight: 5,
        ects: 5,
        semester: 6,
        packageid: 204235
    }


}

const wmm_examPackages: ExamPackages = {
    204110: {
        name: "Strategisches Management und Controlling",
        weight: 5,
        required: [204111,204112]
    },
    204140: {
        name: "Forschungsmethoden",
        weight: 2.5,
        required: [204141]
    },
    204150: {
        name: "VWL",
        weight: 2.5,
        required: [204151,204152,204153]
    },
    204200: {
        name: "Weinmarketing und E-Commerce",
        weight: 5,
        required: [204201]
    },
    204530: {
        name: "Internationale Spezialisierung 1",
        weight: 5,
        required: [204531,204532,204533,204534,204535,204536,204431,204461,204631,204661,204731,204761,204831,204861, 204901,204911,204921,204931,204951]
    },
    204240: {
        name: "Internationale Weinmärkte und Weinprofile",
        weight: 5,
        required: [204241]
    },
    204400: {
        name: "Sprachlich-betriebswirtschaftlicher Wahlbereich 2",
        weight: 5,
        required: [204441,204471,204641,204671,204741,204771,204841,204871,204311,204321,204331,204341,204351]
    },
    204160: {
        name: "Handels- und Wirtschaftsrecht",
        weight: 2.5,
        required: [204161]
    },
    204170: {
        name: "E-Business",
        weight: 2.5,
        required: [204171]
    },
    204250: {
        name: "Weinhandelsmarketing",
        weight: 5,
        required: [204251]
    },
    204540: {
        name: "Internationale Spezialisierung 2",
        weight: 7.5,
        required: [204541,204542,204543,204312,204314,204315,204316,204317,204318,204319,204322,204323,204324,204325,
            204332,204333,204334,204342,204343,204344,204352,204353,204354,204355,204356,204357
        ]
    },
    204550: {
        name: "Internationale Spezialisieriung 3",
        weight: 5,
        required: [204531,204532,204533,204534,204535,204536,204551,204552,204553,204554,204432,204462,204632,204662,204732,204762,204832,204862]
    },
    204560: {
        name: "Internationale Spezialisierung 4",
        weight: 5,
        required: [204534,204535,204536,204561,204562,204563, 204311,204321,204331,204341,204351]
    },
    204570: {
        name: "Internationale Spezialisierung 5",
        weight: 2.5,
        required: [204571,204572,204573,204574,204575,204576,204577,204578,204902,204912,204922,204932,204952]
    },
    204580: {
        name: "Internationale Spezialisierung 6",
        weight: 5,
        required: [204551,204552,204553,204554,204581,204582,204583,204584,204585,204586,204587,
            204441,204471,204641,204671,204741,204771,204841,204871]
    },
    204130: {
        name: "Nachhaltigkeit und Ethik in der globalen Weinwirtschaft",
        weight: 5,
        required: [204133]
    },
    204180: {
        name: "Projekt Wein",
        weight: 7.5,
        required: [204181]
    },
    204190: {
        name: "Entrepreneurship und Innovation",
        weight: 2.5,
        required: [204191]
    },
    204220: {
        name: "Fallstudien der digitalen Wirtschaft",
        weight: 5,
        required: [204221]
    },
    204120: {
        name: "Simulationen in der BWL",
        weight: 7.5,
        required: [204121]
    },
    204210: {
        name: "Seminar Wein",
        weight: 7.5,
        required: [204211]
    },
    204520: {
        name: "Bachelor Thesis",
        weight: 15,
        required: [204521]
    },
    204235: {
        name: "Schwerpunkt Weinmanagement",
        weight: 5,
        required: [204236,204237,204238,204239,204999]
    }

}


export const wmm: SingleOption = {
    basics: wmm_basicData,
    examPackages: wmm_examPackages,
    exams: wmm_exams
}