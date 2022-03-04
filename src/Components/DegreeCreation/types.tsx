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
    semesterChoiseKey?: string,
    index: number
}

export interface CreatedData{
    basicInformation?: GeneralInformationsCreationType,
    exams?: ExamCreationType[],
    examPackages?: ExamPackageCreationType[],
    elevatives?: ElevativeCreationType[],
    emphasis?: EmphasisCreationType[],
    semesterChoises?: SemesterChoiseType[]
}

export interface ExamPackageCreationType{
    name?: string,
    weight?: number,
    examPackageID?: number,
    required: string[],
    editMode: boolean,
    key: string,
}

export interface ElevativeCreationType{
    name?: string,
    examPackageID?: number,
    options: ElevativeOptionType[],
    weight?: number,
    unit: string,
    key: string,
    editMode: boolean
}

export interface ElevativeOptionType{
    ids: string[],
    required: number,
    key: string,
    editMode: boolean
}

export interface EmphasisCreationType{
    name?: string,
    weight?: number,
    required: string[],
    key: string,
    multiGrades: boolean,
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
    spo?: number,
    editMode?: boolean
}

export interface CreationType{
    generalInformation: GeneralInformationsCreationType,
    emphasis?: EmphasisCreationType[],
    elevatives?: ElevativeCreationType[],
    examPackages: ExamPackageCreationType[]
}

export interface SemesterChoiseType{
    name?: string,
    key: string,
    editMode: boolean
}

export interface CreationContextType{
    updateElevative: Function,
    addElevative: Function,
    deleteElevative: Function,
    setEditElevative: Function,
    saveAmountElevative: Function,
    setEditElevativeOption: Function,
    addElevativeOption: Function,
    deleteElevativeOption: Function,
    
    addEmphasis: Function,
    updateEmphasis: Function,
    setEditEmphasis: Function,
    deleteEmphasis: Function,
    updateRequiredEmphasis: Function,
    onDragEndEmphasis: Function,

    addExamPackage: Function,
    updateExamPackage: Function,
    deleteExamPackage: Function,
    setEditExamPackage: Function,
    updateRequiredExamPackage: Function,
    removeExamFromRequired: Function,
    resetEditExam: Function,

    onDragEndExamPackages: Function,
    onDragEndElevatives: Function,

    addExam: Function,
    deleteExam: Function,
    updateIndexExam: Function,
    updateExam: Function,
    setExamWeight: Function,
    setEditExam: Function,

    setBasicInformations: Function,
    setEditBasics: Function,

    addSemesterChoise:  Function,
    updateSemesterChoise: Function,
    deleteSemesterChoise: Function,
    setEditSemesterChoise: Function,
    resetEditSemesterChoise: Function,

    semesterChoises: SemesterChoiseType[],
    basicInformations: GeneralInformationsCreationType,
    exams: ExamCreationType[],
    examPackages: ExamPackageCreationType[],
    elevatives: ElevativeCreationType[],
    emphasis: EmphasisCreationType[]
}
