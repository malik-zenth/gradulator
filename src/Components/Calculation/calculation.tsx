// calculate the average for given grades
import { ExamPackages, Exams, UserInput, SingleOption, Exam, Emphasis, BasicInformation, CalculationResult, Electives, NotCompletedElectives, AlternativeElectives } from "../../Data/types";
import { GradePackage, GradePackages, IncompletePackages, GradePackageAverage, CaseReturn, MissingElevtiveEmphasis, MissingElevtivesEmphasis } from "./types"
import { get_missing, cutGrade, compareArray } from "./helper";
import { setupElevativeChoices, removeElevtiveGrades } from "./electives";

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
            gradePackages, selectedOption.basics.elevtive, selectedOption.exams)
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
                    const incompletePackagesToBeAdded = checkIncompleteElectiveOption(inputPackages, singlePackage, elevative_package, examData, gradePackages)
                    incompletePackages.push(...incompletePackagesToBeAdded)
                }
                else if (elevative_package[0].requiredEcts){
                    const achivedECTS = inputPackages[singlePackage].map(x => examData[x.examID].ects).reduce((a, b) => a+b, 0)
                    // if their are less ects achived than required add it to incomplete
                    if(achivedECTS < elevative_package[0].requiredEcts){
                        incompletePackages.push({
                            missingElevtiveGrades: {
                                amoundMissing: elevative_package[0].requiredEcts - achivedECTS,
                                // if this param is true an different text will be displayed for missing grades
                                missingECTS: true,
                                exams: missingGrades.filter(single => !inputGrades.some(grade => grade.examid === single.examid))
                            },
                            missing: [],
                            complete: false,
                            completeness: Math.round((achivedECTS / elevative_package[0].requiredEcts) * 100),
                            gradePackageID: parseInt(singlePackage)
                        })
                    }
                }
                // if their are missing packages, but the amound of required once is reached do nothing
                // if not, add this to incomplete onces
                else if (inputPackages[singlePackage].length < elevative_package[0].required && !elevative_package[0].requiredEcts) {
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

const checkIncompleteElectiveOption = (inputPackages: GradePackages, singlePackage: string, elevative_package: Electives[], examData: Exams, gradePackages: ExamPackages): IncompletePackages[] => {
    const incompletePackages: IncompletePackages[] = []
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
                if (option.leftRequired != 0 && option.ids.includes(examID)) {
                    option.leftRequired -= 1
                }
            })
        })
        const notCompletedIds = optionsWithSameOptionID.filter(x => x.leftRequired != 0)
        if (notCompletedIds.length != 0) {
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
                    amoundMissing: notCompletedIds.map(x => x.leftRequired).reduce((a, b) => a + b, 0),
                    exams: missingIds.map(x => examData[x])
                },
                missing: [],
                complete: false,
                completeness: Math.round((achived_weight / gradePackages[elevative_package[0].examid].weight) * 100),
                gradePackageID: parseInt(singlePackage)
            })
        }
    }
    // if it is only this one to be completed and no optionId apply normal logic
    else if(takenOption){
        const completedExamsForThisOption = completedExams.filter((examID: number) => takenOption.ids.includes(examID))
        const amountCompletedExams = completedExamsForThisOption.length
        if(amountCompletedExams < takenOption.required){
            const achivedWeight: number = completedExamsForThisOption.map(x => examData[x].ects).reduce((a, b) => a + b, 0)
            const missingExams: Exam[] = takenOption.ids.filter(x => !completedExamsForThisOption.includes(x)).map(x => examData[x])
            incompletePackages.push({
                missingElevtiveGrades: {
                    amoundMissing: takenOption.required - amountCompletedExams,
                    exams: missingExams
                },
                missing: [],
                complete: false,
                completeness: Math.round((achivedWeight / gradePackages[elevative_package[0].examid].weight) * 100),
                gradePackageID: parseInt(singlePackage)
            })
        }
    }
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
