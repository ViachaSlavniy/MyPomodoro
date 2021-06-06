import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../redux/store";
import {actions} from "../../../../redux/reducers/profile-reducer";
import {SchemeType} from "../../../../redux/reducers/settings-reducer";
import {message} from 'antd';
import style from './TimerBlock.module.css';


export const TimerBlock: React.FC = () => {
    const dispatch = useDispatch();
    const [audioFinishTask, setAudioFinishTask] = useState<HTMLAudioElement | null>(null);
    const [audioFinishBreak, setAudioFinishBreak] = useState<HTMLAudioElement | null>(null);
    const activeScheme = useSelector((state: RootState) => state.settings.schemes)
        .find(scheme => scheme.active) as SchemeType;
    const tasks = useSelector((state: RootState) => state.profile.taskInProcess.items)
    const activeTaskName = tasks.length > 0 ? tasks[0].text : '';
    const {longBreakEveryShortBreaks, shortBreakMinutes, longBreakMinutes, workTimeMinutes} = activeScheme;

    useEffect(() => {
        const pathBreakAudio = require('../../../../assets/audio/sounds/task.mp3');
        const pathTaskAudio = require('../../../../assets/audio/sounds/break.mp3');
        setAudioFinishTask(new Audio(pathTaskAudio.default));
        setAudioFinishBreak(new Audio(pathBreakAudio.default));
    }, []);


    const [timerState, setTimerState] = useState({
        start: false,
        pause: false,
        break: false,
        longBreakEveryShortBreaks: longBreakEveryShortBreaks,
        longBreakTime: 0.05 * 60,
        shortBreakTime: 0.05 * 60,
        time: 0.02 * 60,
    });
    const [strTimer, setStrTimer] = useState<number | string>(`${workTimeMinutes} : 00`);
    const [timerId, setTimerId] = useState(0);

    const showTaskDoneAlert = () => {
        message.success('Сделайте короткий перерыв!');
    };
    const createInterval = (time: number, startOrBreak: string, audio: HTMLAudioElement | null ) => {
        const timerId = window.setInterval(() => {
            let minutes: number | string = Math.floor(time / 60 % 60);
            let seconds: number | string = Math.floor(time % 60);
            minutes = minutes.toString().length === 1 ? "0" + minutes : minutes;
            seconds = seconds.toString().length === 1 ? "0" + seconds : seconds;
            if (time < 0) {
               window.clearInterval(timerId);
                if (startOrBreak === 'break') {
                    setTimerState({
                        ...timerState,
                        start: false,
                        pause: false,
                        break: false,
                        shortBreakTime: shortBreakMinutes * 60,
                        time: workTimeMinutes * 60
                    });
                    audio?.play();
                    setStrTimer(() => `${workTimeMinutes} : 00`)
                    return
                } else {
                    audio?.play();
                    breakTime();
                    if (tasks.length > 0) {
                        const {id, catId, category} = tasks[0];
                        dispatch(actions.taskDone(id, catId, category));
                        showTaskDoneAlert();
                    }
                    return
                }
            } else {
                setStrTimer(() => `${minutes} : ${seconds}`)
            }
            if (timerState.shortBreakTime >= 0) {
                setTimerState({...timerState,
                    start: true,
                    pause: false,
                    break: startOrBreak === 'break',
                    time: --time
                });
            }
        }, 1000)
        setTimerId(timerId);
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


    // Timer functions

    const breakTime = () => {
        createInterval(timerState.shortBreakTime, 'break', audioFinishBreak);
    }

    const startTimer = () => {
        createInterval(timerState.time, 'start', audioFinishTask);
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



    return (
        <>
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
        </>
    )
}