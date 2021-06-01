import React, {ReactNode} from 'react';
import {useSelector} from "react-redux";
import {RootState} from "../../../../redux/store";
import {TaskType} from "../../../../redux/reducers/profile-reducer";

export const HistoryBlock: React.FC<PropsType> = ({filterCategory, showTasks}) => {
    const tasksDone = useSelector((state: RootState) => state.profile.taskDone.items);
    const categories = useSelector((state: RootState) => state.profile.taskDone.categories);

    return (
        <div>
            <div style={{textAlign: 'center'}}>Сделано</div>
            <div style={{display: 'flex'}}>
                <span style={{flexBasis: '15%'}}>Категория</span>
                <span style={{flexBasis: '85%'}}>Описание</span>
            </div>
            {showTasks(tasksDone)}
            <div className="categories">
                {categories.length > 0
                    ? (
                        <div>Категории:
                            <input type="radio"
                                   name="filter"
                                   value="all"
                                   onChange={(e) => filterCategory(e)}/>
                            {tasksDone.length !== 0
                                ? `All : ${tasksDone.length}`
                                : ''
                            }
                            {categories.map(cat => {
                                return (
                                    <span className="filter" key={cat.id}>
                                        <input type="radio"
                                               name="filter"
                                               value={cat.name}
                                               onChange={(e) => filterCategory(e)}/> {cat.name} : {cat.count}
                                    </span>
                                )})}
                        </div>
                    )
                    : ''
                }
            </div>
        </div>
    )
}


type PropsType = {
    filterCategory: (e: React.ChangeEvent<HTMLInputElement>) => void
    showTasks: (tasks: Array<TaskType>) => ReactNode
}