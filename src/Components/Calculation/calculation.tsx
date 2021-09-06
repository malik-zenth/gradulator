// calculate the average for given grades
import { ExamPackages, Exams, UserInput, SingleOption, Exam, Emphasis, BasicInformation, CalculationResult, Electives, iElevativeSettupType, ElectivesWithOptions, NotCompletedElectives, AlternativeElectives } from "../../Data/types";
import { GradePackage, GradePackages, IncompletePackages, GradePackageAverage, CaseReturn, MissingElevtiveEmphasis, MissingElevtivesEmphasis, ElectiveOptionReturnType } from "./types"


export const calculateData = (inputGrades: UserInput[], selectedOption: SingleOption): CalculationResult => {
    var bestCaseGrade: number
    var missingElevtiveGradesEmphasis: MissingElevtivesEmphasis
    var worstCaseGrade: number
    var removedElevtive: GradePackage[]
    // before doing anything else we need to check if selected option has elevatives with multiple options, if so set them up
    var { inputGrades, selectedOption } = setupElevativeChoices(inputGrades, selectedOption)
    // settup data in a way that all grades from one package are together
    const gradePackages: GradePackages = settupGradePackages(inputGrades, selectedOption.exams)
    // bevor calculating the averages remove not required elevative grades
    if (selectedOption.basics.elevtive) {
        var { removedElevtive, missingElevtiveGradesEmphasis } = removeElevtiveGrades(
            gradePackages, selectedOption.basics.elevtive, selectedOption.exams, inputGrades)
    }
    // check which packages are incomplete
    const incompletePackages: IncompletePackages[] = checkIncompletePackes(gradePackages, selectedOption.examPackages, selectedOption.exams, selectedOption.basics.elevtive, inputGrades)
    // calculate all achived ects
    const ects: number = calculateECTS(inputGrades, selectedOption.exams)
    // calculate the average for each package
    var average: GradePackageAverage[] = calculateAverages(gradePackages, selectedOption.examPackages)
    // if their are incomplete packages mark them
    if (incompletePackages) {
        average = addImcompleteTag(average, incompletePackages)
    }
    // calculate the average for all emphasis (if their are) and remove the single grades from our averages
    var { average, completedEmphasis, removedEmphasis, removedEmphasisName } = removeEmphasisGrades(
        average, selectedOption.basics.emphasis, selectedOption.basics.required_emphasis, selectedOption.examPackages, selectedOption.exams, missingElevtiveGradesEmphasis)
    // calculate the average grade
    const grade = calculateGrade(average)
    // add up all weight points
    const observedWeight = calculateObservedWeight(average)
    // check if their are any estimated grades
    const estimatedGrades = inputGrades.filter((x: UserInput) => x.estimated)
    // if so calculate average and grade for them with 1(best case) and 4(worst case)
    if (estimatedGrades.length > 0) {
        const worstCase = calculateCase(gradePackages, selectedOption.examPackages, selectedOption.basics, selectedOption.exams, 4)
        const bestCase = calculateCase(gradePackages, selectedOption.examPackages, selectedOption.basics, selectedOption.exams, 1)
        var bestCaseGrade = bestCase.caseGrade
        var worstCaseGrade = worstCase.caseGrade
        addCasesToPackages(average, worstCase.caseAverage, bestCase.caseAverage)
    }

    return {
        grade: grade,
        bestAverage: bestCaseGrade,
        worstAverage: worstCaseGrade,
        singleGrades: average,
        requiredECTS: selectedOption.basics.ects,
        achivedECTS: ects,
        observedWeight: observedWeight,
        overallWeight: selectedOption.basics.weight,
        requiredEmphasis: selectedOption.basics.required_emphasis,
        completedEmphasis: completedEmphasis,
        removedEmphasis: removedEmphasis,
        removedEmphasisName: removedEmphasisName,
        removedElevtive: removedElevtive
    }
}

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
            const notUsedExams: UserInput[] = singleOption.inputGrades.filter(single => !usedExamIds.includes(single.examid) && !selectedOption.exams[single.examid].packageid)
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
            if(completedOptions.length === 1){
                completedOptions[0].ids.forEach(id => {
                    if(inputGrades[id] && !selectedOption.exams[id].packageid){
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
                        if(selectedOption.exams[id].packageid === singleOption.examid) amountWithThisPackageID +=1
                    })
                    return({
                        ...option,
                        amountGradesWithThisPackageID: amountWithThisPackageID
                    })
                }).sort((a, b) => a.amountGradesWithThisPackageID > b.amountGradesWithThisPackageID ? -1 : a.amountGradesWithThisPackageID < b.amountGradesWithThisPackageID ? 1 : 0)

                if(completedOptionsWithDefaultPackageID[0].optionId){
                    const CompletedWithSameID = completedOptionsWithDefaultPackageID.filter(x => x.optionId === completedOptionsWithDefaultPackageID[0].optionId)
                    CompletedWithSameID.forEach(option => {
                        option.ids.forEach(id => {
                            if(inputGrades[id] && !selectedOption.exams[id].packageid){
                                selectedOption.exams[id].packageid = singleOption.examid
                                usedExamIds.push(id)
                            }
                        })
                    })
                }
                else{
                    completedOptionsWithDefaultPackageID[0].ids.forEach(id => {
                        if(inputGrades[id] && !selectedOption.exams[id].packageid){
                            selectedOption.exams[id].packageid = singleOption.examid
                            usedExamIds.push(id)
                        }
                    })
                }
            }
            // no package is completed
            else if(completedOptions.length === 0){
                // ORDER BY COMPLETNESS
                // TODO
                // set those for this package
            }
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
    const sortedGradesElevatives: GradePackage[] = sortElevtiveByGrade(gradePackages[elective.examid])
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
            if(gradesForThisPackage.length > x.required){
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
            const sortedGradesElevatives: GradePackage[] = sortElevtiveByGrade(gradePackages[single.examid])
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

// order Grade Package by Grade in order to remove those grades that are the worst
const sortElevtiveByGrade = (inputGrades: GradePackage[]): GradePackage[] => {
    return inputGrades.sort(function (a, b) {
        if (a.grade < b.grade) return -1;
        if (a.grade > b.grade) return 1;
        return 0;
    });
}

// order InputGrades by Grade in order to remove those grades that are the worst
const sortUserInputByGrade = (inputGrades: UserInput[]): UserInput[] => {
    return inputGrades.sort(function (a, b) {
        if (a.grade < b.grade) return -1;
        if (a.grade > b.grade) return 1;
        return 0;
    });
}

const calculateCase = (inputGrades: GradePackages, examPackages: ExamPackages, basicData: BasicInformation, exams: Exams, grade: number): CaseReturn => {
    const caseGradePackages = JSON.parse(JSON.stringify(inputGrades))
    Object.keys(caseGradePackages).forEach(single => {
        for (var index = 0; index < caseGradePackages[single].length; index++) {
            if (caseGradePackages[single][index].estimated) {
                caseGradePackages[single][index].grade = grade
            }
        }
    })
    const caseAverage = calculateAverages(caseGradePackages, examPackages)
    const { average } = removeEmphasisGrades(caseAverage, basicData.emphasis, basicData.required_emphasis, examPackages, exams)
    const caseGrade = calculateGrade(average)
    return {
        caseGrade,
        caseAverage: average
    }
}

const addCasesToPackages = (average: GradePackageAverage[], worstCase: GradePackageAverage[], bestCase: GradePackageAverage[]) => {
    for (var index = 0; index < average.length; index++) {
        // if any value (best or worst case is different from calculated grade display both)
        // this can be improved by adding sth. like a boolean tag to the worst and bestCase Packages and look after this
        if (worstCase[index].grade != average[index].grade || bestCase[index].grade != average[index].grade) {
            average[index].worstPossibleGrade = worstCase[index].grade
            average[index].bestPossibleGrade = bestCase[index].grade
        }
    }
}

const settupGradePackages = (inputGrades: UserInput[], examPackes: Exams): GradePackages => {
    const gradePackages: GradePackages = {}
    const usedGradePackages: number[] = []
    for (var index = 0; index < inputGrades.length; index++) {
        const gradePackageID: number = examPackes[inputGrades[index].examid].packageid
        // filter out all grades which are ignored
        if (!examPackes[inputGrades[index].examid].ignored) {
            if (usedGradePackages.includes(gradePackageID)) {
                gradePackages[gradePackageID].push({
                    grade: inputGrades[index].grade,
                    weight: examPackes[inputGrades[index].examid].weight,
                    examID: inputGrades[index].examid,
                    estimated: inputGrades[index].estimated
                })
            } else {
                usedGradePackages.push(gradePackageID)
                gradePackages[gradePackageID] = [{
                    grade: inputGrades[index].grade,
                    weight: examPackes[inputGrades[index].examid].weight,
                    examID: inputGrades[index].examid,
                    estimated: inputGrades[index].estimated
                }]
            }
        }
    }
    return gradePackages
}

const checkIncompletePackes = (inputPackages: GradePackages, gradePackages: ExamPackages, examData: Exams, elevative: Electives[], inputGrades: UserInput[]): IncompletePackages[] => {
    const incompletePackages: IncompletePackages[] = []
    Object.keys(inputPackages).forEach(singlePackage => {
        const exams = inputPackages[singlePackage].map((x: GradePackage) => x.examID)
        if (!compareArray(exams, gradePackages[singlePackage].required)) {
            const missingGrades = get_missing(gradePackages[singlePackage].required, exams).map(x => {
                return ({
                    ...examData[x],
                    examid: x
                })
            })
            var overallWeight: number = 0
            var overallMissing: number = 0
            gradePackages[singlePackage].required.map((x: number) => {
                overallWeight += examData[x].weight
            })
            missingGrades.map((x: Exam) => {
                overallMissing += x.weight
            })
            // if their are elevative grades check if current package is part of them, if so use other logik to detect completness
            if (!elevative || !elevative.map(x => x.examid).includes(parseInt(singlePackage))) {
                incompletePackages.push({
                    missing: missingGrades,
                    complete: false,
                    completeness: Math.round((1 - overallMissing / overallWeight) * 100),
                    gradePackageID: parseInt(singlePackage)
                })
            } else {
                const elevative_package: Electives[] = elevative.filter(x => x.examid == parseInt(singlePackage))
                // if elevative has multiple options use special logic to detect if something is missing
                if (elevative_package[0].options) {
                    let takenOption: AlternativeElectives
                    // find out which alternative is selected
                    const completedExams: number[] = inputPackages[singlePackage].map(x => x.examID)
                    elevative_package[0].options.forEach(option => {
                        if (option.ids.some(id => completedExams.includes(id))) takenOption = option
                    })
                    const completedFromTakenOption = inputPackages[singlePackage].filter((input) => takenOption.ids.includes(input.examID))
                    // if is is an option item apply special logic
                    if (takenOption && takenOption.optionId) {
                        const optionsWithSameOptionID = elevative_package[0].options.filter(x => x.optionId === takenOption.optionId).map(x => {
                            return ({
                                ...x,
                                leftRequired: x.required
                            })
                        })
                        completedExams.map(examID => {
                            optionsWithSameOptionID.forEach(option => {
                                if(option.leftRequired != 0 && option.ids.includes(examID)){
                                    option.leftRequired -=1
                                }
                            })
                        })
                        const notCompletedIds = optionsWithSameOptionID.filter(x => x.leftRequired != 0)
                        if(notCompletedIds.length != 0){
                            var achived_weight: number = 0
                            const completedWithSameOptionID = optionsWithSameOptionID.filter(x => x.leftRequired === 0)
                            const completedWeight = inputPackages[singlePackage].filter((input) => completedWithSameOptionID.some(x => x.ids.includes(input.examID))) 
                            completedWeight.map(x => {
                                achived_weight += x.weight
                            })
                            const missingIds: number[] = []
                            notCompletedIds.forEach(x => missingIds.push(...x.ids))
                            incompletePackages.push({
                                missingElevtiveGrades: {
                                    amoundMissing: notCompletedIds.map(x => x.leftRequired).reduce((a, b) => a+b, 0),
                                    exams: missingIds.map(x => examData[x])
                                },
                                missing: [],
                                complete: false,
                                completeness: Math.round((achived_weight / gradePackages[elevative_package[0].examid].weight) * 100),
                                gradePackageID: parseInt(singlePackage)
                            })
                        }
                    }
                    else if (takenOption && completedFromTakenOption.length < takenOption.required) {
                        const notCompletedFromTakenOption = takenOption.ids.filter(id => !inputPackages[singlePackage].some((x) => x.examID === id))
                        var achived_weight: number = 0
                        completedFromTakenOption.map(x => {
                            achived_weight += x.weight
                        })
                        const missingGradesElevative: Exam[] = []
                        Object.keys(examData).forEach((key) => notCompletedFromTakenOption.includes(parseInt(key)) && missingGradesElevative.push(examData[key]))
                        incompletePackages.push({
                            missingElevtiveGrades: {
                                amoundMissing: takenOption.required - completedFromTakenOption.length,
                                exams: missingGradesElevative
                            },
                            missing: [],
                            complete: false,
                            completeness: Math.round((achived_weight / gradePackages[elevative_package[0].examid].weight) * 100),
                            gradePackageID: parseInt(singlePackage)
                        })
                    }

                }

                // if their are missing packages, but the amound of required once is reached do nothing
                // if not, add this to incomplete onces
                else if (inputPackages[singlePackage].length < elevative_package[0].required) {
                    var achived_weight: number = 0
                    inputPackages[singlePackage].map(x => {
                        achived_weight += x.weight
                    })
                    incompletePackages.push({
                        missingElevtiveGrades: {
                            amoundMissing: elevative_package[0].required - inputPackages[singlePackage].length,
                            // filter out all already completed Grades
                            exams: missingGrades.filter(single => !inputGrades.some(grade => grade.examid === single.examid))
                        },
                        missing: [],
                        complete: false,
                        completeness: Math.round((achived_weight / gradePackages[elevative_package[0].examid].weight) * 100),
                        gradePackageID: parseInt(singlePackage)
                    })
                }
            }

        }

    })
    return incompletePackages
}

const calculateECTS = (inputGrades: UserInput[], examPackes: Exams, ects: number = 0): number => {
    for (var index = 0; index < inputGrades.length; index++) {
        if (!examPackes[inputGrades[index].examid].ignored) ects += examPackes[inputGrades[index].examid].ects
    }
    return ects
}

const calculateObservedWeight = (grades: GradePackageAverage[], weight: number = 0): number => {
    grades.map(single => {
        weight += single.weight
    })
    return weight
}

const calculateAverages = (userGrades: GradePackages, gradePackages: ExamPackages): GradePackageAverage[] => {
    const averages: GradePackageAverage[] = []
    Object.keys(userGrades).forEach((single: string) => {
        var points: number = 0
        var grade: number = 0
        for (var index = 0; index < Object.values(userGrades[single]).length; index++) {
            points += userGrades[single][index].weight
            grade += userGrades[single][index].weight * userGrades[single][index].grade
        }
        averages.push({
            name: gradePackages[single].name,
            weight: gradePackages[single].weight,
            gradePackageID: parseInt(single),
            grade: cutGrade(grade / points),
        })
    })

    return averages
}

const addImcompleteTag = (averages: GradePackageAverage[], incomplete: IncompletePackages[]): GradePackageAverage[] => {
    for (var index = 0; index < averages.length; index++) {
        const incompleteExams: IncompletePackages[] = incomplete.filter(x => x.gradePackageID === averages[index].gradePackageID)
        if (incompleteExams.length != 0) {
            averages[index].incomplete = true
            averages[index].completeness = incompleteExams[0].completeness
            averages[index].missing = incompleteExams[0].missing
            averages[index].complete = incompleteExams[0].complete
            incompleteExams[0].missingElevtiveGrades ? averages[index].missingElevtiveGrades = incompleteExams[0].missingElevtiveGrades : null
        }
    }
    return averages
}

const removeEmphasisGrades = (averages: GradePackageAverage[], emphasisOptions: Emphasis[], required: number, examPackages: ExamPackages, exams: Exams, missingElevtives: MissingElevtivesEmphasis = null) => {
    var idsToRemove: number[] = []
    var completedEmphasis: number = 0
    var removedEmphasis: boolean = false
    var removedEmphasisName: string
    const emphasis: GradePackageAverage[] = []
    for (var index = 0; index < emphasisOptions.length; index++) {
        var grade: number = 0
        var weight: number = 0
        var completedWeight: number = 0
        var complete: boolean = true
        var completlyMissing: string[] = []
        const missing: Exam[] = []
        emphasisOptions[index].ids.map((x: number) => idsToRemove.push(x))
        const examPackagesWithEmphasis: GradePackageAverage[] = averages.filter(x => emphasisOptions[index].ids.includes(x.gradePackageID))
        examPackagesWithEmphasis.map((x: GradePackageAverage) => {
            if (!x.completeness && x.complete != false) {
                completedWeight += x.weight
            } else {
                completedWeight += x.weight * (x.completeness / 100)
            }
        })
        const emphasisExams: Emphasis = emphasisOptions[index]
        if (emphasisExams.ids.length != examPackagesWithEmphasis.length) {
            const ExamPackagesWithEmphasisIds: number[] = examPackagesWithEmphasis.map(x => x.gradePackageID)
            completlyMissing = get_missing(emphasisExams.ids, ExamPackagesWithEmphasisIds)
        }
        for (var indextwo = 0; indextwo < examPackagesWithEmphasis.length; indextwo++) {
            weight += examPackagesWithEmphasis[indextwo].weight
            grade += examPackagesWithEmphasis[indextwo].weight * examPackagesWithEmphasis[indextwo].grade
            if (examPackagesWithEmphasis[indextwo].incomplete) {
                complete = false
                examPackagesWithEmphasis[indextwo].missing.map((x: Exam) => missing.push(x))
            }
        }
        if (complete && completlyMissing.length === 0) completedEmphasis += 1
        if (completlyMissing.length != emphasisExams.ids.length) {

            completlyMissing.map((single: string) => {
                examPackages[single].required.map((examId: string) => {
                    missing.push(exams[examId])
                })
            })
            var missingElevtiveGrades: MissingElevtiveEmphasis
            if (missingElevtives && missingElevtives[emphasisOptions[index].emphasisid]) {
                missingElevtiveGrades = missingElevtives[emphasisOptions[index].emphasisid]
            }


            emphasis.push({
                name: "Vertiefung " + emphasisOptions[index].name,
                weight: emphasisOptions[index].weight,
                grade: cutGrade(grade / weight),
                complete: complete,
                missing: missing,
                completeness: Math.round((completedWeight / emphasisOptions[index].weight) * 100),
                incomplete: (missing.length != 0 || completlyMissing.length != 0) ? true : false,
                missingElevtiveGrades: missingElevtiveGrades
            })
        }
    }
    if (emphasis.length > required) {
        emphasis.sort((a: GradePackageAverage, b: GradePackageAverage) => (a.completeness < b.completeness) ? 1 : ((b.completeness < a.completeness) ? -1 : 0))
        removedEmphasisName = emphasis.pop().name
        removedEmphasis = true
    }
    emphasis.map((single: GradePackageAverage) => [
        averages.push(single)
    ])

    return {
        average: averages.filter(x => !idsToRemove.includes(x.gradePackageID)),
        completedEmphasis,
        removedEmphasis,
        removedEmphasisName
    }
}

const calculateGrade = (average: GradePackageAverage[]): number => {
    var points: number = 0
    var grade: number = 0
    Object.keys(average).forEach(single => {
        points += average[single].weight
        grade += average[single].weight * average[single].grade
    })
    return cutGrade(grade / points)
}

function compareArray(array1: any, array2: any): any[] {
    const array2Sorted = array2.slice().sort();
    return array1.length === array2.length && array1.slice().sort().every(function (value: any, index: any) {
        return value === array2Sorted[index];
    });
}

function get_missing(complete_array: any, incomplete_array: any): any[] {
    return complete_array.filter(function (x: any) {
        return !incomplete_array.includes(x)
    })
}

function cutGrade(grade: number): number {
    return parseFloat(grade.toString().substring(0, grade.toString().indexOf(".") + 2))
}