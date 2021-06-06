import React from 'react';
import {Switch, Route, Redirect} from "react-router-dom";
import {ProfilePage} from "../components/ProfilePage/ProfilePage";
import {LoginPage} from "../components/LoginPage/LoginPage";

export const Routes: React.FC = () => {

    return (
        <Switch>
            <Route path='/settings' render={() => <div>Settings</div>}/>
            <Route path='/ideas' render={() => <div>Ideas</div>}/>
            <Route path='/statistics' render={() => <div>Statistics</div>}/>
            <Route path='/profile' render={() => <ProfilePage />}/>
            <Route path='/login' render={() => <LoginPage />}/>
            <Route path='*' render={() => <div>ERROR 404! Page not found.</div>}/>
        </Switch>
    )
}