# Discord anime bot

[![Discord](https://discordapp.com/api/guilds/509065700401348630/widget.png)](http://discord.gg/fTHssTP)

This is a bot for discord.
He posts random anime pictures with an interval of 30 minutes in the channels you set.

## Dependencies
NodeJS >= 10

## Install

Repository Cloning

```bash
git clone git@github.com:LoliE1ON/discord-anime-bot.git
```

Go to the project

```bash
cd discord-anime-bot
```

Install all dependencies

```bash
npm i
```

## Settings

#### Authorization, Bot token

Authorization occurs through environment variables, namely: `BOT_TOKET`.

#### Discord channels

The bot will post pictures only to channels that exist in `channels.json`.

You must enter the id of the channels in `channels.json`.

Invite the bot to the servers in which it will post pictures.


## Run

The bot is launched from the root of the project:

```bash
node main.js
```
You can use Heroku for this, the Procfile file is created and configured.

## License

MIT


