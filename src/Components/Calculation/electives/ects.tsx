import { Exams, UserInput, SingleOption, Electives, Exam, iElevativeSettupType, ElectivesWithOptions, NotCompletedElectives, AlternativeElectives, AlternativeElectivesWithLeftRequired } from "../../../Data/types";
import { GradePackage, GradePackages, MissingElevtivesEmphasis, ElectiveOptionReturnType } from "../types"
import { sortGradePackageByGrade, sortUserInputByGrade, calculateElevtiveAverage } from "../helper";

const handleMultiChoiseOptionElectivesECTS = (singleOption: ElectivesWithOptions, usedExamIds: number[], selectedOption: SingleOption, inputGrades: UserInput[]): number[] => {
    const notUsedExams: UserInput[] = singleOption.inputGrades.filter(single => !usedExamIds.includes(single.examid))
    const forThisUsedExamIds: number[] = []
    // check if option is completed with given input
    const orderedInputGrades: UserInput[] = sortUserInputByGrade(notUsedExams)
    const singleOptionWithCompletedECTS = singleOption.options.map(x => {
        return ({
            ...x,
            required: x.requiredECTS,
            completedECTS: 0,
            inputGrades: orderedInputGrades.filter(grade => x.ids.includes(grade.examid))
        })
    })
    singleOption.inputGrades.forEach(grade => {
        singleOptionWithCompletedECTS.forEach(option => {
            if (option.ids.includes(grade.examid) && !usedExamIds.includes(grade.examid)) {
                option.completedECTS += selectedOption.exams[grade.examid].ects
            }
        })
    })
    const completedOptions = singleOptionWithCompletedECTS.filter(x => {
        if (x.completedECTS >= x.required && !x.optionId) return true
        else if (x.completedECTS >= x.required && !singleOptionWithCompletedECTS.some(option => option.optionId === x.optionId && option.completedECTS >= option.required)) return true
        else return false
    })
    // exactly one completed Option, check if each Exam has the right packageID
    if (completedOptions.length === 1) {
        completedOptions[0].ids.forEach(id => {
            if (inputGrades.some(x => x.examid === id) && !selectedOption.exams[id].packageid) {
                selectedOption.exams[id].packageid = singleOption.examid
                forThisUsedExamIds.push(id)
            }
        })
    }
    // if more than one are completed
    else if (completedOptions.length > 1) {
        // we go through all completed Options and select the one with the most grades with packageID of this option
        let completedOptionsWithDefaultPackageID = completedOptions.map(option => {
            let amountWithThisPackageID = 0
            option.ids.forEach(id => {
                if (selectedOption.exams[id].packageid === singleOption.examid) amountWithThisPackageID += 1
            })
            return ({
                ...option,
                amountGradesWithThisPackageID: amountWithThisPackageID
            })
        }).sort((a, b) => a.amountGradesWithThisPackageID > b.amountGradesWithThisPackageID ? -1 : a.amountGradesWithThisPackageID < b.amountGradesWithThisPackageID ? 1 : 0)

        if (completedOptionsWithDefaultPackageID[0].optionId) {
            const CompletedWithSameID = completedOptionsWithDefaultPackageID.filter(x => x.optionId === completedOptionsWithDefaultPackageID[0].optionId)
            CompletedWithSameID.forEach(option => {
                option.ids.forEach(id => {
                    if (inputGrades.some(x => x.examid === id) && !selectedOption.exams[id].packageid) {
                        selectedOption.exams[id].packageid = singleOption.examid
                        forThisUsedExamIds.push(id)
                    }
                })
            })
        }
        else {
            completedOptionsWithDefaultPackageID[0].ids.forEach(id => {
                if (inputGrades.some(x => x.examid === id) && !selectedOption.exams[id].packageid) {
                    selectedOption.exams[id].packageid = singleOption.examid
                    forThisUsedExamIds.push(id)
                }
            })
        }
    }
    // no package is completed
    else if (completedOptions.length === 0) {
        // check if any option has any given grade
        const optionsWithInputGrade = singleOptionWithCompletedECTS.filter(x => x.completedECTS != 0)
        // if their is no option with any grade their is no reason to do anything
        if (optionsWithInputGrade.length != 0) {
            // if their are more than one option check if any of them has only this packageID, if so take this
            const optionsWithThisGradeAndParamOnlyThisID = optionsWithInputGrade.map(x => {
                return ({ ...x, gradeWithOnlyThisID: 0 })
            })
            optionsWithThisGradeAndParamOnlyThisID.forEach(option => {
                option.inputGrades.map(inputgrade => {
                    if (selectedOption.exams[inputgrade.examid].packageid === singleOption.examid && !selectedOption.exams[inputgrade.examid].packageOptions) {
                        option.gradeWithOnlyThisID += 1
                    }
                })
            })
            const sortedOptionsWithThisGradeAndParamOnlyThisID = optionsWithThisGradeAndParamOnlyThisID.sort(
                (a, b) => a.gradeWithOnlyThisID < b.gradeWithOnlyThisID ? -1 : a.gradeWithOnlyThisID > b.gradeWithOnlyThisID ? 1 : 0)
            // for the option with most Exams with only this PackageID add the PackageID
            // if is has an option id - do so for each option with this id
            if (sortedOptionsWithThisGradeAndParamOnlyThisID[0].optionId) {
                sortedOptionsWithThisGradeAndParamOnlyThisID.forEach(option => {
                    if (sortedOptionsWithThisGradeAndParamOnlyThisID[0].optionId === option.optionId) {
                        option.inputGrades.forEach(grade => {
                            if (!selectedOption.exams[grade.examid].packageid) {
                                forThisUsedExamIds.push(grade.examid)
                                selectedOption.exams[grade.examid].packageid = singleOption.examid
                            }
                        })
                    }
                })
            }
            else {
                sortedOptionsWithThisGradeAndParamOnlyThisID[0].inputGrades.forEach(grade => {
                    if (!selectedOption.exams[grade.examid].packageid) {
                        forThisUsedExamIds.push(grade.examid)
                        selectedOption.exams[grade.examid].packageid = singleOption.examid
                    }
                })
            }
        }
    }
    return forThisUsedExamIds
}
const checkIfElevativeAlreadyCompleteByECTS = (relevantExamIds: number[], selectedOption: SingleOption): NotCompletedElectives[] => {
    let notCompletedElevtives: NotCompletedElectives[] = relevantExamIds.map(single => {
        return (
            {
                packageID: single,
                required: selectedOption.basics.elevtive.filter(elev => elev.examid === single).map(value => value.requiredEcts).shift()
            }
        )
    })
    const examsWithRelevantPackageID: string[] = Object.keys(selectedOption.exams).filter(key => relevantExamIds.includes(selectedOption.exams[key].packageid))
    examsWithRelevantPackageID.forEach((examid: string) => {
        const packageId = selectedOption.exams[examid].packageid
        notCompletedElevtives = notCompletedElevtives.map((single: NotCompletedElectives) => {
            if (packageId === single.packageID) {
                return ({
                    packageID: single.packageID,
                    required: single.required - selectedOption.exams[examid].ects
                })
            } else return single
        })
    })
    return notCompletedElevtives
}

const electiveAlternativeNonCompletedECTS = (alternatives: AlternativeElectivesWithLeftRequired[], sortedGradesElevatives: GradePackage[], relevantExamIDs: number[]) => {
    const removedElevtive: GradePackage[] = []
    let takenOption: AlternativeElectivesWithLeftRequired
    const sortedOptionsWithCompletness = alternatives.map(single => {
        return ({
            ...single,
            missing: single.leftRequired / single.requiredECTS
        })
    }).sort((a, b) => a.missing < b.missing ? -1 : a.missing > b.missing ? 1 : 0)
    // check if first options have same completness, if so use the one with the best current average
    if (sortedOptionsWithCompletness.length > 1 && sortedOptionsWithCompletness[0].missing === sortedOptionsWithCompletness[1].missing) {
        const optionsWithSameCompletness = sortedOptionsWithCompletness.filter(x => x.missing === sortedOptionsWithCompletness[0].missing)
        const optionsWithSameCompletnessAndGrade = optionsWithSameCompletness.map(single => {
            return ({
                ...single,
                grade: calculateElevtiveAverage(sortedGradesElevatives.filter(grade => single.ids.includes(grade.examID)))
            })
        }).sort((a, b) => a.grade < b.grade ? -1 : a.grade > b.grade ? 1: 0)
        takenOption = optionsWithSameCompletnessAndGrade.shift()
    }else{
        // if first option has more completness than second use first
        takenOption = sortedOptionsWithCompletness.shift()
    }
    sortedGradesElevatives.forEach(gradePackage => {
        if (!takenOption.ids.includes(gradePackage.examID)) {
            removedElevtive.push(gradePackage)
        }
    })
    sortedOptionsWithCompletness.forEach(x => {
        const gradesForThisPackage = sortedGradesElevatives.filter(grade => x.ids.includes(grade.examID))
        if (gradesForThisPackage.length > x.requiredECTS) {
            removedElevtive.push(...gradesForThisPackage.slice(x.required, gradesForThisPackage.length))
        }
    })
    relevantExamIDs = takenOption.ids
    return ({
        removedElevtive, relevantExamIDs
    })
}

const electiveAlternativeOneCompletedECTS = (sortedGradesElevatives: GradePackage[], completedOptions: AlternativeElectives[], relevantExamIDs: number[], exams: Exams) => {
    const removedElevtive: GradePackage[] = []
    const relevantExamIdsThisAlternative: number[] = []
    sortedGradesElevatives.forEach(gradePackage => {
        if (!completedOptions[0].ids.includes(gradePackage.examID)) {
            removedElevtive.push(gradePackage)
        }
    })
    const examsForCompleted: GradePackage[] = sortedGradesElevatives.filter(single => completedOptions[0].ids.includes(single.examID))
    const achivedECTS = examsForCompleted.map(x => exams[x.examID].ects).reduce((a, b) => a+b,0)
    if (achivedECTS > completedOptions[0].requiredECTS) {
        let takenECTS = 0
        examsForCompleted.forEach(single => {
            if(completedOptions[0].requiredECTS > takenECTS){
                takenECTS +=exams[single.examID].ects
                relevantExamIdsThisAlternative.push(single.examID)
            }
            else{
                removedElevtive.push(single)
            }
        })
    } else {
        relevantExamIdsThisAlternative.push(...examsForCompleted.map(x => x.examID))
    }
    return ({
        relevantExamIdsThisAlternative, removedElevtive
    })
}

const electiveAlternativeMultipleCompletedECTS = (sortedGradesElevatives: GradePackage[], completedOptions: AlternativeElectives[], relevantExamIDs: number[], exams: Exams) => {
    const removedElective: GradePackage[] = []
    const removedExamIdsForThisAlternative: number[] = []
    const completedOptionsWithGrade = completedOptions.map((option) => {
        return ({
            ...option,
            grade: 0,
            weight: 0,
            leftRequired: option.requiredECTS,
            relevantIds: []
        }
        )
    })
    sortedGradesElevatives.forEach(gradePackage => {
        completedOptionsWithGrade.forEach((option) => {
            if (option.ids.includes(gradePackage.examID) && option.leftRequired != 0) {
                option.grade += gradePackage.weight * gradePackage.grade,
                    option.weight += gradePackage.weight,
                    option.leftRequired -= 1,
                    option.relevantIds.push(gradePackage.examID)
            }
        })
    })
    completedOptionsWithGrade.sort((a, b) => a.grade / a.weight < b.grade / b.weight ? -1 : a.grade / a.weight > b.grade / b.weight ? 1 : 0)
    // if best grade is one where multiple are required apply special logic
    if (completedOptionsWithGrade[0].optionId) {
        const optionID: number = completedOptionsWithGrade[0].optionId
        const completedOptionsWithOptionID = completedOptionsWithGrade.filter(x => x.optionId === optionID)
        sortedGradesElevatives.forEach(gradePackage => {
            if (!completedOptionsWithOptionID.some(x => x.ids.includes(gradePackage.examID))) {
                removedElective.push(gradePackage)
            }
        })
        completedOptionsWithOptionID.forEach(x => {
            const examsForCompleted: GradePackage[] = sortedGradesElevatives.filter(single => x.ids.includes(single.examID))
            let takenECTS = 0
            examsForCompleted.forEach(single => {
                if(completedOptions[0].requiredECTS > takenECTS){
                    takenECTS +=exams[single.examID].ects
                    removedExamIdsForThisAlternative.push(single.examID)
                }
                else{
                    removedElective.push(single)
                }
            })
        })
    }
    else {
        sortedGradesElevatives.forEach(gradePackage => {
            if (!completedOptionsWithGrade[0].ids.includes(gradePackage.examID)) {
                removedElective.push(gradePackage)
            }
        })
        const examsForCompleted: GradePackage[] = sortedGradesElevatives.filter(single => completedOptionsWithGrade[0].ids.includes(single.examID))
        let takenECTS = 0
        examsForCompleted.forEach(single => {
            if(completedOptions[0].requiredECTS > takenECTS){
                takenECTS +=exams[single.examID].ects
                removedExamIdsForThisAlternative.push(single.examID)
            }
            else{
                removedElective.push(single)
            }
        })
    }
    return ({
        removedExamIdsForThisAlternative, removedElective
    }
    )
}

const removeElectivesECTS = (gradePackages: GradePackages, elective: Electives, exams: Exams): ElectiveOptionReturnType=> {
    const sortedGradesElevatives: GradePackage[] = sortGradePackageByGrade(gradePackages[elective.examid])
    const completedECTS: number = sortedGradesElevatives.map(x => exams[x.examID].ects).reduce((a, b) => a + b, 0)
    // if their are more ects completed than required remove the worst grades
    if (completedECTS > elective.requiredEcts) {
        let takenECTS = 0
        const relevantExamIDS: number[] = []
        sortedGradesElevatives.forEach(grade => {
            if (elective.requiredEcts > takenECTS) {
                takenECTS += exams[grade.examID].ects
                relevantExamIDS.push(grade.examID)
            }
        })
        const removedElevtive: GradePackage[] = sortedGradesElevatives.filter(x => !relevantExamIDS.includes(x.examID))
        return {
            electiveToBeRemoved: removedElevtive,
            newGradePackage: sortedGradesElevatives.filter(x => relevantExamIDS.includes(x.examID))
        }
    }
    // if not do nothing
    return {
        electiveToBeRemoved: [],
        newGradePackage: sortedGradesElevatives
    }
}

// no Multi Choise with no amount required exams, but required ects
const noMultiChoiseElevativesECTS = (inputGrades: UserInput[], selectedOption: SingleOption, choiseId: number): SingleOption => {
    let possibleExamIds: number[] = []
    // all the exam ids we need to map the inputGrades to
    const relevantExamIds: number[] = []
    selectedOption.basics.elevtive.forEach(single => {
        if (single.choiseID === choiseId) {
            possibleExamIds = possibleExamIds.concat(single.ids)
            relevantExamIds.push(single.examid)
        }
    })
    let notCompletedExamIds: NotCompletedElectives[] = checkIfElevativeAlreadyCompleteByECTS(relevantExamIds, selectedOption)
    const uniquePossibleExamIds: number[] = possibleExamIds.filter((value, index) => possibleExamIds.indexOf(value) === index)
    const sortedGradesElevatives: UserInput[] = sortUserInputByGrade(inputGrades)
    const relevantInputGrades = sortedGradesElevatives.filter(single => uniquePossibleExamIds.includes(single.examid) && !selectedOption.exams[single.examid].packageid)
    for (let i = 0; i < relevantInputGrades.length; i++) {
        notCompletedExamIds = notCompletedExamIds.filter(single => single.required > 0)
        if (notCompletedExamIds.length != 0) {
            selectedOption.exams[relevantInputGrades[i].examid].packageid = notCompletedExamIds[0].packageID
            notCompletedExamIds[0].required -= selectedOption.exams[relevantInputGrades[i].examid].ects
        }
    }

    return selectedOption
}

const multiChoiseElevativesECTS = (inputGrades: UserInput[], selectedOption: SingleOption, choiceID: number): SingleOption => {
    const usedExamIds: number[] = []
    let fallbackPackageId: number
    const relevantElectives: Electives[] = selectedOption.basics.elevtive.filter(single => single.choiseID === choiceID)
    // now we have all those electives with any grades
    const electivesWithGrade: Electives[] = relevantElectives.filter(single => {
        if (single.ids && inputGrades.some(grade => single.ids.includes(grade.examid))) return true
        if (single.options && inputGrades.some(grade => single.options.some(x => x.ids.includes(grade.examid)))) return true
        return false
    })
    // now lets add all options to their electives
    let electivesWithTheirOptions: ElectivesWithOptions[] = electivesWithGrade.map((elective: Electives) => {
        return ({
            inputGrades: inputGrades.filter(grade => elective.ids && elective.ids.includes(grade.examid) || elective.options && elective.options.some(x => x.ids.includes(grade.examid))),
            ...elective
        })
    })
    // Update amount required
    electivesWithTheirOptions = electivesWithTheirOptions.map(single => {
        const achivedExams: number = Object.keys(selectedOption.exams).filter(key => selectedOption.exams[key].packageid === single.examid).length
        return {
            ...single,
            required: single.required - achivedExams
        }
    })
    // order by amount of options, start with the one with the least options
    const orderedElectivesWithOptions: ElectivesWithOptions[] = electivesWithTheirOptions.sort((a: ElectivesWithOptions, b: ElectivesWithOptions) => (a.inputGrades.length < b.inputGrades.length) ? 1 : ((b.inputGrades.length < a.inputGrades.length) ? -1 : 0)).reverse()
    // after we have sorted the grades, lets go over them and add them to the options
    orderedElectivesWithOptions.map((singleOption: ElectivesWithOptions) => {
        if (singleOption.options) {
            const ExamIdsToBeAdded: number[] =  handleMultiChoiseOptionElectivesECTS(singleOption, usedExamIds, selectedOption, inputGrades)
            usedExamIds.push(...ExamIdsToBeAdded)
        }
        else {
            const notUsedExams: UserInput[] = singleOption.inputGrades.filter(single => !usedExamIds.includes(single.examid) && !selectedOption.exams[single.examid].packageid)
            // if their is an exam left we have not used jet
            fallbackPackageId = singleOption.examid
            if (singleOption.required != 0) {
                if (notUsedExams.length >= singleOption.required) {
                    // we take the first elements, because they are ordered by grade
                    for (let i = 0; i < singleOption.required; i++) {
                        usedExamIds.push(notUsedExams[i].examid)
                        selectedOption.exams[notUsedExams[i].examid].packageid = singleOption.examid
                    }
                }
                else {
                    // if required is larger than one and some exams are finished
                    if (singleOption.required != 1 && notUsedExams.length < singleOption.required) {
                        for (let i = 0; i < notUsedExams.length; i++) {
                            usedExamIds.push(notUsedExams[i].examid)
                            selectedOption.exams[notUsedExams[i].examid].packageid = singleOption.examid
                        }
                    }
                }

            }
        }
    })
    const allExamIdsFromUserInput: number[] = inputGrades.map(single => single.examid)
    const notUsedExamIds = allExamIdsFromUserInput.filter(value => !usedExamIds.includes(value) && !selectedOption.exams[value].packageid)
    if (notUsedExamIds.length > 0) {
        // if all examPackages have been filled, but their are still exams left without an packageId
        // -> give them any packageId in order to prevent error -> they will be displayed as ignored grades
        notUsedExamIds.forEach(single => {
            selectedOption.exams[single].packageid = fallbackPackageId
        })
    }
    return selectedOption
}


const checkElevitveAlternativeECTS = (gradePackages: GradePackages, elective: Electives, exams: Exams): ElectiveOptionReturnType => {
    // this is used if more exams than required are completed to remove those, that are more than required
    let relevantExamIDs: number[] = []
    const removedElevtive: GradePackage[] = []
    const sortedGradesElevatives: GradePackage[] = sortGradePackageByGrade(gradePackages[elective.examid])
    let alternatives: AlternativeElectivesWithLeftRequired[] = elective.options.map(single => {
        return ({
            ...single,
            // we add param left required, so we can check later for % of completness
            leftRequired: single.requiredECTS
        })
    })
    sortedGradesElevatives.forEach(gradePackage => {
        const intGrade: number = gradePackage.examID
        for (let i = 0; i < alternatives.length; i++) {
            if (alternatives[i].ids.includes(intGrade)) {
                if(exams[intGrade].ects <= alternatives[i].leftRequired){
                    alternatives[i].leftRequired = alternatives[i].leftRequired - exams[intGrade].ects
                }
                else{
                    alternatives[i].leftRequired = 0
                }
            }
        }
    })
    let completedOptions: AlternativeElectives[] = alternatives.filter(single => single.leftRequired === 0)
    completedOptions = completedOptions.filter((single) => {
        if (!single.optionId) return true
        else if (alternatives.filter(x => x.optionId === single.optionId).length === completedOptions.filter(x => x.optionId === single.optionId).length) return true
        return false
    })
    // Option one -> only one is completed
    if (completedOptions.length === 1 && !completedOptions[0].optionId) {
        const returnValues = electiveAlternativeOneCompletedECTS(sortedGradesElevatives, completedOptions, relevantExamIDs, exams)
        relevantExamIDs = returnValues.relevantExamIdsThisAlternative
        removedElevtive.push(...returnValues.removedElevtive)
    }
    // Option two -> None is completed (we take the one with the most %)
    else if (completedOptions.length === 0) {
        const returnValues = electiveAlternativeNonCompletedECTS(alternatives, sortedGradesElevatives, relevantExamIDs)
        relevantExamIDs = returnValues.relevantExamIDs
        removedElevtive.push(...returnValues.removedElevtive)
    }
    // Option three -> Multiple are completed (we take the one with the best grade)
    else if (completedOptions.length > 1) {
        const returnValues = electiveAlternativeMultipleCompletedECTS(sortedGradesElevatives, completedOptions, relevantExamIDs, exams)
        relevantExamIDs = returnValues.removedExamIdsForThisAlternative
        removedElevtive.push(...returnValues.removedElective)
    }
    const newGradePackage = sortedGradesElevatives.filter(single => relevantExamIDs.includes(single.examID) && !removedElevtive.some(x => x.examID === single.examID))
    return { 
        electiveToBeRemoved: removedElevtive,
        newGradePackage: newGradePackage
    }
}

export{
    multiChoiseElevativesECTS,
    noMultiChoiseElevativesECTS,
    checkElevitveAlternativeECTS,
    removeElectivesECTS

}