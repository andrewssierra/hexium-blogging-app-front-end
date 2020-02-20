import React from 'react';
import { Layout } from 'antd';
import Login from './components/Login';

const { Content } = Layout;

class App extends React.Component {
    render() {
        const { client } = this.props;
        return (
            <Layout className="layout">
                <Content className="content">
                    <Login client={client} />
                </Content>
            </Layout>
        );
    }
}

export default App;
