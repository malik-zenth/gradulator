import React from "react"
import { Footer, Header } from "../Components"
import { Row, Col } from 'antd';
import { LinkedinOutlined, GithubOutlined, BookOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import { Card } from 'antd';
import {isMobile, isTablet} from "react-device-detect"
const { Meta } = Card;

class AboutUs extends React.Component {

    componentDidMount(){
        if(isMobile || isTablet){
        const content= document.getElementsByClassName("content")[0]
        const height: number = window.innerHeight - 60
        content.setAttribute("style", `min-height: ${height}px`)
        }
    }

    render() {
        return (
            <div>
                <div className="content">
                    <Header home={false} />
                    <h1 style={{ textAlign: 'center', paddingTop: '25px', paddingBottom: '25px' }}>Kontaktiere uns</h1>

                    <Row style={{ textAlign: 'center', paddingBottom: '25px' }}>
                        <Col xs={2} sm={2} md={2} lg={4} xl={4}></Col>
                        <Col xs={20} sm={20} md={20} lg={16} xl={16}>
                            <p style={{ textAlign: 'justify' }}>
                            Wir sind Benjamin Zenth und Majeed Malik, (bald) Absolventen des Studienganges Wirtschaftsinformatik (M. Sc.) der Hochschule Heilbronn. Jeder Student hat sich bestimmt schon einmal folgende Fragen gestellt: „Welche Note muss ich in der Prüfung schreiben, sodass ich meinen geplanten Notendurchschnitt erreichen kann?“ oder „Was wäre, wenn ich diese oder jene Note schreibe?“. 
                            </p>
                            <p style={{ textAlign: 'justify' }}>
                            Als Studenten kennen wir es nur zu gut die Komplexität der Durchschnittsberechnung. Die Studien- und Prüfungsordnung (SPO) und die möglichen Kombinationen zu verstehen ist dabei eine Wissenschaft für sich. Diese Problemstellung haben wir uns als Anreiz  genommen und den Gradulator entwickelt. Durchschnittsberechnung einfach gemacht und maßgeschneidert auf deine SPO!
                            </p>
                        </Col>
                        <Col xs={2} sm={2} md={2} lg={4} xl={4}></Col>
                    </Row>
                    <Row>
                        <Col xs={2} sm={2} md={2} lg={4} xl={4}></Col>
                        <Col xs={6} sm={5} md={6} lg={5} xl={4}>
                            <Avatar size={150} src={"/static/bzenth.jpg"}/>
                        </Col>
                        <Col xs={16} sm={0} md={0} lg={0} xl={0}></Col>
                        <Col xs={24} sm={0} md={0} lg={0} xl={0} style={{paddingTop: '15px'}}></Col>
                        <Col xs={2} sm={0} md={0} lg={0} xl={0}></Col>
                        <Col xs={20} sm={15} md={14} lg={11} xl={12}>
                            <div>
                            <h2>Benjamin Zenth</h2>
                            <BookOutlined style={{ fontSize: '25px', color: '#1471c7', paddingRight: '10px' }}/> <h2 style={{ display: 'inline'}}>Wirtschaftsinformatik</h2>
                            <br/>
                            <LinkedinOutlined style={{ fontSize: '25px', color: '#1471c7', paddingRight: '10px' }}/> <a href="https://www.linkedin.com/in/benjamin-zenth-6290681ba/" style={{textDecoration: 'none', color: 'black'}}><h2 style={{display: 'inline'}}>LinkedIn</h2></a>
                            <br/>
                            <GithubOutlined style={{ fontSize: '25px', color: '#1471c7', paddingRight: '10px' }}/> <a href="https://github.com/chooklii" style={{textDecoration: 'none', color: 'black'}}><h2 style={{display: 'inline'}}>GitHub Profil</h2></a>
                            </div>
                        </Col>
                        <Col xs={2} sm={2} md={2} lg={4} xl={4}></Col>
                    </Row>
                    <Row style={{paddingTop: '50px'}}></Row>
                    <Row>
                        <Col xs={2} sm={2} md={2} lg={4} xl={4}></Col>
                        <Col xs={6} sm={5} md={6} lg={5} xl={4}>
                            <Avatar size={150} src={"/static/mmalik.jpg"}/>
                        </Col>
                        <Col xs={16} sm={0} md={0} lg={0} xl={0}></Col>
                        <Col xs={24} sm={0} md={0} lg={0} xl={0} style={{paddingTop: '15px'}}></Col>
                        <Col xs={2} sm={0} md={0} lg={0} xl={0}></Col>
                        <Col xs={20} sm={15} md={14} lg={11} xl={12}>
                        <div>
                            <h2>Majeed Malik</h2>
                            <BookOutlined style={{ fontSize: '25px', color: '#1471c7', paddingRight: '10px' }}/> <h2 style={{display: 'inline'}}>Wirtschaftsinformatik</h2>
                            <br/>
                            <LinkedinOutlined style={{ fontSize: '25px', color: '#1471c7', paddingRight: '10px' }}/> <a href="https://www.linkedin.com/in/majeed-malik-9411ba153/" style={{textDecoration: 'none', color: 'black'}}><h2 style={{display: 'inline'}}>LinkedIn</h2></a>
                            <br/>
                            <GithubOutlined style={{ fontSize: '25px', color: '#1471c7', paddingRight: '10px' }}/> <a href="https://github.com/malik-majeed" style={{textDecoration: 'none', color: 'black'}}><h2 style={{display: 'inline'}}>GitHub Profil</h2></a>
                            </div>
                        </Col>
                        <Col xs={2} sm={2} md={2} lg={4} xl={4}></Col>
                    </Row>
                </div>
                <Footer />
            </div>
        )
    }

}

export default AboutUs