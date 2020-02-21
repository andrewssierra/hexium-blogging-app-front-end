import React from 'react';
import { gql } from 'apollo-boost';

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
        return this.state.me ? (
            <div>Hello, {this.state.me.name}</div>
        ) : (
            <div>Loading ... </div>
        );
    }
}

export default MyBlog;
