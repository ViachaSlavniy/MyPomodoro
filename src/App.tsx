import React from 'react';
import {Routes} from "./routes/Routes";
import {NavLink} from "react-router-dom";
import {Layout, Menu} from "antd";
import 'antd/dist/antd.css';
import './App.css';


const { Header, Content, Footer } = Layout;


const App: React.FC = () => {

  return (
      <Layout className="layout">
        <Header className="ant__header">
            <NavLink to="/">
                <div className="logo">
                    My Pomodoro Tracker
                </div>
            </NavLink>
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
            <Menu.Item key="1">
                <NavLink to="/statistics">
                    Статистика
                </NavLink>
            </Menu.Item>
            <Menu.Item key="2">
                <NavLink to="/settings">
                    Настройки
                </NavLink>
            </Menu.Item>
            <Menu.Item key="3">
                <NavLink to="/ideas">
                    Идеи
                </NavLink>
            </Menu.Item>
            <Menu.Item key="4">Языки</Menu.Item>
            <Menu.Item key="5">
                <NavLink to="/">
                    Емейл
                </NavLink>
            </Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: '0 50px' }}>
            <div className="site-layout-content" style={{margin: '16px 0'}}>
                <Routes />
            </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>
  );
}

export default App;
