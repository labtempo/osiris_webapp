import Settings from './../settings/Settings';


class ApiStore {

    static _request(method, url, body = {}) {
        const requestInfo = {
            method,
            headers: new Headers({
                'Content-type' : 'application/json',
                'Accept': 'application/json'
            }),
            body
        };
        return fetch(`${Settings.API_ENDPOINT}${url}`, requestInfo).then(response => {
            // if (!response.ok) throw new Error(`Error - ${method} - ${url}`);
            if ( !response.ok ) return Promise.reject( 'bad' );
            return response.status === 200 && method === 'GET' ? response.json() : Promise.resolve('ok');
        });
    }

    static delete(url) {
        return ApiStore._request('DELETE', url);
    }

    static get(url) {
        return ApiStore._request('GET', url);
    }

    static post(url, body) {
        return ApiStore._request('POST', url, body);
    }

    static put(url, body) {
        return ApiStore._request('PUT', url, body);
    }

}

export default ApiStore;
