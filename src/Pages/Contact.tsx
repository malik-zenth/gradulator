import React from "react"
import { Footer, Header } from "../Components"
import { Card, Button, Row, Col } from 'antd';
import { MailOutlined } from '@ant-design/icons';


class Contact extends React.Component {

    render() {
        return (
            <div>
                <div className="content contact">
                    <Header home={false} />
                    <div style={{ paddingTop: '50px' }}>
                        <Row>
                            <Col span={1}></Col>
                            <Col span={22}>
                        <Card title="Studiengang hinzufügen" bordered={false} style={{ maxWidth: 400 }}>
                            <p>Fehlt dein Studiengang aktuell noch? Dann kontaktiere uns bitte und wir schauen was wir tun können :)</p>
                            <Button type="primary" icon={<MailOutlined />}>
                                Schreibe uns!
                            </Button>
                        </Card>
                        </Col>
                        <Col span={1}></Col>
                        </Row>
                        <Row>
                        <Col span={1}></Col>
                        <Col span={22}>
                        <Card title="Fehler in der Berechnung?" bordered={false} style={{ maxWidth: 400, paddingTop: '50px'}}>
                            <p>Hast du einen Fehler in der Berechnung identifiziert? Dann kontaktiere uns bitte und teile uns diesen mit.</p>
                            <Button type="primary" icon={<MailOutlined />}>
                                Schreibe uns!
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

