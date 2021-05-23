import React, {useState} from 'react';
import {useSelector} from "react-redux";
import {RootState} from "../../../../redux/store";

export const TimerBlock: React.FC = () => {
    const activeScheme = useSelector((state: RootState) => state.settings.activeScheme)
    const [strTimer, setStrTimer] = useState('00 : 00');
    let time = 0.1 * 60;
    let timer: number;
    const startTimer = () => {
         timer = window.setInterval(() => {
            let minutes = time / 60 % 60;
            let seconds = time % 60;
            if (time < 0) {
                clearInterval(timer);
            } else {
                setStrTimer(() => `${Math.trunc(minutes)} : ${Math.trunc(seconds)}`)
            }
            --time;
        }, 1000)
    }

    const stopTimer = () => {
        // clearInterval(timer);
        setStrTimer(() => `00 : 00`)
    }

    return (
        <div className="timerBlock">
            <div className="timer">
                <div className="display">{strTimer}</div>
                <div className="display__buttons">
                    <div className="display__button display__button_start">
                        <button onClick={startTimer}>Start</button>
                    </div>
                    <div className="display__button display__button_stop">
                        <button onClick={stopTimer}>Stop</button>
                    </div>
                </div>
            </div>
        </div>
    )
}