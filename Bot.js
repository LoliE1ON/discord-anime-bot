// Libraries
const axios = require('axios')
const cheerio = require('cheerio')
const cron = require('cron')

// List of channels
let channels = require("./channels.json")

/*
*  Class Bot
*/
module.exports = class Bot {

    constructor(client) {

        this.client = client;

        // Run bot
        this.run().catch((e) => {
            console.log(e)
        })

    }

    // Run bot
    async run() {

        // Cron
        this.cron();

    }

    // Request message every 30 min
    async cron() {

        // Cron job
        this.cronJob = new cron.CronJob('*/30 * * * *', () => {

            // Fetch image
            this.request().then(image => {

                if (image.length > 0) {

                    for (let channel of channels.list) {

                        // Channel id
                        let discord = this.client.channels.get(channel);

                        // Send message
                        discord.send("", {files: [image]});

                        console.log(`Request message ${image}`)
                    }

                }

            });

        });

        // Start cron
        this.cronJob.start();

    }

    // Get random image
    async request() {

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