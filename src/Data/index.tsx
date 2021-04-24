import { DegreeOptions } from "./types";
import {win} from "./win"
import {mid} from "./mid"
import {mwi} from "./mwi"
import { vb } from "./vb";
import { bu } from "./bu";
import { vb_pv } from "./vb-pv"

export const options: DegreeOptions = {
    //"Verkehrsbetriebswirtschaft und Logistik": vb,
    "Wirtschaftsinformatik": win,
    "Wirtschaftsinformatik - Informationsmanagement und Data Science": mid,
    "Wirtschaftsinformatik - Digitale Transformation": mwi,
    "Betriebswirtschaft und Unternehmensführung": bu,
    "Verkehrsbetriebswirtschaft und Personenverkehr": vb_pv
}
