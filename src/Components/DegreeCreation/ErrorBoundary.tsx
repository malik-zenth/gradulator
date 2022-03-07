import { faSadCry } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "antd";
import React from "react"
import { Link } from "react-router-dom";
import { Footer, Header } from "..";

interface iProps{
    saveData: Function
}

interface iState{
    hasError: boolean
}

class ErrorBoundary extends React.Component<iProps, iState> {
    constructor(props: any) {
      super(props);
      this.state = { 
          hasError: false 
        };
    }
  
    static getDerivedStateFromError(error: any) {
      // Update state so the next render will show the fallback UI.
      return { hasError: true };
    }

    render() {
      if (this.state.hasError) {
        this.props.saveData()
        // You can render any custom fallback UI
        return(
            <div>
            <div className="content">
                <Header home={true}/>

                <div className="icon-404">
                <FontAwesomeIcon className="icon-notfound" icon={faSadCry}/>
                </div>
                <div className="button-notfound" >
                <h1>Es ist ein Fehler aufgetreten</h1>
                <p>Dein Aktueller Stand wurde in einer Datei zwischengespeichert und heruntergeladen!</p>
                <Button htmlType="button" >
                        <Link to="/">zur Startseite</Link>
                    </Button>
                    </div>
            </div>
                <Footer/>
            </div>
        )
      }
  
      return this.props.children; 
    }
  }

export default ErrorBoundary