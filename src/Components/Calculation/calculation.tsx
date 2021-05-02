// calculate the average for given grades
import { ExamPackages, Exams, UserInput, SingleOption, ExamPackage, Exam, Emphasis, BasicInformation, CalculationResult, Electives} from "../../Data/types";
import {GradePackage, GradePackages, IncompletePackages, GradePackageAverage, CaseReturn, MissingElevtiveEmphasis, MissingElevtivesEmphasis} from "./types"

export const calculateData = (inputGrades: UserInput[], selectedOption: SingleOption): CalculationResult => {
    var bestCaseGrade: number
    var missingElevtiveGradesEmphasis: MissingElevtivesEmphasis
    var worstCaseGrade: number
    var removedElevtive: GradePackage[]
    // settup data in a way that all grades from one package are together
    const gradePackages: GradePackages = settupGradePackages(inputGrades, selectedOption.exams)
    // bevor calculating the averages remove not required elevative grades
    if(selectedOption.basics.elevtive){
        var{removedElevtive, missingElevtiveGradesEmphasis} = removeElevtiveGrades(gradePackages, selectedOption.basics.elevtive, selectedOption.exams, inputGrades)
    }
    // check which packages are incomplete
    const incompletePackages: IncompletePackages[] = checkIncompletePackes(gradePackages, selectedOption.examPackages, selectedOption.exams, selectedOption.basics.elevtive)
    // calculate all achived ects
    const ects: number = calculateECTS(inputGrades, selectedOption.exams)


    // calculate the average for each package
    var average: GradePackageAverage[] = calculateAverages(gradePackages, selectedOption.examPackages)
    // if their are incomplete packages mark them
    if(incompletePackages){
        average = addImcompleteTag(average, incompletePackages)
    }
    // calculate the average for all emphasis (if their are) and remove the single grades from our averages
    var {average, completedEmphasis, removedEmphasis, removedEmphasisName} = removeEmphasisGrades(
        average, selectedOption.basics.emphasis, selectedOption.basics.required_emphasis, selectedOption.examPackages, selectedOption.exams, missingElevtiveGradesEmphasis)
    // calculate the average grade
    const grade = calculateGrade(average)
    // add up all weight points
    const observedWeight = calculateObservedWeight(average)
    // check if their are any estimated grades
    const estimatedGrades = inputGrades.filter((x: UserInput) => x.estimated)
    // if so calculate average and grade for them with 1(best case) and 4(worst case)
    if(estimatedGrades.length > 0){
        const worstCase = calculateCase(gradePackages, selectedOption.examPackages, selectedOption.basics,selectedOption.exams, 4)
        const bestCase = calculateCase(gradePackages, selectedOption.examPackages, selectedOption.basics, selectedOption.exams, 1)
        var bestCaseGrade = bestCase.caseGrade
        var worstCaseGrade = worstCase.caseGrade
        addCasesToPackages(average, worstCase.caseAverage, bestCase.caseAverage)
    }

    return{
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

const removeElevtiveGrades = (gradePackages: GradePackages, elevatives: Electives[], exams: Exams, inputGrades: UserInput[]) => {
    const removedElevtive: GradePackage[] = []
    const missingElevtiveGradesEmphasis: MissingElevtivesEmphasis = {}
    elevatives.map(single => {
        if(gradePackages[single.examid] && single.required < gradePackages[single.examid].length){
            const sortedGradesElevatives: GradePackage[] = sortElevtiveByGrade(gradePackages[single.examid])
            // add all removed items to this list to display them on result page
            removedElevtive.push(...sortedGradesElevatives.slice(single.required, sortedGradesElevatives.length))
            // update inputGrades, remove the not required once
            gradePackages[single.examid] = sortedGradesElevatives.slice(0,single.required)
        }
        // if the Elevtive is part of an emphasis remove all grades and add their average
        if(gradePackages[single.examid] && single.emphasis_elevtive){
            const elv_average: number = calculateElevtiveAverage(gradePackages[single.examid])
            const elv_data = exams[single.examid]
            const estimated: boolean = gradePackages[single.examid].map(single => {
                single.estimated
            }).length > 0
            // get amound of missing grades
            const amound_missing: number = gradePackages[single.examid].length < single.required ? single.required - gradePackages[single.examid].length : 0
            const exam_options_ids = single.ids.filter(id => {
                if(gradePackages[single.examid].filter(single => single.examID == id).length == 0) return id
            })
            const exams_options: Exam[] = exam_options_ids.map(single => exams[single])
            if(amound_missing > 0){
            missingElevtiveGradesEmphasis[single.emphasisid] = {
                amoundMissing: amound_missing,
                exams: exams_options
            }
            }
            // if grade packages does not exist add it
            if(!gradePackages[elv_data.packageid]){
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
        grade+=single.grade * single.weight
        weight+=single.weight
    })
    return cutGrade(grade/weight)
}

// order Grade Package by Grade in order to remove those grades that are the worst
const sortElevtiveByGrade = (inputGrades: GradePackage[]): GradePackage[] => {
    return inputGrades.sort(function(a, b) {
        if (a.grade < b.grade) return -1;
        if (a.grade > b.grade) return 1;
        return 0;
      });
}

const calculateCase = (inputGrades: GradePackages, examPackages: ExamPackages, basicData: BasicInformation,exams: Exams,grade: number): CaseReturn => {
    const caseGradePackages = JSON.parse(JSON.stringify(inputGrades))
    Object.keys(caseGradePackages).forEach(single => {
        for(var index = 0; index < caseGradePackages[single].length; index++){
            if(caseGradePackages[single][index].estimated){
                caseGradePackages[single][index].grade = grade
            }
        }
    })
    const caseAverage = calculateAverages(caseGradePackages, examPackages)
    const {average} = removeEmphasisGrades(caseAverage, basicData.emphasis, basicData.required_emphasis, examPackages, exams)
    const caseGrade = calculateGrade(average)
    return{
        caseGrade,
        caseAverage: average
    }
}

const addCasesToPackages = (average : GradePackageAverage[], worstCase: GradePackageAverage[], bestCase: GradePackageAverage[]) => {
    for(var index = 0; index < average.length; index++){
        // if any value (best or worst case is different from calculated grade display both)
        // this can be improved by adding sth. like a boolean tag to the worst and bestCase Packages and look after this
        if(worstCase[index].grade != average[index].grade || bestCase[index].grade != average[index].grade){
            average[index].worstPossibleGrade = worstCase[index].grade
            average[index].bestPossibleGrade = bestCase[index].grade
        }
    }
}

const settupGradePackages = (inputGrades: UserInput[], examPackes: Exams): GradePackages => {
    const gradePackages: GradePackages = {}
    const usedGradePackages: number[] = []
    for(var index = 0; index < inputGrades.length; index++){
        const gradePackageID: number = examPackes[inputGrades[index].examid].packageid
        // filter out all grades which are ignored
        if(!examPackes[inputGrades[index].examid].ignored){
        if(usedGradePackages.includes(gradePackageID)){
            gradePackages[gradePackageID].push({
                grade: inputGrades[index].grade,
                weight: examPackes[inputGrades[index].examid].weight,
                examID: inputGrades[index].examid,
                estimated: inputGrades[index].estimated
            })
        }else{
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

const checkIncompletePackes = (inputPackages: GradePackages, gradePackages: ExamPackages, examData: Exams, elevative: Electives[]): IncompletePackages[] => {
    const incompletePackages: IncompletePackages[] = []
    Object.keys(inputPackages).forEach(singlePackage => {
        const exams = inputPackages[singlePackage].map((x: GradePackage) => x.examID)
        if(!compareArray(exams, gradePackages[singlePackage].required)){
            const missingGrades = get_missing(gradePackages[singlePackage].required, exams).map(x => examData[x])
            var overallWeight: number = 0
            var overallMissing: number = 0
            gradePackages[singlePackage].required.map((x: number) => {
                overallWeight += examData[x].weight
            })
            missingGrades.map((x: Exam) => {
                overallMissing += x.weight
            })
            // if their are elevative grades check if current package is part of them, if so use other logik to detect completness
            if(!elevative || !elevative.map(x => x.examid).includes(parseInt(singlePackage))){
                incompletePackages.push({
                    missing: missingGrades,
                    complete: false,
                    completeness: Math.round((1 - overallMissing / overallWeight) * 100),
                    gradePackageID: parseInt(singlePackage)
                })
            }else{
                const elevative_package: Electives[] = elevative.filter(x => x.examid == parseInt(singlePackage))
                // if their are missing packages, but the amound of required once is reached do nothing
                // if not, add this to incomplete onces
                if(inputPackages[singlePackage].length < elevative_package[0].required){
                    var achived_weight: number = 0
                    inputPackages[singlePackage].map(x => {
                        achived_weight += x.weight
                    })
                    incompletePackages.push({
                        missingElevtiveGrades: {
                            amoundMissing: elevative_package[0].required - inputPackages[singlePackage].length,
                            exams: missingGrades
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
    for(var index = 0; index < inputGrades.length; index++){
        if(!examPackes[inputGrades[index].examid].ignored) ects += examPackes[inputGrades[index].examid].ects
    }
    return ects
}

const calculateObservedWeight = (grades: GradePackageAverage[], weight: number = 0): number => {
    grades.map(single => {
        weight+=single.weight
    })
    return weight
}

const calculateAverages = (userGrades: GradePackages, gradePackages: ExamPackages): GradePackageAverage[] => {
    const averages: GradePackageAverage[] = []
    Object.keys(userGrades).forEach((single: string) => {
        var points: number = 0
        var grade: number = 0
        for(var index = 0; index < Object.values(userGrades[single]).length; index++){
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
    for(var index = 0; index < averages.length; index++){
        const incompleteExams: IncompletePackages[] = incomplete.filter(x => x.gradePackageID === averages[index].gradePackageID)
        if(incompleteExams.length != 0){
            averages[index].incomplete = true
            averages[index].completeness = incompleteExams[0].completeness
            averages[index].missing = incompleteExams[0].missing
            averages[index].complete = incompleteExams[0].complete
            incompleteExams[0].missingElevtiveGrades? averages[index].missingElevtiveGrades = incompleteExams[0].missingElevtiveGrades: null
        }
    }
    return averages
}

const removeEmphasisGrades = (averages: GradePackageAverage[], emphasisOptions: Emphasis[], required: number, examPackages: ExamPackages, exams: Exams, missingElevtives: MissingElevtivesEmphasis = null) => {
    var idsToRemove : number[] = []
    var completedEmphasis: number = 0
    var removedEmphasis: boolean = false
    var removedEmphasisName: string
    const emphasis: GradePackageAverage[] = []
    for(var index = 0; index < emphasisOptions.length; index++){
        var grade: number = 0
        var weight: number = 0
        var completedWeight: number = 0
        var complete: boolean = true
        var completlyMissing: string[] = []
        const missing: Exam[] = []
        emphasisOptions[index].ids.map((x: number) => idsToRemove.push(x))
        const examPackagesWithEmphasis: GradePackageAverage[] = averages.filter(x => emphasisOptions[index].ids.includes(x.gradePackageID))
        examPackagesWithEmphasis.map((x: GradePackageAverage) => {
            if(!x.completeness && x.complete != false){
                completedWeight+=x.weight
            }else{
                completedWeight+=x.weight*(x.completeness/100)
            }
        })
        const emphasisExams: Emphasis = emphasisOptions[index]
        if(emphasisExams.ids.length != examPackagesWithEmphasis.length){
            const ExamPackagesWithEmphasisIds: number[] = examPackagesWithEmphasis.map(x => x.gradePackageID)
            completlyMissing = get_missing(emphasisExams.ids, ExamPackagesWithEmphasisIds)
        }
        for(var indextwo = 0; indextwo < examPackagesWithEmphasis.length; indextwo++){
            weight+= examPackagesWithEmphasis[indextwo].weight
            grade+= examPackagesWithEmphasis[indextwo].weight * examPackagesWithEmphasis[indextwo].grade
            if(examPackagesWithEmphasis[indextwo].incomplete){
                complete = false
                examPackagesWithEmphasis[indextwo].missing.map((x: Exam) => missing.push(x))
            }
        }
        if(complete && completlyMissing.length === 0) completedEmphasis+=1
        if(completlyMissing.length != emphasisExams.ids.length){

            completlyMissing.map((single: string) => {
                examPackages[single].required.map((examId: string) => {
                    missing.push(exams[examId])
                })
            })
            var missingElevtiveGrades: MissingElevtiveEmphasis
            if(missingElevtives && missingElevtives[emphasisOptions[index].emphasisid]){
                missingElevtiveGrades = missingElevtives[emphasisOptions[index].emphasisid]
            }


            emphasis.push({
                name: "Vertiefung " + emphasisOptions[index].name,
                weight: emphasisOptions[index].weight,
                grade: cutGrade(grade / weight),
                complete: complete,
                missing: missing,
                completeness: Math.round((completedWeight / emphasisOptions[index].weight) * 100),
                incomplete: (missing.length != 0 || completlyMissing.length != 0) ? true: false,
                missingElevtiveGrades: missingElevtiveGrades
            })
        }
    }
    if(emphasis.length > required){
        emphasis.sort((a:GradePackageAverage, b:GradePackageAverage) => (a.completeness < b.completeness) ? 1 : ((b.completeness < a.completeness) ? -1 : 0))
        removedEmphasisName = emphasis.pop().name
        removedEmphasis = true
    }
    emphasis.map((single: GradePackageAverage) => [
        averages.push(single)
    ])

    return{
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
        points+= average[single].weight
        grade+= average[single].weight * average[single].grade
    })
    return cutGrade(grade / points)
}

function compareArray(array1: any, array2: any): any[]{
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