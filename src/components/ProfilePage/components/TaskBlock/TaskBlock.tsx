import React from 'react';
import {Button, Input} from 'antd';
import {Task} from "./components/Task";
import style from './TaskBlock.module.css';

export const TaskBlock: React.FC = () => {
    return (
        <div>
            <div>Запланировано</div>
            <div className={style.createBlock}>
                <div className={`${style.createInputs} ${style.createInputs_category}`}>
                    <Input placeholder="Категория" />
                </div>
                <div className={`${style.createInputs} ${style.createInputs_task}`}>
                    <Input placeholder="Короткое описание" />
                </div>
                <div className="addButton">
                    <Button>
                        +
                    </Button>
                </div>
            </div>
            <div className="taskBoard">
                <Task />
            </div>
        </div>
    )
}