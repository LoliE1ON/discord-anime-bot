const axios = require('axios');
const cheerio = require('cheerio');
const cron = require('cron');

module.exports = class Bot {

    constructor(client) {

        // Discord client
        this.client = client;

        // List of channels
        this.channels = require("../config/channels.json");

        // Cron task execution time
        this.cronTaskExecutionTime = "*/30 * * * *";

        // Run bot
        this.cron().catch((e) => console.log(e))

    }

    /**
     * Create and execute cron task
     * @returns {Promise<void>}
     */
    async cron() {

        // Create cron task
        this.cronJob = new cron.CronJob(this.cronTaskExecutionTime, () => {

            // Get random image
            this.getImage().then(image => {

                if (image.length > 0) {

                    for (let channel of this.channels.list) {

                        console.log(channel);
                        // Discord channel
                        let discordChannel = this.client.channels.get(channel);

                        // Send message
                        discordChannel.send("", {files: [image]});
                        console.log(`Request message ${image}`)

                    }

                }

            });

        });

        // Start cron
        this.cronJob.start();

    }

    /**
     * Parse random image
     * @returns {Promise<*>}
     */
    async getImage() {

        try {

            // Request
            let res = await axios({
                url: 'http://anime.reactor.cc/random',
                method: 'get',
                timeout: 8000,
            });

            // Html root
            const $ = cheerio.load(res.data);

            // Parse html
            // Image
            let parse = $('div.post_content,allow_long > div.image > a.prettyPhotoLink'),
                image = parse.find('img').attr('src');

            // Image validation
            if (image != '//css.reactor.cc/images/unsafe_ru.gif' && image.length > 0) {

                // Return image url
                return image;

            }

        }
        catch (err) {
            console.error(err);
        }

    }

};