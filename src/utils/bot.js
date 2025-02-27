import { Client, GatewayIntentBits }  from 'discord.js';

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
});

const DISCORD_BOT_TOKEN = process.env.DISCORD_BOT_TOKEN;
const CHANNEL_ID = process.env.DISCORD_CHANNEL_ID;

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.login(DISCORD_BOT_TOKEN);

async function sendDiscordNotification(message) {
  const channel = await client.channels.fetch(CHANNEL_ID);
  if (channel) {
    channel.send(message);
  } else {
    console.error('Channel not found.');
  }
}

module.exports = { sendDiscordNotification };