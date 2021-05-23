import React from 'react';
import {Switch, Route} from "react-router-dom";
import {ProfilePage} from "../components/ProfilePage/ProfilePage";

export const Routes: React.FC = () => {
    return (
        <Switch>
            <Route path='/settings' render={() => <div>Settings</div>}/>
            <Route path='/ideas' render={() => <div>Ideas</div>}/>
            <Route path='/statistics' render={() => <div>Statistics</div>}/>
            <Route path='/' render={() => <ProfilePage />}/>
        </Switch>
    )
}