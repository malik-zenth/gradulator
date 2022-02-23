import React, { createContext } from "react"
import { DropResult } from "react-beautiful-dnd"
import { ElevativeCreationType, ExamCreationType, ExamPackageCreationType, CreationContextType, GeneralInformationsCreationType} from "./types"

const initialState: CreationContextType = {
    updateElevative: (newElevative: ElevativeCreationType) => {},
    addElevative: (newExamPackage: ExamPackageCreationType) => {},
    deleteElevative: (key: string) => {},
    setEditElevative: (key: string) => {},
    saveAmountElevative: (amount: number, elevativeKey: string, optionKey: string ) => {},
    setEditElevativeOption: (elevativeKey: string, optionKey: string) => {},
    deleteElevativeOption: (elevativeKey: string, optionKey: string) => {},
    addElevativeOption: (key: string) => {},


    addExamPackage: () => {},
    updateExamPackage: (newExamPackage: ExamPackageCreationType) => {},
    deleteExamPackage: (key: string) => {},
    setEditExamPackage: (key: string) => {},
    updateRequiredExamPackage: (key: string, required: string[]) => {},
    removeExamFromRequired: (key: string) => {},
    onDragEndExamPackages: (result: DropResult) => {},
    onDragEndElevatives: (result: DropResult) => {},

    addExam: () => {},
    deleteExam: (key: string) => {},
    updateIndexExam: (key: string, index: number) => {},
    updateExam: (newExam: ExamCreationType) => {},
    setExamWeight: (weight: number, key: string) => {},
    setEditExam: (key: string) => {},

    setBasicInformations: (values: GeneralInformationsCreationType) => {},
    
    basicInformations: {},
    exams: [],
    examPackages: [],
    elevatives: []


}

export const CreatorContext = createContext(initialState)