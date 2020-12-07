const API_ROOT = 'https://api.wanikani.com/v2/';

function makeUrl(url_end, params) {
    let url = API_ROOT + url_end;

    if (params) {
        url += '?' + objectToQueryString(params);
    }

    return url
}

function makeAuthorization(token) {
    return 'Bearer ' + token
}

function objectToQueryString(obj) {
    return Object.keys(obj).map(key => key + '=' + obj[key]).join('&');
}

async function getRequestRecursive(url, token, cb, previous_data = null) {
    let response = await fetch(url, {
        method: 'GET',
        headers: { 'Authorization': makeAuthorization(token) }
    });

    if (!response.ok) {
        return
    } else {
        let json = await response.json();
        let pages = json.pages;
        let data = json.data;

        let next_page = null;

        if (pages) {
            next_page = pages.next_url;

            if (previous_data) {
                data = previous_data.concat(data);
            }

        }

        if (next_page) {
            return getRequestRecursive(next_page, token, cb, data);
        } else {
            return data;
        }
    }
}

function getRecursivePromise(url_end, params, token, cb) {
    let url = makeUrl(url_end, params);
    const fetchPromise = getRequestRecursive(url, token, cb);

    return fetchPromise;
}

function getFetchPromise(url_end, params, token) {
    const url = makeUrl(url_end, params);
    const fetchPromise = fetch(url, {
        method: 'GET',
        headers: { 'Authorization': makeAuthorization(token) }
    })

    return fetchPromise;
}

async function GetUsername(apiToken) {
    if (apiToken === 'test') {
        return 'TestUser';
    }

    const url_end = 'user';
    let response = await getFetchPromise(url_end, null, apiToken);

    if (!response.ok) {
        return ''
    } else {
        let json = await response.json();
        let data = json.data.username;
        return data;
    }
}

function compareLeeches( a, b ) {
    if ( a.ranker < b.ranker ){
      return -1;
    }
    if ( a.ranker > b.ranker ){
      return 1;
    }
    return 0;
  }

async function GetLeeches(apiToken, percent, days) {
    console.log(apiToken);
    const url_end = 'review_statistics';

    let target_date = new Date();
    target_date.setTime(target_date.getTime() - (1000 * 60 * 60 * 24) * days);

    const arg_date = target_date.toISOString();

    var params = {
        updated_after: arg_date,
        subject_types: "vocabulary",
        percentages_less_than: percent,
    };

    let response = await getRecursivePromise(url_end, params, apiToken);
    let leeches = [];

    for (const review_number in response) {
        const review_data = response[review_number].data;
        const current_meaning = review_data.meaning_current_streak;
        const current_reading = review_data.reading_current_streak;

        if(current_meaning > 3 && current_reading > 3){
            continue;
        } else {
            const current_percent = review_data.percentage_correct;
            const ranker = Math.min(current_reading, current_meaning) * 100 + current_percent;
            const leech = {ranker: ranker, id: review_data.subject_id};
            leeches.push(leech);
        }

    }

    leeches.sort( compareLeeches );

    return leeches;
}

export { GetUsername, GetLeeches };
