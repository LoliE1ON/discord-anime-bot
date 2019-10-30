const cheerio = require('cheerio');

module.exports = class ParseBody {

    /**
     * Parse html, return image URI
     * @returns {string}
     * @private
     */
    _parse () {

        // Html root
        const $ = cheerio.load(this._body);

        // Parse html
        // Image
        let parse = $('div.post_content,allow_long > div.image > a.prettyPhotoLink'),
            imageURI = parse.find('img').attr('src');

        return imageURI.toString();

    }

    parseBody (body) {

        this._body = body;
        return this._parse();

    }

};