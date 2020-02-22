import React, { Fragment } from 'react';
import { gql } from 'apollo-boost';
import { Card } from 'antd';
import PostComment from './Comment';
import { tryQuery } from './utils/tryRequest';
import AboutMe from './AboutMe';
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
            this.props.updateHeader(result.me.profilePicture);
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
            <Fragment>
                <AboutMe me={me} />
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
                                            <PostComment
                                                commentDetails={comment}
                                            />
                                        );
                                    })}
                            </div>
                        );
                    })}
                </div>
            </Fragment>
        ) : (
            <div>Loading ... </div>
        );
    }
}

export default MyBlog;
