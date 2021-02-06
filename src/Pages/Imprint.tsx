import React from "react"
import {Footer, Header} from "../Components"

class Imprint extends React.Component{

    render(){
        return(
            <div>
                <div className="content imprint">
                <Header home={false}/>
                </div>
                <Footer/>
            </div>
        )
    }

}

export default Imprint
