import React from "react"
import { Footer, Header } from "../Components"
import { Card, Button } from 'antd';
import { MailOutlined } from '@ant-design/icons';


class Contact extends React.Component {

    render() {
        return (
            <div>
                <div className="content contact">
                    <Header home={false} />
                    <div style={{ padding: '50px' }}>
                        <Card title="Studiengang hinzufügen" bordered={false} style={{ width: 400 }}>
                            <p>Fehlt dein Studiengang aktuell noch? Dann kontaktiere uns bitte und wir schauen was wir tun können :)</p>
                            <Button type="primary" icon={<MailOutlined />}>
                                Schreibe uns!
                            </Button>
                        </Card>
                        <Card title="Fehler in der Berechnung?" bordered={false} style={{ width: 400, paddingTop: '50px'}}>
                            <p>Hast du einen Fehler in der Berechnung identifiziert? Dann kontaktiere uns bitte und teile uns diesen mit.</p>
                            <Button type="primary" icon={<MailOutlined />}>
                                Schreibe uns!
                            </Button>
                        </Card>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }

}

export default Contact

