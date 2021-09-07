import { Exams, UserInput, SingleOption, Electives, Exam, iElevativeSettupType, ElectivesWithOptions, NotCompletedElectives, AlternativeElectives } from "../../Data/types";
import { GradePackage, GradePackages, MissingElevtivesEmphasis, ElectiveOptionReturnType } from "./types"
import { sortGradePackageByGrade, cutGrade, sortUserInputByGrade } from "./helper";


const checkIfELevativeChoiceGradesAreGiven = (inputGrades: UserInput[], selectedOption: SingleOption): Boolean => {
    if (!selectedOption.basics.elevtive) return false
    if (selectedOption.basics.elevtive.some(single =>
        single.choiseID && inputGrades.some(grade =>
            single.ids && single.ids.includes(grade.examid) ||
            single.options && single.options.some(x => x.ids.includes(grade.examid))))) {
        return true
    }
    return false
}

const setupElevativeChoices = (inputGrades: UserInput[], selectedOption: SingleOption) => {
    // check if their are multiOptions, if so check if a grade for one of them is given
    if (checkIfELevativeChoiceGradesAreGiven(inputGrades, selectedOption)) {
        // do this for each choiseID
        const multiOptionElevatives = selectedOption.basics.elevtive.filter(single => single.choiseID)
        const choiseIds: iElevativeSettupType[] = multiOptionElevatives.map(single => {
            return { id: single.choiseID, multiOption: single.multiOption }
        })
        const uniqueChoiseIds = choiseIds.filter((single, index, self) => self.findIndex(value => value.id === single.id) === index)
        uniqueChoiseIds.map((single: iElevativeSettupType) => {
            if (!single.multiOption) {
                selectedOption = noMultiChoiseElevative(inputGrades, selectedOption, single.id)
            }
            else {
                selectedOption = multiChoiseElevatives(inputGrades, selectedOption, single.id)
            }
        })
    }
    // for some strange reason we need to deep-copy this in order to apply our changes
    // dont mind this, it is not beautiful, but it has taken me 1.5h to figure this out so I stick to this :D
    const newObject: SingleOption = JSON.parse(JSON.stringify(selectedOption))
    return {
        inputGrades: inputGrades,
        selectedOption: newObject
    }
}

// this is where the fancy elevatives stuff happens - this function is called, if their are elevatives with different exam options and we need to map them right
// e.g. Elevative 1 takes Exam A, B, C and Elevative 2 takes Exam B, C, D
const multiChoiseElevatives = (inputGrades: UserInput[], selectedOption: SingleOption, choiceID: number): SingleOption => {
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
        const amountExamsWithThisExamPackageID: number = Object.keys(selectedOption.exams).filter(key => selectedOption.exams[key].packageid === single.examid).length
        return {
            ...single,
            required: single.required - amountExamsWithThisExamPackageID
        }
    })
    // order by amount of options, start with the one with the least options
    const orderedElectivesWithOptions: ElectivesWithOptions[] = electivesWithTheirOptions.sort((a: ElectivesWithOptions, b: ElectivesWithOptions) => (a.inputGrades.length < b.inputGrades.length) ? 1 : ((b.inputGrades.length < a.inputGrades.length) ? -1 : 0)).reverse()
    // after we have sorted the grades, lets go over them and add them to the options
    orderedElectivesWithOptions.map((singleOption: ElectivesWithOptions) => {
        if (singleOption.options) {
            handleMultiChoiseOptionElectives(singleOption, usedExamIds, selectedOption, inputGrades)
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

const handleMultiChoiseOptionElectives = (singleOption: ElectivesWithOptions, usedExamIds: number[], selectedOption: SingleOption, inputGrades: UserInput[]) => {
    const notUsedExams: UserInput[] = singleOption.inputGrades.filter(single => !usedExamIds.includes(single.examid))
    // check if option is completed with given input
    const orderedInputGrades: UserInput[] = sortUserInputByGrade(notUsedExams)
    const singleOptionWithLeftRequired = singleOption.options.map(x => {
        return ({
            ...x,
            leftRequired: x.required,
            inputGrades: orderedInputGrades.filter(grade => x.ids.includes(grade.examid))
        })
    })
    singleOption.inputGrades.forEach(grade => {
        singleOptionWithLeftRequired.forEach(option => {
            if (option.ids.includes(grade.examid) && option.leftRequired != 0) {
                option.leftRequired -= 1
            }
        })
    })
    const completedOptions = singleOptionWithLeftRequired.filter(x => {
        if (x.leftRequired === 0 && !x.optionId) return true
        else if (x.leftRequired === 0 && !singleOptionWithLeftRequired.some(option => option.optionId === x.optionId && option.leftRequired != 0)) return true
        else return false
    })
    // exactly one completed Option, check if each Exam has the right packageID
    if (completedOptions.length === 1) {
        completedOptions[0].ids.forEach(id => {
            if (inputGrades[id] && !selectedOption.exams[id].packageid) {
                selectedOption.exams[id].packageid = singleOption.examid
                usedExamIds.push(id)
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
                    if (inputGrades[id] && !selectedOption.exams[id].packageid) {
                        selectedOption.exams[id].packageid = singleOption.examid
                        usedExamIds.push(id)
                    }
                })
            })
        }
        else {
            completedOptionsWithDefaultPackageID[0].ids.forEach(id => {
                if (inputGrades[id] && !selectedOption.exams[id].packageid) {
                    selectedOption.exams[id].packageid = singleOption.examid
                    usedExamIds.push(id)
                }
            })
        }
    }
    // no package is completed
    else if (completedOptions.length === 0) {
        // check if any option has any given grade
        const optionsWithInputGrade = singleOptionWithLeftRequired.filter(x => x.leftRequired != x.required)
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
                                selectedOption.exams[grade.examid].packageid = singleOption.examid
                            }
                        })
                    }
                })
            }
            else {
                sortedOptionsWithThisGradeAndParamOnlyThisID[0].inputGrades.forEach(grade => {
                    if (!selectedOption.exams[grade.examid].packageid) {
                        selectedOption.exams[grade.examid].packageid = singleOption.examid
                    }
                })
            }
        }
    }
}

// this is the easy way of elevatives - we have e.g. 9 exams of which the student has to complete 3
const noMultiChoiseElevative = (inputGrades: UserInput[], selectedOption: SingleOption, choiseId: number): SingleOption => {
    let possibleExamIds: number[] = []
    let requiredExams: number = 0
    // all the exam ids we need to map the inputGrades to
    const relevantExamIds: number[] = []
    selectedOption.basics.elevtive.forEach(single => {
        if (single.choiseID === choiseId) {
            possibleExamIds = possibleExamIds.concat(single.ids)
            requiredExams += single.required
            relevantExamIds.push(single.examid)
        }
    })
    // contains all electives thar are not completed
    let notCompletedExamIds: NotCompletedElectives[] = checkIfElevativeAlreadyComplete(relevantExamIds, selectedOption)
    const uniquePossibleExamIds: number[] = possibleExamIds.filter((value, index) => possibleExamIds.indexOf(value) === index)
    const sortedGradesElevatives: UserInput[] = sortUserInputByGrade(inputGrades)
    // check if their are more inputGrades than required - ignore all those exams that already have set packageIDs
    const relevantInputGrades = sortedGradesElevatives.filter(single => uniquePossibleExamIds.includes(single.examid) && !selectedOption.exams[single.examid].packageid)
    for (let i = 0; i < relevantInputGrades.length; i++) {
        notCompletedExamIds = notCompletedExamIds.filter(single => single.required > 0)
        if (notCompletedExamIds.length != 0) {
            selectedOption.exams[relevantInputGrades[i].examid].packageid = notCompletedExamIds[0].packageID
            notCompletedExamIds[0].required -= 1
        }
    }
    return selectedOption
}

// for each relevant ExamID, check if it is already completed
// return object containing id and number of still required exams, because it could be possible someone only orders one of two towards one exam package
const checkIfElevativeAlreadyComplete = (relevantExamIds: number[], selectedOption: SingleOption): NotCompletedElectives[] => {
    let notCompletedElevtives: NotCompletedElectives[] = relevantExamIds.map(single => {
        return (
            {
                packageID: single,
                required: selectedOption.basics.elevtive.filter(elev => elev.examid).map(value => value.required).shift()
            }
        )
    })
    const examsWithRelevantPackageID: string[] = Object.keys(selectedOption.exams).filter(key => relevantExamIds.includes(selectedOption.exams[key].packageid))
    examsWithRelevantPackageID.forEach(examid => {
        const packageId = selectedOption.exams[examid].packageid
        notCompletedElevtives = notCompletedElevtives.map(single => {
            if (packageId === single.packageID) {
                return ({
                    packageID: single.packageID,
                    required: single.required - 1
                })
            } else return single
        })
    })
    return notCompletedElevtives
}

// check which option for elective is the best - No MultiOption Support
const checkElevitveAlternative = (gradePackages: GradePackages, elective: Electives): ElectiveOptionReturnType => {
    // this is used if more exams than required are completed to remove those, that are more than required
    let relevantExamIDs: number[] = []

    const removedElevtive: GradePackage[] = []
    const sortedGradesElevatives: GradePackage[] = sortGradePackageByGrade(gradePackages[elective.examid])
    // we deep copy this in order to compare later and not edit default object
    let alternatives = elective.options.map(single => {
        return ({
            ...single,
            // we add param left required, so we can check later for % of completness
            leftRequired: single.required
        })
    })
    sortedGradesElevatives.forEach(gradePackage => {
        const intGrade: number = gradePackage.examID
        for (let i = 0; i < alternatives.length; i++) {
            if (alternatives[i].ids.includes(intGrade)) {
                alternatives[i].leftRequired = alternatives[i].leftRequired != 0 ? alternatives[i].leftRequired - 1 : 0
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
        sortedGradesElevatives.forEach(gradePackage => {
            if (!completedOptions[0].ids.includes(gradePackage.examID)) {
                removedElevtive.push(gradePackage)
            }
        })
        if (completedOptions[0].ids.length > completedOptions[0].required) {
            const examsForCompleted: GradePackage[] = sortedGradesElevatives.filter(single => completedOptions[0].ids.includes(single.examID))
            relevantExamIDs = examsForCompleted.slice(0, completedOptions[0].required).map(x => x.examID)
            removedElevtive.push(...examsForCompleted.slice(completedOptions[0].required, examsForCompleted.length))
        }else{
            const examsForCompleted: GradePackage[] = sortedGradesElevatives.filter(single => completedOptions[0].ids.includes(single.examID))
            relevantExamIDs = examsForCompleted.map(x => x.examID)
        }
    }
    // Option two -> None is completed (we take the one with the most %)
    else if (completedOptions.length === 0) {
        const sortedOptionsWithCompletness = alternatives.map(single => {
            return ({
                ...single,
                missing: single.leftRequired / single.required
            })
        }).sort((a, b) => a.missing < b.missing ? -1 : a.missing > b.missing ? 1 : 0)
        sortedGradesElevatives.forEach(gradePackage => {
            if (!sortedOptionsWithCompletness[0].ids.includes(gradePackage.examID)) {
                removedElevtive.push(gradePackage)
            }
        })
        sortedOptionsWithCompletness.forEach(x => {
            const gradesForThisPackage = sortedGradesElevatives.filter(grade => x.ids.includes(grade.examID))
            if (gradesForThisPackage.length > x.required) {
                removedElevtive.push(...gradesForThisPackage.slice(x.required, gradesForThisPackage.length))
            }
        })
        relevantExamIDs = sortedOptionsWithCompletness[0].ids
    }
    // Option three -> Multiple are completed (we take the one with the best grade)
    else if (completedOptions.length > 1) {
        const completedOptionsWithGrade = completedOptions.map((option) => {
            return ({
                ...option,
                grade: 0,
                weight: 0,
                leftRequired: option.required,
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
                    removedElevtive.push(gradePackage)
                }
            })
            completedOptionsWithOptionID.forEach(x => {
                if (x.ids.length > x.required) {
                    const examsForCompleted: GradePackage[] = sortedGradesElevatives.filter(single => x.ids.includes(single.examID))
                    relevantExamIDs.push(...examsForCompleted.slice(0, x.required).map(x => x.examID))
                    removedElevtive.push(...examsForCompleted.slice(x.required, examsForCompleted.length))
                }
            })
        }
        else {
            sortedGradesElevatives.forEach(gradePackage => {
                if (!completedOptionsWithGrade[0].ids.includes(gradePackage.examID)) {
                    removedElevtive.push(gradePackage)
                }
            })
            if (completedOptionsWithGrade[0].ids.length > completedOptionsWithGrade[0].required) {
                const examsForCompleted: GradePackage[] = sortedGradesElevatives.filter(single => completedOptionsWithGrade[0].ids.includes(single.examID))
                relevantExamIDs = examsForCompleted.slice(0, completedOptionsWithGrade[0].required).map(x => x.examID)
                removedElevtive.push(...examsForCompleted.slice(completedOptionsWithGrade[0].required, examsForCompleted.length))
            }
            else{
                const examsForCompleted: GradePackage[] = sortedGradesElevatives.filter(single => completedOptionsWithGrade[0].ids.includes(single.examID))
                relevantExamIDs = examsForCompleted.map(x => x.examID)
            }
        }
    }

    const newGradePackage = sortedGradesElevatives.filter(single => relevantExamIDs.includes(single.examID) && !removedElevtive.some(x => x.examID === single.examID))
    return {
        electiveToBeRemoved: removedElevtive,
        newGradePackage: newGradePackage
    }
}

const removeElevtiveGrades = (gradePackages: GradePackages, elevatives: Electives[], exams: Exams, inputGrades: UserInput[]) => {
    const removedElevtive: GradePackage[] = []
    const missingElevtiveGradesEmphasis: MissingElevtivesEmphasis = {}
    elevatives.map(single => {
        // if elevative has more than one way to be completed apply special logic
        if (gradePackages[single.examid] && single.options) {
            const { electiveToBeRemoved, newGradePackage } = checkElevitveAlternative(gradePackages, single)
            removedElevtive.push(...electiveToBeRemoved)
            gradePackages[single.examid] = newGradePackage
        }
        else if (gradePackages[single.examid] && single.required < gradePackages[single.examid].length) {
            // sort by Grade, so we can remove the worst grades in case someone has done more than required
            const sortedGradesElevatives: GradePackage[] = sortGradePackageByGrade(gradePackages[single.examid])
            // add all removed items to this list to display them on result page
            removedElevtive.push(...sortedGradesElevatives.slice(single.required, sortedGradesElevatives.length))
            // update inputGrades, remove the not required once
            gradePackages[single.examid] = sortedGradesElevatives.slice(0, single.required)
        }
        // if the Elevtive is part of an emphasis remove all grades and add their average
        if (gradePackages[single.examid] && single.emphasis_elevtive) {
            const elv_average: number = calculateElevtiveAverage(gradePackages[single.examid])
            const elv_data = exams[single.examid]
            const estimated: boolean = gradePackages[single.examid].map(single => {
                single.estimated
            }).length > 0
            // get amound of missing grades
            const amound_missing: number = gradePackages[single.examid].length < single.required ? single.required - gradePackages[single.examid].length : 0
            const exam_options_ids = single.ids.filter(id => {
                if (gradePackages[single.examid].filter(single => single.examID == id).length == 0) return id
            })
            const exams_options: Exam[] = exam_options_ids.map(single => exams[single])
            if (amound_missing > 0) {
                missingElevtiveGradesEmphasis[single.emphasisid] = {
                    amoundMissing: amound_missing,
                    exams: exams_options
                }
            }
            // if grade packages does not exist add it
            if (!gradePackages[elv_data.packageid]) {
                gradePackages[elv_data.packageid] = []
            }
            // add elevtive grade to gradePackages
            gradePackages[elv_data.packageid].push(
                {
                    grade: elv_average,
                    weight: elv_data.weight,
                    examID: single.examid,
                    estimated: estimated,
                }
            )
            // remove the grades that are part of the elevtive
            delete gradePackages[single.examid]
        }
    })
    // return all gradePackages we have removed. inputGrades is updated as well
    return {
        removedElevtive,
        missingElevtiveGradesEmphasis
    }
}

const calculateElevtiveAverage = (inputGrades: GradePackage[]) => {
    let grade = 0
    let weight = 0
    inputGrades.map(single => {
        grade += single.grade * single.weight
        weight += single.weight
    })
    return cutGrade(grade / weight)
}

export {
    setupElevativeChoices,
    removeElevtiveGrades
}