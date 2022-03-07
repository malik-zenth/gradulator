import React from "react"
import { Link } from "react-router-dom";

class Footer extends React.Component {

    render() {
        return (
            <div className="footer">
                <div className="footer-name">
                    Gradulator
                </div>
                <div className="footer-links">
                <Link className="footer-link" to="/impressum">
                    Impressum
                </Link>
                <Link className="footer-link" to="/ueber-uns">
                    Über uns
                </Link>
                <Link className="footer-link" to="/kontakt">
                    Kontakt
                </Link>
                <Link className="footer-link" to="/studiengang-erstellen">
                    Studiengang hinzufügen
                </Link>
                <Link className="footer-link" to="/erklarung">
                    Erklärung der Funktionalität
                </Link>
                </div>
            </div>
        )
    }
}

export default Footer