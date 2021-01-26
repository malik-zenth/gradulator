import React from "react"
import { BrowserRouter, Switch, Route } from "react-router-dom"
import {Home, NotFound} from "./Pages"
import "../static/style-mobile.css"
import "../static/style-desktop.css"
import "../static/style-tablet.css"

class App extends React.Component {

    render() {
        return (
            <BrowserRouter>
                <div>
                    <Switch>
                        <Route exact path="/">
                            <Home/>
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