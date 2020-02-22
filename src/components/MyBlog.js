import React from 'react';
import { gql } from 'apollo-boost';
import { Card } from 'antd';
import PostComment from './Comment';
import { tryQuery } from './utils/tryQuery';
const { Meta } = Card;

const myPosts = gql`
    query {
        myPosts {
            title
            body
            image
            published
            id
            comments {
                author {
                    name
                }
                text
                updatedAt
            }
        }
    }
`;

const me = gql`
    query {
        me {
            profilePicture
            name
        }
    }
`;

class MyBlog extends React.Component {
    constructor(props) {
        super(props);
        this.state = { myPosts: undefined, me: undefined };
    }
    componentDidMount() {
        this.me().then(result => {
            this.setState(result);
        });
    }

    me = async () => {
        let myPostsData;
        let meData;
        myPostsData = await tryQuery(myPosts, this.props.client);
        meData = await tryQuery(me, this.props.client);

        if (meData.data && myPostsData.data) {
            return { myPosts: myPostsData.data.myPosts, me: meData.data.me };
        }
    };

    render() {
        const { myPosts, me } = this.state;
        return myPosts ? (
            <div className="my-posts">
                <div>Hello, {me.name}</div>
                {myPosts.map(post => {
                    return (
                        <div style={{ paddingTop: 10 }}>
                            <Card
                                cover={<img src={post.image} />}
                                style={{
                                    width: 300,
                                    marginTop: 16
                                }}
                                hoverable
                                key={post.id}
                                style={{ width: 300 }}
                            >
                                <Meta
                                    title={post.title}
                                    description={post.body}
                                />
                            </Card>
                            {post.comments[0] &&
                                post.comments.map(comment => {
                                    return (
                                        <PostComment commentDetails={comment} />
                                    );
                                })}
                        </div>
                    );
                })}
            </div>
        ) : (
            <div>Loading ... </div>
        );
    }
}

export default MyBlog;
