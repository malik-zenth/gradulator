import React from "react"
import {Formular} from "../Components"

// Home Page
class Home extends React.Component{

    render(){

        const testInput = [{
            examid: 282130,
            grade: 1.0,
            estimated: false
        },{
            examid: 282135,
            grade: 2.0
        }]

        
        return(
            <div>
                Home-Page

                <Formular
                selected={"Wirtschaftsinformatik"}
                inputGrades={testInput}
                />
            </div>
        )
    }
}

export default Home