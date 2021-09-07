import { UserInput } from "../../Data/types";
import { GradePackage } from "./types"

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

// order Grade Package by Grade in order to remove those grades that are the worst
const sortGradePackageByGrade = (inputGrades: GradePackage[]): GradePackage[] => {
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

export {
    sortGradePackageByGrade,
    sortUserInputByGrade,
    cutGrade,
    get_missing,
    compareArray
}