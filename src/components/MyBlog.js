import React, { Fragment } from 'react';
import AboutMe from './AboutMe';
import Cover from './Cover';
import MyPosts from './MyPosts';
import { gql } from 'apollo-boost';
import { tryQuery } from './utils/tryRequest';
import CreatePost from './CreatePost';
import { Row, Col, Typography } from 'antd';
const { Title } = Typography;

const myPosts = gql`
    query {
        myPosts(orderBy: createdAt_DESC) {
            title
            body
            image
            published
            id
            comments {
                author {
                    name
                }
                id
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
        this.state = { myPosts: undefined, me: undefined, test: undefined };
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

    updateParent = newPostData => {
        const newPost = newPostData.data.createPost;
        this.setState({ myPosts: [newPost, ...this.state.myPosts] });
    };

    deletePost = deletePostData => {
        const { deletePost } = deletePostData.data;
        console.log(deletePost);
        console.log(
            this.state.myPosts.filter(post => post.id !== deletePost.id)
        );
        const myPosts = this.state.myPosts.filter(
            post => post.id !== deletePost.id
        );
        this.setState({ myPosts });
    };

    updatePost = updatePostData => {
        const { updatePost } = updatePostData.data;
        const { myPosts } = this.state;
        let oldIndex = myPosts.findIndex(post => post.id === updatePost.id);
        myPosts.splice(oldIndex, 1, updatePost);
        this.setState({ myPosts });
    };

    addComment = addCommentData => {
        const { createComment } = addCommentData.data;
        const { myPosts } = this.state;
        let commentPost = myPosts.findIndex(
            post => post.id === createComment.post.id
        );
        myPosts[commentPost].comments.push(createComment);
        this.setState({ myPosts });
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
                    <Col span={15} className="my-posts">
                        <Title level={4}>Hello, {me.name}</Title>
                        <CreatePost
                            client={this.props.client}
                            updateParent={this.updateParent}
                        />
                        <MyPosts
                            client={this.props.client}
                            posts={myPosts}
                            updateParentDeletePost={this.deletePost}
                            updateParentUpdatePost={this.updatePost}
                            updateParentAddComment={this.addComment}
                        />
                    </Col>
                </Row>
            </Fragment>
        ) : (
            <div>Loading ... </div>
        );
    }
}

export default MyBlog;
