import React from "react"
import PdfUpload from "../Components/PdfUpload"

// Home Page
class Home extends React.Component{

    render(){
        return(
            <div>
                Home-Page
                <PdfUpload></PdfUpload>
            </div>
        )
    }
}

export default Home