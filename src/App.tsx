import React, {useState} from 'react';
import {useSelector} from "react-redux";
import {RootState} from "./redux/store";
import { Layout, Menu, Breadcrumb } from 'antd';
import 'antd/dist/antd.css';
import './App.css';

const { Header, Content, Footer } = Layout;

const App: React.FC = () => {
    const activeScheme = useSelector((state: RootState) => state.settings.activeScheme)
    const [strTimer, setStrTimer] = useState('00 : 00');
    let time = 0.1 * 60;
    let timer: any;
    const startTimer = () => {
        timer = setInterval(() => {
            let minutes = time / 60 % 60;
            let seconds = time % 60;
            if (time < 0) {
                clearInterval(timer);
            } else {
                setStrTimer(() => `${Math.trunc(minutes)} : ${Math.floor(seconds)}`)
            }
            --time;
        }, 1000)
    }

    const stopTimer = () => {
        clearInterval(timer);
        setStrTimer(() => `00 : 00`)
    }

  return (
      <Layout className="layout">
          <Header>
              <div className="logo">MyPomodoro</div>
              <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                  <Menu.Item key="1">nav 1</Menu.Item>
                  <Menu.Item key="2">nav 2</Menu.Item>
                  <Menu.Item key="3">nav 3</Menu.Item>
              </Menu>
          </Header>
          <Content style={{ padding: '0 50px' }}>
              <div className="site-layout-content" style={{ margin: '16px 0' }}>
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
              </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>
  );
}

export default App;
