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
    name: "he4venly",
    aliases: ["he4"],
    description: "Picapuff.",
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {

            const embed = new EmbedBuilder()
                .setTitle("😹💀 he4venly")
                .setImage("https://cdn.discordapp.com/attachments/979051255018176602/980964862962331658/unknown.png?size=4096")
                .setColor("#87d083")
                
            message.reply({ embeds: [embed] });

    },
};