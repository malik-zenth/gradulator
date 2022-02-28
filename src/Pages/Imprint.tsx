import React from "react"
import {Footer, Header} from "../Components"
import {isMobile, isTablet} from "react-device-detect"

class Imprint extends React.Component{

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
                <div className="content imprint">
                <Header home={false}/>

                <h1 className="imprint-heading">Impressum</h1>
                <div className="imprint-us">
                    <p className="imprint-person">
                        Benjamin Zenth <br/>
                        Baierbacher Straße 41 <br/>
                        74629 Pfedelbach <br/>
                        kontakt@gradulator.de<br/>
                        0151/12512194 <br/>
                    </p>
                    <p className="imprint-person">
                        Majeed Malik <br/>
                        Herbststraße 27 <br/>
                        74072 Heilbronn<br/>
                        kontakt@gradulator.de
                    </p>
                </div>

                <div className="imprint-body">              

                <h2>Warnhinweis zu Inhalten</h2>
                <p>Die kostenlosen und frei zugänglichen Inhalte dieser Webseite wurden mit größtmöglicher Sorgfalt erstellt. Der Anbieter dieser Webseite übernimmt jedoch keine Gewähr für die Richtigkeit und Aktualität der bereitgestellten kostenlosen und frei zugänglichen journalistischen Ratgeber und Nachrichten. Namentlich gekennzeichnete Beiträge geben die Meinung des jeweiligen Autors und nicht immer die Meinung des Anbieters wieder. Allein durch den Aufruf der kostenlosen und frei zugänglichen Inhalte kommt keinerlei Vertragsverhältnis zwischen dem Nutzer und dem Anbieter zustande, insoweit fehlt es am Rechtsbindungswillen des Anbieters.</p>

                <h2>Externe Links</h2>
                <p>Diese Website enthält Verknüpfungen zu Websites Dritter ("externe Links"). Diese Websites unterliegen der Haftung der jeweiligen Betreiber. Der Anbieter hat bei der erstmaligen Verknüpfung der externen Links die fremden Inhalte daraufhin überprüft, ob etwaige Rechtsverstöße bestehen. Zu dem Zeitpunkt waren keine Rechtsverstöße ersichtlich. Der Anbieter hat keinerlei Einfluss auf die aktuelle und zukünftige Gestaltung und auf die Inhalte der verknüpften Seiten. Das Setzen von externen Links bedeutet nicht, dass sich der Anbieter die hinter dem Verweis oder Link liegenden Inhalte zu Eigen macht. Eine ständige Kontrolle der externen Links ist für den Anbieter ohne konkrete Hinweise auf Rechtsverstöße nicht zumutbar. Bei Kenntnis von Rechtsverstößen werden jedoch derartige externe Links unverzüglich gelöscht.</p>

                <h2>Datenschutz</h2>
                <p>Diese Webseite speichert keine der von dem Nutzer eingegebenen oder hochgeladenen Daten. <br/> Gehostet wird diese Webseite 
                    über <a href="https://pages.github.com/" target="_blank">Github Pages</a>, bereitgestellt von Github Inc., 88 Colin P Kerry Jr St, San Francisco, CA 94107, United States.
                    Weitere Informationen zum Umgang mit Nutzerdaten finden Sie in 
                    der <a href="https://docs.github.com/en/github/site-policy/github-privacy-statement" target="_blank">Datenschutzerklärung</a> von Github
                </p>

                <p>Diese Webseite verwendet zur Verarbeitung der Nutzungsstatistiken <a href="https://getinsights.io/" target="_blank">Insights</a>. Durch diese Anwendung werden keine personenbezogene Daten verarbeitet und von der Nutzung von Cookies zur Identifikation von Benutzern wird abgesehen.
                    Weitere Informationen zum Umgang mit diesen Daten finden Sie in der <a href="https://getinsights.io/privacy" target="_blank">Datenschutzerklärung</a> von Insights.
                </p>

                </div>
                </div>
                <Footer/>
            </div>
        )
    }

}

export default Imprint
