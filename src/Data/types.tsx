import { GradePackage, GradePackageAverage } from "../Components/Calculation/types";

// Basic Information about each degree
export interface BasicInformation {
    name: string,
    beta?: boolean,
    ects: number,
    spo?: number,
    weight: number,
    required_emphasis: number,
    emphasis: Emphasis[] | null,
    elevtive?: Electives[]

}

// used in BasicInformation - information about Emphasis
export interface Emphasis {
    ids: number[],
    name: string,
    weight: number,
    emphasisid: number,
}

// BasicInformation about Elevtives
export interface Electives {
    ids: number[],
    required: number,
    examid: number,
    emphasisid?: number,
    emphasis_elevtive?: boolean
}

// all the exams the degree has
export interface Exams{
    [key: number]: Exam
}

export interface Exam{
    semester: number,
    ects: number,
    weight: number,
    name: string,
    packageid: number,
    emphasisid?: number,
    ignored?: boolean,
}

// all the packages of exams the exams get turned into
export interface ExamPackages{
    [Key: number]: ExamPackage
}

export interface ExamPackage{
    name: string,
    weight: number,
    required: number[],
    ignored?: true
}

// object of all options
export interface DegreeOption{
    data: SingleOption,
    shortName: string,
    longName: string
}

// data for one option
export interface SingleOption{
    basics: BasicInformation,
    exams: Exams,
    examPackages: ExamPackages
}

// imput into calculation
export interface UserInput{
    examid: number,
    grade: number,
    status?: boolean
    estimated?: boolean
}

// output of the calculation
export interface CalculationResult{
    grade: number,
    bestAverage?: number,
    worstAverage?: number,
    singleGrades: GradePackageAverage[],
    requiredECTS: number,
    achivedECTS: number,
    requiredEmphasis?: number,
    completedEmphasis?: number,
    removedEmphasis?: boolean,
    removedEmphasisName?: string,
    observedWeight: number,
    overallWeight: number,
    removedElevtive?: GradePackage[]
}