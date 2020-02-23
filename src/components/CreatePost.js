import React from 'react';
import { Input, Button, Form} from 'antd';
const { TextArea } = Input;

const CreatePost = () => {
    return (
        <div>
            <p>Create a new post</p>
            <Form.Item style={{marginBottom: '6px'}}>
            <TextArea  rows={4} />
            </Form.Item>
            <Form.Item  style={{marginBottom: '2px'}}>
            <Button htmlType="submit" type="primary" style={{float: 'right'}}>
                Submit
            </Button>
            </Form.Item>
        </div>
    );
};

export default CreatePost;
