import {options} from "./index"

// test if data is valid
// note: this does not mean the data is 100% correct

describe("test all available data", () => {
   Object.keys(options).map((single: string) => {
      describe("test " + single, () => {
      // go through all exams and check if packageId is given
      test("if exams are valid", () => {
         Object.keys(options[single].exams).map((examid: string) => {
         const packageId: string = options[single].exams[examid].packageid
         // if value is not going to ignored
         if(!options[single].exams[examid].ignored){
         expect(options[single].examPackages[packageId]).toBeDefined()
         expect(options[single].examPackages[packageId].required.includes(packageId))
         }
         })
      })
      test("if examPackages are valid", () => {
         Object.keys(options[single].examPackages).map(examPackage => {
            options[single].examPackages[examPackage].required.map((examid: string) => {
               expect(options[single].exams[examid]).toBeDefined()
               expect(options[single].exams[examid].packageid).toBe(parseFloat(examPackage))
            })
         })
      })
      test("of emphasis data is valid", () => {
         expect(options[single].basics.required_emphasis).toBeLessThanOrEqual(options[single].basics.emphasis.length)
         options[single].basics.emphasis.map(singleEmphasis => {
            singleEmphasis.ids.map((packageid: number) => {
               expect(options[single].examPackages[packageid]).toBeDefined()
            })
         })
      })
   })
})
})

