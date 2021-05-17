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

export interface ExamPackageCreationType{
    name?: string,
    weight?: number,
    elevatives?: ElevativeCreationType[],
    exams: ExamCreationType[]
    editMode: boolean
}

export interface ElevativeCreationType{
    amound?: number,
    examOptions: ExamCreationType[],
    weight?: number,
    editMode: boolean
}

export interface EmphasisCreationType{
    name?: string,
    weight?: number,
    options: ExamPackageCreationType[],
    editMode: boolean
}

export interface GeneralInformationsCreationType{
    name: string,
    amoundRequiredEmphasis: number,
    spo?: number
}

export interface CreationType{
    generalInformation: GeneralInformationsCreationType,
    emphasis?: EmphasisCreationType[],
    elevatives?: ElevativeCreationType[],
    examPackages: ExamPackageCreationType[]
}