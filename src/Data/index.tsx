import { DegreeOption } from "./types";
import {win} from "./win"
import {mid} from "./mid"
import {mwi} from "./mwi"
import { vb } from "./vb";
import { bu } from "./bu";
import { vb_pv } from "./vb-pv"
import {mu} from "./mu"
import {mtl} from "./mtl"
import {tmb} from "./tmb"

export const options: DegreeOption[] = [
    {
        data: bu,
        shortName: "BU",
        longName: "Betriebswirtschaft und Unternehmensführung"
    },
    {
        data: mu,
        shortName: "MU",
        longName: "Master in Unternehmensführung"
    },
    {
        data: vb,
        shortName: "VB",
        longName: "Verkehrsbetriebswirtschaft und Logistik"
    },
    {
        data: vb_pv,
        shortName: "VB-PV",
        longName: "Verkehrsbetriebswirtschaft und Personenverkehr"
    },
    {
        data: mtl,
        shortName: "MTL",
        longName: "Master in Transport und Logistik Management"
    },
    {
        data: tmb,
        shortName: "TMB",
        longName: "Tourismusmanagement"
    },
    {
        data: win,
        shortName: "WIN",
        longName: "Wirtschaftsinformatik"
    },
    {
        data: mid,
        shortName: "MID",
        longName: "Wirtschaftsinformatik - Informationsmanagement und Data Science"
    },
    {
        data: mwi,
        shortName: "MWI",
        longName: "Wirtschaftsinformatik - Digitale Transformation"
    }
]

// map name to display name
export function mapName(text: string): string{
    if(text === "Wirtschaftsinformatik") return "WIN"
    else if(text.includes("Wirtschaftsinformatik") && text.includes("Informationsmanagement")){
        return "MID"
    }
    else if(text.includes("Wirtschaftsinformatik") && text.includes("Digitale")){
        return "MWI"
    }
    else if(text.includes("Master in Transport")){
        return "MTL"
    }
    else if(text.includes("Betriebswirtschaft und Unter")){
        return "BU"
    }
    else if(text.includes("Verkehrsbetriebswirtschaft und P")){
        return "VB-PV"
    }
    else if(text.includes("Verkehrsbetriebswirtschaft und L")){
        return "VB"
    }
    else{
        return text
        }
}

// order options by ShortName
export function orderDegreesbyShortName(degreeOptions: DegreeOption[]): DegreeOption[]{
    return degreeOptions.sort((a,b) => (a.shortName > b.shortName) ? 1 : ((b.shortName > a.shortName) ? -1 : 0))
}

// order options by LongName
export function orderDegreesbyLongName(degreeOptions: DegreeOption[]): DegreeOption[]{
    return degreeOptions.sort((a,b) => (a.longName > b.longName) ? 1 : ((b.longName > a.longName) ? -1 : 0))
}

// get Data by longName or shortName
export function getDegreeByName(name: string): DegreeOption{
    const degreeOption: DegreeOption[] = options.filter(single => single.longName == name || single.shortName == name)
    try{
        return degreeOption[0]
    }catch{
        console.warn("Cannot find DegreeOption for Input")
    }
}

// validate long Name
export function validateName(name: string): Boolean{
    const degreeOption: DegreeOption[] = options.filter(single => single.longName == name || single.shortName == name)
    if(degreeOption.length) return true
    else return false
}

