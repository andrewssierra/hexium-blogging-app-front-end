import React from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
// import { gql } from 'apollo-boost';

// const getUsers = gql`
//     query {
//         users {
//             id
//             name
//         }
//     }
// `;

// function App({ client }) {
//     client.query({ query: getUsers }).then(response => {
//         console.log(response);
//     });
//     return <div className="App">hello</div>;
// }

class Login extends React.Component {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    };

    render() {
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <h1>Hello, </h1>
                <Form.Item>
                    <Input
                        prefix={<Icon className="username-icon" type="user" />}
                        placeholder="Username"
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
