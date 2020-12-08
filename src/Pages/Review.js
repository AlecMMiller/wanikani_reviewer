import { Component, React } from 'react';
import { GetSubject } from '../Wanikani'

class ReviewPage extends Component {
    constructor(props) {
        super(props);
        this.incrementReview = this.incrementReview.bind(this);
        this.review_number = 1;
        this.state = { current_leech: this.props.first_leech };
        this.queueLeech(1);
        
    }

    queueLeech(leech_index){
        const uuid = this.props.leeches[leech_index].id;
        GetSubject(this.props.api_key, uuid).then((next_leech) => {
            this.next_leech = next_leech;
        })
    }

    incrementReview(){
        console.log("incrementing review")
        this.review_number += 1;
        this.setState({current_leech: this.next_leech});
        this.queueLeech(this.review_number);
    }

    render() {
        return (
            <div>
                <p>{this.state.current_leech.characters}</p>
                <button onClick={this.incrementReview}>Next Review</button>
            </div >
        )
    }
}

export default ReviewPage
