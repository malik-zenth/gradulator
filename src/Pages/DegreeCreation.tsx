import React from "react"
import { Footer, Header} from "../Components"
import {ExamComponent, ExamPackageComponent} from "../Components/DegreeCreation"

interface iProps{}

interface iState{}

class DegreeCreation extends React.Component<iProps,iState>{
    constructor(props: iProps){
        super(props);
        this.state = {}
    }

    render(){
        return(
            <div>
                <div className="content">
                <Header home={false}/>
                <ExamPackageComponent
                    onDelete={() => console.log("DELETE")}
                    onSave={() => console.log("SAVE")}
                />
                </div>
                <Footer />
            </div>
        )
    }
}

export default DegreeCreation
