import React from 'react';
import { Upload, message, Button, Card, Input } from 'antd';
import { InboxOutlined } from '@ant-design/icons';

const { Dragger } = Upload;
let pdfjsLib = require("pdfjs-dist/build/pdf");
let pdfjsWorker = require("pdfjs-dist/build/pdf.worker.entry");

// @ts-ignore: Unreachable code error
const dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
        onSuccess("ok");
    }, 0);
};

class PdfUpload extends React.Component {
    constructor(props: any) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    //Pdf-Content-Extraction
    // @ts-ignore: Unreachable code error
    handleChange = info => {
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
            var file = info.file.originFileObj

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
                    // @ts-ignore: Unreachable code error
                    return pdfFile.promise.then(function (pdfFile) {
                        var pageNumber = pdfFile._pdfInfo.numPages;
                        var countPromises = [];
                        for (var counter = 1; counter <= pageNumber; counter++) {
                            var page = pdfFile.getPage(counter);
                            // @ts-ignore: Unreachable code error
                            countPromises.push(page.then(function (page) {
                                var textContent = page.getTextContent();

                                return textContent.then(function (text: string) {
                                    // @ts-ignore: Unreachable code error
                                    return text.items.map(function (s) {
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
                    let arrayGrades = preprocessData(text);
                    let gradesFormatted: Array<any> = [];
                    arrayGrades.forEach(element => {
                        // let tempString = element.replace(/(\r\n|\n|\r)/gm, "$")
                        let tempString = element.replaceAll("✓", "$✓")
                        tempString = tempString.replaceAll("✕", "$✕")

                        let pdfPageAsList = tempString.split("$")

                        // @ts-ignore: Unreachable code error
                        pdfPageAsList.forEach(element => {
                            let tempObject = extractGradeProcess(element, pdfPageAsList)
                            if (tempObject != null) {
                                gradesFormatted.push(tempObject)
                            }
                        });
                    });
                    // @ts-ignore: Unreachable code error
                    gradesFormatted = JSON.stringify(gradesFormatted)
                    return gradesFormatted
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
                        let tempObject = {}
                        // @ts-ignore: Unreachable code error
                        tempObject["Prüfungsnummer"] = found[0]
                        var indexOfFound = pdfPageAsList.indexOf(originalElement)
                        let note = pdfPageAsList[indexOfFound + 1].substring(0, 4)
                        if (note.includes("✓")) {
                            // @ts-ignore: Unreachable code error
                            tempObject["Status"] = "Bestanden"
                            if (note.includes(",")) {
                                note = note.replace("✓", "")
                                // @ts-ignore: Unreachable code error
                                tempObject["Note"] = note
                            }
                            else {
                                // @ts-ignore: Unreachable code error
                                tempObject["Note"] = "Bestanden ohne Note"
                            }
                        }
                        if (note.includes("✕")) {
                            // @ts-ignore: Unreachable code error
                            tempObject["Status"] = "Nicht Bestanden"
                            if (note.includes(",")) {
                                note = note.replace("✕", "")
                                // @ts-ignore: Unreachable code error
                                tempObject["Note"] = note
                            }
                            else {
                                // @ts-ignore: Unreachable code error
                                tempObject["Note"] = "Nicht Bestanden ohne Note"
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
                {/* <Card title="Card title" bordered={false} style={{ width: 300 }}>
                    <div>
                        <Input type="file" onChange={(e) => this.handleChange(e.target.files)} />
                    </div>
                </Card> */}
                {/* @ts-ignore: Unreachable code error */}
                <Dragger customRequest={dummyRequest} onChange={this.handleChange}>
                    <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">Notenspiegel per Klick oder drag & drop einlesen</p>
                    <p className="ant-upload-hint">
                        Support for a single or bulk upload. Strictly prohibit from uploading company data or other
                        band files
                    </p>
                </Dragger>
            </div>
        )
    }
}

export default PdfUpload