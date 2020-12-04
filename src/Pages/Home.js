import { Component, React } from 'react';

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
        this.startReview = this.startReview.bind(this);
    }

    logout() {
        this.props.logout();
    }

    startReview(){
        console.log('starting');
    }

    render() {
        const name = this.props.name;
        const greeting = this.props.greeting;

        return (
            <div>
                <div>
                    <p>{greeting}, {name}</p>
                    <button onClick={this.logout}>Logout</button>
                </div>

                <div>
                    <h1>Review Settings</h1>
                    <p>Days Old</p>
                    <input type="text" id="days" defaultValue='30' /><br/>
                    <p>Percent Threshold</p>
                    <input type="text" id="" defaultValue='85' /><br/>
                    <button onClick={this.startReview}>Review</button>
                </div>

            </div>
        )
    }
}

export default HomePage