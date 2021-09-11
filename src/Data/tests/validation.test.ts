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
                        }
                        else {
                            expect(single.data.basics.semesterChoices[single.data.exams[examid].semester_choise]).toBeDefined()
                        }
                        if (single.data.exams[examid].packageOptions) {
                            expect(single.data.exams[examid].packageid).not.toBeDefined()
                            const elevativeWithThisExam = single.data.basics.elevtive.filter(x => {
                                if (x.ids && x.ids.includes(parseInt(examid))) return true
                                if (x.options && x.options.some(x => x.ids.includes(parseInt(examid)))) return true
                                return false
                            })
                            elevativeWithThisExam.forEach(elev => {
                                expect(elev.multiOption || elev.choiseID).toBeDefined()
                            })
                            single.data.exams[examid].packageOptions.forEach((option: number) => {
                                expect(single.data.examPackages[option]).toBeDefined()
                                expect(single.data.examPackages[option].required.includes(option))
                            })
                        }
                        else {
                            if (!single.data.examPackages[packageId]) {
                                console.log(packageId)
                            }
                            expect(single.data.examPackages[packageId]).toBeDefined()
                            expect(single.data.examPackages[packageId].required).toContain(parseInt(examid))
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
                        if (!single.data.exams[examid].packageid) {
                            expect(single.data.exams[examid].packageOptions).toBeDefined()
                            expect(single.data.exams[examid].packageOptions.length).toBeGreaterThan(1)
                            expect(single.data.exams[examid].packageOptions).toContain(parseFloat(examPackage))
                        }
                        else {
                            expect(single.data.exams[examid].packageid).toBeDefined()
                            expect(single.data.exams[examid].packageid).toBe(parseFloat(examPackage))
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
                        single.data.examPackages[packageid].required.forEach(id => {
                            if(!single.data.exams[id].emphasisid){
                                console.log(id)
                            }
                            expect(single.data.exams[id].emphasisid).toBe(singleEmphasis.emphasisid)
                        })
                    })

                    expect(singleEmphasis.weight).toBeDefined()

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
                    if (singleElevative.multiOption) {
                        expect(singleElevative.choiseID).toBeDefined()
                    }
                    if (singleElevative.requiredEcts) {
                        expect(singleElevative.multiOption).not.toBeDefined()
                        expect(singleElevative.required).not.toBeDefined()
                    }
                    if (singleElevative.required) {
                        expect(singleElevative.requiredEcts).not.toBeDefined()
                    }
                    if (!singleElevative.emphasis_elevtive) {
                        expect(single.data.examPackages[singleElevative.examid]).toBeDefined()
                        if (!singleElevative.options) {
                            singleElevative.ids.map((examID: number) => {
                                expect(single.data.exams[examID]).toBeDefined()
                                expect(single.data.examPackages[singleElevative.examid].required).toContain(examID)
                            })
                        }
                        else {
                            singleElevative.options.map((elev) => {
                                elev.ids.forEach(id => {
                                    expect(single.data.exams[id]).toBeDefined()
                                })
                                if (elev.optionId) {
                                    const otherElevsWithThisOptionID = singleElevative.options.filter(x => x.optionId === elev.optionId)
                                    expect(otherElevsWithThisOptionID.length).toBeGreaterThan(1)
                                }
                            })
                        }
                    } else {
                        expect(single.data.exams[singleElevative.examid]).toBeDefined()
                    }
                    if (singleElevative.options) {
                        singleElevative.options.map(alternative => {
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
