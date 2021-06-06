import React from 'react';
import {NavLink} from "react-router-dom";
import {Button, Layout, Menu} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../redux/store";
import {signOut, UserType} from "../../../redux/reducers/auth-reducer";
const { Header } = Layout;

export const HeaderApp: React.FC = () => {
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.auth.user as UserType);

    const logout = () => {
        dispatch(signOut());
    }

    return (
        <Header className="ant__header">
            <NavLink to="/">
                <div className="logo">
                    My Pomodoro Tracker
                </div>
            </NavLink>
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['5']}>
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
                    {user
                    ? <NavLink to="/profile">
                            {user?.email}
                        </NavLink>
                    : <NavLink to="/login">
                            Регистарация/Вход
                        </NavLink>
                    }
                </Menu.Item>
            </Menu>
        </Header>
    );
};