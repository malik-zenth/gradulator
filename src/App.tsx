import React from "react"
import { BrowserRouter, Switch, Route } from "react-router-dom"
import {Home, NotFound, ImPrint, Contact, Explanation, AboutUs} from "./Pages"
import {ScrollToTop} from "./Components"
import { init, trackPages } from "insights-js"
import "../static/style-mobile.css"
import "../static/style-desktop.css"
import "../static/style-tablet.css"
import "../static/style-general.css"
import 'antd/dist/antd.css'

class App extends React.Component {

    componentDidMount(){
        //Init Insights-analytics
        //init("EfuBEN79UVOU5DFy")
        //trackPages()
    }

    render() {
        return (
            <BrowserRouter>
                <div>
                    <Switch>
                        <Route exact path="/">
                            <ScrollToTop>
                                <Home/>
                            </ScrollToTop>
                        </Route>
                        <Route exact path="/erklarung">
                            <ScrollToTop>
                                <Explanation/>
                            </ScrollToTop>
                        </Route>
                        <Route exact path="/kontakt">
                            <ScrollToTop>
                                <Contact/>
                            </ScrollToTop>
                        </Route>
                        <Route exact path="/impressum">
                            <ScrollToTop>
                                <ImPrint/>
                            </ScrollToTop>
                        </Route>
                        <Route exact path="/ueber-uns">
                            <ScrollToTop>
                                <AboutUs/>
                            </ScrollToTop>
                        </Route>
                        <Route path="*">
                            <ScrollToTop>
                                <NotFound/>
                            </ScrollToTop>
                        </Route>
                    </Switch>
                </div>
            </BrowserRouter>
        )
    }
}

export default App