import React from "react"
import { Footer, Header } from "../Components"
import { Image } from 'antd'
import { Row, Col } from 'antd';
import { LinkedinOutlined, GithubOutlined } from '@ant-design/icons';

import { Card } from 'antd';

const { Meta } = Card;


class Contact extends React.Component {

    render() {
        return (
            <div>
                <div className="content contact">
                    <Header home={false} />
                    <h1 style={{ textAlign: 'center', paddingTop: '50px', paddingBottom: '50px' }}>Kontaktiere uns</h1>
                    <Row style={{margin: 'auto', width: '75%'}}>
                        <Col xs={0} sm={0} md={4} lg={0} xl={0}></Col>
                        <Col xs={24} sm={24} md={16} lg={10} xl={6}>
                            <Card
                                hoverable
                                cover={<img alt="Bejmain Zenth" src="https://media-exp1.licdn.com/dms/image/C4E03AQGpUZRcRVKFfg/profile-displayphoto-shrink_800_800/0/1603128877124?e=1618444800&v=beta&t=Ab-jTFU2rbkNrQ23yEBYHAJMHjorCADR7HOqlG14tSw" />}
                            >
                                <Meta title="Benjamin Zenth" description="Wirtschaftsinformatik" />
                                <a href="https://www.linkedin.com/in/benjamin-zenth-6290681ba/" style={{textDecoration: 'none', color: 'black' }}><p style={{paddingTop: 15}}>
                                <LinkedinOutlined /> per LinkedIn kontaktieren</p></a>
                                <a href="https://github.com/chooklii" style={{textDecoration: 'none', color: 'black' }}><p><GithubOutlined /> per GitHub kontaktieren</p></a>
                            </Card>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={4} xl={12} style={{paddingTop: 25}}></Col>
                        <Col xs={0} sm={0} md={4} lg={0} xl={0}></Col>
                        <Col xs={24} sm={24} md={16} lg={10} xl={6}>
                        <Card
                                hoverable
                                cover={<img alt="Majeed Malik" src="https://profile-images.xing.com/images/a4f240bde94eedff595443916b6f1620-7/majeed-malik.1024x1024.jpg" />}
                            >
                                <Meta title="Majeed Malik" description="Wirtschaftsinformatik" />
                                <a href="https://www.linkedin.com/in/majeed-malik-9411ba153/" style={{textDecoration: 'none', color: 'black' }}><p style={{paddingTop: 15}}>
                                <LinkedinOutlined /> per LinkedIn kontaktieren</p></a>
                                <a href="https://github.com/malik-majeed" style={{textDecoration: 'none', color: 'black' }}><p><GithubOutlined /> per GitHub kontaktieren</p></a>
                            </Card>
                        </Col>
                    </Row>
                </div>
                <Footer />
            </div>
        )
    }

}

export default Contact

