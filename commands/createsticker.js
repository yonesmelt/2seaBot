const {
    Message,
    Client,
    Util
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
    name: "createsticker",
    aliases: ["ce", "newsticker", "sticker", "addsticker"],
    description: "Picapuff.",
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {

        if (message.member.roles.cache.some(r => ["leadership team", "ownership team", "corporate team"].includes(r.name))) {

            let url = args[0]
            let name = args.slice(1).join(" ");

            const embed1 = new EmbedBuilder()
                .setDescription("Please specify an image link!")
                .setColor("#FF0000")

            const embed13 = new EmbedBuilder()
                .setDescription("Please specify a sticker name!")
                .setColor("#FF0000")

            if (!url) {
                return message.reply({ embeds: [embed1] })
            }

            if (!name) {
                return message.reply({ embeds: [embed13] })
            }

            const embed12 = new EmbedBuilder()
                .setDescription(`Successfully created a new sticker and named it **${name}**!`)
                .setColor("#00FF00")

            if (url && name) {
                try {
                message.guild.stickers
                    .create({file: url, name: name, tags: 'robot'})
                    .then((emoji) => message.reply({ embeds: [embed12] }))
                } catch (err) {
                    const embed15 = new EmbedBuilder()
                    .setDescription(`Could not create a new sticker with the name **${name}**!\n${err}`)
                    .setColor("#FF0000")
                    await message.reply({ embeds: [embed15] })
                }
            }


        } else {
            return;
        }

    },
};