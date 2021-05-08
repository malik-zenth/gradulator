// all types in here are subtypes of the once used for the data
// they are subtypes, because some party of the final object
// are not defined jet when creating them
// e.g. the required Exams inside of an ExamPackage are not defined jet
// when the ExamPackage is created

export interface ExamCreationType{
    ects: number,
    name: string,
    weight: number,
    semester: number
}

export interface ExamPackageCreationType{
    name: string,
    weight: number,
}