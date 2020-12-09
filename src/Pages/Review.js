import { Component, React } from 'react';
import { GetSubject } from '../Wanikani'

var one_character_hiragana = {
    'a': 'あ',
    'i': 'い',
    'u': 'う',
    'e': 'え',
    'o': 'お',
}

var two_character_hiragana = {
    'ka': 'か',
    'ki': 'き',
    'ku': 'く',
    'ke': 'け',
    'ko': 'こ',
    'sa': 'さ',
    'su': 'す',
    'se': 'せ',
    'so': 'そ',
    'ta': 'た',
    'te': 'て',
    'to': 'と',
    'na': 'な',
    'ni': 'に',
    'nu': 'ぬ',
    'ne': 'ね',
    'no': 'の',
    'ha': 'は',
    'hi': 'ひ',
    'fu': 'ふ',
    'he': 'へ',
    'ho': 'ほ',
    'ma': 'ま',
    'mi': 'み',
    'mu': 'む',
    'me': 'め',
    'mo': 'も',
    'ya': 'や',
    'yu': 'ゆ',
    'yo': 'よ',
    'ra': 'ら',
    'ri': 'り',
    'ru': 'る',
    're': 'れ',
    'ro': 'ろ',
    'wa': 'わ',
    'wo': 'を',
    'nn': 'ん',
    'ga': 'が',
    'gi': 'ぐ',
    'gu': 'ぐ',
    'ge': 'げ',
    'go': 'ご',
    'za': 'ざ',
    'ji': 'じ',
    'zu': 'ず',
    'ze': 'ぜ',
    'zo': 'ぞ',
    'da': 'だ',
    'de': 'で',
    'do': 'ど',
    'ba': 'ば',
    'bi': 'び',
    'bu': 'ぶ',
    'be': 'べ',
    'bo': 'ぼ',
    'pa': 'ぱ',
    'pi': 'ぴ',
    'pu': 'ぷ',
    'pe': 'ぺ',
    'po': 'ぽ',
    'ja': 'じゃ',
    'ju': 'じゅ',
    'jo': 'じょ',
}

var three_character_hiragana = {
    'kya': 'きゃ',
    'kyu': 'きゅ',
    'kyo': 'きょ',
    'sha': 'しゃ',
    'shu': 'しゅ',
    'sho': 'しょ',
    'cha': 'ちゃ',
    'chu': 'ちゅ',
    'cho': 'ちょ',
    'nya': 'にゃ',
    'nyu': 'にゅ',
    'nyo': 'にょ',
    'hya': 'ひゃ',
    'hyu': 'ひゅ',
    'hyo': 'ひょ',
    'mya': 'みゃ',
    'myu': 'みゅ',
    'myo': 'みょ',
    'rya': 'りゃ',
    'ryu': 'りゅ',
    'ryo': 'りょ',
    'shi': 'し',
    'chi': 'ち',
    'dji': 'ぢ',
    'dzu': 'づ',
    'gya': 'ぎゃ',
    'gyu': 'ぎゅ',
    'gyo': 'ぎょ',
    'bya': 'びゃ',
    'byu': 'びゅ',
    'byo': 'びょ',
    'pya': 'ぴゃ',
    'pyu': 'ぴゅ',
    'pyo': 'ぴょ',
    'tsu': 'つ',
}

function match_hiragana_1(roman){
    if(roman in one_character_hiragana){
        let hiragana = one_character_hiragana[roman];
        return[hiragana, 1];
    } else {
        return['', 0];
    }
}

function match_hiragana_2(roman){
    if(roman in two_character_hiragana){
        let hiragana = two_character_hiragana[roman];
        return [hiragana, 2];
    } else {
        const first_char = roman.charAt(0);
        const second_char = roman.charAt(1);

        if(first_char === second_char){
            return['っ', 2];
        }
        return['', 0];
    }
}

function match_hiragana_3(roman){
    if(roman in three_character_hiragana){
        let hiragana = three_character_hiragana[roman];
        return [hiragana, 3];
    } else {
        return['', 0]; 
    }
}

class JapaneseInput extends Component {
    constructor(props) {
        super(props);

        this.handleInput = this.handleInput.bind(this);
        this.state = {
            inputValue: ''
        };
    }

    handleInput(event) {
        let old_text = event.target.value;
        let end_text = old_text;
        let text_length = old_text.length;

        // Last three letters in string
        if (text_length > 3) {
            end_text = end_text.substring(text_length - 3)
        }

        end_text = end_text.toLowerCase();
        let text_array = end_text.split("");
        let out_array = [];

        const letterNumber = /^[a-z]+$/;
        for (const c of text_array.reverse()) {
            if (!c.match(letterNumber)) {
                break;
            }

            out_array.push(c);
        }
        let roman_end = out_array.reverse().join("");

        let hiragana = ''
        let removed = 0;

        switch (roman_end.length) {
            case 0:
                break;
            case 1:
                [hiragana, removed] = match_hiragana_1(roman_end);
                break;
            case 2:
                [hiragana, removed] = match_hiragana_2(roman_end);
                break;
            case 3:
                [hiragana, removed] = match_hiragana_3(roman_end);
                break;
        }

        if(removed){
            text_length = old_text.length;
            var new_text = old_text.substring(0, text_length - removed);
            new_text += hiragana;
            
        } else {
            var new_text = old_text;
        }

        this.setState({
            inputValue: new_text
        });
    }

    render() {
        return (
            <div>
                <input name="ime" type="text" onChange={this.handleInput} value={this.state.inputValue} />
            </div>
        )
    }
}

class ReviewPage extends Component {
    constructor(props) {
        super(props);
        this.num_reviews = this.props.leeches.length;
        this.incrementReview = this.incrementReview.bind(this);
        this.review_number = 1;
        this.state = { current_leech: this.props.first_leech };
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
        this.setState({ current_leech: this.next_leech });
        this.queueLeech(this.review_number);
    }

    render() {
        return (
            <div>
                <p>{this.review_number}/{this.num_reviews}</p>
                <p>{this.state.current_leech.characters}</p>
                <button onClick={this.incrementReview}>Next Review</button>
                <JapaneseInput />
            </div >
        )
    }
}

export default ReviewPage
