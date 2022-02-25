import React, { createContext } from "react"
import { DropResult } from "react-beautiful-dnd"
import { ElevativeCreationType, ExamCreationType, ExamPackageCreationType, CreationContextType, GeneralInformationsCreationType, EmphasisCreationType} from "./types"

const initialState: CreationContextType = {
    updateElevative: (newElevative: ElevativeCreationType) => {},
    addElevative: (newExamPackage: ExamPackageCreationType) => {},
    deleteElevative: (key: string) => {},
    setEditElevative: (key: string) => {},
    saveAmountElevative: (amount: number, elevativeKey: string, optionKey: string ) => {},
    setEditElevativeOption: (elevativeKey: string, optionKey: string) => {},
    deleteElevativeOption: (elevativeKey: string, optionKey: string) => {},
    addElevativeOption: (key: string) => {},

    addEmphasis: () => {},
    updateEmphasis: (updatedEmphasis: EmphasisCreationType) => {},
    setEditEmphasis: (key: string) => {},
    deleteEmphasis: (key: string) => {},
    updateRequiredEmphasis: (key: string, required: string[]) => {},
    onDragEndEmphasis: (result: DropResult) => {},


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
    setEditBasics: () => {},

    basicInformations: {},
    exams: [],
    examPackages: [],
    elevatives: [],
    emphasis: []


}

export const CreatorContext = createContext(initialState)