const {
    Message,
    Client
} = require("discord.js");
const {
    EmbedBuilder,
    MessageButton,
    MessageComponent,
} = require('discord.js')
const Discord = require('discord.js');
const roblox = require('noblox.js');
const configFile = require('../config.json');

module.exports = {
    name: "lyvto",
    aliases: ["lyv"],
    description: "lyvto.",
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {

            const embed = new EmbedBuilder()
                .setTitle("👩‍🦯📸 lyvto")
                .setImage("https://cdn.discordapp.com/attachments/979051255018176602/979942818103590962/unknown.png")
                .setColor("#87d083")
                
            message.reply({ embeds: [embed] });

    },
};