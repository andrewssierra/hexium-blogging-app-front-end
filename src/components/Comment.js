import React from 'react';
import moment from 'moment';
import { Avatar, Comment, Tooltip } from 'antd';

class PostComment extends React.Component {
    render() {
        const { commentDetails } = this.props;
        return (
            <Comment
                author={<a>{commentDetails.author.name}</a>}
                avatar={
                    <Avatar
                        src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                        alt="Han Solo"
                    />
                }
                content={<p>{commentDetails.text} </p>}
                datetime={
                    <Tooltip
                        title={moment(commentDetails.updatedAt)
                            .local()
                            .format('MM-DD-YY hh:mm a')}
                    >
                        <span>
                            {moment(
                                moment(commentDetails.updatedAt).local(),
                                'YYYYMMDD'
                            ).fromNow()}
                        </span>
                    </Tooltip>
                }
            />
        );
    }
}

export default PostComment;
