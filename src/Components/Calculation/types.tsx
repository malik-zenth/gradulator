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
    completeness: string,
    gradePackageID: number,
    complete: boolean
}

export interface GradePackageAverage{
    name: string,
    weight: number,
    gradePackageID?: number,
    grade: number,
    bestPossibleGrade?:number,
    worstPossibleGrade?:number,
    incomplete?:boolean,
    completeness?:string,
    complete?:boolean,
    missing?:Exam[],
    completlyMissing?:string[]
}

export interface CaseReturn{
    caseGrade: number,
    caseAverage: GradePackageAverage[]
}