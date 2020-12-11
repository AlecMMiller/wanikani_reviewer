import { Component, React } from 'react';
import {NumberConfigField} from '../Widgets/ConfigField';
import {getGreeting} from '../Widgets/Messages'

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
        this.startReview = this.startReview.bind(this);
        this.updateDaysToReview = this.updateDaysToReview.bind(this);
        this.updatePercentThreshold =  this.updatePercentThreshold.bind(this);
        this.greeting = getGreeting();

        this.state = {
            days_to_review: "30",
            percent_threshold: "85",
        }
    }

    logout() {
        this.props.logout();
    }

    startReview() {
        const percent = this.state.percent_threshold;
        const days = this.state.days_to_review;

        this.props.start(percent, days)
    }

    updateDaysToReview(value){
        this.setState({days_to_review: value});
    }

    updatePercentThreshold(value){
        this.setState({percent_threshold: value});
    }

    render() {
        const name = this.props.name;
        const greeting = this.greeting;

        const days_to_review = this.state.days_to_review;
        const percent_threshold = this.state.percent_threshold;

        return (
            <div>
                <div>
                    <p>{greeting}, {name}</p>
                    <button onClick={this.logout}>Logout</button>
                </div>

                <div className='config_box'>
                    <h1>Set Up Review</h1>
                    <NumberConfigField title='Days to review' description='days' defaultValue={days_to_review} cookie='review-days' onChange={this.updateDaysToReview} />
                    <NumberConfigField title='Percent Threshold' description='days' defaultValue={percent_threshold} cookie='review-percent' onChange={this.updatePercentThreshold}/>
                    <button onClick={this.startReview}>Review</button>
                </div>

            </div>
        )
    }
}

export default HomePage