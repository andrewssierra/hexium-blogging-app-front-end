import React from 'react';
import { Input, Button, Form, Icon } from 'antd';
const { TextArea } = Input;

const initialState = {
    title: undefined,
    body: undefined,
    image: undefined,
    id: undefined
};

class PostForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = initialState;
    }

    componentDidMount() {
        this.setState(this.props.selectedPost);
    }

    handleSubmit = async e => {
        e.preventDefault();
        await this.props.handleSubmit(this.state);
        this.setState({ initialState });
    };

    onTitleChange = e => {
        this.setState({ title: e.target.value });
    };
    onBodyChange = e => {
        this.setState({ body: e.target.value });
    };
    onImageChange = e => {
        this.setState({ image: e.target.value });
    };
    render() {
        const { title, body, image } = this.state;
        return (
            <div>
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
                            value={image}
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

export default PostForm;
