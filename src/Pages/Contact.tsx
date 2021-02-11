import React, { ReactElement } from "react"
import { Footer, Header } from "../Components"
import { Card, Button, Row, Col, message } from 'antd';
import { GithubOutlined, MailOutlined } from '@ant-design/icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faSmileWink
} from "@fortawesome/free-regular-svg-icons";
import { MailLink, MailErrorCalculation, MailAdress } from "../Components/const";
import {CopyToClipboard} from 'react-copy-to-clipboard';

class Contact extends React.Component {

    showAlert(){
        message.success({ content: 'E-Mail Adresse wurde erfolgreich kopiert!'});
    }
    render() {
        return (
            <div>
                <div className="content contact">
                    <Header home={false} />
                    <div style={{ paddingTop: '50px' }}>
                        <Row>
                            <Col span={1}></Col>
                            <Col span={22}>
                        <Card title="Studiengang hinzufügen" bordered={false} style={{ maxWidth: 500 }}>
                            <p>Fehlt dein Studiengang aktuell noch? Dann kontaktiere uns bitte und wir schauen was wir tun können <FontAwesomeIcon icon={faSmileWink}/></p>
                            <Button onClick={() => window.location.href = MailLink} type="primary" icon={<MailOutlined />}>
                                Schreibe uns!
                            </Button>
                            <CopyToClipboard text={MailAdress} onCopy={() => this.showAlert()}>
                            <Button className="button-copy-mail" icon={<MailOutlined />}>
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
                            <Button onClick={() => window.location.href = MailErrorCalculation} type="primary" icon={<MailOutlined />}>
                                Schreibe uns!
                            </Button>
                            <CopyToClipboard text={MailAdress} onCopy={() => this.showAlert()}>
                            <Button className="button-copy-mail" icon={<MailOutlined />}>
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
                            <p>Werde Teil des Entwicklerteams und hilf uns den Gradulator weiterzuentwickeln.</p>
                            <Button href="https://github.com/malik-zenth/gradulator" target="_blank"  type="primary" icon={<GithubOutlined />}>
                                GitHub
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

