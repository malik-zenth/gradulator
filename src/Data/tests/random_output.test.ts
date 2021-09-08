import { calculateData } from "../../Components/Calculation/calculation";
import {options} from "../index"
import { Exam, Exams, UserInput } from "../types"

// take a random option and a random amound of grades
// mock them and check if we get no error

interface RandomPropery{
    selected: Exam,
    key: number
}


var randomProperty = function (obj: Exams): RandomPropery {
    const keys = Object.keys(obj);
    const key = keys[keys.length * Math.random() << 0]
    return {
        selected: obj[key],
        key: parseInt(key)
    }
};


describe("test if we get an result", () => {
    const amoundRandomRuns: number = 2000
    const lenOptions: number = options.length

    for(var i: number= 0; i < amoundRandomRuns; i++){
        // get a random option from the list
        const randomOption = options[Math.floor(Math.random() * lenOptions)]
        test("if " + randomOption.longName + " is working the way it should", () => {
            // get amound if random values we select
            const amoundRandomValues = Object.keys(randomOption.data.exams).length
            const randomInputValues: UserInput[] = []
            const usedKeys: number[] = []
            for(var j: number= 1; j < amoundRandomValues; j++){
                // for each random value, get a random exam from the available once.
                const randomObject: RandomPropery = randomProperty(randomOption.data.exams)
                // if it is not used jet, add it to our input
                if(!usedKeys.includes(randomObject.key)){
                    usedKeys.push(randomObject.key)
                    randomInputValues.push({
                        examid: randomObject.key,
                        grade: Math.floor(Math.random() * 5) + 1,
                        estimated: Math.random() < 0.5
                    })
                }
            }
            // call calculation and check if some values are defined
            const calculationResult = calculateData(randomInputValues, randomOption.data)
            expect(calculationResult.grade).toBeDefined()
            expect(calculationResult.achivedECTS).toBeDefined()
            expect(calculationResult.observedWeight).toBeDefined()
            expect(calculationResult.singleGrades).toBeDefined()
            calculationResult.singleGrades.forEach(grade => {
                expect(grade.grade).not.toBeNaN()
            })
        })
    }
})