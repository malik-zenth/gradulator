import { options } from "../index"
import { DegreeOption } from "../types"

// test if data is valid
// note: this does not mean the data is 100% correct

describe("test all available data", () => {
    options.map((single: DegreeOption) => {
        describe("test " + single.shortName, () => {
            // go through all exams and check if packageId is given
            test("if exams are valid", () => {
                Object.keys(single.data.exams).map((examid: string) => {
                    const packageId: string = single.data.exams[examid].packageid
                    // filter Elevatives and get all those that are part of an emphasis
                    const ElvativesInEmphasis: number[] = single.data.basics.elevtive ? single.data.basics.elevtive.filter(single => single.emphasis_elevtive).map(x => x.examid) : []
                    // if value is not going to ignored
                    if (!single.data.exams[examid].ignored && !(ElvativesInEmphasis.includes(parseInt(packageId)))) {
                        if (!single.data.exams[examid].semester_choise) {
                            expect(single.data.exams[examid].semester).toBeDefined()
                            expect(single.data.examPackages[packageId]).toBeDefined()
                            expect(single.data.examPackages[packageId].required.includes(packageId))
                        }
                        else {
                            expect(single.data.basics.semesterChoices[single.data.exams[examid].semester_choise]).toBeDefined()
                        }

                        if (single.data.exams[examid].packageOptions) {
                            single.data.exams[examid].packageOptions.forEach((option: number) => {
                                expect(single.data.examPackages[option]).toBeDefined()
                                expect(single.data.examPackages[option].required.includes(option))
                            })
                        }
                    }
                })
            })
            test("if examPackages are valid", () => {
                Object.keys(single.data.examPackages).map(examPackage => {
                    single.data.examPackages[examPackage].required.map((examid: string) => {
                        if (!single.data.exams[examid]) {
                            console.log(examid)
                        }
                        expect(single.data.exams[examid]).toBeDefined()
                        if (!single.data.exams[examid].semester_choise) {
                            expect(single.data.exams[examid].packageid).toBe(parseFloat(examPackage))
                        }
                        else {
                            expect(single.data.exams[examid].packageOptions).toBeDefined()
                            expect(single.data.exams[examid].packageOptions).toContain(parseFloat(examPackage))
                        }
                        if (!single.data.exams[examid].ignored) {
                            expect(single.data.exams[examid].weight).toBeGreaterThan(0)
                        }
                    })
                })
            })
            test("if emphasis data is valid", () => {
                expect(single.data.basics.required_emphasis).toBeLessThanOrEqual(single.data.basics.emphasis.length)
                single.data.basics.emphasis.map(singleEmphasis => {
                    singleEmphasis.ids.map((packageid: number) => {
                        expect(single.data.examPackages[packageid]).toBeDefined()
                    })
                })
            })
            test("if emphasis ids are valid", () => {
                single.data.basics.emphasis.map(singleEmphasis => {
                    singleEmphasis.ids.map((packageid: number) => {
                        single.data.examPackages[packageid].required.map(singleRequired => {
                            expect(single.data.exams[singleRequired].emphasisid).toBe(singleEmphasis.emphasisid)
                        })
                    })
                })
            })
            test("if elevative data is valid", () => {
                single.data.basics.elevtive && single.data.basics.elevtive.map(singleElevative => {
                    expect(singleElevative.examid).toBeDefined()
                    if (!singleElevative.emphasis_elevtive) {
                        expect(single.data.examPackages[singleElevative.examid]).toBeDefined()
                        singleElevative.ids.map((examID: number) => {
                            expect(single.data.exams[examID]).toBeDefined()
                            expect(single.data.examPackages[singleElevative.examid].required).toContain(examID)
                        })
                    } else {
                        expect(single.data.exams[singleElevative.examid]).toBeDefined()
                    }
                    if (singleElevative.alternatives) {
                        singleElevative.alternatives.map(alternative => {
                            alternative.ids.forEach(id => {
                                expect(single.data.exams[id]).toBeDefined()
                            })
                        })
                    }
                })
            })
        })
    })
})
