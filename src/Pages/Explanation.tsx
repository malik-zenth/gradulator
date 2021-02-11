import React from "react"
import {Footer, Header} from "../Components"
import {isMobile, isTablet} from "react-device-detect"

class Explanation extends React.Component{

    componentDidMount(){
        if(isMobile || isTablet){
        const content= document.getElementsByClassName("content")[0]
        const height: number = window.innerHeight - 60
        content.setAttribute("style", `min-height: ${height}px`)
        }
    }

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