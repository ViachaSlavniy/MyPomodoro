import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../redux/store";
import style from './TimerBlock.module.css';
import {actions} from "../../../../redux/reducers/profile-reducer";
import {SchemeType} from "../../../../redux/reducers/settings-reducer";

export const TimerBlock: React.FC = () => {
    const dispatch = useDispatch();
    const activeScheme = useSelector((state: RootState) => state.settings.schemes)
        .find(scheme => scheme.active) as SchemeType;
    const tasks = useSelector((state: RootState) => state.profile.taskInProcess.items)
    const activeTaskName = tasks.length > 0 ? tasks[0].text : '';
    const {longBreakEveryShortBreaks, shortBreakMinutes, longBreakMinutes, workTimeMinutes} = activeScheme;

    const [timerState, setTimerState] = useState({
        start: false,
        pause: false,
        break: false,
        longBreakEveryShortBreaks: longBreakEveryShortBreaks,
        longBreakTime: 0.05 * 60,
        shortBreakTime: 0.05 * 60,
        time: 0.05 * 60,
    });
    const [strTimer, setStrTimer] = useState<number | string>(`${workTimeMinutes} : 00`);
    const [timerId, setTimerId] = useState(0);

    const breakTime = () => {
        const timerId = window.setInterval(() => {
            let minutes: number | string = Math.floor(timerState.shortBreakTime / 60 % 60);
            let seconds: number | string = Math.floor(timerState.shortBreakTime % 60);
            minutes = minutes.toString().length === 1 ? "0" + minutes : minutes;
            seconds = seconds.toString().length === 1 ? "0" + seconds : seconds;
            if (timerState.shortBreakTime < 0) {
                window.clearInterval(timerId);
                setTimerState({
                        ...timerState,
                        start: false,
                        pause: false,
                        break: false,
                        shortBreakTime: shortBreakMinutes * 60,
                        time: workTimeMinutes * 60
                });
                return
            } else {
                setStrTimer(() => `${minutes} : ${seconds}`)
            }
            if (timerState.shortBreakTime >= 0) {
                setTimerState({...timerState,
                    start: true,
                    pause: false,
                    break: true,
                    time: --timerState.shortBreakTime
                });
            }
        }, 1000)
        setTimerId(timerId);
    }

    const startTimer = () => {
        const timerId = window.setInterval(() => {
            let minutes: number | string = Math.floor(timerState.time / 60 % 60);
            let seconds: number | string = Math.floor(timerState.time % 60);
             minutes = minutes.toString().length === 1 ? "0" + minutes : minutes;
             seconds = seconds.toString().length === 1 ? "0" + seconds : seconds;
            if (timerState.time < 0) {
                window.clearInterval(timerId);
                setTimerState({
                    ...timerState,
                    start: false,
                    pause: false,
                    shortBreakTime: shortBreakMinutes * 60,
                    time: workTimeMinutes * 60
                });
                if (tasks.length > 0) {
                    const {id, catId, category} = tasks[0];
                    dispatch(actions.taskDone(id, catId, category));
                }
                breakTime();
                return
            } else {
                setStrTimer(() => `${minutes} : ${seconds}`)
            }
            if (timerState.time >= 0) {
                setTimerState({...timerState,
                    start: true,
                    pause: false,
                    break: false,
                    time: --timerState.time
                });
            }
        }, 1000)
        setTimerId(timerId);
    }

    const pauseTimer = () => {
        window.clearInterval(timerId);
        setTimerState({...timerState, pause: true});
    }

    const continueTimer = () => {
        startTimer();
        setTimerState({...timerState, pause: false});
    }

    const stopTimer = () => {
        window.clearInterval(timerId);
        setTimerState({...timerState, time: workTimeMinutes * 60, break: false, start: false, pause: false});
        setStrTimer(() => `${workTimeMinutes} : 00`)
    }

    const showButtons = () => {
       return (
           timerState.start && timerState.pause
               ? <button onClick={continueTimer}>Продолжить</button>
               : timerState.start
                    ? <button onClick={pauseTimer}>Пауза</button>
                    : <button onClick={startTimer}>Старт</button>
       )
    }

    return (
        <div className={timerState.break ? style.break : style.timerBlock}>
            <div className={style.timer}>
                <div className={style.display}>{strTimer}</div>
                <div className={style.display__taskName}>{activeTaskName}</div>
                <div className={style.display__buttons}>
                    <div className={`${style.display__button} ${style.display__button_start}`}>
                        {showButtons()}
                    </div>
                    <div className={`${style.display__button} ${style.display__button_stop}`}>
                        <button disabled={!timerState.start} onClick={stopTimer}>Стоп</button>
                    </div>
                </div>
            </div>
        </div>
    )
}