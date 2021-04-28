import {options} from "./index"
import { DegreeOption } from "./types"

// test if data is valid
// note: this does not mean the data is 100% correct

describe("test all available data", () => {
   options.map((single: DegreeOption) => {
      describe("test " + single, () => {
      // go through all exams and check if packageId is given
      test("if exams are valid", () => {
         Object.keys(single.data.exams).map((examid: string) => {
         const packageId: string = single.data.exams[examid].packageid
         // filter Elevatives and get all those that are part of an emphasis
         const ElvativesInEmphasis: number[] = single.data.basics.elevtive ? single.data.basics.elevtive.filter(single => single.emphasis_elevtive).map(x => x.examid) : []
         // if value is not going to ignored
         if(!single.data.exams[examid].ignored && !(ElvativesInEmphasis.includes(parseInt(packageId)))){
            if(!single.data.examPackages[packageId]){
               console.log(packageId, single.data.examPackages[packageId])
            }
            expect(single.data.examPackages[packageId]).toBeDefined()
            expect(single.data.examPackages[packageId].required.includes(packageId))
         }
         })
      })
      test("if examPackages are valid", () => {
         Object.keys(single.data.examPackages).map(examPackage => {
            single.data.examPackages[examPackage].required.map((examid: string) => {
               expect(single.data.exams[examid]).toBeDefined()
               expect(single.data.exams[examid].packageid).toBe(parseFloat(examPackage))
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
   })
})
})
