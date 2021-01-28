// Basic Information about each degree
export interface BasicInformation {
    ects: number,
    required_emphasis: number,
    emphasis: Emphasis[] | null
}

// used in BasicInformation - information about Emphasis
export interface Emphasis {
    ids: number[],
    name: string,
    weight: number,
    emphasisid: number
}

// all the exams the degree has
export interface Exams{
    [key: number]: Exam
}

export interface Exam{
    semester: number,
    ects: number,
    weight: number,
    name: string,
    packageid: number,
    emphasisid?: number
}

// all the packages of exams the exams get turned into
export interface ExamPackages{
    [Key: number]: {
        name: string,
        weight: number,
        required: number[]
    }
}

// object of all options
export interface DegreeOptions{
    [Key: string]: SingleOption
}


// single option
export interface SingleOption{
    basics: BasicInformation,
    exams: Exams,
    examPackages: ExamPackages
}

// imput into calculation
export interface Input{
    examid: number,
    grade: number,
    estimated?: boolean
}