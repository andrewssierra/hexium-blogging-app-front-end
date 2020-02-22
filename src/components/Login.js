import React, { Fragment } from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { gql } from 'apollo-boost';
import { Redirect } from 'react-router-dom';
import NewUserForm from './NewUserForm';
import { tryMutation } from './utils/tryRequest';

const login = gql`
    mutation($data: LogInUserInput!) {
        login(data: $data) {
            token
        }
    }
`;

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            registerUser: undefined,
            loggedIn: false
        };
    }
    handleRegister = () => {
        this.setState({ registerUser: true });
    };
    updateModal = () => {
        this.setState({ registerUser: false });
    };
    handleSubmit = async e => {
        e.preventDefault();
        const variables = {
            data: { email: this.state.email, password: this.state.password }
        };
        let result = await tryMutation(login, this.props.client, variables);
        if (result) {
            document.cookie = `Authorization= ${result.data.login.token}`;
            this.setState({ loggedIn: true });
        }
        return;
    };
    onEmailChange = e => {
        this.setState({ email: e.target.value });
    };
    onPasswordChange = e => {
        this.setState({ password: e.target.value });
    };

    render() {
        const { loggedIn } = this.state;
        if (loggedIn) {
            return <Redirect from="/" to="/home" />;
        }
        return (
            <Fragment>
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <h1>Hello, </h1>
                    <Form.Item>
                        <Input
                            prefix={<Icon className="email-icon" type="user" />}
                            placeholder="Email"
                            onChange={this.onEmailChange}
                            value={this.state.email}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Input
                            prefix={
                                <Icon
                                    type="lock"
                                    style={{ color: 'rgba(0,0,0,.25)' }}
                                />
                            }
                            type="password"
                            placeholder="Password"
                            value={this.state.password}
                            onChange={this.onPasswordChange}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Checkbox>Remember me</Checkbox>
                        <a className="login-form-forgot" href=".">
                            Forgot password
                        </a>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="login-form-button"
                        >
                            Log in
                        </Button>
                        <a onClick={this.handleRegister}>Or register now!</a>
                    </Form.Item>
                </Form>
                {this.state.registerUser && (
                    <NewUserForm
                        client={this.props.client}
                        updatePatent={this.updateModal}
                    />
                )}
            </Fragment>
        );
    }
}

export default Login;
