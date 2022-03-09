import { BasicInformation, ExamPackages, Exams, SingleOption } from "./types";

const bel_basic_data: BasicInformation = {
          "name":"Business Engineering Logistics",
          "spo": 1,
          "required_emphasis":1,
          "weight":120,
          "ects":134,
          "emphasis":[
             {
                "ids":[
                   382161,
                   382162,
                   382163
                ],
                "name":"Technik + KI Lab",
                "weight":20,
                "emphasisid":0,
             },
             {
                "ids":[
                   382171,
                   382172,
                   382173,
                   382174,
                   382175
                ],
                "name":"Wirtschaft",
                "weight":20,
                "emphasisid":1,
             }
          ],
          "elevtive":[
             {
                "examid":382270,
                "required":2,
                "ids":[
                   382271,
                   382272,
                   382273,
                   382274
                ]
             }
          ],
          "semesterChoices":{},
          "beta":true
       }

const bel_exams: Exams = {
          "382111":{
             "ects":2.5,
             "name":"Prozessmodelierung",
             "weight":2.5,
             "semester":3,
             "packageid":382110
          },
          "382112":{
             "ects":2.5,
             "name":"Methodenworkshop",
             "weight":2.5,
             "semester":3,
             "packageid":382110
          },
          "382121":{
             "ects":5,
             "name":"Materialflusstechnik",
             "weight":5,
             "semester":3,
             "packageid":382120
          },
          "382131":{
             "ects":5,
             "name":"Betriebsorganisation für Ingenieure",
             "weight":5,
             "semester":3,
             "packageid":382130
          },
          "382141":{
             "ects":5,
             "name":"Datenbanken",
             "weight":5,
             "semester":3,
             "packageid":382140
          },
          "382151":{
             "ects":5,
             "name":"Statistik",
             "weight":5,
             "semester":3,
             "packageid":382150
          },
          "382161":{
             "ects":5,
             "name":"Automatisierungstechnik",
             "weight":5,
             "semester":3,
             "emphasisid":0,
             "packageid":382161
          },
          "382162":{
             "ects":5,
             "name":"Regelungstechnik",
             "weight":5,
             "semester":4,
             "emphasisid":0,
             "packageid":382162
          },
          "382163":{
             "ects":10,
             "name":"KI Lab",
             "weight":10,
             "semester":6,
             "emphasisid":0,
             "packageid":382163
          },
          "382171":{
             "ects":2.5,
             "name":"Logistic Operations Management",
             "weight":2.5,
             "semester":3,
             "emphasisid":1,
             "packageid":382171
          },
          "382172":{
             "ects":2.5,
             "weight": 2.5,
             "name":"Applied Logistic Operations",
             "semester":3,
             "emphasisid":1,
             "packageid":382172
          },
          "382173":{
             "ects":2.5,
             "name":"Logistikcontrolling",
             "weight":2.5,
             "semester":4,
             "emphasisid":1,
             "packageid":382173
          },
          "382174":{
             "ects":2.5,
             "name":"Supply-Chain-Management",
             "weight":2.5,
             "semester":4,
             "emphasisid":1,
             "packageid":382174
          },
          "382175":{
             "ects":10,
             "name":"Innovationsprojekte Wirtschaft",
             "weight":10,
             "semester":6,
             "emphasisid":1,
             "packageid":382175
          },
          "382181":{
             "ects":5,
             "name":"Datenanalyse und Grundlagen KI",
             "weight":5,
             "semester":4,
             "packageid":382180
          },
          "382191":{
             "ects":5,
             "name":"Logistiksystemplanung und Projektmanagement",
             "weight":5,
             "semester":4,
             "packageid":382190
          },
          "382201":{
             "ects":2.5,
             "name":"Produktionssysteme",
             "weight":2.5,
             "semester":4,
             "packageid":382200
          },
          "382202":{
             "ects":2.5,
             "name":"Ergonomie & Arbeitssicherheit",
             "weight":2.5,
             "semester":4,
             "packageid":382200
          },
          "382211":{
             "ects":5,
             "name":"Qualitäts- und Umwelt- und Energiemanagement, Nachhaltigkeit",
             "weight":5,
             "semester":4,
             "packageid":382210
          },
          "382221":{
             "ects":5,
             "name":"Wirtschaftsethik & Recht",
             "weight":5,
             "semester":4,
             "packageid":382220
          },
          "382241":{
             "ects":2.5,
             "name":"Unternehmenssoftware",
             "weight":2.5,
             "semester":6,
             "packageid":382240
          },
          "382242":{
             "ects":2.5,
             "name":"E-Business",
             "weight":2.5,
             "semester":6,
             "packageid":382240
          },
          "382251":{
             "ects":5,
             "name":"Warehouse Management Systems & Simulation",
             "weight":5,
             "semester":6,
             "packageid":382250
          },
          "382261":{
             "ects":5,
             "name":"Personalmanagement, Führung und Ethik",
             "weight":5,
             "semester":6,
             "packageid":382260
          },
          "382271":{
             "ects":2.5,
             "name":"Wahlmodul I (Technik)",
             "weight":2.5,
             "semester":6,
             "packageid":382270
          },
          "382272":{
             "ects":2.5,
             "name":"Wahlmodul I (Logistik)",
             "weight":2.5,
             "semester":6,
             "packageid":382270
          },
          "382273":{
             "ects":2.5,
             "name":"Wahlmodul II (Technik)",
             "weight":2.5,
             "semester":6,
             "packageid":382270
          },
          "382274":{
             "ects":2.5,
             "name":"Wahlmodul II (Logistik)",
             "weight":2.5,
             "semester":6,
             "packageid":382270
          },
          "382281":{
             "ects":9,
             "name":"Studienarbeit",
             "weight":12,
             "semester":7,
             "packageid":382280
          },
          "382301":{
             "ects":12,
             "name":"Bachelor Thesis",
             "weight":18,
             "semester":7,
             "packageid":382300
          },
       }


const bel_examPackages: ExamPackages = {
          "382110":{
             "name":"Methoden und Prozesse",
             "weight":5,
             "required":[
                382111,
                382112
             ]
          },
          "382120":{
             "name":"Materialflusstechnik",
             "weight":5,
             "required":[
                382121
             ]
          },
          "382130":{
             "name":"Betriebsorganisation",
             "weight":5,
             "required":[
                382131
             ]
          },
          "382140":{
             "name":"Datenbanken",
             "weight":5,
             "required":[
                382141
             ]
          },
          "382150":{
             "name":"Statistik",
             "weight":5,
             "required":[
                382151
             ]
          },
          "382161":{
             "name":"Automatisierungstechnik",
             "weight":5,
             "required":[
                382161
             ]
          },
          "382162":{
             "name":"Regelungstechnik",
             "weight":5,
             "required":[
                382162
             ]
          },
          "382163":{
             "name":"Technik + KI Lab",
             "weight":10,
             "required":[
                382163
             ]
          },
          "382171":{
             "name":"Logistic Operations Management",
             "weight":2.5,
             "required":[
                382171
             ]
          },
          "382172":{
             "name":"Applied Logistic Operations",
             "weight":2.5,
             "required":[
                382172
             ]
          },
          "382173":{
             "name":"Logistikcontrolling",
             "weight":2.5,
             "required":[
                382173
             ]
          },
          "382174":{
             "name":"Supply-Chain-Management",
             "weight":2.5,
             "required":[
                382174
             ]
          },
          "382175":{
             "name":"Innovationsprojekte",
             "weight":10,
             "required":[
                382175
             ]
          },
          "382180":{
             "name":"Data Analytics",
             "weight":5,
             "required":[
                382181
             ]
          },
          "382190":{
             "name":"Logistikplanung",
             "weight":5,
             "required":[
                382191
             ]
          },
          "382200":{
             "name":"Produktionssysteme und Ergonomie & Arbeitssicherheit",
             "weight":5,
             "required":[
                382201,
                382202
             ]
          },
          "382210":{
             "name":"Qualitäts- Umwelt- und Energiemanagement & Nachhaltigkeit",
             "weight":5,
             "required":[
                382211
             ]
          },
          "382220":{
             "name":"Wirtschaftsethik & Recht",
             "weight":5,
             "required":[
                382221
             ]
          },
          "382240":{
             "name":"Angewandte Informatik in der Logistik",
             "weight":5,
             "required":[
                382241,
                382242
             ]
          },
          "382250":{
             "name":"Warehouse Management Systems & Simulation",
             "weight":5,
             "required":[
                382251
             ]
          },
          "382260":{
             "name":"Personalmanagement & Führung",
             "weight":5,
             "required":[
                382261
             ]
          },
          "382270":{
             "name":"Wahlmodule Logistik und Technik",
             "weight":5,
             "required":[
                382271,
                382272,
                382273,
                382274
             ]
          },
          "382280":{
             "name":"Transferkompetenz",
             "weight":12,
             "required":[
                382281
             ]
          },
          "382300":{
             "name":"Abschlussarbeit",
             "weight":18,
             "required":[
                382301
             ]
          }
       }


export const bel: SingleOption = {
    basics: bel_basic_data,
    examPackages: bel_examPackages,
    exams: bel_exams
}