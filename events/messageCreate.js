const {
    EmbedBuilder,
    Permissions
} = require("discord.js");
const { QuickDB } = require('quick.db');
const db = new QuickDB();
const client = require("../index");
var cron = require('node-cron');
const { ApplicationCommandType, ApplicationCommandOptionType } = require('discord.js');

const { Client, GatewayIntentBits } = require('discord.js');

new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers,
	],
});

client.on("messageCreate", async (message) => {
    

    if (message.guild.channels.cache.some(channel => [
        "server-information",
        "announcements",
        "contact-information",
        "reaction-roles",
        "boosters",
        "support",
        "shifts",
        "giveaways",
        "gaming",
        "photo-gallery",
        "🌊2sea",
        "🐼bambou",
        "☕frappé",
        "🍣tsunami-sushi",
        "🍍kecai",
        "🍵boba",
        "🍛kohaú",
        "👚devilic",
        "🏨bloxton-hotels",
        "👛eunoiia",
        "🧁pastriez",
        "🎀parallels",
        "🐨koala-association",
        "🍦frozey",
        "🦷teethyz",
        "👠parque",
        "🐬coast",
        "🥪levante",
        "🦋persial",
        "verification",
        "community-lounge",
        "boosters-lounge",
        "bot-commands",
        "staff-departments",
        "staff-information",
        "staff-notices",
        "staff-interaction",
        "staff-lounge",
        "staff-commands",
        "admin-notices",
        "admin-votes",
        "interaction-claims",
        "corporate-notices",
        "corporate-contacts",
        "corporate-chat",
        "corporate-votes",
        "executive-chat",
        "leadership-chat",
        "bot-testing"
    ].includes(message.channel.name))) {
        await db.add(`guildMessages_AC_${message.author.id}`, 1);
    } else {
        await db.add(`guildMessages_AC_${message.author.id}`, 0);
    }

    if (message.guild.channels.cache.some(channel => [
        "admin-lounge"
    ].includes(message.channel.name))) {
        await db.add(`guildMessages_AMC_${message.author.id}`, 1);
    } else {
        await db.add(`guildMessages_AMC_${message.author.id}`, 0);
    }

    if (message.guild.channels.cache.some(channel => [
        "admin-votes"
    ].includes(message.channel.name))) {
        await db.add(`guildMessages_AR_${message.author.id}`, 1);
    } else {
        await db.add(`guildMessages_AR_${message.author.id}`, 0);
    }

    if (message.guild.channels.cache.some(channel => [
        "staff-claims"
    ].includes(message.channel.name))) {
        await db.add(`guildMessages_CC_${message.author.id}`, 1);
    } else {
        await db.add(`guildMessages_CC_${message.author.id}`, 0);
    }

    if (message.guild.channels.cache.some(channel => [
        "executive-chat"
    ].includes(message.channel.name))) {
        await db.add(`guildMessages_EXC_${message.author.id}`, 1);
    } else {
        await db.add(`guildMessages_EXC_${message.author.id}`, 0);
    }

    if (message.guild.channels.cache.some(channel => [
        "qotd",
        "potd",
        "fact-or-cap",
        "bop-or-flop"
    ].includes(message.channel.name))) {
        await db.add(`guildMessages_IC_${message.author.id}`, 1);
    } else {
        await db.add(`guildMessages_IC_${message.author.id}`, 0);
    }

    if (message.guild.channels.cache.some(channel => [
        "corporate-chat"
    ].includes(message.channel.name))) {
        await db.add(`guildMessages_CPC_${message.author.id}`, 1);
    } else {
        await db.add(`guildMessages_CPC_${message.author.id}`, 0);
    }

    if (
        message.author.bot ||
        !message.guild ||
        !message.content.toLowerCase().startsWith(client.config.prefix)
    )
        return;

    const [cmd, ...args] = message.content
        .slice(client.config.prefix.length)
        .trim()
        .split(/ +/g);

    const command = client.commands.get(cmd.toLowerCase()) || client.commands.find(c => c.aliases?.includes(cmd.toLowerCase()));

    if (!command) return;


    await command.run(client, message, args);
});