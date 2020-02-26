import React from 'react';
import { Form, Input, Button } from 'antd';
import { tryMutation } from './utils/tryRequest';
import { gql } from 'apollo-boost';
const { TextArea } = Input;

const createComment = gql`
    mutation($data: CreateCommentInput!) {
        createComment(data: $data) {
            text
            author {
                name
            }
            id
            post {
                id
            }
        }
    }
`;

const initialState = { comment: undefined };

class NewComment extends React.Component {
    constructor(props) {
        super(props);
        this.state = { initialState };
    }

    onCommentChange = e => {
        this.setState({ comment: e.target.value });
    };

    handleSubmit = async e => {
        e.preventDefault();
        const variables = {
            data: {
                text: this.state.comment,
                post: this.props.id
            }
        };
        const data = await tryMutation(
            createComment,
            this.props.client,
            variables
        );
        await this.props.updateParent(data);
        this.setState(initialState);
    };

    render() {
        return (
            <Form onSubmit={this.handleSubmit}>
                <Form.Item style={{ marginBottom: '6px' }}>
                    <TextArea
                        required
                        placeholder="New comment ..."
                        value={this.state.comment}
                        onChange={this.onCommentChange}
                        rows={4}
                    />
                    <Button
                        htmlType="submit"
                        type="primary"
                        style={{ float: 'right' }}
                    >
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        );
    }
}

export default NewComment;
