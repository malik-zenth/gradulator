import { BasicInformation, ExamPackages, Exams, SingleOption } from "./types";

const bm_basic_data: BasicInformation = {
          "name":"Betriebswirtschaft Marketing und Medienmanagement",
          "required_emphasis":0,
          "weight":126,
          "ects":142,
          "spo": 3,
          "emphasis":[
             
          ],
          "semesterChoices": {
              1: "Wahlpflichtfachbereich Marketing, Medien und Management"
          },
          "elevtive":[
             {
                "examid":293300,
                "required":1,
                "ids":[
                   293310,
                   293320
                ]
             },
             {
                "examid":293400,
                "requiredEcts":16,
                "ids":[
                   293401,
                   293402,
                   293403,
                   293404,
                   293405,
                   293406,
                   293407,
                   293408,
                   293409,
                   293410,
                   293411,
                   293412,
                   293413,
                   293414,
                   293415,
                   293416,
                   293417,
                   293418,
                   293419,
                   293420,
                   293421,
                   293422,
                   293423,
                   293424,
                   293425,
                   293426,
                   293427,
                   293428,
                   293429,
                   293430,
                   283431,
                   293432,
                   293434
                ]
             }
          ],
          "beta":true
       }
 
const bm_exams: Exams = {
          "283431":{
             "ects":2,
             "semester_choise": 1,
             "name":"International Business Case Studies",
             "weight":2,
             "packageid":293400
          },
          "293101":{
             "ects":3,
             "semester":3,
             "name":"Betriebswirtschaftslehre 2",
             "weight":3,
             "packageid":293100
          },
          "293102":{
             "ects":3,
             "semester":3,
             "name":"Volkswirtschaftslehre 2",
             "weight":3,
             "packageid":293100
          },
          "293111":{
             "ects":5,
             "semester":3,
             "name":"FInanzmanagement",
             "weight":5,
             "packageid":293110
          },
          "293112":{
             "ects":3,
             "semester":3,
             "name":"Controlling",
             "weight":3,
             "packageid":293110
          },
          "293113":{
             "ects":3,
             "semester":4,
             "name":"Betriebswirtschaftliche Steuerlehre",
             "weight":3,
             "packageid":293110
          },
          "293121":{
             "ects":4,
             "semester":4,
             "name":"Unternehmensführung und Unternehmensethik",
             "weight":4,
             "packageid":293120
          },
          "293122":{
             "ects":6,
             "semester":4,
             "name":"Business Simulation",
             "weight":5,
             "packageid":293120
          },
          "293131":{
             "ects":5,
             "semester":6,
             "name":"Strategisches Management",
             "weight":5,
             "packageid":293130
          },
          "293132":{
             "ects":6,
             "semester":6,
             "name":"Internationales Management",
             "weight":6,
             "packageid":293130
          },
          "293141":{
             "ects":6,
             "semester":5,
             "name":"Management Skills",
             "weight":6,
             "packageid":293140
          },
          "293151":{
             "ects":2,
             "semester":3,
             "name":"Strategisches Marketing",
             "weight":2,
             "packageid":293150
          },
          "293152":{
             "ects":2,
             "semester":3,
             "name":"Marktforschung",
             "weight":2,
             "packageid":293150
          },
          "293153":{
             "ects":2,
             "semester":3,
             "name":"Marketingkonzeptionen",
             "weight":2,
             "packageid":293150
          },
          "293161":{
             "ects":2,
             "semester":4,
             "name":"Kommunikation und Werbung",
             "weight":3,
             "packageid":293160
          },
          "293162":{
             "ects":2,
             "semester":4,
             "name":"E-Business 1",
             "weight":2,
             "packageid":293160
          },
          "293163":{
             "ects":3,
             "semester":6,
             "name":"E-Business 2",
             "weight":3,
             "packageid":293160
          },
          "293171":{
             "ects":4,
             "semester":3,
             "name":"Marketing- und Vertriebsrecht",
             "weight":4,
             "packageid":293170
          },
          "293172":{
             "ects":3,
             "semester":4,
             "name":"Medienrecht",
             "weight":3,
             "packageid":293170
          },
          "293181":{
             "ects":6,
             "semester":3,
             "name":"Wirtschaftsinformatik 2",
             "weight":6,
             "packageid":293180
          },
          "293191":{
             "ects":4,
             "semester":4,
             "name":"Produkt- und Markenmanagement",
             "weight":4,
             "packageid":293190
          },
          "293192":{
             "ects":4,
             "semester":4,
             "name":"Kommunikations- und Cross-Media-Management",
             "weight":4,
             "packageid":293190
          },
          "293201":{
             "ects":4,
             "semester":6,
             "name":"Kunden- und Vertriebsmanagement",
             "weight":4,
             "packageid":293200
          },
          "293202":{
             "ects":4,
             "semester":6,
             "name":"Digitales Marketing",
             "weight":4,
             "packageid":293200
          },
          "293211":{
             "ects":2,
             "semester":4,
             "name":"Wirtschaftsenglisch",
             "weight":2,
             "packageid":293210
          },
          "293310":{
             "ects":8,
             "semester":7,
             "name":"Praxisseminar MDM",
             "weight":8,
             "packageid":293300
          },
          "293320":{
             "ects":8,
             "semester":7,
             "name":"Praxisseminar PKM",
             "weight":8,
             "packageid":293300
          },
          "293401":{
             "ects":2,
             "semester_choise": 1,
             "name":"Trends im Digitalen Marketing",
             "weight":2,
             "packageid":293400
          },
          "293402":{
             "ects":2,
             "semester_choise": 1,
             "name":"Trends in Business Intelligence",
             "weight":2,
             "packageid":293400
          },
          "293403":{
             "ects":2,
             "semester_choise": 1,
             "name":"Trends in eBusiness / eCommerce",
             "weight":2,
             "packageid":293400
          },
          "293404":{
             "ects":2,
             "semester_choise": 1,
             "name":"Mediendesign und Medienproduktion",
             "weight":2,
             "packageid":293400
          },
          "293405":{
             "ects":2,
             "semester_choise": 1,
             "name":"E-Learning",
             "weight":2,
             "packageid":293400
          },
          "293406":{
             "ects":2,
             "semester_choise": 1,
             "name":"Trends im Digitalen Management",
             "weight":2,
             "packageid":293400
          },
          "293407":{
             "ects":2,
             "semester_choise": 1,
             "name":"Mediaplanung",
             "weight":2,
             "packageid":293400
          },
          "293408":{
             "ects":2,
             "semester_choise": 1,
             "name":"Fallstudien Medienmarketing",
             "weight":2,
             "packageid":293400
          },
          "293409":{
             "ects":2,
             "semester_choise": 1,
             "name":"Ausgewählte Kapitel Kommunikation",
             "weight":2,
             "packageid":293400
          },
          "293410":{
             "ects":2,
             "semester_choise": 1,
             "name":"Verkaufsgesprächführung",
             "weight":2,
             "packageid":293400
          },
          "293411":{
             "ects":2,
             "semester_choise": 1,
             "name":"Neue Instrumente im Marketing",
             "weight":2,
             "packageid":293400
          },
          "293412":{
             "ects":2,
             "semester_choise": 1,
             "name":"Produktentwicklungsprojekt",
             "weight":2,
             "packageid":293400
          },
          "293413":{
             "ects":2,
             "semester_choise": 1,
             "name":"International competitiveness and innovation",
             "weight":2,
             "packageid":293400
          },
          "293414":{
             "ects":2,
             "semester_choise": 1,
             "name":"Quantitative Methoden des Marketing",
             "weight":2,
             "packageid":293400
          },
          "293415":{
             "ects":2,
             "semester_choise": 1,
             "name":"Fallstudien Marketing und Vertrieb",
             "weight":2,
             "packageid":293400
          },
          "293416":{
             "ects":2,
             "semester_choise": 1,
             "name":"CRM und Kundenzufriedenheit",
             "weight":2,
             "packageid":293400
          },
          "293417":{
             "ects":2,
             "semester_choise": 1,
             "name":"Intern. Marketing Week",
             "weight":2,
             "packageid":293400
          },
          "293418":{
             "ects":2,
             "semester_choise": 1,
             "name":"Marketing Simulation",
             "weight":2,
             "packageid":293400
          },
          "293419":{
             "ects":2,
             "semester_choise": 1,
             "name":"Customer Touchpoint Management",
             "weight":2,
             "packageid":293400
          },
          "293420":{
             "ects":2,
             "semester_choise": 1,
             "name":"Konsumgütermarketing",
             "weight":2,
             "packageid":293400
          },
          "293421":{
             "ects":2,
             "semester_choise": 1,
             "name":"Rhetorik und Moderationstechnik",
             "weight":2,
             "packageid":293400
          },
          "293422":{
             "ects":2,
             "semester_choise": 1,
             "name":"Wirtschafts- und Unternehmensethik",
             "weight":2,
             "packageid":293400
          },
          "293423":{
             "ects":2,
             "semester_choise": 1,
             "name":"Change Management",
             "weight":2,
             "packageid":293400
          },
          "293424":{
             "ects":2,
             "semester_choise": 1,
             "name":"Professionelles Arbeiten mit Excel",
             "weight":2,
             "packageid":293400
          },
          "293425":{
             "ects":2,
             "semester_choise": 1,
             "name":"Intercultural Communication",
             "weight":2,
             "packageid":293400
          },
          "293426":{
             "ects":2,
             "semester_choise": 1,
             "name":"Global Leadership",
             "weight": 2,
             "packageid":293400
          },
          "293427":{
             "ects":2,
             "semester_choise": 1,
             "name":"Management of International Projects",
             "weight":2,
             "packageid":293400
          },
          "293428":{
             "ects":2,
             "semester_choise": 1,
             "name":"International Business Negotiations",
             "weight":2,
             "packageid":293400
          },
          "293429":{
             "ects":2,
             "semester_choise": 1,
             "name":"Börsenplanspiel",
             "weight":2,
             "packageid":293400
          },
          "293430":{
             "ects":2,
             "semester_choise": 1,
             "name":"International Field Trip",
             "weight":2,
             "packageid":293400
          },
          "293432":{
             "ects":2,
             "semester_choise": 1,
             "name":"Topics in International Management",
             "weight":2,
             "packageid":293400
          },
          "293434":{
             "ects":2,
             "semester_choise": 1,
             "name":"Start-up Business Planning",
             "weight":2,
             "packageid":293400
          },
          "293500":{
             "ects":12,
             "semester":7,
             "name":"Bachelor Thesis",
             "weight":12,
             "packageid":293500
          },
          "295310":{
             "ects":2,
             "semester":7,
             "name":"Mündliche Bachelorprüfung",
             "weight":2,
             "packageid":293510
          }
       }

const bm_examPackages: ExamPackages = {
          "293100":{
             "name":"Betriebs- und Volkswirtschaftslehre 2",
             "weight":6,
             "required":[
                293101,
                293102
             ]
          },
          "293110":{
             "name":"Finanzmanagement, Controlling, Steuern",
             "weight":11,
             "required":[
                293111,
                293112,
                293113
             ]
          },
          "293120":{
             "name":"Grundlagen des Management",
             "weight":9,
             "required":[
                293121,
                293122
             ]
          },
          "293130":{
             "name":"Strategisches und Internationales Management",
             "weight":11,
             "required":[
                293131,
                293132
             ]
          },
          "293140":{
             "name":"Management Skills",
             "weight":6,
             "required":[
                293141
             ]
          },
          "293150":{
             "name":"Marketing 2",
             "weight":6,
             "required":[
                293151,
                293152,
                293153
             ]
          },
          "293160":{
             "name":"Medien 2",
             "weight":8,
             "required":[
                293161,
                293162,
                293163
             ]
          },
          "293170":{
             "name":"Recht 2",
             "weight":7,
             "required":[
                293171,
                293172
             ]
          },
          "293180":{
             "name":"Wirtschaftsinformatik 2",
             "weight":6,
             "required":[
                293181
             ]
          },
          "293190":{
             "name":"Vertiefung Marketing und Medien 1",
             "weight":8,
             "required":[
                293191,
                293192
             ]
          },
          "293200":{
             "name":"Vertiefung Marketing und Medien 2",
             "weight":8,
             "required":[
                293201,
                293202
             ]
          },
          "293210":{
             "name":"Fremdsprachen 2",
             "weight":2,
             "required":[
                293211
             ]
          },
          "293300":{
             "name":"Vertiefung Marketing und Medien 3",
             "weight":8,
             "required":[
                293310,
                293320
             ]
          },
          "293400":{
             "name":"Wahlpflichtfach Marketing, Medien und Management",
             "weight":16,
             "required":[
                293401,
                293402,
                293403,
                293404,
                293405,
                293406,
                293407,
                293408,
                293409,
                293410,
                293411,
                293412,
                293413,
                293414,
                293415,
                293416,
                293417,
                293418,
                293419,
                293420,
                293421,
                293422,
                293423,
                293424,
                293425,
                293426,
                293427,
                293428,
                293429,
                293430,
                283431,
                293432,
                293434
             ]
          },
          "293500":{
             "name":"Bachelor Thesis",
             "weight":12,
             "required":[
                293500
             ]
          },
          "293510":{
             "name":"Mündliche Bachelorprüfung",
             "weight":2,
             "required":[
                295310
             ]
          }
       }

export const bm: SingleOption = {
    basics: bm_basic_data,
    examPackages: bm_examPackages,
    exams: bm_exams
}