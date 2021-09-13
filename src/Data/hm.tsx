import { BasicInformation, ExamPackages, Exams, SingleOption } from "./types";

const hm_basic_data: BasicInformation = {
    name: "Hotel- und Restaurantmanagement",
    weight: 120,
    beta: true,
    ects: 117,
    spo: 3,
    required_emphasis: 0,
    emphasis: [],
    semesterChoices: {
        1: "Wahlfach Englisch",
        2: "Wahlfach Sprachen",
        3: "Sprachlich-betriebswirtschaftlicher Wahlbereich 1",
        4: "Wahlfach BWL-Spezialisierung II",
        5: "Wahlfach Auslandssemester"

    },
    elevtive: [
        {
            ids: [423151,423152,423153],
            examid: 423150,
            required: 1
        },
        {
            // I1
            options: [
                {
                    ids: [423531,423532,423533,423534,423535,423536],
                    required: 2,
                },
                {
                    ids: [423901,423911,423921,423931,423951],
                    required: 1,
                    optionId: 1
                },
                { 
                    ids: [423431,423461,423631,423661,423731,423831,423861],
                    required: 1,
                    optionId: 1
                }
            ],
            examid: 423530,
            multiOption: true,
            choiseID: 1
        },
        {
            ids: [423441,423471,423641,423671,423741,423771,423841,423871,423311,423321,423331,423341,423351],
            required: 1,
            examid: 423400,
            multiOption: true,
            choiseID: 1
        },
        {
            // I2
            options: [
                {
                    ids: [423541, 423542, 423543],
                    required: 1
                },
                {
                    ids: [423312,423314,423315,423316,423316,423317,423318,423319],
                    required: 3
                },
                {
                    ids: [423322,423323,423324,423325],
                    required: 3
                },
                {
                    ids: [423332,423333,423334],
                    required: 3
                },
                {
                    ids: [423342,423343,423344],
                    required: 3
                },
                {
                    ids: [423352,423353,423354,423355,423356,423357],
                    required: 3
                }
            ],
            examid: 423540
        },
        {
            // I3
            ids: [423531,423532,423533,423534,423535,423536,423551,423552,423553,423554,423462,423432,423632,423662,423732,423762,423832,423862],
            required: 1,
            examid: 423550,
            multiOption: true,
            choiseID: 1
        },
        {
            // I4
            ids: [423534,423535,423536,423561,423562,423563,423311,423321,423331,423341,423351],
            required: 1,
            examid: 423560,
            multiOption: true,
            choiseID: 1
        },
        {
            // I5
            ids: [423571,423572,423573,423574,423575,423576,423577,423578, 423902,423912,423922,423932,423952],
            required: 1,
            examid: 423570
        },
        {
            // I6
            ids: [423551,423552,423553,423554,423581,423582,423583,423584,423585,423586,423587,423441,423471,423641,423671,423741,423771,423841,423871],
            required: 1,
            examid: 423580,
            multiOption: true,
            choiseID: 1
        },
        {
            ids: [423236,423237,423238,423239],
            examid: 423235,
            required: 1
        }

    ]

}

const hm_exams: Exams = {
    423111: {
        name: "Controlling",
        semester: 3,
        ects: 2.5,
        weight: 2.5,
        packageid: 423110
    },
    423112: {
        name: "Strategisches Management",
        semester: 3,
        ects: 2.5,
        weight: 2.5,
        packageid: 423110
    },
    423141: {
        name: "Modelle und Methoden der Datenanalyse",
        semester: 3,
        ects: 2.5,
        weight: 2.5,
        packageid: 423140
    },
    423201: {
        name: "Recht in Tourismus und Hospitality",
        semester: 3,
        ects: 2.5,
        weight: 2.5,
        packageid: 423200
    },
    423221: {
        name: "Hospitality Supply-Chain Management",
        semester: 3,
        ects: 2.5,
        weight: 2.5,
        packageid: 423220
    },
    423241: {
        name: "Hospitality Leadership & Controlling",
        semester: 3,
        ects: 5,
        weight: 5,
        packageid: 423240
    },
    423151: {
        name: "Mikroökonomie",
        semester: 3,
        ects: 2.5,
        weight: 2.5,
        packageid: 423150
    },
    423152: {
        name: "Makroökonomie",
        semester: 3,
        ects: 2.5,
        weight: 2.5,
        packageid: 423150
    },
    423153: {
        name: "Internationale VWL",
        semester: 3,
        ects: 2.5,
        weight: 2.5,
        packageid: 423150
    },
    423531: {
        name: "Internationale BWL I",
        semester_choise: 5,
        ects: 5,
        weight: 5,
        packageOptions: [423530, 423550] 
    },
    423532: {
        name: "Managementprozesse I",
        semester_choise: 5,
        ects: 5,
        weight: 5,
        packageOptions: [423530, 423550] 
    },
    423533: {
        name: "Hospitality-Management I",
        semester_choise: 5,
        ects: 5,
        weight: 5,
        packageOptions: [423530, 423550] 
    },
    423534: {
        name: "Internationale BWL II",
        semester_choise: 5,
        ects: 5,
        weight: 5,
        packageOptions: [423530, 423550, 423560]  
    },
    423535: {
        name: "Managementprozesse II",
        semester_choise: 5,
        ects: 5,
        weight: 5,
        packageOptions: [423530, 423550, 423560] 
    },
    423536: {
        name: "Hospitality-Management II",
        semester_choise: 5,
        ects: 5,
        weight: 5,
        packageOptions: [423530, 423550, 423560] 
    },
    423901: {
        name: "Business English I, B1",
        semester_choise: 1,
        ects: 2.5,
        weight: 2.5,
        packageid: 423530
    },
    423911: {
        name: "Business English I, B2",
        semester_choise: 1,
        ects: 2.5,
        weight: 2.5,
        packageid: 423530
    },
    423921: {
        name: "Business Communication I, B1/B2",
        semester_choise: 1,
        ects: 2.5,
        weight: 2.5,
        packageid: 423530
    },
    423931: {
        name: "Business Communication I, B2/C1",
        semester_choise: 1,
        ects: 2.5,
        weight: 2.5,
        packageid: 423530
    },
    423951: {
        name: "English Language and Culture I, C1",
        semester_choise: 1,
        ects: 2.5,
        weight: 2.5,
        packageid: 423530
    },
    423431: {
        name: "Arabische Sprache I, A1.1",
        semester_choise: 2,
        ects: 2.5,
        weight: 2.5,
        packageid: 423530
    },
    423461: {
        name: "Allgemeine Sprache und Wirtschaftsarabisch I, B1",
        semester_choise: 2,
        ects: 2.5,
        weight: 2.5,
        packageid: 423530
    },
    423631: {
        name: "Russische Sprache I, A1.1",
        semester_choise: 2,
        ects: 2.5,
        weight: 2.5,
        packageid: 423530
    },
    423661: {
        name: "Allgemeine Sprache und Wirtschaftsrussisch I, B1",
        semester_choise: 2,
        ects: 2.5,
        weight: 2.5,
        packageid: 423530
    },
    423731: {
        name: "Français de l'entreprise, A2",
        semester_choise: 2,
        ects: 2.5,
        weight: 2.5,
        packageid: 423530
    },
    423761: {
        name: "Français professionnel II, B1",
        semester_choise: 2,
        ects: 2.5,
        weight: 2.5,
        packageid: 423530
    },
    423831: {
        name: "El Español de la Empresa I, A1",
        semester_choise: 2,
        ects: 2.5,
        weight: 2.5,
        packageid: 423530
    },
    423861: {
        name: "El Español Profesional I, B1",
        semester_choise: 2,
        ects: 2.5,
        weight: 2.5,
        packageid: 423530
    },
    423441: {
        name: "Arabisch im Alltag, A1.2",
        semester_choise: 2,
        ects: 5,
        weight: 5,
        packageOptions: [423400, 423580]
    },
    423471: {
        name: "Wirtschaftskommunikation Arabisch I, B1",
        semester_choise: 2,
        ects: 5,
        weight: 5,
        packageOptions: [423400, 423580]
    },
    423641: {
        name: "Russisch im Alltag, A1.2",
        semester_choise: 2,
        ects: 5,
        weight: 5,
        packageOptions: [423400, 423580]
    },
    423671: {
        name: "Wirtschaftskommunikation Russisch I, B1",
        semester_choise: 2,
        ects: 5,
        weight: 5,
        packageOptions: [423400, 423580]
    },
    423741: {
        name: "Français professionnel II, B1",
        semester_choise: 2,
        ects: 5,
        weight: 5,
        packageOptions: [423400, 423580]
    },
    423771: {
        name: "Langue et civilisation II, B2",
        semester_choise: 2,
        ects: 5,
        weight: 5,
        packageOptions: [423400, 423580]
    },
    423841: {
        name: "El Español de la Empresa III, A2",
        semester_choise: 2,
        ects: 5,
        weight: 5,
        packageOptions: [423400, 423580]
    },
    423871: {
        name: "El Español de los Negocios I, B2",
        semester_choise: 2,
        ects: 5,
        weight: 5,
        packageOptions: [423400, 423580]
    },
    423311: {
        name: "International Financial & Management Accounting",
        semester_choise: 3,
        ects: 5,
        weight: 5,
        packageOptions: [423400, 423560]
    },
    423321: {
        name: "International Finance",
        semester_choise: 3,
        ects: 5,
        weight: 5,
        packageOptions: [423400, 423560]
    },
    423331: {
        name: "International Human Resource Management",
        semester_choise: 3,
        ects: 5,
        weight: 5,
        packageOptions: [423400, 423560]
    },
    423341: {
        name: "International Management",
        semester_choise: 3,
        ects: 5,
        weight: 5,
        packageOptions: [423400, 423560]
    },
    423351: {
        name: "International Marketing",
        semester_choise: 3,
        ects: 5,
        weight: 5,
        packageOptions: [423400, 423560]
    },
    423133: {
        name: "Nachhaltigkeit und Ethik in der Hospitality-Industrie",
        semester: 4,
        ects: 5,
        weight: 5,
        packageid: 423130
    },
    423251: {
        name: "Restaurantmanagement & Systemgastronomie",
        semester: 4,
        ects: 5,
        weight: 5,
        packageid: 423250
    },
    423541: {
        name: "Internationale BWL I",
        semester: 4,
        ects: 7.5,
        weight: 7.5,
        packageid: 423540
    },
    423542: {
        name: "Managementprozesse I",
        semester: 4,
        ects: 7.5,
        weight: 7.5,
        packageid: 423540
    },
    423543: {
        name: "Hospitality-Management I",
        semester: 4,
        ects: 7.5,
        weight: 7.5,
        packageid: 423540
    },
    423312: {
        semester_choise: 4,
        ects: 2.5,
        weight: 2.5,
        name: "Consolidated Financial Statements",
        packageid: 423540
    },
    423314: {
        semester_choise: 4,
        ects: 2.5,
        weight: 2.5,
        name: "Taxes",
        packageid: 423540
    },
    423315: {
        semester_choise: 4,
        ects: 2.5,
        weight: 2.5,
        name: "Management Accounting for Services",
        packageid: 423540
    },
    423316: {
        semester_choise: 4,
        ects: 2.5,
        weight: 2.5,
        name: "Strategic Management Accounting",
        packageid: 423540
    },
    423317: {
        semester_choise: 4,
        ects: 2.5,
        weight: 2.5,
        name: "Functional Management Accounting",
        packageid: 423540
    },
    423318: {
        semester_choise: 4,
        ects: 2.5,
        weight: 2.5,
        name: "IT-Tools",
        packageid: 423540
    },
    423319: {
        semester_choise: 4,
        ects: 2.5,
        weight: 2.5,
        name: "Mergers and Acquisitions",
        packageid: 423540
    },
    423322: {
        semester_choise: 4,
        ects: 2.5,
        weight: 2.5,
        name: "Derivatives",
        packageid: 423540
    },
    423323: {
        semester_choise: 4,
        ects: 2.5,
        weight: 2.5,
        name: "Corporate Finance",
        packageid: 423540
    },
    423324: {
        semester_choise: 4,
        ects: 2.5,
        weight: 2.5,
        name: "Financial Risk Management",
        packageid: 423540
    },
    423325: {
        semester_choise: 4,
        ects: 2.5,
        weight: 2.5,
        name: "Specific Issues in Finance",
        packageid: 423540
    },
    423332: {
        semester_choise: 4,
        ects: 2.5,
        weight: 2.5,
        name: "Specific Issues in International Human Resource Management",
        packageid: 423540
    },
    423333: {
        semester_choise: 4,
        ects: 2.5,
        weight: 2.5,
        name: "Employment Law",
        packageid: 423540
    },
    423334: {
        semester_choise: 4,
        ects: 2.5,
        weight: 2.5,
        name: "International Human Resource Management Case Studies",
        packageid: 423540
    },
    423342: {
        semester_choise: 4,
        ects: 2.5,
        weight: 2.5,
        name: "Change Management",
        packageid: 423540
    },
    423343: {
        semester_choise: 4,
        ects: 2.5,
        weight: 2.5,
        name: "Specific Issues in International Management",
        packageid: 423540
    },
    423344: {
        semester_choise: 4,
        ects: 2.5,
        weight: 2.5,
        name: "Global Leadership",
        packageid: 423540
    },
    423352: {
        semester_choise: 4,
        ects: 2.5,
        weight: 2.5,
        name: "B2C-Marketing",
        packageid: 423540
    },
    423353: {
        semester_choise: 4,
        ects: 2.5,
        weight: 2.5,
        name: "B2B-Marketing",
        packageid: 423540
    },
    423354: {
        semester_choise: 4,
        ects: 2.5,
        weight: 2.5,
        name: "Service Marketing",
        packageid: 423540
    },
    423355: {
        semester_choise: 4,
        ects: 2.5,
        weight: 2.5,
        name: "E-Marketing",
        packageid: 423540
    },
    423356: {
        semester_choise: 4,
        ects: 2.5,
        weight: 2.5,
        name: "Market Research",
        packageid: 423540
    },
    423357: {
        semester_choise: 4,
        ects: 2.5,
        weight: 2.5,
        name: "Specific Isuses in International Marketing",
        packageid: 423540
    },
    423551: {
        semester_choise: 5,
        ects: 5,
        weight: 5,
        name: "VWL I (5 ECTS)",
        packageOptions: [423550, 423580]
    },
    423552: {
        semester_choise: 5,
        ects: 5,
        weight: 5,
        name: "Recht I",
        packageOptions: [423550, 423580]
    },
    423553: {
        semester_choise: 5,
        ects: 5,
        weight: 5,
        name: "Methoden I",
        packageOptions: [423550, 423580]
    },
    423554: {
        semester_choise: 5,
        ects: 5,
        weight: 5,
        name: "Studium Generale I",
        packageOptions: [423550, 423580]
    },
    423432: {
        semester_choise: 2,
        ects: 5,
        weight: 5,
        name: "Arabische Sprache II, A1.2",
        packageid: 423550
    },
    423462: {
        semester_choise: 2,
        ects: 5,
        weight: 5,
        name: "Allgemeine Sprache und Wirtschaftsarabisch II, B1",
        packageid: 423550
    },
    423632: {
        semester_choise: 2,
        ects: 5,
        weight: 5,
        name: "Russische Sprache II, A1.2",
        packageid: 423550
    },
    423662: {
        semester_choise: 2,
        ects: 5,
        weight: 5,
        name: "Allgemeine Sprache und Wirtschaftsrussisch II, B1",
        packageid: 423550
    },
    423732: {
        semester_choise: 2,
        ects: 5,
        weight: 5,
        name: "Français professionnel I, A2/B1",
        packageid: 423550
    },
    423762: {
        semester_choise: 2,
        ects: 5,
        weight: 5,
        name: "Langue et civilisation I, B1/B2",
        packageid: 423550
    },
    423862: {
        semester_choise: 2,
        ects: 5,
        weight: 5,
        name: "El Español Profesional II, B1/B2",
        packageid: 423550
    },
    423832: {
        semester_choise: 2,
        ects: 5,
        weight: 5,
        name: "El Español de la Empresa II, A1/A2",
        packageid: 423550
    },
    423561: {
        semester_choise: 5,
        ects: 5,
        weight: 5,
        name: "Internationale BWL III",
        packageid: 423560
    },
    423562: {
        semester_choise: 5,
        ects: 5,
        weight: 5,
        name: "Managementprozesse III",
        packageid: 423560
    },
    423563: {
        semester_choise: 5,
        ects: 5,
        weight: 5,
        name: "Hospitality-Management III",
        packageid: 423560
    },
    423571: {
        semester_choise: 5,
        ects: 2.5,
        weight: 2.5,
        name: "VWL I (2.5 ECTS)",
        packageid: 423570
    },
    423572: {
        semester_choise: 5,
        ects: 2.5,
        weight: 2.5,
        name: "Recht I",
        packageid: 423570
    },
    423573: {
        semester_choise: 5,
        ects: 2.5,
        weight: 2.5,
        name: "Methoden I",
        packageid: 423570
    },
    423574: {
        semester_choise: 5,
        ects: 2.5,
        weight: 2.5,
        name: "Studium Generale I",
        packageid: 423570
    },
    423575: {
        semester_choise: 5,
        ects: 2.5,
        weight: 2.5,
        name: "VWL II (2.5 ECTS)",
        packageid: 423570
    },
    423576: {
        semester_choise: 5,
        ects: 2.5,
        weight: 2.5,
        name: "Recht II (2.5 ECTS)",
        packageid: 423570
    },
    423577: {
        semester_choise: 5,
        ects: 2.5,
        weight: 2.5,
        name: "Methoden II (2.5 ECTS)",
        packageid: 423570
    },
    423578: {
        semester_choise: 5,
        ects: 2.5,
        weight: 2.5,
        name: "Studium Generale II (2.5 ECTS)",
        packageid: 423570
    },
    423902: {
        name: "Business English II, B1",
        semester_choise: 1,
        ects: 2.5,
        weight: 2.5,
        packageid: 423570
    },
    423912: {
        name: "Business English II, B2",
        semester_choise: 1,
        ects: 2.5,
        weight: 2.5,
        packageid: 423570
    },
    423922: {
        name: "Business Communication II, B1/B2",
        semester_choise: 1,
        ects: 2.5,
        weight: 2.5,
        packageid: 423570
    },
    423932: {
        name: "Business Communication II, B2/C1",
        semester_choise: 1,
        ects: 2.5,
        weight: 2.5,
        packageid: 423570
    },
    423952: {
        name: "English Language and Culture II, C1",
        semester_choise: 1,
        ects: 2.5,
        weight: 2.5,
        packageid: 423570
    },
    423161: {
        name: "Recht II",
        semester: 6,
        ects: 2.5,
        weight: 2.5,
        packageid: 423160
    },
    423171: {
        name: "E-Business in Tourismus und Hospitality",
        semester: 6,
        ects: 2.5,
        weight: 2.5,
        packageid: 423170
    },
    423181: {
        name: "Projekt Hospitality",
        semester: 6,
        ects: 7.5,
        weight: 7.5,
        packageid: 423180
    },
    423191: {
        name: "Entrepreneurship und Innovation",
        semester: 6,
        weight: 2.5,
        ects: 2.5,
        packageid: 423190
    },
    423231: {
        name: "Fallstudien der digitalen Wirtschaft",
        semester: 6,
        weight: 2.5,
        ects: 2.5,
        packageid: 423230
    },
    423581: {
        name: "VWL II (5 ECTS)",
        semester_choise: 5,
        weight: 5,
        ects: 5,
        packageid: 423580
    },
    423582: {
        name: "Recht II (5 ECTS)",
        semester_choise: 5,
        weight: 5,
        ects: 5,
        packageid: 423580
    },
    423583: {
        name: "Methoden II (5 ECTS)",
        semester_choise: 5,
        weight: 5,
        ects: 5,
        packageid: 423580
    },
    423584: {
        name: "Studium Generale II (2.5 ECTS)",
        semester_choise: 5,
        weight: 5,
        ects: 5,
        packageid: 423580
    },
    423585: {
        name: "Englisch",
        semester_choise: 5,
        weight: 5,
        ects: 5,
        packageid: 423580
    },
    423586: {
        name: "Französisch",
        semester_choise: 5,
        weight: 5,
        ects: 5,
        packageid: 423580
    },
    423587: {
        name: "Spanisch",
        semester_choise: 5,
        weight: 5,
        ects: 5,
        packageid: 423580
    },
    423236: {
        name: "Hospitality Revenue Management, Sales & Marketing",
        semester: 6,
        ects: 5,
        weight: 5,
        packageid: 423235
    },
    423237: {
        name: "Hospitality Development & Real Estate",
        semester: 6,
        ects: 5,
        weight: 5,
        packageid: 423235
    },
    423238: {
        name: "B2B Vertrieb, (System)Gastronomie, Food-Management",
        semester: 6,
        ects: 5,
        weight: 5,
        packageid: 423235
    },
    423239: {
        name: "MICE Industrie und Event Management",
        semester: 6,
        ects: 5,
        weight: 5,
        packageid: 423235
    },
    423121: {
        name: "Unternehmensplanspiel",
        semester: 7,
        ects: 7.5,
        weight: 7.5,
        packageid: 423120
    },
    423211: {
        name: "Seminar Hospitality",
        semester: 7,
        ects: 7.5,
        weight: 7.5,
        packageid: 423210
    },
    423521: {
        name: "Bachelor Thesis",
        semester: 7,
        ects: 12,
        weight: 12,
        packageid: 423520
    }





}

const hm_ExamPackages: ExamPackages = {
    423110: {
        name: "Strategisches Management und Controlling",
        weight: 5,
        required: [423111,423112]
    },
    423120: {
        name: "Simulationen in der BWL",
        weight: 7.5,
        required: [423121]
    },
    423130: {
        name: "Nachhaltigkeit und Ethik der Hospitality-Industrie",
        weight: 5,
        required: [423133]
    },
    423140: {
        name: "Forschungsmethoden",
        weight: 2.5,
        required: [423141]
    },
    423150: {
        name: "VWL",
        weight: 2.5,
        required: [423151,423152,423153]
    },
    423160: {
        name: "Handels- und Wirtschaftsrecht",
        weight: 2.5,
        required: [423161]
    },
    423170: {
        name: "E-Business in Hospitality",
        weight: 2.5,
        required: [423171]
    },
    423180: {
        name: "Projekt Hospitality",
        weight: 7.5,
        required: [423181]
    },
    423190: {
        name: "Entrepreneurship und Innovation",
        weight: 2.5,
        required: [423191]
    },
    423200: {
        name: "Recht in Tourismus und Hospitality",
        weight: 2.5,
        required: [423201]
    },
    423210: {
        name: "Seminar Hospitality",
        weight: 7.5,
        required: [423211]
    },
    423220: {
        name: "Hospitality-Supply-Chain-Management",
        weight: 2.5,
        required: [423221]
    },
    423230: {
        name: "Fallstudien der digitalen Wirtschaft",
        weight: 5,
        required: [423231]
    },
    423530: {
        name: "Internationale Spezialisierung 1",
        weight: 5,
        required: [423531,423532,423533,423534,423535,423536,423861,423831,423761,423731,423661,423631,423461,423431,423901,423911,423921,423931,423951]
    },
    423540: {
        name: "Internationale Spezialisierung 2",
        weight: 7.5,
        required: [423541,423542,423543,423312,423314,423315,423316,423317,423318,423319,423322,423323,423324,423325,423332,
            423333,423334,423342,423343,423344,423353,423354,423355,423356,423357,423352]
    },
    423550: {
        name: "Internationale Spezialisierung 3",
        weight: 5,
        required: [423531,423532,423533,423534,423535,423536,423551,423552,423553,423554,423462,423432,423632,423662,423732,423762,423832,423862]
    },
    423560: {
        name: "Internationale Spezialisierung 4",
        weight: 5,
        required: [423534,423535,423536,423561,423562,423563,423311,423321,423331,423341,423351]
    },
    423570: {
        name: "Internationale Spezialisierung 5",
        weight: 2.5,
        required: [423571,423572,423573,423574,423575,423576,423577,423578, 423902,423912,423922,423932,423952]
    },
    423580: {
        name: "Internationale Spezialisierung 6",
        weight: 5,
        required: [423551,423552,423553,423554,423581,423582,423583,423584,423585,423586,423587,423441,423471,423641,423671,423741,423771,423841,423871]
    },
    423240: {
        name: "Hospitality Leadership und Controlling",
        weight: 5,
        required: [423241]
    },
    423250: {
        name: "Restaurantmanagement und Systemgastronomie",
        weight: 5,
        required: [423251]
    },
    423235: {
        name: "Schwerpunkt Hospitality",
        weight: 5,
        required: [423236,423237,423238,423239]
    },
    423400: {
        name: "Sprachlich-betriebswirtschaftlicher Wahlbereich 2",
        weight: 5,
        required: [423441,423471,423641,423671,423741,423771,423841,423871,423311,423321,423331,423341,423351]
    },
    423520: {
        name: "Bachelor Thesis",
        weight: 15,
        required: [423521]
    }
}

export const hm: SingleOption = {
    basics: hm_basic_data,
    exams: hm_exams,
    examPackages: hm_ExamPackages
}