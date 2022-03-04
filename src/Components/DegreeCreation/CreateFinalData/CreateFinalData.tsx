import { AlternativeElectives, BasicInformation, DegreeOption, Electives, Emphasis, ExamPackages, Exams, SingleOption } from "../../../Data/types"
import { ElevativeCreationType, ElevativeOptionType, EmphasisCreationType, ExamCreationType, ExamPackageCreationType, GeneralInformationsCreationType } from "../types"

interface iProps {
    exams: ExamCreationType[],
    emphasis: EmphasisCreationType[],
    elevatives: ElevativeCreationType[],
    examPackages: ExamPackageCreationType[],
    basicInformations: GeneralInformationsCreationType
}

export const createFinaleData = (props: iProps): DegreeOption => {
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
            // if there are no exams for this emphasis we dont need it
            if (examPackageIDsForKey.length != 0) {
                emphasisData.push({
                    ids: examPackageIDsForKey,
                    name: single.name,
                    weight: single.weight,
                    emphasisid: index,
                    multipleGrades: single.multiGrades
                })
            }
        })
        return emphasisData
    }

    const settupElevtive = (): Electives[] => {
        const electiveData: Electives[] = []
        elevatives.forEach((single: ElevativeCreationType) => {

            const emphasisElevative: boolean = emphasis.filter(x => x.required.includes(single.key)).length != 0

            if (single.options.length > 1) {

                const options: AlternativeElectives[] = single.options.map(opt => {
                    return {
                        ...single.unit === "ECTS" && { requiredEcts: opt.required },
                        ...single.unit != "ECTS" && { required: opt.required },
                        ids: exams.filter(x => opt.ids.includes(x.key)).map(x => x.examid),
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
                            if (JSON.stringify(elevOption.ids) != JSON.stringify(ownOption)) {
                                if (elevOption.ids.includes(ownOptionID)) {
                                    multiOption = true
                                }
                            }
                        })
                    })
                }))

                electiveData.push({
                    examid: single.examPackageID,
                    options,
                    ...multiOption && { multiOption },
                    ...emphasisElevative && { emphasis_elevtive: emphasisElevative },
                })
            }

            else {
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
                            if (JSON.stringify(elevOption.ids) != JSON.stringify(ownOption)) {
                                if (elevOption.ids.includes(ownOptionID)) {
                                    multiOption = true
                                }
                            }
                        })
                    })
                }))
                electiveData.push({
                    examid: single.examPackageID,
                    ...single.unit === "ECTS" && { requiredEcts: relevantOption.required },
                    ...single.unit != "ECTS" && { required: relevantOption.required },
                    ...multiOption && { multiOption },
                    ...emphasisElevative && { emphasis_elevtive: emphasisElevative },
                    ids: exams.filter(x => relevantOption.ids.includes(x.key)).map(x => x.examid),

                })
            }


        })


        return electiveData
    }

    const createExams = (basic_data: BasicInformation): Exams => {
        const examData: Exams = {}

        exams.forEach(exam => {

            const examPackagesWithThisExam: ExamPackageCreationType[] = examPackages.filter(x => x.required.includes(exam.key))
            const elevativesWithThisExam: ElevativeCreationType[] = elevatives.filter(elev => elev.options.filter(opt => opt.ids.includes(exam.key)).length != 0)

            const examPackageIDs: number[] = examPackagesWithThisExam.map(x => x.examPackageID)
            const elevativeIDs: number[] = elevativesWithThisExam.map(x => x.examPackageID)
            // all packages that require this exam
            const packageIDs: number[] = elevativeIDs.concat(examPackageIDs)
            // check if it is part of elevative
            const emphasisID: number = basic_data.emphasis.filter(x => examPackageIDs.some(value => x.ids.indexOf(value) >= 0)).map(x => x.emphasisid).shift()
            // if a exam is not used we dont need it
            examData[exam.examid] = {
                ects: exam.ects,
                semester: exam.semester,
                name: exam.name,
                weight: exam.weight,
                ...emphasisID != undefined && { emphasisid: emphasisID },
                ...packageIDs.length === 1 && { packageid: packageIDs[0] },
                ...packageIDs.length > 1 && { packageOptions: packageIDs },
                ...packageIDs.length === 0 && { ignored: true }
            }
        })

        return examData
    }

    const createExamPackages = (): ExamPackages => {
        const examPackageData: ExamPackages = {}
        examPackages.forEach(examPackage => {
            const examIdsForThisPackage: number[] = exams.filter(x => examPackage.required.includes(x.key)).map(x => x.examid)
            // if there are no exams for this examPackage we dont need to examPackage
            if (examIdsForThisPackage.length != 0) {
                examPackageData[examPackage.examPackageID] = {
                    name: examPackage.name,
                    weight: examPackage.weight,
                    required: examIdsForThisPackage
                }
            }
        })

        elevatives.forEach(elevative => {
            const elevativeKeys: string[] = []
            elevative.options.forEach(x => x.ids.forEach(id => elevativeKeys.push(id)))
            const examIdsForThisPackage: number[] = exams.filter(x => elevativeKeys.includes(x.key)).map(x => x.examid)
            // if there are no exams for this elevative we dont need to examPackage
            if (examIdsForThisPackage.length != 0) {
                examPackageData[elevative.examPackageID] = {
                    name: elevative.name,
                    weight: elevative.weight,
                    required: examIdsForThisPackage
                }
            }
        })

        return examPackageData
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

    const exam_data: Exams = createExams(basic_data)

    const exam_packages: ExamPackages = createExamPackages()

    const option: SingleOption = {
        basics: basic_data,
        exams: exam_data,
        examPackages: exam_packages
    }

    const degreeData: DegreeOption = {
        data: option,
        shortName: basicInformations.shortName,
        longName: basicInformations.name,
        facultyId: 0
    }

    return degreeData
}