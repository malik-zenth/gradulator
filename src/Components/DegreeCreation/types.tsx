// all types in here are subtypes of the once used for the data
// they are subtypes, because some party of the final object
// are not defined jet when creating them
// e.g. the required Exams inside of an ExamPackage are not defined jet
// when the ExamPackage is created
export interface ExamCreationType{
    ects?: number,
    name?: string,
    weight?: number,
    semester?: number,
    editMode: boolean
}

export interface CreatedPackages{
    examPackage?: ExamPackageCreationType,
    elevative?: ElevativeCreationType,
    emphasis?: EmphasisCreationType
}

export interface ExamPackageCreationType{
    name?: string,
    weight?: number,
    elevatives?: ElevativeCreationType[],
    exams: ExamCreationType[]
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
