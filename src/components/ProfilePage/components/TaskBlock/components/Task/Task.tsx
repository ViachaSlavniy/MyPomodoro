import React from 'react';
import {Button} from "antd";
import {actions, TaskType} from "../../../../../../redux/reducers/profile-reducer";
import {useDispatch} from "react-redux";
import style from './Task.module.css';

export const Task: React.FC<TaskType> = ({
                                             id,
                                             category,
                                             text,
                                             done,
                                             catId,
                                             count
}) => {
    const dispatch = useDispatch();
    const deleteTask = () => {
        dispatch(actions.deleteTask(id, category, done, catId))
    }

    const doneTask = () => {
        dispatch(actions.taskDone(id, catId, category))
    }
    const repeatTask = () => {
        dispatch(actions.repeatTask(id))
    }

    return (
        <div className={style.task}>
            <div className={style.category}>
                {category}
            </div>
            <div className={style.taskText}>
                {text}
            </div>
            <div>{count}</div>
            <div className="doneButton">
                {done
                    ? <Button onClick={repeatTask}>Repeat</Button>
                    : <Button onClick={doneTask}>Done</Button>
                }

            </div>
            <div className="deleteButton">
                <Button onClick={deleteTask}>
                    -
                </Button>
            </div>
        </div>
    )
}
