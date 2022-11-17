const noblox = require("noblox.js")
const client = require("../index");
const {
    EmbedBuilder,
    Message
} = require("discord.js");
const {
    Cookie
} = require('../config.json')
var cron = require('node-cron');
const db = require("quick.db");
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


const prefix = "=";

client.on("ready", () => {
    console.log(`${client.user.tag} is ready!`)

    const actvs = [
        `${prefix}help | ${client.guilds.cache.size} servers`,
        `${prefix}help`,
        `${client.users.cache.size} cute members`,
    ]

    client.user.setActivity(actvs[Math.floor(Math.random() * (actvs.length - 1) + 1)], { type: ApplicationCommandOptionType.Watching });
    setInterval(() => {
        client.user.setActivity(actvs[Math.floor(Math.random() * (actvs.length - 1) + 1)], { type: ApplicationCommandOptionType.Watching });
    }, 5000);

    client.user.setStatus('online')
    client.on("guildMemberAdd", async (member) => {
    const embed3 = new EmbedBuilder()
        .setTitle(`🍂  welcome to 2sea!`)
        .setDescription(`thank you for joining 2sea, <@${member.id}>!\nplease make sure you check out our <#748715110914326580> channel to get some insight about our server. your respective roles can be equipped in <#1018282979543494757>! if you are interested in joining our staff team or are simply wondering about our server, feel free to make a ticket via our support system in <#944115155367768114>. that's all you need to know, we hope you enjoy your stay here! ❁`)
        .setColor('#a45c35')
        .setThumbnail(`https://cdn.discordapp.com/attachments/922766578683117598/1025941628604661801/ezgif.com-gif-maker_1.gif`)
        .setAuthor({ name: `${member.user.tag}`, iconURL: `${member.displayAvatarURL()}` })
    return member.guild.channels.cache.get("748714290055217164").send({
        embeds: [embed3]
    }).catch(err => {
        console.log(err)
    })
})
});
