import React from 'react';
import { Avatar, Descriptions, Divider} from 'antd';

class AboutMe extends React.Component {
    constructor(props) {
        super(props);
        this.state = { profilePicture: undefined };
    }

    componentDidMount = async () => {
        this.setState({ profilePicture: this.props.me.profilePicture });
    };

    render() {
        return (
            <div className='about-me'>
                <Avatar
                    size={200}
                    src={this.state.profilePicture || 'https://iupac.org/wp-content/uploads/2018/05/default-avatar.png'}
                    alt="Profile"
                />
                <br />
                <br />
                <Divider orientation="left">About Me</Divider>
                <Descriptions>
                    <Descriptions.Item label="Name">
                        {this.props.me.name}
                    </Descriptions.Item>
                </Descriptions>
            </div>
        );
    }
}

export default AboutMe;
