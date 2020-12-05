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

function getRequestRecursive(url, token, cb, previous_data = null) {
    fetch(url, {
        method: 'GET',
        headers: { 'Authorization': makeAuthorization(token) }
    }).then(res => res.json())
        .then(json => {
            let pages = json.pages;
            let data = json.data;

            let next_page = null;

            if (pages) {
                let next_page = pages.next_url;

                if (previous_data) {
                    data = previous_data.concat(data);
                }

            }

            if (next_page) {
                getRequestRecursive(next_page, token, cb, data);
            } else {
                cb(data);
            }
        })
        .catch(err => console.log(err))
}

function getRequest(url_end, params, token, cb) {
    let url = makeUrl(url_end, params);

    getRequestRecursive(url, token, cb);
}

function getFetchPromise(url_end, params, token){
    const url = makeUrl(url_end, params);
    const fetchPromise = fetch(url, {
        method: 'GET',
        headers: { 'Authorization': makeAuthorization(token) }
    })

    return fetchPromise;
}

async function getUsername(apiToken){
    if(apiToken === 'test'){
        return 'TestUser';
    }

    const url_end = 'user';
    let response = await getFetchPromise(url_end, null, apiToken);
    
    if(!response.ok) {
        return ''
    } else {
        let json = await response.json();
        let data = json.data.username;
        return data;
    }
}

const _GetUsername = getUsername;
export { _GetUsername as GetUsername };
