// all types in here are subtypes of the once used for the data
// they are subtypes, because some party of the final object
// are not defined jet when creating them
// e.g. the required Exams inside of an ExamPackage are not defined jet

import { BasicInformation } from "../../Data/types";

// when the ExamPackage is created
export interface ExamCreationType{
    ects?: number,
    name?: string,
    weight?: number,
    examid?: number,
    semester?: number,
    editMode: boolean,
    key: string
}

export interface CreatedData{
    basicInformation?: GeneralInformationsCreationType,
    exams?: ExamCreationType[],
    examPackages?: ExamPackageCreationType[],
    elevatives?: ElevativeCreationType[],
    emphasis?: EmphasisCreationType[]
}

export interface ExamPackageCreationType{
    name?: string,
    weight?: number,
    examPackageID?: number,
    required: number[]
    editMode: boolean
}

export interface ElevativeCreationType{
    name?: string,
    amount?: number,
    exams: ExamCreationType[],
    weight?: number,
    editMode: boolean
}

export interface EmphasisCreationType{
    name?: string,
    weight?: number,
    options: EmphasisOptionsType[],
    editMode: boolean
}

export interface EmphasisOptionsType{
    examPackage?: ExamPackageCreationType,
    elevative?: ElevativeCreationType
}

export interface GeneralInformationsCreationType{
    name?: string,
    shortName?: string,
    amoundRequiredEmphasis?: number,
    amoundRequiredElevative?:number,
    spo?: number,
    editMode: boolean
}

export interface CreationType{
    generalInformation: GeneralInformationsCreationType,
    emphasis?: EmphasisCreationType[],
    elevatives?: ElevativeCreationType[],
    examPackages: ExamPackageCreationType[]
}
