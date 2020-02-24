import React from 'react';
import PostComment from './Comment';
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


class MyPosts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {selected: undefined};
    }

    onPostDelete = postId => async e => {
        const variables = {
            id: postId
        }
        let result = await tryMutation(deletePost, this.props.client, variables);
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
                            <Icon type="edit" key="edit" />,
                            <Icon type="delete" key="delete" onClick={this.onPostDelete(post.id)} value={post.id} />
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
                </div>
            );
        })
        )
    }
}

export default MyPosts;
