import React from "react"
import {Footer, Header} from "../Components"
class Explanation extends React.Component{
    render(){
        return(
            <div>
                <div className="content">
                <Header home={false}/>
                </div>
                <Footer/>
            </div>
        )
    }

}

export default Explanation