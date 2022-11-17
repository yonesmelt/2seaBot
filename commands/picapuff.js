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
    name: "picapuff",
    aliases: ["pica", "pc"],
    description: "Picapuff.",
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {

            const embed = new EmbedBuilder()
                .setTitle("💋💅 Picapuff")
                .setImage("https://cdn.discordapp.com/attachments/830316901754077224/979045899051356240/unknown.png")
                .setColor("#87d083")
                
            message.reply({ embeds: [embed] });

    },
};