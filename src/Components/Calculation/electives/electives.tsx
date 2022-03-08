import { Exams, UserInput, SingleOption, Electives, Exam, iElevativeSettupType,  } from "../../../Data/types";
import { GradePackage, GradePackages, MissingElevtivesEmphasis,  } from "../types"
import { sortGradePackageByGrade, calculateElevtiveAverage } from "../helper";
import { multiChoiseElevativesECTS, noMultiChoiseElevativesECTS, checkElevitveAlternativeECTS, removeElectivesECTS } from "./ects";
import { noMultiChoiseElevativesDefault, multiChoiseElevativesDefault, checkElevitveAlternativeDefault} from "./amount"

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

const getElevativeThatIncludesExamID = (examID: number, selectedOption: SingleOption): Electives => {
    return selectedOption.basics.elevtive.filter(single => {
        if (single.ids && single.ids.includes(examID)) return true
        if (single.options && single.options.some(opt => opt.ids.includes(examID))) return true
        return false
    }).shift()
}

const setupElevativeChoices = (inputGrades: UserInput[], selectedOption: SingleOption) => {
    // check if their are multiOptions, if so check if a grade for one of them is given
    if (checkIfELevativeChoiceGradesAreGiven(inputGrades, selectedOption)) {
        // do this for each choiseID
        const multiOptionElevatives: Electives[] = selectedOption.basics.elevtive.filter(single => single.choiseID)
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

        // check if any inputGrade has not been given any packageID
        const inputGradesWithOutPackageID = inputGrades.filter(x => !selectedOption.exams[x.examid].packageid)
        // if so add one to prevent errors later 
        inputGradesWithOutPackageID.map(single => selectedOption.exams[single.examid].packageid = getElevativeThatIncludesExamID(single.examid, selectedOption).examid)
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
    const currentChoiseId = selectedOption.basics.elevtive.filter(x => x.choiseID === choiceID)
    if (currentChoiseId.some(x => x.requiredEcts || x.options && x.options.some(opt => opt.requiredECTS))) {
        return multiChoiseElevativesECTS(inputGrades, selectedOption, choiceID)
    }
    else{
        return multiChoiseElevativesDefault(inputGrades, selectedOption, choiceID)
    }
}





// this is the easy way of elevatives - we have e.g. 9 exams of which the student has to complete 3
const noMultiChoiseElevative = (inputGrades: UserInput[], selectedOption: SingleOption, choiseId: number): SingleOption => {
    const currentChoiseId = selectedOption.basics.elevtive.filter(x => x.choiseID === choiseId)
    if (currentChoiseId.some(x => x.requiredEcts)) {
        return noMultiChoiseElevativesECTS(inputGrades, selectedOption, choiseId)
    }
    else {
        return noMultiChoiseElevativesDefault(inputGrades, selectedOption, choiseId)
    }
}





const removeElevtiveGrades = (gradePackages: GradePackages, elevatives: Electives[], exams: Exams) => {
    const removedElevtive: GradePackage[] = []
    const missingElevtiveGradesEmphasis: MissingElevtivesEmphasis = {}
    elevatives.map(single => {
        // if elevative has more than one way to be completed apply special logic
        if (gradePackages[single.examid] && single.options) {
            if(single.options.some(x => x.requiredECTS)){
                const { electiveToBeRemoved, newGradePackage } = checkElevitveAlternativeECTS(gradePackages, single, exams)
                removedElevtive.push(...electiveToBeRemoved)
                gradePackages[single.examid] = newGradePackage
            }else{
                const { electiveToBeRemoved, newGradePackage } = checkElevitveAlternativeDefault(gradePackages, single)
                removedElevtive.push(...electiveToBeRemoved)
                gradePackages[single.examid] = newGradePackage
            }
        }
        // if elevative requires an amount of ects, not exams
        else if (gradePackages[single.examid] && single.requiredEcts) {
            const {electiveToBeRemoved, newGradePackage} = removeElectivesECTS(gradePackages, single, exams)
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
            let amound_missing: number = 0
            let exams_options: Exam[]
            const exam_options_ids: number[] = []
            if (single.ids) {
                amound_missing = gradePackages[single.examid].length < single.required ? single.required - gradePackages[single.examid].length : 0
                exam_options_ids.push(...single.ids.filter(id => !gradePackages[single.examid].some(single => single.examID == id)))
                exams_options = exam_options_ids.map(single => exams[single])
            }
            else {
                const relevantOption = single.options.filter(sgl => gradePackages[single.examid].some(gradePackage => sgl.ids.includes(gradePackage.examID))).shift()
                amound_missing = relevantOption.required - gradePackages[single.examid].length
                exam_options_ids.push(...relevantOption.ids.filter(id => !gradePackages[single.examid].some(single => single.examID == id)))
                exams_options = relevantOption.ids.map(single => exams[single])
            }
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

export {
    setupElevativeChoices,
    removeElevtiveGrades
}