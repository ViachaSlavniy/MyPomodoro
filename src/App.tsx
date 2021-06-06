import React from 'react';
import {Routes} from "./routes/Routes";
import {Layout} from "antd";
import 'antd/dist/antd.css';
import './App.css';
import {HeaderApp} from "./components/Common/components/Header";


const { Content, Footer } = Layout;

const App: React.FC = () => {

  return (
      <Layout className="layout">
        <HeaderApp />
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
