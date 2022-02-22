// all types in here are subtypes of the once used for the data
// they are subtypes, because some party of the final object
// are not defined jet when creating them
// e.g. the required Exams inside of an ExamPackage are not defined jet

// when the ExamPackage is created
export interface ExamCreationType{
    ects?: number,
    name?: string,
    weight?: number,
    examid?: number,
    semester?: number,
    editMode: boolean,
    key: string,
    index: number
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
    required: string[],
    editMode: boolean,
    key: string
}

export interface ElevativeCreationType{
    name?: string,
    examPackageID?: number,
    options: ElevativeOptionType[],
    weight?: number,
    unit?: string,
    key: string,
    editMode: boolean
}

export interface ElevativeOptionType{
    ids: string[],
    required: number,
    key: string
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
