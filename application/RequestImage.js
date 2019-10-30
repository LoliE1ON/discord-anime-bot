const axios = require('axios')

module.exports = class RequestImage {

    /**
     * Request to random page
     * @returns {Promise<AxiosResponse<T>>}
     * @private
     */
    _request () {

        return axios.get('http://anime.reactor.cc/random', {
            method: 'get',
            timeout: 8000,
        }).catch((error) => {
            throw new Error("Request error!");
        });

    }

    getBody () {
        return this._request();
    }

};