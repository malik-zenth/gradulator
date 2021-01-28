import React, { ReactFragment, ReactText } from "react";
import { BasicInformation, Emphasis, Exam, ExamPackages, Exams, SingleOption } from "../Data/types";
import { Form, Input, Select, Checkbox } from "antd";

interface IProps {
    options: SingleOption;
}

interface IState {
    notDisplayedEmphasis: number[]
}

const keyGenerator = (): ReactText =>
    "_" + Math.random().toString(36).substr(2, 9);

class GradeInput extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            notDisplayedEmphasis: []
        };
    }

    renderInputOptions(exams: Array<[string, number, Exam]>): ReactFragment {
        var lastSemester: number
        var showSemesterHeading: boolean
        if (exams == null) {
            return <div></div>;
        } else
            return exams.map((exam) => {
                lastSemester != exam[2].semester ? showSemesterHeading = true : showSemesterHeading = false
                lastSemester = exam[2].semester
                if(showSemesterHeading){
                    return(
                        <div>
                            <div className="form-semester-heading">{lastSemester}. Semester</div>
                            {this.renderInputField(exam)}
                        </div>
                    )
                }else{
                    return this.renderInputField(exam)
                }
            });
    }

    renderInputField(exam: [string, number, Exam]) {
        return (
            <div className="form-singleGrade" >
                <div className="form-singleGrade-name">{exam[2].name}</div>
                <Form.Item className="form-singleGrade-input" name={exam[0]}>
                    <Input style={{ width: 200 }} placeholder="Note eingeben" />
                </Form.Item>
            </div>
        )
    }

    renderEmphasisCheckboxes(basics: BasicInformation): ReactFragment {
        if (basics.emphasis) {
            return basics.emphasis.map(single => {
                return (
                    <div key={keyGenerator()}>
                        <Form.Item valuePropName="checked">
                            <Checkbox
                                onChange={() => this.changeCheckboxState(single.emphasisid)}
                                checked={!this.state.notDisplayedEmphasis.includes(single.emphasisid)}
                                name={single.name} >{single.name}</Checkbox>
                        </Form.Item>
                    </div>
                )
            })
        } else {
            return <div></div>
        }
    }

    changeCheckboxState(emphasisId: number) {
        const { notDisplayedEmphasis } = this.state
        if (notDisplayedEmphasis.includes(emphasisId)) {
            this.setState({ notDisplayedEmphasis: notDisplayedEmphasis.filter(x => x !== emphasisId) })
        } else {
            const newState: number[] = notDisplayedEmphasis.concat(emphasisId)
            this.setState({ notDisplayedEmphasis: newState })
        }
    }

    settupExamData(exams: Exams): Array<[string, number, Exam]> {
        var sorted: Array<[string, number, Exam]> = []
        for (var single in exams) {
            if (!this.state.notDisplayedEmphasis.includes(exams[single].emphasisid)) {
                sorted.push([single, exams[single].semester, exams[single]])
            }
        }
        sorted.sort((a, b) => (a[1] > b[1]) ? 1 : -1)
        return sorted
    }

    render() {
        const { options } = this.props;
        const { basics, exams, examPackages } = options;
        const orderdExams = this.settupExamData(exams)
        return (
            <div>
                <Form>
                    <div className="form-emphasis">
                        {this.renderEmphasisCheckboxes(basics)}
                    </div>
                    <div className="form-grades">
                        {this.renderInputOptions(orderdExams)}
                    </div>
                </Form>
            </div>
        );
    }
}

export default GradeInput;
