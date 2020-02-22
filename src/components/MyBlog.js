import React from 'react';
import { gql } from 'apollo-boost';
import { Card, Icon, Avatar, Comment, Tooltip } from 'antd';
import moment from 'moment';
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
            console.log(result);
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
        console.log(result);
        if (result.data) {
            return result.data.myPosts;
        }
    };

    render() {
        const { myPosts } = this.state;

        return myPosts ? (
            <div>
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
                                        <Comment
                                            author={
                                                <a>{comment.author.name}</a>
                                            }
                                            avatar={
                                                <Avatar
                                                    src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                                                    alt="Han Solo"
                                                />
                                            }
                                            content={<p>{comment.text}</p>}
                                            datetime={
                                                <Tooltip
                                                    title={moment().format(
                                                        'YYYY-MM-DD HH:mm:ss'
                                                    )}
                                                >
                                                    <span>
                                                        {moment().fromNow()}
                                                    </span>
                                                </Tooltip>
                                            }
                                        />
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
