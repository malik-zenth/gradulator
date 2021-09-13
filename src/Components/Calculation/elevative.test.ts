import {calculateData} from "./calculation"
import {getDegreeByName} from "../../Data"
import {UserInput} from "../../Data/types";

// this are individual tests for all types of functionalities in order to check if they are still working the way they should
describe("test if elevative calculation is still working", () => {

    test("if elevative MultiOption are calculated correctly", () => {
        const testInput: UserInput[] = [
            {examid: 186431, grade: 2, estimated: false},
        ]
        const calculationResult = calculateData(testInput, getDegreeByName("TMB").data)
        const relevantResult = calculationResult.singleGrades[0]
        expect(relevantResult.name).toBe("Internationale Spezialisierung 1")
        expect(relevantResult.complete).toBeFalsy()
        expect(relevantResult.missingElevtiveGrades.exams.includes(getDegreeByName("TMB").data.exams[186921]))
    })

    test("if elevative optionID is completed correctly", () => {
        const testInput: UserInput[] = [
            {examid: 186431, grade: 2, estimated: false},
            {examid: 186461, grade: 3, estimated: false}
        ]
        const calculationResult = calculateData(testInput, getDegreeByName("TMB").data)
        expect(calculationResult.removedElevtive.length).toBe(1)
    })

    test("if elevative are calculated correctly", () => {
        const testInput: UserInput[] = [
            {examid: 186332, grade: 2, estimated: false},
            {examid: 186333, grade: 2, estimated: false}
        ]
        const calculationResult = calculateData(testInput, getDegreeByName("TMB").data)
        const relevantResult = calculationResult.singleGrades[0]
        expect(relevantResult.complete).toBeFalsy()
        expect(relevantResult.missingElevtiveGrades.exams.includes(getDegreeByName("TMB").data.exams[186334]))
    })
    
    test("if right grades from elevatives are taken", () => {
        const testInput: UserInput[] = [
            {examid: 186342, grade: 2, estimated: false},
            {examid: 186332, grade: 2, estimated: false},
            {examid: 186333, grade: 2, estimated: false}
        ]
        const calculationResult = calculateData(testInput, getDegreeByName("TMB").data)
        const relevantResult = calculationResult.singleGrades[0]
        expect(relevantResult.complete).toBeFalsy()
        expect(relevantResult.missingElevtiveGrades.exams.includes(getDegreeByName("TMB").data.exams[186334]))
    })

    test("if best grades from elevatives are taken", () => {
        const testInput: UserInput[] = [
            {examid: 186342, grade: 2, estimated: false},
            {examid: 186332, grade: 1, estimated: false},
        ]
        const calculationResult = calculateData(testInput, getDegreeByName("TMB").data)
        const relevantResult = calculationResult.singleGrades[0]
        expect(relevantResult.complete).toBeFalsy()
        expect(relevantResult.missingElevtiveGrades.exams.includes(getDegreeByName("TMB").data.exams[186333]))
    })

    test("if elevative is completed", () => {
        const testInput: UserInput[] = [
            {examid: 186342, grade: 2, estimated: false},
            {examid: 186343, grade: 1, estimated: false},
            {examid: 186344, grade: 1, estimated: false},
        ]
        const calculationResult = calculateData(testInput, getDegreeByName("TMB").data)
        const relevantResult = calculationResult.singleGrades[0]
        expect(relevantResult.complete).not.toBeDefined()
        expect(relevantResult.missingElevtiveGrades).not.toBeDefined()
    })

    test("if special cases ects are working 1", () => {
        const testInput: UserInput[] = [
            {examid: 255341, grade: 2, estimated: false},
            {examid: 255351, grade: 1, estimated: false},
        ]

        const calculationResult = calculateData(testInput, getDegreeByName("IBIS-B").data)
        expect(calculationResult.singleGrades.some(x => x.name === "Major"))
        expect(calculationResult.singleGrades).toHaveLength(2)
        expect(calculationResult.singleGrades.some(x => x.name === "Minor"))
        expect(calculationResult.removedElevtive).toHaveLength(0)
    })

    test("if special cases ects are working 2", () => {
        const testInput: UserInput[] = [
            { examid: 255811, grade: 5, estimated: false },
            { examid: 255357, grade: 4, estimated: true },
            { examid: 255681, grade: 5, estimated: false },
            { examid: 255114, grade: 2, estimated: true },
            { examid: 255611, grade: 5, estimated: true },
            { examid: 255322, grade: 5, estimated: true },
            { examid: 255951, grade: 1, estimated: true },
            { examid: 255472, grade: 2, estimated: false },
            { examid: 255133, grade: 2, estimated: true },
            { examid: 255211, grade: 3, estimated: false },
            { examid: 255922, grade: 5, estimated: false },
            { examid: 255941, grade: 2, estimated: false },
            { examid: 255461, grade: 2, estimated: true },
            { examid: 255342, grade: 5, estimated: false },
            { examid: 255672, grade: 3, estimated: true },
            { examid: 255345, grade: 4, estimated: true },
            { examid: 255343, grade: 3, estimated: true },
            { examid: 255331, grade: 1, estimated: true },
            { examid: 255314, grade: 1, estimated: true },
            { examid: 255481, grade: 4, estimated: false },
            { examid: 255671, grade: 5, estimated: true },
            { examid: 255841, grade: 5, estimated: false },
            { examid: 255122, grade: 5, estimated: false },
            { examid: 255358, grade: 2, estimated: false },
            { examid: 255411, grade: 4, estimated: false },
            { examid: 255335, grade: 5, estimated: true },
            { examid: 255313, grade: 4, estimated: true },
            { examid: 255315, grade: 3, estimated: false },
            { examid: 255316, grade: 2, estimated: false },
            { examid: 255821, grade: 3, estimated: true },
            { examid: 255317, grade: 4, estimated: false },
            { examid: 255344, grade: 2, estimated: false },
            { examid: 255334, grade: 2, estimated: true },
            { examid: 255621, grade: 5, estimated: false },
            { examid: 255781, grade: 5, estimated: true },
            { examid: 255881, grade: 3, estimated: false },
            { examid: 255521, grade: 4, estimated: true },
            { examid: 255153, grade: 1, estimated: true },
            { examid: 255932, grade: 5, estimated: true },
            { examid: 255151, grade: 5, estimated: false },
            { examid: 255161, grade: 1, estimated: true },
            { examid: 255319, grade: 2, estimated: true },
            { examid: 255751, grade: 2, estimated: false },
            { examid: 255121, grade: 1, estimated: false },
            { examid: 255721, grade: 3, estimated: true },
            { examid: 255741, grade: 1, estimated: true },
            { examid: 255352, grade: 4, estimated: true },
            { examid: 255921, grade: 4, estimated: true },
            { examid: 255341, grade: 2, estimated: true },
            { examid: 255325, grade: 1, estimated: true },
            { examid: 255421, grade: 1, estimated: true },
            { examid: 255354, grade: 5, estimated: false },
            { examid: 255441, grade: 1, estimated: false },
            { examid: 255152, grade: 2, estimated: false },
            { examid: 255321, grade: 1, estimated: true },
            { examid: 255326, grade: 1, estimated: false },
            { examid: 255311, grade: 2, estimated: false }
          ]

        const calculationResult = calculateData(testInput, getDegreeByName("IBIS-B").data)
        expect(calculationResult.singleGrades.some(x => x.name === "Major"))
        expect(calculationResult.singleGrades.some(x => x.name === "Minor"))
        expect(calculationResult.observedWeight).toBe(117.5)
        expect(calculationResult.removedElevtive).toBeDefined()
        expect(calculationResult.removedEmphasisNames).toHaveLength(3)
    })

    test("if special cases ects are working 3", () => {
        const testInput: UserInput[] = [
            {examid: 186431, grade: 2, estimated: false},
            {examid: 186461, grade: 1, estimated: false},
        ]

        const calculationResult = calculateData(testInput, getDegreeByName("TMB").data)
        expect(calculationResult.removedElevtive).toHaveLength(1)
    })

    test("if special cases ects are working 4", () => {
        const testInput: UserInput[] = [
            {examid: 255441, grade: 2, estimated: false},
            {examid: 255471, grade: 1, estimated: false},
        ]

        const calculationResult = calculateData(testInput, getDegreeByName("IBIS-B").data)
        expect(calculationResult.removedElevtive).toHaveLength(1)
    })

})