import React, {ReactNode, useState} from 'react';
import {Button, Input} from 'antd';
import {useDispatch, useSelector} from "react-redux";
import {actions, TaskType} from "../../../../redux/reducers/profile-reducer";
import {RootState} from "../../../../redux/store";
import style from './TaskBlock.module.css';
import {SchemeType} from "../../../../redux/reducers/settings-reducer";

export const TaskBlock: React.FC<PropsType> = ({filterCategory, showTasks}) => {
    const dispatch = useDispatch();
    const activeSchema = useSelector((state: RootState) => state.settings.schemes)
        .find(scheme => scheme.active) as SchemeType;
    const categories = useSelector((state: RootState) => state.profile.taskInProcess.categories);
    const tasks = useSelector((state: RootState) => state.profile.taskInProcess.items);

    const [category, setCategory] = useState('');
    const [task, setTask] = useState('');

    const getLeadTime = (schemeTime: number) => {
        const seconds = Math.floor((schemeTime * tasks.length) * 60);
        const divisor_for_minutes = seconds % (60 * 60);
        const minutes = Math.floor(divisor_for_minutes / 60);
        const hours = Math.floor(seconds / (60 * 60));

        return hours ? `${hours}ч ${minutes}м` : `${minutes}м`
    }

    const getEndTime = (schemeTime: number) => {
        const milliseconds = Math.floor(Date.now() + ((schemeTime * tasks.length) * 60) * 1000);
        let endTimeHours: number | string = new Date(milliseconds).getHours();
        let endTimeMinutes: number | string = new Date(milliseconds).getMinutes();
        endTimeHours = endTimeHours.toString().length === 1 ? "0" + endTimeHours : endTimeHours;
        endTimeMinutes = endTimeMinutes.toString().length === 1 ? "0" + endTimeMinutes : endTimeMinutes;

        return tasks.length > 0 && `${endTimeHours}:${endTimeMinutes}`
    }
    const leadTime = getLeadTime(activeSchema.workTimeMinutes);
    const endTime = getEndTime(activeSchema.workTimeMinutes);

    const addNewTask = () => {
        dispatch(actions.addNewTask(task, category));
    }


    return (
        <div>
            <div style={{textAlign: 'center'}}>Запланировано {tasks.length > 0 ? `${tasks.length} / ${leadTime}` : ''}</div>
            <div className={style.createBlock}>
                <div className={`${style.createInputs} ${style.createInputs_category}`}>
                    <Input onChange={(e) => setCategory(e.target.value)}
                           placeholder="Категория"
                           value={category}
                    />
                </div>
                <div className={`${style.createInputs} ${style.createInputs_task}`}>
                    <Input placeholder="Короткое описание"
                           onChange={(e) => setTask(e.target.value)}
                           value={task}/>
                </div>
                <div className="addButton">
                    <Button onClick={addNewTask}>
                        +
                    </Button>
                </div>
            </div>
            <div className="taskBoard">
                {showTasks(tasks)}
            </div>
            <div style={{textAlign: 'center'}}>Время окончания {tasks.length > 0 && `- ${endTime}`}</div>
            <div className="categories">
                {categories.length > 0
                    ? (
                        <div>Категории:
                            <input type="radio"
                                   name="filter"
                                   value="all"
                                   onChange={(e) => filterCategory(e)}/>
                            {tasks.length !== 0
                                ? `All : ${tasks.length}`
                                : ''
                            }

                            {categories.map(cat => {
                                if (cat.count > 0) {
                                    return (
                                        <span className="filter" key={cat.id}>
                                        <input type="radio"
                                               name="filter"
                                               value={cat.name}
                                               onChange={(e) => filterCategory(e)}/> {cat.name} : {cat.count}
                                    </span>
                                    )}
                                })}
                        </div>
                    )
                    : (
                        <div>
                            <div>Список планирования пуст.</div>
                            <div>Поздравляем! Вы выполнили все свои задачи.</div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export type QueryStringType = {
    category: string
}

type PropsType = {
    filterCategory: (e: React.ChangeEvent<HTMLInputElement>) => void
    showTasks: (tasks: Array<TaskType>) => ReactNode
}