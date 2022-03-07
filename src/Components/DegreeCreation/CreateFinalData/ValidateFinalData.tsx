import React, { useState } from "react"
import { AlternativeElectives, BasicInformation, DegreeOption, Electives, Emphasis, ExamPackages, Exams, SingleOption } from "../../../Data/types"
import { ElevativeCreationType, ElevativeOptionType, EmphasisCreationType, ExamCreationType, ExamPackageCreationType, GeneralInformationsCreationType, SemesterChoiseType } from "../types"

interface iProps {
    exams: ExamCreationType[],
    emphasis: EmphasisCreationType[],
    elevatives: ElevativeCreationType[],
    examPackages: ExamPackageCreationType[],
    basicInformations: GeneralInformationsCreationType,
    semesterChoises: SemesterChoiseType[]
}

export interface validateDataProps {
    valid: boolean,
    errors: string[]
}

export const validateFinaleData = (props: iProps): validateDataProps => {
    const { basicInformations, exams, examPackages, elevatives, emphasis, semesterChoises } = props
    let dataIsValid: boolean = true
    const errorsInData: string[] = []

    // check is all Exam IDs are unique
    exams.forEach(first => {
        exams.forEach(second => {
            if (first.examid === second.examid && first.key != second.key) {
                dataIsValid = false
                errorsInData.push(`Prüfungsnummer ${first.examid} der Prüfung ${first.name} ist doppelt vergeben!`)
            }
        })
    })

    // check if all ExamPackage and Elevative IDs are unique
    examPackages.forEach(first => {
        examPackages.forEach(second => {
            if (first.examPackageID === second.examPackageID && first.key != second.key) {
                dataIsValid = false
                errorsInData.push(`Prüfungsnummer ${first.examPackageID} der Modulprüfung ${first.name} ist doppelt vergeben!`)
            }
        })
        elevatives.forEach(second => {
            if (first.examPackageID === second.examPackageID && first.key != second.key) {
                dataIsValid = false
                errorsInData.push(`Prüfungsnummer ${first.examPackageID} der Modulprüfung ${first.name} ist doppelt vergeben!`)
            }
        })
    })
    elevatives.forEach(first => {
        examPackages.forEach(second => {
            if (first.examPackageID === second.examPackageID && first.key != second.key) {
                dataIsValid = false
                errorsInData.push(`Prüfungsnummer ${first.examPackageID} des Wahlfachs ${first.name} ist doppelt vergeben!`)
            }
        })
        elevatives.forEach(second => {
            if (first.examPackageID === second.examPackageID && first.key != second.key) {
                dataIsValid = false
                errorsInData.push(`Prüfungsnummer ${first.examPackageID} des Wahlfachs ${first.name} ist doppelt vergeben!`)
            }
        })
    })

    // check if every Elevative Option is non empty and has the length of required options
    elevatives.forEach(single => {
        single.options.forEach(opt => {
            if(opt.required > opt.ids.length){
                dataIsValid = false
                errorsInData.push(`Wahlfach ${single.name} benötigt ${opt.required} Prüfungen, es sind aber nur ${opt.ids.length} Optionen verfügbar`)
            }
            else if(opt.ids.length === 0){
                dataIsValid = false
                errorsInData.push(`Wahlfach ${single.name} hat eine leere Option`)
            }
        })
        if(single.options.length === 0){
            dataIsValid = false
            errorsInData.push(`Wahlfach ${single.name} hat keine Optionen dieses zu erfüllen`)
        }
    })


    // check if every Emphasis is non empty
    emphasis.forEach(single => {
        if(single.required.length === 0){
            dataIsValid = false
            errorsInData.push(`Einem Schwerpunkt sind keine Modulprüfungen zugeordnet`)
        }
    })

    // check is amount Emphasis is equal / larger than required Emphasis
    if(emphasis.length < basicInformations.amoundRequiredEmphasis){
        dataIsValid = false
        errorsInData.push(`Es werden mehr Schwerpunkte benötigt, als vorhanden sind`)
    }

    return { valid: dataIsValid, errors: errorsInData }

}
