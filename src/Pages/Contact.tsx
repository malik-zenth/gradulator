import React, { ReactElement } from "react"
import { Footer, Header } from "../Components"
import { Card, Button, Row, Col, message } from 'antd';
import { GithubOutlined, MailOutlined, GiftOutlined } from '@ant-design/icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faSmileWink,
    faSmile
} from "@fortawesome/free-regular-svg-icons";
import { MailLink, MailErrorCalculation, MailAdress } from "../Components/const";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {isMobile, isTablet} from "react-device-detect"

class Contact extends React.Component {

    componentDidMount(){
        if(isMobile || isTablet){
        const content= document.getElementsByClassName("content")[0]
        const height: number = window.innerHeight - 60
        content.setAttribute("style", `min-height: ${height}px`)
        }
    }


    showAlert(){
        message.success({ content: 'E-Mail Adresse wurde erfolgreich kopiert!'});
    }
    render() {
        return (
            <div>
                <div className="content">
                    <Header home={false} />
                    <div style={{ paddingTop: '50px' }}>
                        <Row>
                            <Col span={1}></Col>
                            <Col span={22}>
                        <Card title="Studiengang hinzufügen" bordered={false} style={{ maxWidth: 500 }}>
                            <p>Fehlt dein Studiengang aktuell noch? Dann kontaktiere uns bitte und wir schauen was wir tun können <FontAwesomeIcon icon={faSmileWink}/></p>
                            <Button onClick={() => window.location.href = MailLink} type="primary" style={{minWidth: '137px'}} icon={<MailOutlined />}>
                                Schreibe uns!
                            </Button>
                            <CopyToClipboard text={MailAdress} onCopy={() => this.showAlert()}>
                            <Button className="button-copy-mail" style={{minWidth: '204px'}} icon={<MailOutlined />}>
                                E-Mail Adresse kopieren
                            </Button>
                            </CopyToClipboard>
                        </Card>
                        </Col>
                        <Col span={1}></Col>
                        </Row>
                        <Row>
                        <Col span={1}></Col>
                        <Col span={22}>
                        <Card title="Fehler in der Berechnung?" bordered={false} style={{ maxWidth: 500, paddingTop: '50px'}}>
                            <p>Hast du einen Fehler in der Berechnung identifiziert? Dann kontaktiere uns bitte und teile uns diesen mit.</p>
                            <Button onClick={() => window.location.href = MailErrorCalculation} type="primary" style={{minWidth: '137px'}} icon={<MailOutlined />}>
                                Schreibe uns!
                            </Button>
                            <CopyToClipboard text={MailAdress} onCopy={() => this.showAlert()}>
                            <Button className="button-copy-mail" style={{minWidth: '204px'}} icon={<MailOutlined />}>
                                E-Mail Adresse kopieren
                            </Button>
                            </CopyToClipboard>
                        </Card>
                        </Col>
                        <Col span={1}></Col>
                        </Row>
                        <Row>
                        <Col span={1}></Col>
                        <Col span={22}>
                        <Card title="Möchtest du uns Unterstützen?" bordered={false} style={{ maxWidth: 500, paddingTop: '50px'}}>
                            <p>Werde Teil des Entwicklerteams und hilf uns den Gradulator weiterzuentwickeln oder mach uns eine Freude mit einem kleinen Trinkgeld <FontAwesomeIcon icon={faSmile}/></p>
                            <Button href="https://github.com/malik-zenth/gradulator" target="_blank"  style={{minWidth: '137px'}} type="primary" icon={<GithubOutlined />}>
                                GitHub
                            </Button>
                            <Button 
                            className="button-copy-mail"
                            href="https://www.paypal.com/donate?hosted_button_id=H8MWJAKT28XEW" target="_blank" style={{minWidth: '204px'}} icon={<GiftOutlined />}>
                                Trinkgeld zahlen
                            </Button>
                        </Card>
                        </Col>
                        <Col span={1}></Col>
                        </Row>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }

}

export default Contact

