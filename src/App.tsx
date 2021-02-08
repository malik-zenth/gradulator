import React from "react"
import { BrowserRouter, Switch, Route } from "react-router-dom"
import {Home, NotFound, ImPrint, Contact, Explanation, AboutUs} from "./Pages"
import "../static/style-mobile.css"
import "../static/style-desktop.css"
import "../static/style-tablet.css"
import 'antd/dist/antd.css'

class App extends React.Component {

    render() {
        return (
            <BrowserRouter>
                <div>
                    <Switch>
                        <Route exact path="/">
                            <Home/>
                        </Route>
                        <Route exact path="/erklarung">
                            <Explanation/>
                        </Route>
                        <Route exact path="/kontakt">
                            <Contact/>
                        </Route>
                        <Route exact path="/impressum">
                            <ImPrint/>
                        </Route>
                        <Route exact path="/ueber-uns">
                            <AboutUs/>
                        </Route>
                        {/* If no Route is fitting return 404 Page */}
                        <Route path="*">
                            <NotFound/>
                        </Route>
                    </Switch>
                </div>
            </BrowserRouter>
        )
    }
}

export default App