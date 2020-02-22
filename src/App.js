import React from 'react';
import { Layout, PageHeader } from 'antd';
import Login from './components/Login';
import MyBlog from './components/MyBlog';
import { Route, Switch } from 'react-router-dom';

const { Content } = Layout;

class App extends React.Component {
    render() {
        const { client } = this.props;
        return (
            <Layout className="layout">
                <PageHeader
                    style={{
                        border: '1px solid rgb(235, 237, 240)'
                    }}
                    title="This is a blog"
                    subTitle=""
                    ghost={true}
                    avatar={{
                        src:
                            'https://avatars1.githubusercontent.com/u/8186664?s=460&v=4'
                    }}
                />
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
