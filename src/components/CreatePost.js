import React from 'react';
import {tryMutation} from './utils/tryRequest';
import { Input, Button, Form, Icon } from 'antd';
import { gql } from 'apollo-boost';
const { TextArea } = Input;

const createPost = gql`
    mutation($data: CreatePostInput!) {
        createPost(data: $data) {
            title
            body
            image
            published
        }
    }
`;


class CreatePost extends React.Component {
    constructor(props) {
        super(props);
        this.state = { title: undefined, body: undefined, cover: undefined };
    }

    handleSubmit = async e => {
        const {title, body, cover} = this.state;
        e.preventDefault();
        const variables = {
            data: {
                title,
                body,
                image: cover,
                published: true
            }
        };
        let result = await tryMutation(createPost, this.props.client, variables);
        if (result) {
            console.log(result)
        }
        return;
    };

    onTitleChange = e => {
        this.setState({ title: e.target.value });
    };
    onBodyChange = e => {
        this.setState({ body: e.target.value });
    };
    onCoverChange = e => {
        this.setState({ cover: e.target.value });
    };
    render() {
        const {title, body, cover} = this.state;
        return (
            <div>
                <p>Create a new post</p>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Item>
                        <Input
                            required
                            placeholder="Title"
                            value={title}
                            onChange={this.onTitleChange}
                        />
                    </Form.Item>
                    <Form.Item style={{ marginBottom: '6px' }}>
                        <TextArea
                            required
                            placeholder="Post body ..."
                            value={body}
                            onChange={this.onBodyChange}
                            rows={4}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Input
                            placeholder="Post cover image"
                            suffix={
                                <Icon
                                    type="paper-clip"
                                    style={{ marginRight: '5px' }}
                                />
                            }
                            value={cover}
                            onChange={this.onCoverChange}
                        ></Input>
                    </Form.Item>
                    <Form.Item style={{ marginBottom: '2px' }}>
                        <Button
                            htmlType="submit"
                            type="primary"
                            style={{ float: 'right' }}
                        >
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}

export default CreatePost;
