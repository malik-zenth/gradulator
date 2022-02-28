import React, { useContext } from "react"
import { AlternativeElectives, BasicInformation, Electives, Emphasis, SingleOption } from "../../Data/types"
import { ElevativeCreationType, ElevativeOptionType, EmphasisCreationType, ExamCreationType, ExamPackageCreationType, GeneralInformationsCreationType } from "./types"

interface iProps {
    exams: ExamCreationType[],
    emphasis: EmphasisCreationType[],
    elevatives: ElevativeCreationType[],
    examPackages: ExamPackageCreationType[],
    basicInformations: GeneralInformationsCreationType
}

export const createFinaleData = (props: iProps) => {
    const { basicInformations, exams, examPackages, elevatives, emphasis } = props

    const calculateTotalWeight = (): number => {
        let totalWeight: number = 0
        // weight of all emphasis 
        if (emphasis && basicInformations.amoundRequiredEmphasis > 0) {
            const emphasisWeight: number[] = emphasis.map(x => x.weight)
            // asume all emphasis have the same weight - if not the input is wrong
            totalWeight += emphasisWeight.shift() * basicInformations.amoundRequiredEmphasis
        }

        if (elevatives) {
            const notUsedElevatives: ElevativeCreationType[] = elevatives.filter(single => emphasis.filter(x => x.required.includes(single.key)).length === 0)
            const elevaitveWeight: number = notUsedElevatives.map(x => x.weight).reduce((a, b) => a + b, 0)
            totalWeight += elevaitveWeight
        }
        const notUsedExamPackages: ExamPackageCreationType[] = examPackages.filter(single => emphasis.filter(x => x.required.includes(single.key)).length === 0)
        const weightOfNotUsedExamPackages = notUsedExamPackages.map(x => x.weight).reduce((a, b) => a + b, 0)
        totalWeight += weightOfNotUsedExamPackages
        return totalWeight
    }

    const calculateTotalECTS = (): number => {
        let totalEcts = 0
        // ECTS of all Elevatives
        if (elevatives) {
            const elevativeECTS: number[] = elevatives.map(single => {
                const firstOption = single.options.shift()
                const optionExams = exams.filter(x => firstOption.ids.includes(x.key))
                if (optionExams.length > firstOption.required) {
                    const reducedExams = optionExams.splice(0, firstOption.required)
                    const optionExamsECTS = reducedExams.map(x => x.ects).reduce((a, b) => a + b, 0)
                    return optionExamsECTS
                }
                else {
                    const optionExamsECTS = optionExams.map(x => x.ects).reduce((a, b) => a + b, 0)
                    return optionExamsECTS
                }
            })
            const totalElectiveECTS: number = elevativeECTS.reduce((a, b) => a + b, 0)
            totalEcts += totalElectiveECTS
        }
        // exams not used for elevatives
        const examIdsElevative: string[] = []
        elevatives.forEach(elev => elev.options.forEach(opt => opt.ids.forEach(id => {
            const examID: string = exams.filter(ex => ex.key === id).map(x => x.key).shift()
            examIdsElevative.push(examID)
        })))
        const notUsedExams = exams.filter(ex => !examIdsElevative.includes(ex.key))
        // add ECTS for all not used exams
        notUsedExams.forEach(ex => {
            totalEcts += ex.ects
        })
        // ECTS of all Elevatives
        return totalEcts
    }

    const settupEmphasis = (): Emphasis[] => {
        const emphasisData: Emphasis[] = []

        emphasis.forEach((single: EmphasisCreationType, index: number) => {
            const examPackageIDsForKey: number[] = examPackages.filter(x => single.required.includes(x.key)).map(x => x.examPackageID)

            emphasisData.push({
                ids: examPackageIDsForKey,
                name: single.name,
                weight: single.weight,
                emphasisid: index
            })
        })
        return emphasisData
    }

    const settupElevtive = (): Electives[] => {
        const electiveData: Electives[] = []
        elevatives.forEach((single: ElevativeCreationType, index: number) => {
            if(single.options.length > 1){

                const options: AlternativeElectives[] = single.options.map(opt => {
                    return{
                        ...single.unit === "ects" && {requiredECTS: opt.required},
                        ...single.unit != "ects" && {required: opt.required},
                        ids: exams.filter(x => opt.ids.includes(x.key)).map(x => x.examid)
                    }
                }) 

                electiveData.push({
                    examid: single.examPackageID,
                    options: options
                })
            }
            
            else{
                const relevantOption: ElevativeOptionType = single.options.shift()
                electiveData.push({
                    examid: single.examPackageID,
                    ...single.unit === "ects" && {requiredECTS: relevantOption.required},
                    ...single.unit != "ects" && {required: relevantOption.required},
                    ids: exams.filter(x => relevantOption.ids.includes(x.key)).map(x => x.examid)
    
                })
            }


        })


        return electiveData
    }

    const basic_data: BasicInformation = {
        name: basicInformations.name,
        required_emphasis: basicInformations.amoundRequiredEmphasis,
        weight: calculateTotalWeight(),
        ects: calculateTotalECTS(),
        emphasis: settupEmphasis(),
        elevtive: settupElevtive(),
        beta: true
    }


    console.log(basic_data)

    return true
}