import { createFinaleData } from ".";
import { DegreeOption } from "../../../Data/types";
import { ElevativeCreationType, EmphasisCreationType, ExamCreationType, ExamPackageCreationType, GeneralInformationsCreationType } from "../types";

describe("test if createFinalData is working", () => {

    const defBasicInf: GeneralInformationsCreationType = {
        name: "Test",
        shortName: "TST",
        amoundRequiredEmphasis: 0,
        spo: 1
    }

    test("if normal case is working", () => {

        const c1Exams: ExamCreationType[] = [
            {
                name: "Test",
                examid: 302010,
                key: "123",
                ects: 5,
                semester: 2,
                editMode: false,
                index: 0
            },
            {
                name: "Einführung in die WIN",
                examid: 203040,
                key: "456",
                ects: 5,
                semester: 3,
                editMode: true,
                index: 1
            },
            {
                name: "Not used Exam",
                examid: 203050,
                key: "789",
                ects: 5,
                semester: 3,
                editMode: true,
                index: 1
            }
        ]

        const c1ExamPackages: ExamPackageCreationType[] = [
            {
                name: "Modul1",
                weight: 10,
                key: "0",
                editMode: true,
                examPackageID: 111111,
                required: []
            },
            {
                name: "Modul2",
                weight: 10,
                key: "1",
                examPackageID: 123456,
                editMode: false,
                required: ["456", "123"]
            }
        ]

        const c1Elevatives: ElevativeCreationType[] = [
            {
                name: "Wahlfach A",
                examPackageID: 1,
                key: "2",
                weight: 5,
                editMode: false,
                unit: "ECTS",
                options: [{
                    required: 1,
                    ids: ["123"],
                    key: "1",
                    editMode: true
                },
                {
                    required: 2,
                    ids: ["123", "456"],
                    key: "2",
                    editMode: true
                }],
            },
            {
                name: "Wahlfach B",
                examPackageID: 2,
                key: "3",
                editMode: true,
                weight: 20,
                options: [{
                    required: 1,
                    ids: ["123"],
                    key: "3",
                    editMode: true
                }],
                unit: "ECTS"
            }
        ]

        const c1Emphasis: EmphasisCreationType[] = [
            {
                name: "Vertiefung 1",
                key: "11",
                editMode: true,
                required: ["2", "1"],
                weight: 10,
                multiGrades: true
            },
            {
                name: "Vertiefung 2",
                key: "22",
                editMode: true,
                required: [],
                weight: 10,
                multiGrades: true
            }
        ]

        const c1BasicInf: GeneralInformationsCreationType = {
            name: "Test",
            shortName: "TST",
            amoundRequiredEmphasis: 2,
            spo: 1
        }

        const result: DegreeOption = createFinaleData({
            elevatives: c1Elevatives,
            examPackages: c1ExamPackages,
            exams: c1Exams,
            emphasis: c1Emphasis,
            basicInformations: c1BasicInf
        })

        expect(result.data.basics.weight).toBe(50)
        // should be 2 not three because one exam is ignored as its not required
        expect(Object.keys(result.data.exams).length).toBe(3)

    })

    test("if no elevative is working", () => {

        const c2Exams: ExamCreationType[] = [
            {
                name: "Test",
                examid: 302010,
                key: "123",
                ects: 5,
                semester: 2,
                editMode: false,
                index: 0
            },
            {
                name: "Einführung in die WIN",
                examid: 203040,
                key: "456",
                ects: 5,
                semester: 3,
                editMode: true,
                index: 1
            },
            {
                name: "Not used Exam",
                examid: 203050,
                key: "789",
                ects: 5,
                semester: 3,
                editMode: true,
                index: 1
            }
        ]

        const c2ExamPackages: ExamPackageCreationType[] = [
            {
                name: "Modul1",
                weight: 10,
                key: "0",
                editMode: true,
                examPackageID: 111111,
                required: []
            },
            {
                name: "Modul2",
                weight: 10,
                key: "1",
                examPackageID: 123456,
                editMode: false,
                required: ["456", "123"]
            }
        ]

        const c2Emphasis: EmphasisCreationType[] = [
            {
                name: "Vertiefung 1",
                key: "11",
                editMode: true,
                required: ["1"],
                weight: 10,
                multiGrades: true
            },
            {
                name: "Vertiefung 2",
                key: "22",
                editMode: true,
                required: [],
                weight: 10,
                multiGrades: true
            }
        ]

        const result: DegreeOption = createFinaleData({
            elevatives: [],
            examPackages: c2ExamPackages,
            exams: c2Exams,
            emphasis: c2Emphasis,
            basicInformations: defBasicInf
        })

        expect(result.data.basics.weight).toBe(10)

    })

    test("if no emphasis is working", () => {

        const c3Exams: ExamCreationType[] = [
            {
                name: "Test",
                examid: 302010,
                key: "123",
                ects: 5,
                semester: 2,
                editMode: false,
                index: 0
            },
            {
                name: "Einführung in die WIN",
                examid: 203040,
                key: "456",
                ects: 5,
                semester: 3,
                editMode: true,
                index: 1
            },
            {
                name: "Not used Exam",
                examid: 203050,
                key: "789",
                ects: 5,
                semester: 3,
                editMode: true,
                index: 1
            }
        ]

        const c3ExamPackages: ExamPackageCreationType[] = [
            {
                name: "Modul1",
                weight: 10,
                key: "0",
                editMode: true,
                examPackageID: 111111,
                required: []
            },
            {
                name: "Modul2",
                weight: 10,
                key: "1",
                examPackageID: 123456,
                editMode: false,
                required: ["456", "123"]
            }
        ]

        const c3Elevatives: ElevativeCreationType[] = [
            {
                name: "Wahlfach A",
                examPackageID: 1,
                key: "2",
                weight: 5,
                editMode: false,
                unit: "ECTS",
                options: [{
                    required: 1,
                    ids: ["123"],
                    key: "1",
                    editMode: true
                },
                {
                    required: 2,
                    ids: ["123", "456"],
                    key: "2",
                    editMode: true
                }],
            },
            {
                name: "Wahlfach B",
                examPackageID: 2,
                key: "3",
                editMode: true,
                weight: 20,
                options: [{
                    required: 1,
                    ids: ["789"],
                    key: "3",
                    editMode: true
                }],
                unit: "ECTS"
            }
        ]

        const result: DegreeOption = createFinaleData({
            elevatives: c3Elevatives,
            examPackages: c3ExamPackages,
            exams: c3Exams,
            emphasis: [],
            basicInformations: defBasicInf
        })

        expect(result.data.basics.weight).toBe(45)
    })

    test("if emphasis elevtive is working", () => {

        const c4Exams: ExamCreationType[] = [
            {
                name: "Test",
                examid: 302010,
                key: "123",
                ects: 5,
                semester: 2,
                editMode: false,
                index: 0
            },
            {
                name: "Einführung in die WIN",
                examid: 203040,
                key: "456",
                ects: 5,
                semester: 3,
                editMode: true,
                index: 1
            },
            {
                name: "Not used Exam",
                examid: 203050,
                key: "789",
                ects: 5,
                semester: 3,
                editMode: true,
                index: 1
            }
        ]

        const c4ExamPackages: ExamPackageCreationType[] = [
            {
                name: "Modul1",
                weight: 10,
                key: "0",
                editMode: true,
                examPackageID: 111111,
                required: []
            },
            {
                name: "Modul2",
                weight: 10,
                key: "1",
                examPackageID: 123456,
                editMode: false,
                required: ["456", "123"]
            }
        ]

        const c4Elevatives: ElevativeCreationType[] = [
            {
                name: "Wahlfach A",
                examPackageID: 1,
                key: "2",
                weight: 5,
                editMode: false,
                unit: "ECTS",
                options: [{
                    required: 1,
                    ids: ["123"],
                    key: "1",
                    editMode: true
                },
                {
                    required: 2,
                    ids: ["123", "456"],
                    key: "2",
                    editMode: true
                }],
            },
            {
                name: "Wahlfach B",
                examPackageID: 2,
                key: "3",
                editMode: true,
                weight: 20,
                options: [{
                    required: 1,
                    ids: ["789"],
                    key: "3",
                    editMode: true
                }],
                unit: "ECTS"
            }
        ]

        const c4Emphasis: EmphasisCreationType[] = [
            {
                name: "Vertiefung 1",
                key: "11",
                editMode: true,
                required: ["2", "1"],
                weight: 10,
                multiGrades: true
            },
            {
                name: "Vertiefung 2",
                key: "22",
                editMode: true,
                required: ["3"],
                weight: 10,
                multiGrades: true
            }
        ]

        const result: DegreeOption = createFinaleData({
            elevatives: c4Elevatives,
            examPackages: c4ExamPackages,
            exams: c4Exams,
            emphasis: c4Emphasis,
            basicInformations: defBasicInf
        })

        result.data.basics.elevtive.map(x => expect(x.emphasis_elevtive).toBeTruthy())

    })

    test("if multiOption is working", () => {
        const c5Exams: ExamCreationType[] = [
            {
                name: "Test",
                examid: 302010,
                key: "123",
                ects: 5,
                semester: 2,
                editMode: false,
                index: 0
            },
            {
                name: "Einführung in die WIN",
                examid: 203040,
                key: "456",
                ects: 5,
                semester: 3,
                editMode: true,
                index: 1
            },
            {
                name: "Not used Exam",
                examid: 203050,
                key: "789",
                ects: 5,
                semester: 3,
                editMode: true,
                index: 1
            }
        ]

        const c5ExamPackages: ExamPackageCreationType[] = [
            {
                name: "Modul1",
                weight: 10,
                key: "0",
                editMode: true,
                examPackageID: 111111,
                required: []
            },
            {
                name: "Modul2",
                weight: 10,
                key: "1",
                examPackageID: 123456,
                editMode: false,
                required: ["456", "123"]
            }
        ]

        const c5Elevatives: ElevativeCreationType[] = [
            {
                name: "Wahlfach A",
                examPackageID: 1,
                key: "2",
                weight: 5,
                editMode: false,
                unit: "ECTS",
                options: [{
                    required: 1,
                    ids: ["123"],
                    key: "1",
                    editMode: true
                },
                {
                    required: 2,
                    ids: ["123", "456"],
                    key: "2",
                    editMode: true
                }],
            },
            {
                name: "Wahlfach B",
                examPackageID: 2,
                key: "3",
                editMode: true,
                weight: 20,
                options: [{
                    required: 1,
                    ids: ["789", "123"],
                    key: "3",
                    editMode: true
                },
                {
                    required: 1,
                    ids: ["123, 456"],
                    key: "4",
                    editMode: true
                }],
                unit: "ECTS"
            }
        ]

        const c5Emphasis: EmphasisCreationType[] = []

        const result: DegreeOption = createFinaleData({
            elevatives: c5Elevatives,
            examPackages: c5ExamPackages,
            exams: c5Exams,
            emphasis: c5Emphasis,
            basicInformations: defBasicInf
        })

        result.data.basics.elevtive.forEach(x => expect(x.multiOption).toBeTruthy())
    })

    test("if no emphasis and elevative is working", () => {
        const c6Exams: ExamCreationType[] = [
            {
                name: "Test",
                examid: 302010,
                key: "123",
                ects: 5,
                semester: 2,
                editMode: false,
                index: 0
            },
            {
                name: "Einführung in die WIN",
                examid: 203040,
                key: "456",
                ects: 5,
                semester: 3,
                editMode: true,
                index: 1
            },
            {
                name: "Not used Exam",
                examid: 203050,
                key: "789",
                ects: 5,
                semester: 3,
                editMode: true,
                index: 1
            }
        ]

        const c6ExamPackages: ExamPackageCreationType[] = [
            {
                name: "Modul1",
                weight: 10,
                key: "0",
                editMode: true,
                examPackageID: 111111,
                required: []
            },
            {
                name: "Modul2",
                weight: 10,
                key: "1",
                examPackageID: 123456,
                editMode: false,
                required: ["456", "123"]
            }
        ]

        const c6Elevatives: ElevativeCreationType[] = []

        const c6Emphasis: EmphasisCreationType[] = []

        const result: DegreeOption = createFinaleData({
            elevatives: c6Elevatives,
            examPackages: c6ExamPackages,
            exams: c6Exams,
            emphasis: c6Emphasis,
            basicInformations: defBasicInf
        })

        expect(result.data.basics.weight).toBe(20)
        expect(result.data.basics.ects).toBe(15)
    })

})