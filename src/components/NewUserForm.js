import { Form, Icon, Input } from 'antd';
import React from 'react';
import { Modal } from 'antd';
import { gql } from 'apollo-boost';

const createUser = gql`
    mutation($data: CreateUserInput!) {
        createUser(data: $data) {
            token
            user {
                id
                name
                email
            }
        }
    }
`;

class NewUserForm extends React.Component {
    state = { visible: true, email: '', password: '', name: '' };
    handleOk = async e => {
        console.log(e);
        const variables = {
            data: {
                email: this.state.email,
                password: this.state.password,
                name: this.state.name
            }
        };
        let result;
        try {
            result = await this.props.client.mutate({
                mutation: createUser,
                variables
            });
        } catch (err) {
            alert('Unable to create user');
            console.log(err.message);
        }

        console.log(result);
        this.props.updatePatent();
    };
    onEmailChange = e => {
        this.setState({ email: e.target.value });
    };
    onPasswordChange = e => {
        this.setState({ password: e.target.value });
    };
    onNameChange = e => {
        this.setState({ name: e.target.value });
    };
    handleCancel = e => {
        console.log(e);
        this.props.updatePatent();
    };
    render() {
        return (
            <div>
                <Modal
                    title="New User Registration"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <Form onSubmit={this.handleSubmit}>
                        <h4>Hello, </h4>
                        <Form.Item>
                            <Input
                                prefix={
                                    <Icon className="email-icon" type="user" />
                                }
                                placeholder="Name"
                                onChange={this.onNameChange}
                                value={this.state.name}
                            />
                        </Form.Item>
                        <Form.Item>
                            <Input
                                prefix={
                                    <Icon
                                        className="email-icon"
                                        type="user-add"
                                    />
                                }
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
                    </Form>
                </Modal>
            </div>
        );
    }
}

export default NewUserForm;
