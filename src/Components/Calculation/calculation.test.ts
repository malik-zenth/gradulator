import {calculateData} from "./calculation"
import {options} from "../../Data"
import {UserInput} from "../../Data/types";
describe("test if calculation is still working", () => {

    test("if packages are calculated correctly", () => {
    const testInput: UserInput[] = [
        {examid: 282133, grade: 2, estimated: false},
        {examid: 282134, grade: 1, estimated: false},
        {examid: 282135, grade: 3, estimated: false},
        {examid: 282160, grade: 1, estimated: false}
    ]
    const calculationResult = calculateData(testInput, options["Wirtschaftsinformatik"])
    expect(calculationResult.grade).toBe(1.2)
    expect(calculationResult.singleGrades).toHaveLength(2)
    })

    test("if emphasis gets removed correctly", () => {
        const testInput: UserInput[] = [
            {examid: 282160, grade: 1, estimated: false},
            {examid: 282161, grade: 1, estimated: false},
            {examid: 282166, grade: 1, estimated: false},
            {examid: 282180, grade: 1, estimated: false},
            {examid: 282194, grade: 1, estimated: false}
        ]

        const calculationResult = calculateData(testInput, options["Wirtschaftsinformatik"])

        expect(calculationResult.achivedECTS).toBe(25)
        expect(calculationResult.removedEmphasis).toBeTruthy
        expect(calculationResult.removedEmphasisName).toBe("Vertiefung Social Media Management")
    })

    test("if completness is correct", () => {
        const testInput: UserInput[] = [
            {examid: 282160, grade: 1, estimated: false},
            {examid: 282161, grade: 2, estimated: false}
        ]

        const calculationResult = calculateData(testInput, options["Wirtschaftsinformatik"])

        expect(calculationResult.grade).toBe(1.6)
        expect(calculationResult.observedWeight).toBe(35)
        expect(calculationResult.singleGrades).toHaveLength(1)
        expect(calculationResult.singleGrades[0].completeness).toBe(29)
        expect(calculationResult.singleGrades[0].missing).toHaveLength(5)
    })

    test("if Elevtive outside of emphasis work", () => {
        const testInput: UserInput[] = [
            {examid: 163301, grade: 1, estimated: false}
        ]

        const calculationResult = calculateData(testInput, options["Verkehrsbetriebswirtschaft und Logistik"])
        expect(calculationResult.singleGrades).toHaveLength(1)
        expect(calculationResult.singleGrades[0].missingElevtiveGrades.amoundMissing).toBe(1)
    })

    test("if Elevtive inside of emphasis work", () => {
        const testInput: UserInput[] = [
            {examid: 152561, grade: 1, estimated: false},
            {examid: 152562, grade: 2, estimated: true}
        ]

        const calculationResult = calculateData(testInput, options["Betriebswirtschaft und Unternehmensführung"])
        expect(calculationResult.singleGrades).toHaveLength(1)
        expect(calculationResult.singleGrades[0].missingElevtiveGrades).toBeDefined()
        expect(calculationResult.singleGrades[0].missingElevtiveGrades.amoundMissing).toBe(2)
        expect(calculationResult.grade).toBe(1.5)
    })
})