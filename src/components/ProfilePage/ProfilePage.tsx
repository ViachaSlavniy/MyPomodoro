import React from 'react';
import {TimerBlock} from "./components/TimerBlock/TimerBlock";
import {QueryStringType, TaskBlock} from "./components/TaskBlock/TaskBlock";
import style from './ProfilePage.module.css';
import {HistoryBlock} from "./components/HistoryBlock/HistoryBlock";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import {Redirect, useHistory, useLocation} from "react-router-dom";
import QueryString from "querystring";
import {Task} from "./components/TaskBlock/components/Task/Task";
import {TaskType} from "../../redux/reducers/profile-reducer";

export const ProfilePage = () => {
    const history = useHistory();
    const location = useLocation();
    const isAuth = useSelector((state: RootState) => state.auth.isAuth);
    const doneTasks = useSelector((state: RootState) => state.profile.taskDone.items);
    const parsedQuery = QueryString.parse(location.search.substr(1)) as QueryStringType;

    const filterCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked && e.target.value !== 'all') {
            history.push(`/?category=${e.target.value}`);
        } else {
            history.push(('/'));
        }
    }
    const showTasks = (tasks: Array<TaskType>) => {
        if (tasks.length > 0) {
            const chooseTasks = parsedQuery.category
                ? tasks.filter(task => task.category === parsedQuery.category)
                : tasks
            return (
                chooseTasks.map(task => <Task key={task.id} {...task}/>)
            )
        }
    }

    if (!isAuth) {
        return <Redirect to='login' />
    }

    return (
        <div className={style.container}>
            <TimerBlock />
            <TaskBlock filterCategory={filterCategory} showTasks={showTasks}/>
            {doneTasks.length > 0
                ? <HistoryBlock filterCategory={filterCategory} showTasks={showTasks}/>
                : ''
            }
        </div>
    )
}