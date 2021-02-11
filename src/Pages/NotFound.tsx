import React from "react"
import {Header, Footer} from "../Components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {Button} from "antd"
import {
faSadCry
} from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";
// this page is going to be displayed if requested sub is not found
class NotFound extends React.Component{

    render(){
        return(
            <div>
            <div className="content imprint">
                <Header home={true}/>

                <div className="icon-404">
                <FontAwesomeIcon className="icon-notfound" icon={faSadCry}/>
                </div>
                <div className="button-notfound" >
                <h1>Wir können diese Seite leider nicht finden</h1>
                <Button htmlType="button" >
                        <Link to="/">zur Startseite</Link>
                    </Button>
                    </div>
            </div>
                <Footer/>
            </div>
        )
    }
}

export default NotFound