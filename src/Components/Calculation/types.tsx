import {Exam, Exams} from "../../Data/types";

export interface GradePackages{
    [key: string]: GradePackage[]
}

export interface GradePackage{
    grade: number,
    weight: number,
    examID: number,
    estimated: boolean
}

export interface IncompletePackages{
    missing: Exam[]
    completeness: number,
    gradePackageID: number,
    complete: boolean,
    missingElevtiveGrades?: MissingElevtiveEmphasis
}

export interface GradePackageAverage{
    name: string,
    weight: number,
    gradePackageID?: number,
    grade: number,
    bestPossibleGrade?:number,
    worstPossibleGrade?:number,
    incomplete?:boolean,
    ids?: number[],
    completeness?:number,
    complete?:boolean,
    multiGrade?: boolean,
    missing?:Exam[],
    missingElevtiveGrades?: MissingElevtiveEmphasis
}

export interface ElectiveOptionReturnType{
    electiveToBeRemoved: GradePackage[],
    newGradePackage: GradePackage[]
}

export interface CaseReturn{
    caseGrade: number,
    caseAverage: GradePackageAverage[]
}

// Package containing all missing elevtives that are part of an emphasis
export interface MissingElevtivesEmphasis{
    [key: number]: MissingElevtiveEmphasis
}

// single missing package
export interface MissingElevtiveEmphasis{
    exams: Exam[],
    amoundMissing: number,
    missingECTS?: boolean
}