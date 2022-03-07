import { Button, Col, Divider, Row, Table, Tag } from "antd"
import { ColumnsType } from "antd/lib/table"
import FileSaver from "file-saver"
import { numToWord } from "num-words-de"
import React, { ReactText, useContext, useState } from "react"
import { DegreeOption } from "../../../Data/types"
import { MailLinkNewDegree } from "../../const"
import { createFinaleData } from "../CreateFinalData"
import { validateDataProps, validateFinaleData } from "../CreateFinalData/ValidateFinalData"
import { CreatorContext } from "../CreatorContext"
import { InValidDataModal } from "../Modals/DeleteModals"
import { ElevativeCreationType, ElevativeOptionType, EmphasisCreationType, ExamCreationType, ExamPackageCreationType } from "../types"

interface iProps {

}

const keyGenerator = (): ReactText =>
    "_" + Math.random().toString(36).substr(2, 9);

const OverviewStep = (props: iProps) => {
    const { basicInformations, exams, examPackages, elevatives, emphasis, semesterChoises } = useContext(CreatorContext)
    const [showModal, setShowModal] = useState<boolean>(false)
    const [dataErrors, setDataErrors] = useState<string[]>([])

    const sortedExams = exams.sort((a: ExamCreationType, b: ExamCreationType) => (a.semester > b.semester) ? 1 : ((b.semester > a.semester) ? -1 : 0))

    const examColumns: ColumnsType<ExamCreationType> = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
            width: "30%"
        },
        {
            title: "Prüfungsnummer",
            dataIndex: "examid",
            key: "examid",
            width: "15%",
            align: "center"
        },
        {
            title: "ECTS",
            dataIndex: "ects",
            key: "ects",
            width: "15%",
            align: "center"
        },
        {
            title: "Semester",
            dataIndex: "semester",
            width: "15%",
            key: "semester",
        },
        {
            title: "Zuordnungsgruppe",
            dataIndex: "semesterChoiseKey",
            key: "semesterChoiseKey",
            render: semesterChoiseKey => (
                <>
                {semesterChoises.filter(x => x.key === semesterChoiseKey).map(x => x.name)}
                </>
            )
        }
    ]

    const examPackageColumns: ColumnsType<ExamPackageCreationType> = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
            width: "30%",
        },
        {
            title: "Modulprüfungsnummer",
            dataIndex: "examPackageID",
            key: "examPackageID",
            width: "15%",
            align: "center"
        },
        {
            title: "Gewichtung",
            dataIndex: "weight",
            key: "weight",
            width: "15%",
            align: "center"
        },
        {
            title: "Benötigte Prüfungen",
            dataIndex: "required",
            key: "required",
            render: required => (
                <>
                    {required.map((single: string) => {
                        const examForID: ExamCreationType = exams.filter(x => x.key === single).shift()
                        return (
                            <Tag color="geekblue" key={keyGenerator()}>
                                {examForID.name} - Gewichtung: {examForID.weight}
                            </Tag>
                        )
                    })}
                </>
            )
        }
    ]

    const elevativeColumns: ColumnsType<ElevativeCreationType> = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
            width: "18%"
        },
        {
            title: "Modulprüfungsnummer",
            dataIndex: "examPackageID",
            key: "examPackageID",
            width: "12%",
            align: "center"
        },
        {
            title: "Gewichtung",
            dataIndex: "weight",
            key: "weight",
            width: "15%",
            align: "center"
        },
        {
            title: "Einheit",
            dataIndex: "unit",
            key: "weight",
            width: "15%",
            align: "center"
        },
        {
            title: "Benötigte Prüfungen",
            dataIndex: "options",
            key: "options",
            render: options => (
                <>
                    {options.map((single: ElevativeOptionType) => {
                        const examsForThisOption: ExamCreationType[] = exams.filter(x => single.ids.includes(x.key))
                        return (
                            <div key={keyGenerator()} style={{ marginTop: "5px" }}>
                                {numToWord(single.required, { indefinite_eine: true })} aus:
                                {renderSingleOptionElevative(examsForThisOption)}
                            </div>
                        )
                    })}
                </>
            )
        }
    ]

    const emphasisColumn: ColumnsType<EmphasisCreationType> = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
            width: "30%"
        },
        {
            title: "Gewichtung",
            dataIndex: "weight",
            key: "weight",
            width: "15%",
            align: "center"
        },
        {
            title: "Eine Note",
            dataIndex: "multiGrades",
            key: "multiGrades",
            width: "15%",
            align: "center",
            render: multiGrades => (
                <>
                    {multiGrades && "Ja"}
                    {!multiGrades && "Nein"}
                </>
            )
        },
        {
            title: "Benötigte Prüfungen",
            dataIndex: "required",
            key: "required",
            render: required => (
                <>
                    {required.map((single: string) => {
                        const examPackageForID: ExamPackageCreationType = examPackages.filter(x => x.key === single).shift()
                        if (examPackageForID) {
                            return (
                                <Tag color="geekblue" key={keyGenerator()}>
                                    {examPackageForID.name} - Gewichtung: {examPackageForID.weight}
                                </Tag>
                            )
                        }
                        const elevativeForID: ElevativeCreationType = elevatives.filter(x => x.key === single).shift()
                        return (
                            <Tag color="geekblue" key={keyGenerator()}>
                                {elevativeForID.name} - Gewichtung: {elevativeForID.weight}
                            </Tag>
                        )
                    })}
                </>
            )
        }
    ]

    const renderSingleOptionElevative = (examsForThisOption: ExamCreationType[]) => {
        return examsForThisOption.map(single => {
            return (
                <Tag style={{ marginLeft: "10px" }} color="geekblue" key={keyGenerator()}>
                    {single.name}
                </Tag>
            )
        })

    }

    const downloadData = () => {
        const validatedData: validateDataProps = validateFinaleData({basicInformations, exams, examPackages, elevatives, emphasis, semesterChoises})
        if(validatedData.valid){
            const degreeOption: DegreeOption =  createFinaleData({basicInformations, exams, examPackages, elevatives, emphasis, semesterChoises})
            const jsondata: string = JSON.stringify(degreeOption)
            const newblob = new Blob([jsondata], {type: "text/json;charset=utf-8,"})
            FileSaver.saveAs(newblob, "data_gradulator.json")
            window.open(MailLinkNewDegree)
        }
        else{
            setShowModal(true)
            setDataErrors(validatedData.errors)

        }
    }

    const buttonSendData = () => {
        return (
            <div className="buttonBasicInformations">
                <Button
                    type="primary"
                    htmlType="submit"
                    onClick={() => downloadData()}
                    download="finalDataGradulator.json"
                    >
                    Finale Datei herunterladen
                </Button>
            </div>
        )
    }
    return (
        <div className="singleStepDegreeCreator">
            <InValidDataModal
                visible={showModal}
                onReturn={() => setShowModal(false)}
                errors={dataErrors}
            />

            <h2 className="imprint-heading">Übersicht {basicInformations.name} ({basicInformations.shortName})</h2>
            <h3 className="imprint-heading">SPO: {basicInformations.spo}</h3>
            <h4 className="imprint-heading">{numToWord(basicInformations.amoundRequiredEmphasis)} Schwerpunkte benötigt</h4>
            {buttonSendData()}
            <Divider orientation="left">Prüfungen</Divider>
            <Table dataSource={sortedExams} columns={examColumns} />

            <Divider orientation="left">Modulprüfungen</Divider>
            <Table dataSource={examPackages} columns={examPackageColumns} />

            <Divider orientation="left">Wahlfächer</Divider>
            <Table dataSource={elevatives} columns={elevativeColumns} />

            <Divider orientation="left">Schwerpunkte</Divider>
            <Table dataSource={emphasis} columns={emphasisColumn} />
        </div>
    )
}

export default OverviewStep