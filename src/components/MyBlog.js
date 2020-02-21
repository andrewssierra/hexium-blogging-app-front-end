import React from 'react';
import { gql } from 'apollo-boost';
import { Card, Icon, Avatar } from 'antd';
const { Meta } = Card;

const me = gql`
    query {
        me {
            name
            email
            posts {
                title
                body
                published
                id
            }
        }
    }
`;

class MyBlog extends React.Component {
    constructor(props) {
        super(props);
        this.state = { me: undefined };
    }
    componentDidMount() {
        this.me().then(result => {
            console.log(result);
            this.setState({ me: result });
        });
    }

    me = async () => {
        let result;
        try {
            result = await this.props.client.query({
                query: me
            });
        } catch (err) {
            alert('error.message');
            console.log(err.message);
        }
        console.log(result);
        if (result.data) {
            return result.data.me;
        }
    };

    render() {
        const { me } = this.state;

        return me ? (
            <div>
                <div>Hello, {me.name}</div>
                {me.posts.map(post => {
                    return (
                        <div style={{ paddingTop: 10 }}>
                            <Card
                                cover={<img src={post.img} />}
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
