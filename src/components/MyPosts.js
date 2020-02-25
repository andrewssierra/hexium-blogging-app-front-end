import React from 'react';
import PostComment from './Comment';
import PostForm from './PostForm';
import { Card, Icon } from 'antd';
import { tryMutation } from './utils/tryRequest';
import { gql } from 'apollo-boost';
const { Meta } = Card;


const deletePost = gql`
    mutation($id: ID!) {
        deletePost(id: $id) {
            id
        }
    }
`;

const updatePost = gql`
    mutation($data: updatePostInput!, $id: ID!) {
        updatePost(id: $id, data: $data) {
            id
            title
            body
            published
            comments {
                text
                author {
                    name
                }
                updatedAt
            }
        }
    }
`;



class MyPosts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {selected: undefined, selectedPost: {}};
    }

    handleDeletePost = postId => async e => {
        const variables = {
            id: postId
        }
        let result = await tryMutation(deletePost, this.props.client, variables);
        this.props.updateParentDeletePost(result);
    }

    handlePostEdit = postId => async (e) => {
        const post = this.props.posts.filter(post => post.id === postId)
        this.setState({selected: true, selectedPost: post[0]}); 
    }

    handleSubmit = async (data) => {
        const {title, body, image, id} = data;
        const variables = {
            id,
            data: {
                title,
                body,
                image,
                published: true
            }
        };
        let result = await tryMutation(updatePost, this.props.client, variables);
        if (result) {
            console.log(result)
            this.props.updateParentUpdatePost(result);
        }
        return;
    }


    render() {
        const {posts} = this.props;
        return(posts.map(post => {
            return (
                <div className="my-posts" key={post.id}>
                    <Card
                        cover={<img src={post.image} alt="post cover" />}
                        style={{
                            marginBottom: 16
                        }}
                        hoverable
                        key={post.id}
                        actions={[
                            <Icon type="edit" key="edit" onClick={this.handlePostEdit(post.id)} value={post.id}/>,
                            <Icon type="delete" key="delete" onClick={this.handleDeletePost(post.id)} value={post.id} />
                        ]}
                    >
                        <Meta title={post.title} description={post.body} />
                    </Card>
                    {post.comments[0] &&
                        post.comments.map(comment => {
                            return (
                                <PostComment
                                    key={comment.id}
                                    commentDetails={comment}
                                />
                            );
                        })}
                        {this.state.selected && (
                            <PostForm 
                                handleSubmit={this.handleSubmit}
                                selectedPost={this.state.selectedPost}
                            />
                        )}
                </div>
            );
        })
        )
    }
}

export default MyPosts;
