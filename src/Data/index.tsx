import { DegreeOptions } from "./types";
import {win} from "./win"
import {mid} from "./mid"
import {mwi} from "./mwi"
import { vb } from "./vb";
import { bu } from "./bu";
import { vb_pv } from "./vb-pv"
import {mu} from "./mu"
import {mtl} from "./mtl"

export const options: DegreeOptions = {
    "Betriebswirtschaft und Unternehmensführung": bu,
    "Master in Unternehmensführung": mu,
    "Verkehrsbetriebswirtschaft und Logistik": vb,
    "Verkehrsbetriebswirtschaft und Personenverkehr": vb_pv,
    "Master in Transport und Logistik Management": mtl,
    "Wirtschaftsinformatik": win,
    "Wirtschaftsinformatik - Informationsmanagement und Data Science": mid,
    "Wirtschaftsinformatik - Digitale Transformation": mwi,
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
