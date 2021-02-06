import React from "react"
import {Footer, Header} from "../Components"

class Contact extends React.Component{

    render(){
        return(
            <div>
            <div className="content contact">
                <Header home={false}/>
            </div>
            <Footer/>
            </div>
        )
    }

}

export default Contact

