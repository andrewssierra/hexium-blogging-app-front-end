import React from 'react';
import { Card } from 'antd';
const { Meta } = Card;

const AboutMe = props => {
    return (
        <div>
            <Card
                cover={<img src={props.me.profilePicture} />}
                style={{
                    width: 300,
                    marginTop: 16
                }}
                hoverable
                style={{ width: 300 }}
            >
                <Meta title="About Me" description={''} />
            </Card>
            <div />
        </div>
    );
};

export default AboutMe;
