import { BasicInformation, ExamPackages, Exams, SingleOption } from "./types";

const mbb_basic: BasicInformation = {
    name: "Bachelorstudiengang Maschinenbau",
    spo: 3,
    beta: true,
    ects: 111,
    weight: 108,
    required_emphasis: 0,
    semesterChoices: {
        1: "Vertiefungsfächer",
        2: "Technische Wahlfächer"
    },
    emphasis: [],
    elevtive: [
        {
            requiredEcts: 5,
            ids: [114281, 114282, 114283, 114284, 114285, 114286, 114287, 114288, 114289, 114290, 114291, 114292, 114293],
            examid: 114210,
            multiOption: true,
            choiseID: 1
        },
        {
            requiredEcts: 5,
            ids: [114281, 114282, 114283, 114284, 114285, 114286, 114287, 114288, 114289, 114290, 114291, 114292, 114293],
            examid: 114220,
            multiOption: true,
            choiseID: 1
        },
        {
            requiredEcts: 5,
            ids: [114281, 114282, 114283, 114284, 114285, 114286, 114287, 114288, 114289, 114290, 114291, 114292, 114293],
            examid: 114230,
            multiOption: true,
            choiseID: 1
        },
        {
            requiredEcts: 5,
            ids: [114281, 114282, 114283, 114284, 114285, 114286, 114287, 114288, 114289, 114290, 114291, 114292, 114293],
            examid: 114240,
            multiOption: true,
            choiseID: 1
        },
        {
            requiredEcts: 5,
            ids: [114281, 114282, 114283, 114284, 114285, 114286, 114287, 114288, 114289, 114290, 114291, 114292, 114293,
                114301, 114302, 114303, 114304, 114305, 114306, 114307, 114308, 114309, 114310, 114311, 114312, 114313, 114314, 114315, 114316, 114317
                , 114318, 114319, 114320, 114321, 114322, 114323, 114324, 114325, 114326, 114327, 114328, 114329, 114330, 114331
            ],
            examid: 114250,
            multiOption: true,
            choiseID: 1
        },
        {
            requiredEcts: 5,
            ids: [114281, 114282, 114283, 114284, 114285, 114286, 114287, 114288, 114289, 114290, 114291, 114292, 114293,
                114301, 114302, 114303, 114304, 114305, 114306, 114307, 114308, 114309, 114310, 114311, 114312, 114313, 114314, 114315, 114316, 114317
                , 114318, 114319, 114320, 114321, 114322, 114323, 114324, 114325, 114326, 114327, 114328, 114329, 114330, 114331
            ],
            examid: 114260,
            multiOption: true,
            choiseID: 1
        },
        {
            options: [
                {
                    ids: [114301, 114302, 114303, 114304, 114305, 114306, 114307, 114308, 114309, 114310, 114311, 114312, 114313, 114314, 114315, 114316, 114317
                        , 114318, 114319, 114320, 114321, 114322, 114323, 114324, 114325, 114326, 114327, 114328, 114329, 114330, 114331
                    ],
                    requiredECTS: 5,
                    optionId: 1
                },
                {
                    ids: [114181],
                    requiredECTS: 2.5,
                    optionId: 1
                }
            ],
                examid: 114180,
                multiOption: true,
                choiseID: 1
        }
    ]
}

const mbb_exams: Exams = {
    114112: {
        name: "Technische Mechanik 3",
        ects: 2,
        weight: 2,
        packageid: 114110,
        semester: 3
    },
    114121: {
        name: "Thermodynamik",
        ects: 4,
        weight: 4,
        packageid: 114120,
        semester: 3
    },
    114122: {
        name: "Strömungslehre",
        ects: 4,
        weight: 4,
        packageid: 114120,
        semester: 3
    },
    114131: {
        name: "Signale und Systeme",
        ects: 2,
        weight: 1,
        packageid: 114130,
        semester: 3
    },
    114132: {
        name: "Messtechnik und Sensorik",
        ects: 4,
        weight: 2,
        packageid: 114130,
        semester: 3
    },
    114151: {
        name: "Konstruieren mit CAD",
        ects: 3,
        weight: 1,
        packageid: 114150,
        semester: 3
    },
    114159: {
        name: "Spannende und Abstragende / Umformende Fertigungsverfahren",
        ects: 4,
        weight: 2,
        packageid: 114150,
        semester: 3
    },
    114119: {
        name: "Schwingungslehre / Maschinendynamik",
        ects: 5,
        weight: 4,
        packageid: 114110,
        semester: 4
    },
    114133: {
        name: "Labor Messtechnik",
        ects: 3,
        weight: 1,
        packageid: 114130,
        semester: 4
    },
    114134: {
        name: "Regelungstechnik",
        ects: 4,
        weight: 2,
        packageid: 114130,
        semester: 4
    },
    114142: {
        name: "Konstruktionslehre 4",
        ects: 6,
        weight: 6,
        packageid: 114140,
        semester: 4
    },
    114171: {
        name: "Seminararbeit / Projekt",
        ects: 8,
        weight: 8,
        packageid: 114170,
        semester: 6
    },
    114181: {
        name: "Fluidtechnik",
        ects: 2.5,
        weight: 1,
        packageid: 114180,
        semester: 6
    },
    114192: {
        name: "Rhetorik",
        ects: 2,
        weight: 1,
        packageid: 114190,
        semester: 6
    },
    114193: {
        name: "Recht für Ingenieure",
        ects: 2.5,
        weight: 1,
        packageid: 114190,
        semester: 6
    },
    114201: {
        name: "Projektlabor",
        ects: 2.5,
        weight: 1,
        packageid: 114200,
        semester: 6
    },
    114194: {
        name: "Einführung in die Betriebswirtschaftslehre",
        ects: 2.5,
        weight: 1,
        packageid: 114190,
        semester: 7
    },
    114202: {
        name: "Projektplanung",
        ects: 3,
        weight: 1,
        packageid: 114200,
        semester: 7
    },
    114203: {
        name: "MB-Kolloquium",
        ects: 2.5,
        weight: 1,
        packageid: 114200,
        semester: 7
    },
    114271: {
        name: "Bachelor Thesis / Projekt",
        ects: 12,
        weight: 12,
        packageid: 114270,
        semester: 7
    },
    114281: {
        name: "Automatisierungstechnik",
        ects: 5,
        weight: 5,
        packageOptions: [114210, 114220, 114230, 114240, 114250, 114260],
        semester_choise: 1,
    },
    114282: {
        name: "CAD",
        ects: 5,
        weight: 5,
        packageOptions: [114210, 114220, 114230, 114240, 114250, 114260],
        semester_choise: 1,
    },
    114283: {
        name: "Computational Fluid Dynamics",
        ects: 5,
        weight: 5,
        packageOptions: [114210, 114220, 114230, 114240, 114250, 114260],
        semester_choise: 1,
    },
    114284: {
        name: "Elektrische Antriebssysteme",
        ects: 5,
        weight: 5,
        packageOptions: [114210, 114220, 114230, 114240, 114250, 114260],
        semester_choise: 1,
    },
    114285: {
        name: "FEM",
        ects: 5,
        weight: 5,
        packageOptions: [114210, 114220, 114230, 114240, 114250, 114260],
        semester_choise: 1,
    },
    114286: {
        name: "Fortgeschrittene Regelungstechnik",
        ects: 5,
        weight: 5,
        packageOptions: [114210, 114220, 114230, 114240, 114250, 114260],
        semester_choise: 1,
    },
    114287: {
        name: "Kinematik und Kinetik von Robotern",
        ects: 5,
        weight: 5,
        packageOptions: [114210, 114220, 114230, 114240, 114250, 114260],
        semester_choise: 1,
    },
    114288: {
        name: "Kunststofftechnik",
        ects: 5,
        weight: 5,
        packageOptions: [114210, 114220, 114230, 114240, 114250, 114260],
        semester_choise: 1,
    },
    114289: {
        name: "Strömungsmaschinen",
        ects: 5,
        weight: 5,
        packageOptions: [114210, 114220, 114230, 114240, 114250, 114260],
        semester_choise: 1,
    },
    114290: {
        name: "Verbrennungsmotoren",
        ects: 5,
        weight: 5,
        packageOptions: [114210, 114220, 114230, 114240, 114250, 114260],
        semester_choise: 1,
    },
    114291: {
        name: "Werkstofftechnik",
        ects: 5,
        weight: 5,
        packageOptions: [114210, 114220, 114230, 114240, 114250, 114260],
        semester_choise: 1,
    },
    114292: {
        name: "Werkstoffmaschinen",
        ects: 5,
        weight: 5,
        packageOptions: [114210, 114220, 114230, 114240, 114250, 114260],
        semester_choise: 1,
    },
    114293: {
        name: "Vertiefungsfach einer anderen Hochschule (5 ECTS)",
        ects: 5,
        weight: 5,
        packageOptions: [114210, 114220, 114230, 114240, 114250, 114260],
        semester_choise: 1,
    },
    114301: {
        name: "Ausgewählte Kapitel der Mathematik 1 (Statistik, DGL)",
        ects: 2.5,
        weight: 2.5,
        packageOptions: [114240, 114250, 114260, 114180],
        semester_choise: 2
    },
    114302: {
        name: "Ausgewählte Kapitel der Mathematik 2 (Positionierungstechnik)",
        ects: 2.5,
        weight: 2.5,
        packageOptions: [114240, 114250, 114260, 114180],
        semester_choise: 2
    },
    114303: {
        name: "Digitale Produktion",
        ects: 2.5,
        weight: 2.5,
        packageOptions: [114240, 114250, 114260, 114180],
        semester_choise: 2
    },
    114304: {
        name: "Elektrische Aktoren im Kfz",
        ects: 5,
        weight: 5,
        packageOptions: [114240, 114250, 114260, 114180],
        semester_choise: 2
    },
    114305: {
        name: "FEM-Labor",
        ects: 2.5,
        weight: 2.5,
        packageOptions: [114240, 114250, 114260, 114180],
        semester_choise: 2
    },
    114306: {
        name: "Handhabungs- und Montagetechnik",
        ects: 2.5,
        weight: 2.5,
        packageOptions: [114240, 114250, 114260, 114180],
        semester_choise: 2
    },
    114307: {
        name: "Industrieroboter",
        ects: 5,
        weight: 5,
        packageOptions: [114240, 114250, 114260, 114180],
        semester_choise: 2
    },
    114308: {
        name: "Mechanismen und Getriebe",
        ects: 5,
        weight: 5,
        packageOptions: [114240, 114250, 114260, 114180],
        semester_choise: 2
    },
    114309: {
        name: "Mehrkörpersimulation",
        ects: 5,
        weight: 5,
        packageOptions: [114240, 114250, 114260, 114180],
        semester_choise: 2
    },
    114310: {
        name: "Mensch-Maschine-Systeme",
        ects: 2.5,
        weight: 2.5,
        packageOptions: [114240, 114250, 114260, 114180],
        semester_choise: 2
    },
    114311: {
        name: "Modernes Werkstoffdesign in der industriellen Praxis",
        ects: 2.5,
        weight: 2.5,
        packageOptions: [114240, 114250, 114260, 114180],
        semester_choise: 2
    },
    114312: {
        name: "Labor Maschinenbau",
        ects: 2.5,
        weight: 2.5,
        packageOptions: [114240, 114250, 114260, 114180],
        semester_choise: 2
    },
    114313: {
        name: "Ausgewählte Kapitel des Maschinenbaus 1",
        ects: 2.5,
        weight: 2.5,
        packageOptions: [114240, 114250, 114260, 114180],
        semester_choise: 2
    },
    114314: {
        name: "Ausgewählte Kapitel des Maschinenbaus 2",
        ects: 2.5,
        weight: 2.5,
        packageOptions: [114240, 114250, 114260, 114180],
        semester_choise: 2
    }
    ,
    114315: {
        name: "Ausgewählte Kapitel des Maschinenbaus 3",
        ects: 2.5,
        weight: 2.5,
        packageOptions: [114240, 114250, 114260, 114180],
        semester_choise: 2
    },
    114316: {
        name: "Ausgewählte Kapitel des Maschinenbaus 4",
        ects: 5,
        weight: 5,
        packageOptions: [114240, 114250, 114260, 114180],
        semester_choise: 2
    },
    114317: {
        name: "Technisches Fach aus der Fakultät T1 (5 ECTS)",
        ects: 5,
        weight: 5,
        packageOptions: [114240, 114250, 114260, 114180],
        semester_choise: 2
    },
    114318: {
        name: "Technisches Fach aus der Fakultät T1 (5 ECTS)",
        ects: 5,
        weight: 5,
        packageOptions: [114240, 114250, 114260, 114180],
        semester_choise: 2
    },
    114319: {
        name: "Technisches Fach aus der Fakultät T1 (2.5 ECTS)",
        ects: 2.5,
        weight: 2.5,
        packageOptions: [114240, 114250, 114260, 114180],
        semester_choise: 2
    },
    114320: {
        name: "Technisches Fach aus der Fakultät T1 (2.5 ECTS)",
        ects: 2.5,
        weight: 2.5,
        packageOptions: [114240, 114250, 114260, 114180],
        semester_choise: 2
    },
    114321: {
        name: "Technisches Fach aus der Fakultät T1 (2.5 ECTS)",
        ects: 2.5,
        weight: 2.5,
        packageOptions: [114240, 114250, 114260, 114180],
        semester_choise: 2
    },
    114322: {
        name: "Technisches Fach aus der Fakultät T1 (2.5 ECTS)",
        ects: 2.5,
        weight: 2.5,
        packageOptions: [114240, 114250, 114260, 114180],
        semester_choise: 2
    },
    114323: {
        name: "Technisches Fach einer anderen Fakultät der HHN (5 ECTS)",
        ects: 5,
        weight: 5,
        packageOptions: [114240, 114250, 114260, 114180],
        semester_choise: 2
    },
    114324: {
        name: "Technisches Fach einer anderen Fakultät der HHN (2.5 ECTS)",
        ects: 2.5,
        weight: 2.5,
        packageOptions: [114240, 114250, 114260, 114180],
        semester_choise: 2
    },
    114325: {
        name: "Technisches Fach einer anderen Fakultät der HHN (2.5 ECTS)",
        ects: 2.5,
        weight: 2.5,
        packageOptions: [114240, 114250, 114260, 114180],
        semester_choise: 2
    },
    114326: {
        name: "Technisches Fach einer anderen Hochschule (5 ECTS)",
        ects: 5,
        weight: 5,
        packageOptions: [114240, 114250, 114260, 114180],
        semester_choise: 2
    },
    114327: {
        name: "Technisches Fach einer anderen Hochschule (5 ECTS)",
        ects: 5,
        weight: 5,
        packageOptions: [114240, 114250, 114260, 114180],
        semester_choise: 2
    },
    114328: {
        name: "Technisches Fach einer anderen Hochschule (2.5 ECTS)",
        ects: 2.5,
        weight: 2.5,
        packageOptions: [114240, 114250, 114260, 114180],
        semester_choise: 2
    },
    114329: {
        name: "Technisches Fach einer anderen Hochschule (2.5 ECTS)",
        ects: 2.5,
        weight: 2.5,
        packageOptions: [114240, 114250, 114260, 114180],
        semester_choise: 2
    },
    114330: {
        name: "Technisches Fach einer anderen Hochschule (2.5 ECTS)",
        ects: 2.5,
        weight: 2.5,
        packageOptions: [114240, 114250, 114260, 114180],
        semester_choise: 2
    },
    114331: {
        name: "Technisches Fach einer anderen Hochschule (2.5 ECTS)",
        ects: 2.5,
        weight: 2.5,
        packageOptions: [114240, 114250, 114260, 114180],
        semester_choise: 2
    },
}

const mbb_examPackages: ExamPackages = {
    114110: {
        name: "Mathematisch-Naturwissenschaftliche Vertiefung",
        weight: 6,
        required: [114112, 114119]
    },
    114120: {
        name: "Thermo- und Fluiddynamik",
        weight: 8,
        required: [114121, 114122]
    },
    114130: {
        name: "Mess- und Regelungstechnik",
        weight: 12,
        required: [114131, 114132, 114133, 114134]
    },
    114140: {
        name: "Konstruktion",
        weight: 10,
        required: [114142]
    },
    114150: {
        name: "CAD und Fertigung",
        weight: 6,
        required: [114151, 114159]
    },
    114170: {
        name: "Seminararbeit",
        weight: 8,
        required: [114171]
    },
    114180: {
        name: "Fluidtechnik und Technisches Wahlfach",
        weight: 4,
        required: [114181, 114301, 114302, 114303, 114304, 114305, 114306, 114307, 114308, 114309, 114310, 114311, 114312, 114313, 114314, 114315, 114316, 114317
            , 114318, 114319, 114320, 114321, 114322, 114323, 114324, 114325, 114326, 114327, 114328, 114329, 114330, 114331]
    },
    114190: {
        name: "Fachübergreifende Qualifikation",
        weight: 6,
        required: [114192, 114193, 114194]
    },
    114200: {
        name: "Projektarbeiten mit Kolloquium",
        weight: 6,
        required: [114201, 114202, 114203]
    },
    114210: {
        name: "Fachliche Vertiefung 1",
        weight: 5,
        required: [114281, 114282, 114283, 114284, 114285, 114286, 114287, 114288, 114289, 114290, 114291, 114292, 114293]
    },
    114220: {
        name: "Fachliche Vertiefung 2",
        weight: 5,
        required: [114281, 114282, 114283, 114284, 114285, 114286, 114287, 114288, 114289, 114290, 114291, 114292, 114293]
    },
    114230: {
        name: "Fachliche Vertiefung 3",
        weight: 5,
        required: [114281, 114282, 114283, 114284, 114285, 114286, 114287, 114288, 114289, 114290, 114291, 114292, 114293]
    },
    114240: {
        name: "Fachliche Vertiefung 4",
        weight: 5,
        required: [114281, 114282, 114283, 114284, 114285, 114286, 114287, 114288, 114289, 114290, 114291, 114292, 114293,
            114301, 114302, 114303, 114304, 114305, 114306, 114307, 114308, 114309, 114310, 114311, 114312, 114313, 114314, 114315, 114316, 114317
            , 114318, 114319, 114320, 114321, 114322, 114323, 114324, 114325, 114326, 114327, 114328, 114329, 114330, 114331
        ]
    },
    114250: {
        name: "Fachliche Vertiefung 5",
        weight: 5,
        required: [114281, 114282, 114283, 114284, 114285, 114286, 114287, 114288, 114289, 114290, 114291, 114292, 114293,
            114301, 114302, 114303, 114304, 114305, 114306, 114307, 114308, 114309, 114310, 114311, 114312, 114313, 114314, 114315, 114316, 114317
            , 114318, 114319, 114320, 114321, 114322, 114323, 114324, 114325, 114326, 114327, 114328, 114329, 114330, 114331
        ]
    },
    114260: {
        name: "Fachliche Vertiefung 6",
        weight: 5,
        required: [114281, 114282, 114283, 114284, 114285, 114286, 114287, 114288, 114289, 114290, 114291, 114292, 114293,
            114301, 114302, 114303, 114304, 114305, 114306, 114307, 114308, 114309, 114310, 114311, 114312, 114313, 114314, 114315, 114316, 114317
            , 114318, 114319, 114320, 114321, 114322, 114323, 114324, 114325, 114326, 114327, 114328, 114329, 114330, 114331
        ]
    },
    114270: {
        name: "Bachelor Thesis",
        weight: 12,
        required: [114271]
    }



}

export const mbb: SingleOption = {
    basics: mbb_basic,
    examPackages: mbb_examPackages,
    exams: mbb_exams
}