import { DegreeOption, FacultyOptions } from "./types";
import { win } from "./win"
import { mid } from "./mid"
import { mwi } from "./mwi"
import { vb } from "./vb";
import { bu } from "./bu";
import { vb_pv } from "./vb-pv"
import { mu } from "./mu"
import { mtl } from "./mtl"
import { tmb } from "./tmb"
import { hm } from "./hm";
import { mibim } from "./mibim";
import { ibisb } from "./ibisb";
import { wmm } from "./wmm"
import { mitm } from "./mitm";
import { nte } from "./nte";
import { mbb } from "./mbb"

export const faculties: FacultyOptions[] = [
    {
        longName: "Wirtschaft und Verkehr",
        shortName: "WV",
        facultyId: 1
    },
    {
        longName: "International Business",
        shortName: "IB",
        facultyId: 2
    },
    {
        longName: "Mechanik und Elektronik",
        shortName: "T1",
        facultyId: 3
    }
]

export const options: DegreeOption[] = [
    {
        data: bu,
        shortName: "BU",
        longName: "Betriebswirtschaft und Unternehmensführung",
        facultyId: 1
    },
    {
        data: mu,
        shortName: "MU",
        longName: "Master in Unternehmensführung",
        facultyId: 1
    },
    {
        data: vb,
        shortName: "VB",
        longName: "Verkehrsbetriebswirtschaft und Logistik",
        facultyId: 1
    },
    {
        data: vb_pv,
        shortName: "VB-PV",
        longName: "Verkehrsbetriebswirtschaft und Personenverkehr",
        facultyId: 1
    },
    {
        data: mtl,
        shortName: "MTL",
        longName: "Master in Transport und Logistik Management",
        facultyId: 1
    },
    {
        data: tmb,
        shortName: "TMB",
        longName: "Tourismusmanagement",
        facultyId: 2
    },
    {
        data: win,
        shortName: "WIN",
        longName: "Wirtschaftsinformatik",
        facultyId: 1
    },
    {
        data: mid,
        shortName: "MID",
        longName: "Wirtschaftsinformatik - Informationsmanagement und Data Science",
        facultyId: 1
    },
    {
        data: mwi,
        shortName: "MWI",
        longName: "Wirtschaftsinformatik - Digitale Transformation",
        facultyId: 1
    },
    {
        data: hm,
        shortName: "HM-B",
        longName: "Hotel- und Restaurantmanagement",
        facultyId: 2
    },
    {
        data: mibim,
        shortName: "MIBIM",
        longName: "International Business & Intercultural Management",
        facultyId: 2
    },
    {
        data: ibisb,
        shortName: "IBIS-B",
        longName: "Internationale Betriebswirtschaft - Interkulturelle Studien",
        facultyId: 2
    },
    {
        data: wmm,
        shortName: "WMM",
        longName: "Weinmarketing und Management",
        facultyId: 2
    },
    {
        data: mitm,
        shortName: "MITM",
        longName: "International Tourim Management",
        facultyId: 2
    },
    {
        data: nte,
        shortName: "NTE",
        longName: "Nachhaltige Tourismusentwicklung",
        facultyId: 2
    },
    {
        data: mbb,
        shortName: "MB-B",
        longName: "Bachelorstudiengang Maschinenbau",
        facultyId: 3
    }
]

// map name to display name
export function mapName(text: string): string {
    if (text === "Wirtschaftsinformatik") return "WIN"
    else if (text.includes("Wirtschaftsinformatik") && text.includes("Informationsmanagement")) {
        return "MID"
    }
    else if (text.includes("Wirtschaftsinformatik") && text.includes("Digitale")) {
        return "MWI"
    }
    else if (text.includes("Master in Transport")) {
        return "MTL"
    }
    else if (text.includes("Betriebswirtschaft und Unter")) {
        return "BU"
    }
    else if (text.includes("Verkehrsbetriebswirtschaft und P")) {
        return "VB-PV"
    }
    else if (text.includes("Verkehrsbetriebswirtschaft und L")) {
        return "VB"
    }
    else if (text.includes("Tourismus")) {
        return "TMB"
    }
    else if (text.includes("Hotel-")) {
        return "HM-B"
    }
    else if (text.includes("International Bu")) {
        return "MIBIM"
    }
    else if (text.includes("International Bet")) {
        return "IBIS-B"
    }
    else if (text.includes("Weinmarketing")) {
        return "WMM"
    }
    else if (text.includes("International Tou")) {
        return "MITM"
    }
    else if (text.includes("Nachhaltige Tou")) {
        return "NTE"
    }
    else if (text.includes("Maschinenbau")) {
        return "MB-B"
    }
    else {
        return text
    }
}

// order options by ShortName
export function orderDegreesbyShortName(degreeOptions: DegreeOption[]): DegreeOption[] {
    return degreeOptions.sort((a, b) => (a.shortName > b.shortName) ? 1 : ((b.shortName > a.shortName) ? -1 : 0))
}

// order options by LongName
export function orderDegreesbyLongName(degreeOptions: DegreeOption[]): DegreeOption[] {
    return degreeOptions.sort((a, b) => (a.longName > b.longName) ? 1 : ((b.longName > a.longName) ? -1 : 0))
}

// get Data by longName or shortName
export function getDegreeByName(name: string): DegreeOption {
    const degreeOption: DegreeOption[] = options.filter(single => single.longName == name || single.shortName == name)
    try {
        return degreeOption[0]
    } catch {
        console.warn("Cannot find DegreeOption for Input")
    }
}

// validate long Name
export function validateName(name: string): Boolean {
    const degreeOption: DegreeOption[] = options.filter(single => single.longName == name || single.shortName == name)
    if (degreeOption.length) return true
    else return false
}

