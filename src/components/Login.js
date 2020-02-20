import React from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { gql } from 'apollo-boost';

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
        this.state = { email: '', password: '' };
    }
    handleSubmit = async e => {
        e.preventDefault();
        console.log(this.state.email);
        console.log(this.state.password);
        const variables = {
            data: { email: this.state.email, password: this.state.password }
        };
        let result;
        try {
            result = await this.props.client.mutate({
                mutation: login,
                variables
            });
        } catch (err) {
            alert('Incorrect email/password');
            console.log(err.message);
        }
        console.log(result);
    };
    onEmailChange = e => {
        this.setState({ email: e.target.value });
    };
    onPasswordChange = e => {
        this.setState({ password: e.target.value });
    };
    render() {
        return (
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
                    <a href=".">Or register now!</a>
                </Form.Item>
            </Form>
        );
    }
}

export default Login;
