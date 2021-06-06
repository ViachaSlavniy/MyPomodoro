import React from 'react';
import {Redirect} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import {Form, Input, Button, Checkbox} from 'antd';
import style from './LoginPage.module.css';
import {authWithGoogle} from "../../redux/reducers/auth-reducer";

export const LoginPage: React.FC = () => {
    const dispatch = useDispatch();
    const isAuth = useSelector((state: RootState) => state.auth.isAuth);

    const login = async () => {
        dispatch(authWithGoogle());
    }

    const layout = {
        labelCol: {span: 8},
        wrapperCol: {span: 16},
    };
    const tailLayout = {
        wrapperCol: {offset: 8, span: 16},
    };


    const onFinish = (values: any) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };


    if (isAuth) {
        return <Redirect to={'/profile'}/>
    }

    return (
        <>
            <div className={style.formWrapper}>
                <Form
                    {...layout}
                    name="basic"
                    initialValues={{remember: true}}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[{required: true, message: 'Please input your username!'}]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{required: true, message: 'Please input your password!'}]}
                    >
                        <Input.Password/>
                    </Form.Item>

                    <Form.Item {...tailLayout} name="remember" valuePropName="checked">
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </div>
            <div className={style.authButton}>
                <Button onClick={login}>Войти с помощью GOOGLE</Button>
            </div>
        </>
    );
}
