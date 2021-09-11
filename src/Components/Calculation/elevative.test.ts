import {calculateData} from "./calculation"
import {getDegreeByName} from "../../Data"
import {UserInput} from "../../Data/types";

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
})