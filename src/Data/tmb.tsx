import { BasicInformation, ExamPackages, Exams, SingleOption } from "./types";

const tmb_basic_data: BasicInformation = {
    name: "Tourismusmanagement",
    weight: 120,
    ects: 0,
    spo: 6,
    required_emphasis: 0,
    emphasis: [],
    semesterChoices: {
        1: "Tourismus-Schwerpunkte",
        2: "Wahlfach Auslandssemester"
    },
    elevtive: [
        {
            ids: [186151,186152,186153],
            required: 1,
            examid: 186150,
            emphasis_elevtive: false
        },
        {
            ids: [186231, 186233, 186235, 186237, 186239, 186241, 186243, 186245, 186247],
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
            ids: [186531,186532,186533,186534,186535,186536],
            required: 1,
            examid: 186530,
            multiOption: true,
            choiseID: 2
        },
        {
            // I2
            ids: [186541,186542,186543],
            required: 1,
            examid: 186540,
        },
        {
            // I3
            ids: [186531,186532,186533,186534,186535,186536,186551,186552,186553,186554],
            required: 1,
            examid: 186550,
            multiOption: true,
            choiseID: 2
        },
        {
            // I4
            ids: [186534,186535,186536,186561,186562,186563,186311, 186321,186331,186441,186351],
            required: 1,
            examid: 186560,
            multiOption: true,
            choiseID: 2
        },
        {
            // I5
            ids: [186571,186572,186573,186574,186575,186576,186577,186578],
            required: 1,
            examid: 186570,
            multiOption: true,
            choiseID: 2
        },
        {
            // I6
            ids: [186551,186552,186553,186554,186581,186582,186583,186584,186585,186586,186587],
            required: 1,
            examid: 186580,
            multiOption: true,
            choiseID: 2
        },

    ]
}

const tmb_exams: Exams =  {
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
        packageOptions: [186530, 186550, 186560]
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
        name: "VWL I",
        packageOptions: [186550,186580]
    },
    186552: {
        semester_choise: 2,
        ects: 5,
        weight: 5,
        name: "Recht I",
        packageOptions: [186550,186580]
    },
    186553: {
        semester_choise: 2,
        ects: 5,
        weight: 5,
        name: "Methoden I",
        packageOptions: [186550,186580]
    },
    186554: {
        semester_choise: 2,
        ects: 5,
        weight: 5,
        name: "Studium Generale I",
        packageOptions: [186550,186580]
    },
    186581: {
        semester_choise: 2,
        ects: 5,
        weight: 5,
        name: "VWL II",
        packageOptions: [186580]
    },
    186582: {
        semester_choise: 2,
        ects: 5,
        weight: 5,
        name: "Recht II",
        packageOptions: [186580]
    },
    186583: {
        semester_choise: 2,
        ects: 5,
        weight: 5,
        name: "Methoden II",
        packageOptions: [186580]
    },
    186584: {
        semester_choise: 2,
        ects: 5,
        weight: 5,
        name: "Studium Generale II",
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
        packageOptions: [186250,186260,186270]
    },
    186233: {
        semester_choise: 1,
        ects: 5,
        weight: 5,
        name: "Nachhaltigkeit im Tourismus",
        packageOptions: [186250,186260,186270]
    },
    186235: {
        semester_choise: 1,
        ects: 5,
        weight: 5,
        name: "Geschäftstourismus",
        packageOptions: [186250,186260,186270]
    },
    186237: {
        semester_choise: 1,
        ects: 5,
        weight: 5,
        name: "MICE Industrie und Eventmanagement",
        packageOptions: [186250,186260,186270]
    },
    186239: {
        semester_choise: 1,
        ects: 5,
        weight: 5,
        name: "Reiseveranstaltung",
        packageOptions: [186250,186260,186270]
    },
    186241: {
        semester_choise: 1,
        ects: 5,
        weight: 5,
        name: "Touristikmarketing",
        packageOptions: [186250,186260,186270]
    },
    186243: {
        semester_choise: 1,
        ects: 5,
        weight: 5,
        name: "Verkehrträgermanagement",
        packageOptions: [186250,186260,186270]
    },
    186245: {
        semester_choise: 1,
        ects: 5,
        weight: 5,
        name: "Gesundheitsmanagement",
        packageOptions: [186250,186260,186270]
    },
    186247: {
        semester_choise: 1,
        ects: 5,
        weight: 5,
        name: "Hotel- und Restaurantmanagement",
        packageOptions: [186250,186260,186270]
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
        semester_choise: 2,
        ects: 5,
        weight: 5,
        name: "International Financial & Management Accounting",
        packageOptions: [186560]
    },
    186321: {
        semester_choise: 2,
        ects: 5,
        weight: 5,
        name: "International Finance",
        packageOptions: [186560]
    },
    186331: {
        semester_choise: 2,
        ects: 5,
        weight: 5,
        name: "International Human Resource Management",
        packageOptions: [186560]
    },
    186441: {
        semester_choise: 2,
        ects: 5,
        weight: 5,
        name: "International Management",
        packageOptions: [186560]
    },
    186351: {
        semester_choise: 2,
        ects: 5,
        weight: 5,
        name: "International Marketing",
        packageOptions: [186560]
    },
    186571: {
        semester_choise: 2,
        ects: 2.5,
        weight: 2.5,
        name: "VWL I",
        packageOptions: [186570]
    },
    186572: {
        semester_choise: 2,
        ects: 2.5,
        weight: 2.5,
        name: "Recht I",
        packageOptions: [186570]
    },
    186573: {
        semester_choise: 2,
        ects: 2.5,
        weight: 2.5,
        name: "Methoden I",
        packageOptions: [186570]
    },
    186574: {
        semester_choise: 2,
        ects: 2.5,
        weight: 2.5,
        name: "Studium Generale I",
        packageOptions: [186570]
    },
    186575: {
        semester_choise: 2,
        ects: 2.5,
        weight: 2.5,
        name: "VWL II",
        packageOptions: [186570]
    },
    186576: {
        semester_choise: 2,
        ects: 2.5,
        weight: 2.5,
        name: "Recht II",
        packageOptions: [186570]
    },
    186577: {
        semester_choise: 2,
        ects: 2.5,
        weight: 2.5,
        name: "Methoden II",
        packageOptions: [186570]
    },
    186578: {
        semester_choise: 2,
        ects: 2.5,
        weight: 2.5,
        name: "Studium Generale II",
        packageOptions: [186570]
    }


}


const tmb_ExamPackages: ExamPackages = {
    186110: {
        name: "Strategisches Management und Controlling",
        weight: 5,
        required: [186111,186112]
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
        required: [186151,186152,186153]
    },
    186530: {
        name: "Internationale Spezialisierung 1",
        weight: 5,
        required: [186531,186532,186533,186534,186535,186536]
    },
    186540: {
        name: "Internationale Spezialisierung 2",
        weight: 7.5,
        required: [186541,186542,186543]
    },
    186550: {
        name: "Internationale Spezialisierung 3",
        weight: 5,
        required: [186531,186532,186533,186534,186535,186536,186551,186552,186553,186554]
    },
    186560: {
        name: "Internationale Spezialisierung 4",
        weight: 5,
        required: [186534,186535,186536,186561,186562,186563,186311, 186321,186331,186441,186351]
    },
    186570: {
        name: "Internationale Spezialisierung 5",
        weight: 2.5,
        required: [186571,186572,186573,186574,186575,186576,186577,186578]
    },
    186580: {
        name: "Internationale Spezialisierung 6",
        weight: 5,
        required: [186551,186552,186553,186554,186581,186582,186583,186584,186585,186586,186587]
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
    }



}

export const tmb : SingleOption = {
    basics: tmb_basic_data,
    exams: tmb_exams,
    examPackages: tmb_ExamPackages
}
