const CronTask = new (require('./CronTask'))();
const ParseBody = new (require('./ParseBody'))();
const RequestImage = new (require('./RequestImage'))();
const ValidateImage = new (require('./ValidateImage'))();

module.exports = class Bot {

    constructor(client) {

        // Discord client
        this._client = client;

        // List of channels
        this._channels = require("../config/channels.json");

        // Cron task execution time
        this._cronTaskExecutionTime = "*/30 * * * *";

    }

    run () {

        // Run bot
        try {
            this._execute();
        }
        catch (e) {
            console.log(e);
        }

    }

    _execute () {

        CronTask.task(this._cronTaskExecutionTime, () => {

            RequestImage.getBody().then((body) => {

                let imageURI = ParseBody.parseBody(body.data);
                imageURI = ValidateImage.validate(imageURI);

                for (let channel of this._channels.list) {

                    // Discord channel
                    let discordChannel = this._client.channels.get(channel);

                    // Send message
                    discordChannel.send("", {files: [imageURI]});
                    console.log(`Request message ${imageURI}`)

                }

            });

        });

        CronTask.start();

    }


};
