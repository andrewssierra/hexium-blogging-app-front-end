import React from 'react';
import { Layout, PageHeader } from 'antd';
import Login from './components/Login';
import MyBlog from './components/MyBlog';
import { Route, Switch } from 'react-router-dom';

const { Content } = Layout;

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { avatar: undefined };
    }

    updateHeader = profilePicture => {
        this.setState({ avatar: profilePicture });
    };

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
                    avatar={
                        this.state.avatar
                            ? { src: `${this.state.avatar}` }
                            : {
                                  src:
                                      'https://iupac.org/wp-content/uploads/2018/05/default-avatar.png'
                              }
                    }
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
                            render={() => (
                                <MyBlog
                                    client={client}
                                    updateHeader={this.updateHeader}
                                />
                            )}
                        />
                    </Switch>
                </Content>
            </Layout>
        );
    }
}

export default App;
