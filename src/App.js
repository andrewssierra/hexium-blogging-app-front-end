import React from 'react';
import { Layout } from 'antd';
import Login from './components/Login';
import MyBlog from './components/MyBlog';
import { Route, Switch } from 'react-router-dom';

const { Content } = Layout;

class App extends React.Component {
    render() {
        const { client } = this.props;
        return (
            <Layout className="layout">
                <Content className="content">
                    <Switch>
                        <Route
                            exact
                            path="/"
                            render={() => <Login client={client} />}
                        />
                        <Route
                            exact
                            path="/home"
                            render={() => <MyBlog client={client} />}
                        />
                    </Switch>
                </Content>
            </Layout>
        );
    }
}

export default App;
