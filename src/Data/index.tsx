import { DegreeOptions } from "./types";
import {win} from "./win"
import {mid} from "./mid"
import {mwi} from "./mwi"
import { vb } from "./vb";
import { bu } from "./bu";

export const options: DegreeOptions = {
    //"Verkehrsbetriebswirtschaft und Logistik": vb,
    "Wirtschaftsinformatik": win,
    "Wirtschaftsinformatik - Informationsmanagement und Data Science": mid,
    "Wirtschaftsinformatik - Digitale Transformation": mwi,
    "Betriebswirtschaft und Unternehmensführung": bu
}
