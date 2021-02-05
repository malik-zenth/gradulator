// Imports
import React from 'react';
import { Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
const { Dragger } = Upload;
import { Input } from "../Data/types";

//Pds.js setup
let pdfjsLib = require("pdfjs-dist/build/pdf");
let pdfjsWorker = require("pdfjs-dist/build/pdf.worker.entry");

//Request for pdf.js
const dummyRequest = ({ onSuccess = Function }) => {
    setTimeout(() => {
        onSuccess("ok");
    }, 0);
};

//Interface definition

interface uploadedFile {
    file: {
        name: string,
        originFileObj: Object,
        status: string
    }
}

interface pdfFile {
    _pdfInfo: {
        numPages: Number,
    },
    getPage: Function
}

interface pdfPage {
    getTextContent: Function
}

interface parsedText {
    items: {
        [key: string]: any
    }
}

interface extractedGrades {
    studiengang: string,
    grades : {
        [key: string]: any
    }
}

class PdfUpload extends React.Component {
    constructor(props: any) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    //Pdf-Content-Extraction
    handleChange = (info: uploadedFile) => {
        const { status } = info.file;
        if (status === 'done') {
            message.success(`${info.file.name} file uploaded successfully.`);
            handleUpload();

        } else if (status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
            handleUpload();
        }

        function handleUpload() {
            //Save uploaded file within var
            var file:any = info.file.originFileObj

            //Declare new FileReader Object
            var fileReaderObject = new FileReader();

            //When then FileReader is loaded, extractText
            fileReaderObject.onload = function () {

                // Transform file to TypedArray representation (needed for pdfjs)
                // @ts-ignore: Unreachable code error
                var fileAsTypedArray = new Uint8Array(this.result);

                // Will call sub-process to extract grades from text
                transformPdftoText(fileAsTypedArray).then(function (text: string) {
                    let returnedObject = mainProcess(text);
                    console.log(returnedObject);
                }, function (reason: string) {
                    alert('Seems this file is broken, please upload another file');
                });

                //Will transform pdf object to text
                function transformPdftoText(fileAsTypedArray: Uint8Array) {
                    var pdfFile = pdfjsLib.getDocument(fileAsTypedArray);
                    return pdfFile.promise.then(function (pdfFile: pdfFile) {
                        var pageNumber = pdfFile._pdfInfo.numPages;
                        var countPromises = [];
                        for (var counter = 1; counter <= pageNumber; counter++) {
                            var page = pdfFile.getPage(counter);
                            countPromises.push(page.then(function (page: pdfPage) {
                                var textContent = page.getTextContent();

                                return textContent.then(function (text: parsedText) {
                                    return text.items.map(function (s: any) {
                                        return s.str;
                                    }).join('');
                                });
                            }));
                        }
                        return Promise.all(countPromises).then(function (texts) {
                            return texts.join('');
                        });
                    });
                }

                //mainProcess will perform data preprocessing and grade extraction for each page of the pdf 
                function mainProcess(text: string) {
                    let Studiengang = extractStudiengang(text)
                    let arrayGrades = preprocessData(text);
                    let gradesFormatted: Array<Input> = [];
                    arrayGrades.forEach(element => {
                        let tempString = element.replaceAll("✓", "$✓")
                        tempString = tempString.replaceAll("✕", "$✕")

                        let pdfPageAsList = tempString.split("$")

                        pdfPageAsList.forEach(function (element: string) {
                            let tempObject = extractGradeProcess(element, pdfPageAsList)
                            if (tempObject != null) {
                                gradesFormatted.push(tempObject)
                            }
                        });
                    });
                    var extractedGrades: extractedGrades = {studiengang: Studiengang, grades: gradesFormatted}
                    return extractedGrades
                }

                // Will extract Studiengang from text
                function extractStudiengang(text:string) {
                    const firstSplit: string = "Studiengang / Program: ";
                    const secondSplit: string = "  SPO-Version / Examination regulation version:";
                    const Studiengang: string = text.substring(
                        text.lastIndexOf(firstSplit) + firstSplit.length, 
                        text.lastIndexOf(secondSplit)
                    );
                    return Studiengang
                }

                // Will preprocess the data
                function preprocessData(text: string) {
                    let stoken;
                    stoken = text.split("Grade")
                    stoken.splice(0, 1);
                    let arrayGrades: Array<any> = []
                    stoken.forEach(element => {
                        var splittedText = element.split("Daten- und Notenabschrift / Transcript of Records")
                        if (splittedText.length > 1) {
                            splittedText.forEach(element => {
                                let tempString = element.replace(/(\r\n|\n|\r)/gm, "")
                                if (tempString.match(/^\d/)) {
                                    arrayGrades.push(element);
                                }
                            });
                        }
                        else {
                            arrayGrades.push(element);
                        }
                    });
                    return arrayGrades
                }

                //Will extract grades from data
                function extractGradeProcess(element: any, pdfPageAsList: any) {
                    var tempregex = /\d{6}/;
                    let regEx = /(✓|✕)\d{1}\,\d\d{0}/;
                    let originalElement = element
                    let formattedGrade = element.match(regEx)
                    if (formattedGrade) {
                        element = element.replace(formattedGrade[0], formattedGrade[0] + "?")
                    }
                    const found = element.match(tempregex)
                    if (found) {
                        var indexOfFound = pdfPageAsList.indexOf(originalElement)
                        let note = pdfPageAsList[indexOfFound + 1].substring(0, 4)
                        if (note.includes("✓")) {
                            if (note.includes(",")) {
                                note = note.replace("✓", "")
                                note = note.replace(",", ".")
                                var tempObject: Input = { examid: parseInt(found[0]), grade: parseFloat(note), status: true, estimated: false };
                            }
                            else {
                                var tempObject: Input = { examid: parseInt(found[0]), grade: 0, status: true, estimated: false };
                            }
                        }
                        if (note.includes("✕")) {
                            if (note.includes(",")) {
                                note = note.replace("✕", "")
                                note = note.replace(",", ".")
                                var tempObject: Input = { examid: parseInt(found[0]), grade: parseFloat(note), status: false, estimated: false };
                            }
                            else {
                                var tempObject: Input = { examid: parseInt(found[0]), grade: 0, status: false, estimated: false };
                            }
                        }
                        return tempObject
                    }
                }
            };
            fileReaderObject.readAsArrayBuffer(file);
        }
    }

    render() {
        return (
            <div>
                {/* @ts-ignore: Unreachable code error */}
                <Dragger customRequest={dummyRequest} onChange={this.handleChange}>
                    <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">Notenspiegel per Klick oder drag & drop einlesen</p>
                    <p className="ant-upload-hint">
                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At
                    </p>
                </Dragger>
            </div>
        )
    }
}

export default PdfUpload