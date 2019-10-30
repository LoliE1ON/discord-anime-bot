const Discord = require('discord.js');
const env = require('dotenv').config().parsed;
const client = new Discord.Client();

// Run bot
client.on('ready', () => {

    const Bot = new (require("./application/Bot.js"))(client);
    Bot.run();

});

// Login bot
client.login(env.BOT_TOKEN);