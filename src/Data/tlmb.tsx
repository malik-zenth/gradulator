import { BasicInformation, ExamPackages, Exams, SingleOption } from "./types";

const tlmb_basic_Data: BasicInformation = {
          "name":"Technisches Logistikmanagement",
          "required_emphasis":0,
          "weight":120,
          "ects":108,
          "spo": 3,
          "emphasis":[
             
          ],
          "elevtive":[
             {
                "examid":381320,
                requiredEcts:4,
                "ids":[
                   381321,
                   381322,
                   381323,
                   381324,
                   381325,
                   381326
                ]
             }
          ],
          "beta":true
       }

const tlmb_exams: Exams = {
          "381101":{
             "ects":4,
             "semester":3,
             "name":"Steuerungs- und Regelungstechnik",
             "weight":2,
             "packageid":381100
          },
          "381102":{
             "ects":4,
             "semester":4,
             "name":"Angewandte Automatisierungstechnik",
             "weight":2,
             "packageid":381100
          },
          "381111":{
             "ects":6,
             "semester":3,
             "name":"Auslegung von Förder- und Umschlagtechnik",
             "weight":6,
             "packageid":381110
          },
          "381121":{
             "ects":6,
             "semester":3,
             "name":"Verpackung, Lager- und Kommissioniersysteme",
             "weight":6,
             "packageid":381120
          },
          "381133":{
             "ects":2,
             "semester":4,
             "name":"Logistikcontrolling",
             "weight":1,
             "packageid":381130
          },
          "381134":{
             "ects":6,
             "semester":3,
             "name":"Kosten- und Leistungrechnung",
             "weight":2,
             "packageid":381130
          },
          "381141":{
             "ects":4,
             "semester":3,
             "name":"Wirtschaftsrecht",
             "weight":4,
             "packageid":381140
          },
          "381152":{
             "ects":8,
             "semester":4,
             "name":"Betriebsorganisation",
             "weight":16,
             "packageid":381150
          },
          "381161":{
             "ects":6,
             "semester":4,
             "name":"Logistiksystemplanung mit Simulation",
             "weight":6,
             "packageid":381160
          },
          "381171":{
             "ects":2,
             "semester":4,
             "name":"Qualitäts- und Umweltmanagement",
             "weight":6,
             "packageid":381170
          },
          "381304":{
             "ects":6,
             "semester":6,
             "name":"Warenwirtschaftssysteme mit Datenbankanwendungen",
             "weight":4,
             "packageid":381300
          },
          "381303":{
             "ects":2,
             "semester":6,
             "name":"Supply-Chain-Management",
             "weight":1,
             "packageid":381300
          },
          "381311":{
             "ects":2,
             "semester":6,
             "name":"Ergonomie und Arbeitssicherheit",
             "weight":1,
             "packageid":381310
          },
          "381313":{
             "ects":8,
             "semester":6,
             "name":"Praktische Studien",
             "weight":4,
             "packageid":381310
          },
          "381321":{
             "ects":2,
             "weight": 2,
             "semester":6,
             "name":"Energieeffizienz in der Logistik",
             "packageid":381320
          },
          "381322":{
             "ects":2,
             "weight": 2,
             "semester":6,
             "name":"Logistik in der Automobilindustrie",
             "packageid":381320
          },
          "381323":{
             "ects":2,
             "weight": 2,
             "semester":6,
             "name":"Distributions- und Handelslogistik",
             "packageid":381320
          },
          "381324":{
             "ects":2,
             "weight": 2,
             "semester":6,
             "name":"Entsorgungslogistik",
             "packageid":381320
          },
          "381325":{
             "ects":2,
             "weight": 2,
             "semester":6,
             "name":"E-Business",
             "packageid":381320
          },
          "381326":{
             "ects":2,
             "weight": 2,
             "semester":6,
             "name":"Spezialgebiete der Logistik",
             "packageid":381320
          },
          "381331":{
             "ects":8,
             "semester":7,
             "name":"Angewandte Studien",
             "weight":2,
             "packageid":381330
          },
          "381333":{
             "ects":4,
             "semester":7,
             "name":"Führung",
             "weight":1,
             "packageid":381330
          },
          "381401":{
             "ects":12,
             "semester":7,
             "name":"Bachelor Thesis",
             "weight":14,
             "packageid":381400
          },
       }

const tlmb_examPackages: ExamPackages = {
          "381320":{
             "name":"Wahlmodul Logistik",
             "weight":4,
             "required":[
                381321,
                381322,
                381323,
                381324,
                381325,
                381326
             ]
          },
          "381100":{
             "name":"Automatisierungs- und Regelungstechnik",
             "weight":8,
             "required":[
                381101,
                381102
             ]
          },
          "381110":{
             "name":"Materialflusstechnik",
             "weight":6,
             "required":[
                381111
             ]
          },
          "381120":{
             "name":"Verpackung, Lagerung- und Kommissioniersysteme",
             "weight":6,
             "required":[
                381121
             ]
          },
          "381130":{
             "name":"Betriebliches Rechungswesen",
             "weight":8,
             "required":[
                381134,
                381133
             ]
          },
          "381140":{
             "name":"Recht",
             "weight":4,
             "required":[
                381141
             ]
          },
          "381150":{
             "name":"Betriebsorganisation für Ingenieure",
             "weight":16,
             "required":[
                381152
             ]
          },
          "381160":{
             "name":"Logistikplanung",
             "weight":6,
             "required":[
                381161
             ]
          },
          "381170":{
             "name":"Managementsysteme mit Fachenglisch",
             "weight":6,
             "required":[
                381171
             ]
          },
          "381300":{
             "name":"Informationstechnik und Vernetzung in der Logistik",
             "weight":10,
             "required":[
               381304,
                381303
             ]
          },
          "381310":{
             "name":"Veränderungsmanagement",
             "weight":16,
             "required":[
                381311,
                381313
             ]
          },
          "381330":{
             "name":"Transferkompetenz",
             "weight":16,
             "required":[
                381331,
                381333
             ]
          },
          "381400":{
             "name":"Bachelor Thesis",
             "weight":14,
             "required":[
                381401
             ]
          }
       }
 

export const tlmb: SingleOption={
     examPackages: tlmb_examPackages,
     exams: tlmb_exams,
     basics: tlmb_basic_Data
 }