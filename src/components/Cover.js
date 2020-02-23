import React from 'react';

class AboutMe extends React.Component {
    constructor(props) {
        super(props);
        this.state = { cover: undefined };
    }

    componentDidMount = async () => {
        const proxyurl = 'https://cors-anywhere.herokuapp.com/';
        const pictureOfTheDay = await fetch(
            proxyurl +
                'http://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1'
        ).then(result => {
            return result.json();
        });
        const url = `http://bing.com/${pictureOfTheDay.images[0].url}`;
        this.setState({
            cover: url
        });
    };

    render() {
        return (
            <div style={{ height: '350px', overflow: 'hidden' }}>
                <img
                    style={{ margin: '-500px 0px 0px 0px' }}
                    src={this.state.cover}
                />
            </div>
        );
    }
}

export default AboutMe;
