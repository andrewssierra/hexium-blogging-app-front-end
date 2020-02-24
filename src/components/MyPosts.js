import React from 'react';
import PostComment from './Comment';
import { Card, Icon } from 'antd';
const { Meta } = Card;

class MyPosts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render(props) {
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
                            <Icon type="delete" key="delete" />
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
