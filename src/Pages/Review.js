import { Component, React } from 'react';
import { GetSubject } from '../Wanikani'
import { JapaneseInput } from '../Widgets/HiraganaIme'

function InfoBox(props) {
    let values = props.values;
    let description = props.description

    if (values.length > 1) {
        description += 's';
    }

    values = values.join(', ')

    return (
        <div>
            <p>{description}: {values}</p>
        </div>
    );
}

function HelpBox(props) {
    let meanings = props.meanings.join(", ");
    console.log(meanings);
    return (
        <div>
            <InfoBox values={props.readings} description={"Reading"} />
            <InfoBox values={props.meanings} description={"Meaning"} />
        </div>
    );
}

class ReviewPage extends Component {
    constructor(props) {
        super(props);
        this.num_reviews = this.props.leeches.length;
        this.incrementReview = this.incrementReview.bind(this);
        this.toggleHelp = this.toggleHelp.bind(this);
        this.review_number = 1;
        this.state = { current_leech: this.props.first_leech, view_help: false };
        this.queueLeech(1);
    }

    queueLeech(leech_index) {
        if (leech_index >= this.num_reviews) {
            return;
        }
        const uuid = this.props.leeches[leech_index].id;
        GetSubject(this.props.api_key, uuid).then((next_leech) => {
            this.next_leech = next_leech;
        })
    }

    incrementReview() {
        if (this.review_number >= this.num_reviews) {
            this.props.endReview();
            return;
        }
        this.review_number += 1;
        this.setState({ current_leech: this.next_leech, view_help: false });
        this.queueLeech(this.review_number);
    }

    toggleHelp() {
        this.setState({ view_help: true });
    }

    render() {
        let readings = []
        let meanings = []
        let current_leech = this.state.current_leech;

        current_leech.readings.forEach(element => readings.push(element.reading));
        current_leech.meanings.forEach(element => meanings.push(element.meaning));

        return (
            <div>
                <p>{this.review_number}/{this.num_reviews}</p>
                <p>{this.state.current_leech.characters}</p>
                <button onClick={this.incrementReview}>Next Review</button>
                <JapaneseInput answers={readings} />
                <button onClick={this.toggleHelp}>Help</button>
                {this.state.view_help &&
                    <HelpBox readings={readings} meanings={meanings} />
                }
            </div >
        )
    }
}

export default ReviewPage
