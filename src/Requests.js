const API_ROOT = 'https://api.wanikani.com/v2/';

function makeUrl(url_end, params) {
    let url = API_ROOT + url_end;

    if (params) {
        url += '?' + objectToQueryString(params);
    }

    return url
}

function objectToQueryString(obj) {
    return Object.keys(obj).map(key => key + '=' + obj[key]).join('&');
}


function makeAuthorization(token) {
    return 'Bearer ' + token
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

export { getRecursivePromise, getFetchPromise };
