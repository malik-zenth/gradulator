import { DegreeOptions } from "./types";
import {win} from "./win"
import {mid} from "./mid"
import {mwi} from "./mwi"
import { vb } from "./vb";
import { bu } from "./bu";
import { vb_pv } from "./vb-pv"
import {mu} from "./mu"

export const options: DegreeOptions = {
    "Betriebswirtschaft und Unternehmensführung": bu,
    "Master in Unternehmensführung": mu,
    "Verkehrsbetriebswirtschaft und Logistik": vb,
    "Verkehrsbetriebswirtschaft und Personenverkehr": vb_pv,
    "Wirtschaftsinformatik": win,
    "Wirtschaftsinformatik - Informationsmanagement und Data Science": mid,
    "Wirtschaftsinformatik - Digitale Transformation": mwi,
}
