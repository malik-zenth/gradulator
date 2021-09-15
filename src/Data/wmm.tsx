import { BasicInformation, ExamPackages, Exams, SingleOption } from "./types";

const wmm_basicData: BasicInformation = {
    name: "Weinmarketing und Management",
    spo: 1,
    beta: true,
    ects: 0,
    weight: 0,
    semesterChoices: {
        1: "Wahlfach Auslandssemester",
        2: "Wahlfach Englisch und Sprachen"
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
            examid: 204530
        },
        {
            // BWL Wahlbereich 2
            ids: [204441,204471,204641,204671,204741,204771,204841,204871,204311,204321,204331,204341,204351],
            required: 1,
            examid: 204400
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
        packageid: 204530
    },
    204532: {
        name: "Managementprozesse I",
        weight: 5,
        ects: 5,
        semester_choise: 1,
        packageid: 204530
    },
    204533: {
        name: "Weinmanagement I",
        weight: 5,
        ects: 5,
        semester_choise: 1,
        packageid: 204530
    },
    204534: {
        name: "Internationale BWL II",
        weight: 5,
        ects: 5,
        semester_choise: 1,
        packageid: 204530
    },
    204535: {
        name: "Managementprozesse II",
        weight: 5,
        ects: 5,
        semester_choise: 1,
        packageid: 204530
    },
    204536: {
        name: "Weinmanagement II",
        weight: 5,
        ects: 5,
        semester_choise: 1,
        packageid: 204530
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
    },
    204462: {
        name: "Allgemeine Sprache und Wirtschaftsarabisch II, B1",
        weight: 2.5,
        ects: 2.5,
        semester_choise: 2,
    },
    204632: {
        name: "Russische Sprache II, A1.1",
        weight: 2.5,
        ects: 2.5,
        semester_choise: 2,
    },
    204662: {
        name: "Allgemeine Sprache und Wirtschaftsrussisch II, B1",
        weight: 2.5,
        ects: 2.5,
        semester_choise: 2,
    },
    204732: {
        name: "Francais professionnel 1, A2/B1",
        weight: 2.5,
        ects: 2.5,
        semester_choise: 2,
    },
    204762: {
        name: "Langue et civilisation 1, B1/B2",
        weight: 2.5,
        ects: 2.5,
        semester_choise: 2,
    },
    204832: {
        name: "EI Espariol de la Empresa II, A1/B2",
        weight: 2.5,
        ects: 2.5,
        semester_choise: 2,
    },
    204862: {
        name: "EI Espariol Profesional II, B1/B2",
        weight: 2.5,
        ects: 2.5,
        semester_choise: 2,
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
    },
    204912: {
        name: "Business English II, B2",
        weight: 2.5,
        ects: 2.5,
        semester_choise: 2,
    },
    204922: {
        name: "Business Communication II, B1/B2",
        weight: 2.5,
        ects: 2.5,
        semester_choise: 2,
    },
    204932: {
        name: "Business Communication II, B2/C1",
        weight: 2.5,
        ects: 2.5,
        semester_choise: 2,
    },
    204952: {
        name: "English Language and Culture II, C1",
        weight: 2.5,
        ects: 2.5,
        semester_choise: 2,
    },
    204441: {
        name: "Arabisch im Alltag, A1.2",
        weight: 5,
        ects: 5,
        semester_choise: 2,
        packageid: 204400
    },
    204471: {
        name: "Wirtschaftskommunikation Arabisch I, B1",
        weight: 5,
        ects: 5,
        semester_choise: 2,
        packageid: 204400
    },
    204641: {
        name: "Russisch im Alltag, A1.2",
        weight: 5,
        ects: 5,
        semester_choise: 2,
        packageid: 204400
    },
    204671: {
        name: "Wirtschaftskommunikation Russisch I, B1",
        weight: 5,
        ects: 5,
        semester_choise: 2,
        packageid: 204400
    },
    204741: {
        name: "Francais professionnel II, B1",
        weight: 5,
        ects: 5,
        semester_choise: 2,
        packageid: 204400
    },
    204771: {
        name: "Lanque et civilisation II, B2",
        weight: 5,
        ects: 5,
        semester_choise: 2,
        packageid: 204400
    },
    204841: {
        name: "EI Espariol de la Empresa III, A2",
        weight: 5,
        ects: 5,
        semester_choise: 2,
        packageid: 204400
    },
    204871: {
        name: "EI Espanol de los Negocios 1, B2",
        weight: 5,
        ects: 5,
        semester_choise: 2,
        packageid: 204400
    },
    204311: {
        name: "International Financial & Management Accounting",
        weight: 5,
        ects: 5,
        semester: 3,
        packageid: 204400
    },
    204321: {
        name: "International Finance",
        weight: 5,
        ects: 5,
        semester: 3,
        packageid: 204400
    },
    204331: {
        name: "International Human Resource Management",
        weight: 5,
        ects: 5,
        semester: 3,
        packageid: 204400
    },
    204341: {
        name: "International Management",
        weight: 5,
        ects: 5,
        semester: 3,
        packageid: 204400
    },
    204351: {
        name: "International Marketing",
        weight: 5,
        ects: 5,
        semester: 3,
        packageid: 204400
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
    }

}

export const wmm: SingleOption = {
    basics: wmm_basicData,
    examPackages: wmm_examPackages,
    exams: wmm_exams
}