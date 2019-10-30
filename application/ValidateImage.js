module.exports = class ValidateImage {

    /**
     * Validate image URI
     * @returns {*}
     * @private
     */
    _validate () {

        if (this._image !== '//css.reactor.cc/images/unsafe_ru.gif' && this._image.length > 0) {

            // Return image url
            return this._image;

        } else throw new Error("Image URI validation failed!");

    }

    validate (image) {

        this._image = image;
        return this._validate();

    }

};