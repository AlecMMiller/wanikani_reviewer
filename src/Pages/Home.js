import { Component, React } from 'react';

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this)
    }

    logout() {
        this.props.logout();
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

                <h1>You are logged in</h1>

            </div>
        )
    }
}

export default HomePage