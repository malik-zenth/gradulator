import { DegreeOptions } from "./types";
import {win} from "./win"
import {mid} from "./mid"
import {mwi} from "./mwi"
import { vb } from "./vb";
import {mtl} from "./mtl"

export const options: DegreeOptions = {
    //"Verkehrsbetriebswirtschaft und Logistik": vb,
    "Master in Transport und Logistik Management": mtl,
    "Wirtschaftsinformatik": win,
    "Wirtschaftsinformatik - Informationsmanagement und Data Science": mid,
    "Wirtschaftsinformatik - Digitale Transformation": mwi
}

// map name to display name
export function mapName(text: string): string{
    if(text === "Wirtschaftsinformatik") return text
    else if(text.includes("Wirtschaftsinformatik") && text.includes("Informationsmanagement")){
        return "Wirtschaftsinformatik - Informationsmanagement und Data Science"
    }
    else if(text.includes("Wirtschaftsinformatik") && text.includes("Digitale")){
        return "Wirtschaftsinformatik - Digitale Transformation"
    }
    else if(text.includes("Master in Transport")){
        return "Master in Transport und Logistik Management"
    }
    else{
        return text
        }
    }
