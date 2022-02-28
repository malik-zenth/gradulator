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
                const firstOption = single.options[0]
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
            const examID: string = exams.filter(ex => ex.key === id).map(x => x.key)[0]
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
        elevatives.forEach((single: ElevativeCreationType) => {
            if(single.options.length > 1){

                const options: AlternativeElectives[] = single.options.map(opt => {
                    return{
                        ...single.unit === "ECTS" && {requiredECTS: opt.required},
                        ...single.unit != "ECTS" && {required: opt.required},
                        ids: exams.filter(x => opt.ids.includes(x.key)).map(x => x.examid)
                    }
                }) 

                const ownIdsElevative: string[][] = single.options.map(opt => opt.ids.map(id => {
                    const examID: string = exams.filter(ex => ex.key === id).map(x => x.key)[0]
                    return examID
                }))
                let multiOption: boolean
                // check if any of the own ids is used somewhere else, if so set multi option true
                ownIdsElevative.forEach(ownOption => ownOption.forEach(ownOptionID => {
                    elevatives.forEach(elev => {
                        elev.options.forEach(elevOption => {
                            // remember: if both are the same multiOption true is not required
                            if(JSON.stringify(elevOption.ids) != JSON.stringify(ownOption)){
                                if(elevOption.ids.includes(ownOptionID)){
                                    multiOption = true
                                }
                            }
                        })
                    })
                }))

                electiveData.push({
                    examid: single.examPackageID,
                    options,
                    ...multiOption && {multiOption}
                })
            }
            
            else{
                const relevantOption: ElevativeOptionType = single.options[0]

                const ownIdsElevative: string[][] = single.options.map(opt => opt.ids.map(id => {
                    const examID: string = exams.filter(ex => ex.key === id).map(x => x.key)[0]
                    return examID
                }))
                let multiOption: boolean
                // check if any of the own ids is used somewhere else, if so set multi option true
                ownIdsElevative.forEach(ownOption => ownOption.forEach(ownOptionID => {
                    elevatives.forEach(elev => {
                        elev.options.forEach(elevOption => {
                            // remember: if both are the same multiOption true is not required
                            if(JSON.stringify(elevOption.ids) != JSON.stringify(ownOption)){
                                if(elevOption.ids.includes(ownOptionID)){
                                    multiOption = true
                                }
                            }
                        })
                    })
                }))
                electiveData.push({
                    examid: single.examPackageID,
                    ...single.unit === "ECTS" && {requiredECTS: relevantOption.required},
                    ...single.unit != "ECTS" && {required: relevantOption.required},
                    ...multiOption && {multiOption},
                    ids: exams.filter(x => relevantOption.ids.includes(x.key)).map(x => x.examid),
    
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