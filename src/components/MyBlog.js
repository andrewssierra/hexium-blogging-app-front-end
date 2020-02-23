import React, { Fragment } from 'react';
import { gql } from 'apollo-boost';
import { Card } from 'antd';
import PostComment from './Comment';
import { tryQuery } from './utils/tryRequest';
import AboutMe from './AboutMe';
import Cover from './Cover';
import CreatePost from './CreatePost';
import { Row, Col, Typography  } from 'antd';
const { Meta } = Card;
const { Title } = Typography;

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
                <Row type="flex">
                    <Col span={24}>
                        <Cover />
                    </Col>
                </Row>
                <Row type="flex">
                    <Col span={9}>
                        <AboutMe me={me} />
                    </Col>
                    <Col span={15}>
                        <Title level={4}>Hello, {me.name}</Title>
                        <CreatePost/>
                        {myPosts.map(post => {
                            return (
                                <div style={{ paddingTop: 10 }}>
                                    <Card
                                        cover={<img src={post.image} />}
                                        style={{
                                            width: 350,
                                            marginBottom: 16
                                        }}
                                        hoverable
                                        key={post.id}
                                        style={{ width: 350 }}
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
                    </Col>
                </Row>
            </Fragment>
        ) : (
            <div>Loading ... </div>
        );
    }
}

export default MyBlog;
