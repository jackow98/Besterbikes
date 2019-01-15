import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import MainMenu from './MainMenu'
import SignIn from './account/SignIn'
import SignUp from './account/SignUp'
import Header from "./Header";

const App = () => {

    return(
        <div>
            {/*BrowserRouter handles the pages and their associated URLs for the entire App*/}
            <BrowserRouter>
                <div>
                    <Header/>
                    <Route path="/" exact component={MainMenu}/>
                    <Route path="/signin" exact component={SignIn}/>
                    <Route path="/signup" exact component={SignUp}/>
                </div>
            </BrowserRouter>
        </div>
    )
};

export default App