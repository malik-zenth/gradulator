import { GradePackageAverage } from "../Components/Calculation/types";

// Basic Information about each degree
export interface BasicInformation {
    name: string,
    ects: number,
    weight: number,
    required_emphasis: number,
    emphasis: Emphasis[] | null
}

// used in BasicInformation - information about Emphasis
export interface Emphasis {
    ids: number[],
    name: string,
    weight: number,
    emphasisid: number
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
    ignored?: boolean
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
export interface DegreeOptions{
    [Key: string]: SingleOption
}


// single option
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

export interface CalculationResult{
    grade: number,
    bestAverage?: number,
    worstAverage?: number,
    singleGrades: GradePackageAverage[],
    requiredECTS: number,
    achivedECTS: number,
    requiredEmphasis: number,
    completedEmphasis: number,
    removedEmphasis: boolean,
    removedEmphasisName: string,
    observedWeight: number,
    overallWeight: number
}