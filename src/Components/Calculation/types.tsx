import {Exam} from "../../Data/types";

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
    amoundMissing?:number,
    elevative?:boolean
}

export interface GradePackageAverage{
    name: string,
    weight: number,
    gradePackageID?: number,
    grade: number,
    bestPossibleGrade?:number,
    worstPossibleGrade?:number,
    incomplete?:boolean,
    completeness?:number,
    complete?:boolean,
    missing?:Exam[],
    elevative?: boolean,
    amoundMissing?:number
}

export interface CaseReturn{
    caseGrade: number,
    caseAverage: GradePackageAverage[]
}