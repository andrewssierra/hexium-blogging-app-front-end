import React from 'react';
import { gql } from 'apollo-boost';
import { Card } from 'antd';
import PostComment from './Comment';
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

class MyBlog extends React.Component {
    constructor(props) {
        super(props);
        this.state = { myPosts: undefined };
    }
    componentDidMount() {
        this.me().then(result => {
            this.setState({ myPosts: result });
        });
    }

    me = async () => {
        let result;
        try {
            result = await this.props.client.query({
                query: myPosts
            });
        } catch (err) {
            alert('error.message');
            console.log(err.message);
        }
        if (result.data) {
            return result.data.myPosts;
        }
    };

    render() {
        const { myPosts } = this.state;
        return myPosts ? (
            <div className="my-posts">
                <div>Hello, Judy</div>
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
