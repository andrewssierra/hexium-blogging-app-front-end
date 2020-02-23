import React from 'react';
import { Input, Button, Form} from 'antd';
const { TextArea } = Input;

const CreatePost = () => {
    return (
        <div style={{ width: '350px' }}>
            <p>Create a new post</p>
            <Form.Item style={{marginBottom: '2px'}}>
            <TextArea style={{ width: '350px' }} rows={4} />
            </Form.Item>
            <Form.Item  style={{marginBottom: '0px'}}>
            <Button htmlType="submit" type="primary" style={{float: 'right'}}>
                submit
            </Button>
            </Form.Item>
        </div>
    );
};

export default CreatePost;
