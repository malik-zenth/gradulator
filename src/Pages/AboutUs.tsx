import React from "react"
import { Footer, Header } from "../Components"
import { Row, Col } from 'antd';
import { LinkedinOutlined, GithubOutlined, UserOutlined, BookOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';

import { Card } from 'antd';

const { Meta } = Card;


class AboutUs extends React.Component {

    render() {
        return (
            <div>
                <div className="content contact">
                    <Header home={false} />
                    <h1 style={{ textAlign: 'center', paddingTop: '50px', paddingBottom: '50px' }}>Kontaktiere uns</h1>

                    <Row>
                        <Col xs={2} sm={2} md={2} lg={4} xl={4}></Col>
                        <Col xs={6} sm={5} md={6} lg={5} xl={4}>
                            <Avatar size={150} src="https://media-exp1.licdn.com/dms/image/C4E03AQGpUZRcRVKFfg/profile-displayphoto-shrink_800_800/0/1603128877124?e=1618444800&v=beta&t=Ab-jTFU2rbkNrQ23yEBYHAJMHjorCADR7HOqlG14tSw"/>
                        </Col>
                        <Col xs={16} sm={0} md={0} lg={0} xl={0}></Col>
                        <Col xs={24} sm={0} md={0} lg={0} xl={0} style={{paddingTop: '15px'}}></Col>
                        <Col xs={2} sm={0} md={0} lg={0} xl={0}></Col>
                        <Col xs={20} sm={15} md={14} lg={11} xl={12}>
                            <div>
                            <h2>Benjamin Zenth</h2>
                            <BookOutlined style={{ fontSize: '25px', color: '#00008B', paddingRight: '10px' }}/> <h2 style={{ display: 'inline'}}>Wirtschaftsinformatik</h2>
                            <br/>
                            <LinkedinOutlined style={{ fontSize: '25px', color: '#00008B', paddingRight: '10px' }}/> <a href="https://www.linkedin.com/in/benjamin-zenth-6290681ba/" style={{textDecoration: 'none', color: 'black'}}><h2 style={{display: 'inline'}}>LinkedIn</h2></a>
                            <br/>
                            <GithubOutlined style={{ fontSize: '25px', color: '#00008B', paddingRight: '10px' }}/> <a href="https://github.com/chooklii" style={{textDecoration: 'none', color: 'black'}}><h2 style={{display: 'inline'}}>GitHub Profil</h2></a>
                            </div>
                        </Col>
                        <Col xs={2} sm={2} md={2} lg={4} xl={4}></Col>
                    </Row>
                    <Row style={{paddingTop: '50px'}}></Row>
                    <Row>
                        <Col xs={2} sm={2} md={2} lg={4} xl={4}></Col>
                        <Col xs={6} sm={5} md={6} lg={5} xl={4}>
                            <Avatar size={150} src="https://profile-images.xing.com/images/a4f240bde94eedff595443916b6f1620-7/majeed-malik.1024x1024.jpg"/>
                        </Col>
                        <Col xs={16} sm={0} md={0} lg={0} xl={0}></Col>
                        <Col xs={24} sm={0} md={0} lg={0} xl={0} style={{paddingTop: '15px'}}></Col>
                        <Col xs={2} sm={0} md={0} lg={0} xl={0}></Col>
                        <Col xs={20} sm={15} md={14} lg={11} xl={12}>
                        <div>
                            <h2>Majeed Malik</h2>
                            <BookOutlined style={{ fontSize: '25px', color: '#00008B', paddingRight: '10px' }}/> <h2 style={{display: 'inline'}}>Wirtschaftsinformatik</h2>
                            <br/>
                            <LinkedinOutlined style={{ fontSize: '25px', color: '#00008B', paddingRight: '10px' }}/> <a href="https://www.linkedin.com/in/majeed-malik-9411ba153/" style={{textDecoration: 'none', color: 'black'}}><h2 style={{display: 'inline'}}>LinkedIn</h2></a>
                            <br/>
                            <GithubOutlined style={{ fontSize: '25px', color: '#00008B', paddingRight: '10px' }}/> <a href="https://github.com/malik-majeed" style={{textDecoration: 'none', color: 'black'}}><h2 style={{display: 'inline'}}>GitHub Profil</h2></a>
                            </div>
                        </Col>
                        <Col xs={2} sm={2} md={2} lg={4} xl={4}></Col>
                    </Row>

{/* 

                    <Row style={{margin: 'auto', width: '75%'}}>
                        <Col xs={0} sm={0} md={4} lg={0} xl={3}></Col>
                        <Col xs={24} sm={24} md={16} lg={10} xl={4}>
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
                        <Col xs={24} sm={24} md={24} lg={4} xl={10} style={{paddingTop: 25}}></Col>
                        <Col xs={0} sm={0} md={4} lg={0} xl={0}></Col>
                        <Col xs={24} sm={24} md={16} lg={10} xl={4}>
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
                        <Col xs={0} sm={0} md={0} lg={0} xl={3}></Col>
                    </Row> */}
                </div>
                <Footer />
            </div>
        )
    }

}

export default AboutUs

