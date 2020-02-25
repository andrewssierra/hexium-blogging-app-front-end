import React from 'react';
import {tryMutation} from './utils/tryRequest';
import { gql } from 'apollo-boost';
import PostForm from './PostForm';

const createPost = gql`
    mutation($data: CreatePostInput!) {
        createPost(data: $data) {
            title
            body
            image
            published
            id
            comments {
                text
                id
            }
        }
    }
`;

class CreatePost extends React.Component {
    handleSubmit = async (data) => {
        const {title, body, cover} = data;
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
            this.props.updateParent(result);
        }
        return;
    };

    render() {
        return (
            <div>
                <p>Create a new post</p>
                <PostForm handleSubmit={this.handleSubmit}/>
            </div>
        );
    }
}

export default CreatePost;
