import React from 'react';
import { Avatar } from 'antd';

class AboutMe extends React.Component {

    constructor(props) {
        super(props);
        this.state = {profilePicture: undefined}
    }

    componentDidMount = async ()=> {
        this.setState({profilePicture: this.props.me.profilePicture })
    }

    render(){
        return (
            <div style={{ margin: '-86px 100px'}}>
                <Avatar
                    size={200}
                   
                    src={this.state.profilePicture}
                    alt="Profile"
                />
            </div>
        );
    }
};

export default AboutMe;
