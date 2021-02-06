import React from "react"
import { Link } from "react-router-dom";
import {Button} from "antd"

interface IProps{
    home: boolean,
    showHome?:Function
}

interface IState{}

// depending on parameter home return full header or small one for subpages
class Header extends React.Component<IProps, IState>{

    render(){
        const {home, showHome} = this.props
        if(home) return(
            <div>
                <div className="header">
                    <div className="header-name">Gradulator</div>

                </div>
            </div>
        )
        else return(
            <div>
                <div className="header-small">
                    <Link to="/" className="header-link">Gradulator</Link>

                    <div className="header-back">
                    {showHome &&
                    <Button htmlType="button" onClick={() => showHome()}>
                        Zurück zur Startseite
                    </Button>
                    }
                    {!showHome &&
                    <Button htmlType="button" >
                        <Link to="/">Zurück zur Startseite</Link>
                    </Button>
                    }
                    </div>
                </div>
            </div>
        )

    }

}

export default Header