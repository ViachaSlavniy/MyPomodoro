import React from 'react';
import {TimerBlock} from "./components/TimerBlock/TimerBlock";
import {TaskBlock} from "./components/TaskBlock/TaskBlock";
import style from './ProfilePage.module.css';

export const ProfilePage = () => {
    return (
        <div className={style.container}>
            <TimerBlock />
            <TaskBlock />
        </div>
    )
}