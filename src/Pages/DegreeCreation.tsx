import React from "react"
import { Footer, Header} from "../Components"
import {ExamPackageDegreeCreation} from "../Components/DegreeCreation"

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

                <ExamPackageDegreeCreation/>
                </div>
                <Footer />
            </div>
        )
    }
}

export default DegreeCreation
