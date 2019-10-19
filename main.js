/*
*  Discord anime bot
*/

// Libraries
const Bot = require("./Bot.js")
const Discord = require('discord.js')
const env = require('dotenv').config().parsed;

let client = new Discord.Client();

// Run bot
client.on('ready', () => {
    new Bot(client)
});

// Login bot
client.login(env.BOT_TOKEN);