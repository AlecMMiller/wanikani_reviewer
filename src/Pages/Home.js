import { Component, React } from 'react';
import {NumberConfigField} from '../Widgets/ConfigField';

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
        this.startReview = this.startReview.bind(this);
    }

    logout() {
        this.props.logout();
    }

    startReview() {
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
                    <NumberConfigField title='Days to review' description='days' defaultValue='30' cookie='review-days'/>
                    <NumberConfigField title='Percent Threshold' description='days' defaultValue='85' cookie='review-percent'/>
                    <button onClick={this.startReview}>Review</button>
                </div>

            </div>
        )
    }
}

export default HomePage