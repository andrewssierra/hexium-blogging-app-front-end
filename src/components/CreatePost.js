import React from 'react';
import { Input, Button, Form, Icon } from 'antd';
const { TextArea } = Input;

const CreatePost = () => {
    return (
        <div>
            <p>Create a new post</p>
            <Form.Item>
                <Input placeholder="Title" />
            </Form.Item>
            <Form.Item style={{ marginBottom: '6px' }}>
                <TextArea  placeholder="Post body ..." rows={4} />
            </Form.Item>
            <Form.Item>
                <Input
                    placeholder="Post cover image"
                    suffix={
                        <Icon
                            type="paper-clip"
                            style={{marginRight: '5px'}}
                        />
                    }
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
        </div>
    );
};

export default CreatePost;
