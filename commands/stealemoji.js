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
const { parseEmoji } = require('discord.js');

module.exports = {
    name: "stealemoji",
    aliases: ["se", "steal"],
    description: "Picapuff.",
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {

        if (message.member.roles.cache.some(r => ["leadership team", "ownership team", "corporate team"].includes(r.name))) {

            const embed1 = new EmbedBuilder()
                .setDescription("Please specify some emojis!")
                .setColor("#FF0000")

            if (!args.length) return message.reply({ embeds: [embed1] });

            for (const rawEmoji of args) {
                const parsedEmoji = parseEmoji(`${rawEmoji}`);
                console.log(`${rawEmoji}`)

                if (parsedEmoji.id) {
                    const embed1 = new EmbedBuilder()
                        .setDescription(`Successfully stolen that emoji and named it **${parsedEmoji.name}**!`)
                        .setColor("#00FF00")
                    const extension = parsedEmoji.animated ? ".gif" : ".png";
                    const url = `https://cdn.discordapp.com/emojis/${parsedEmoji.id + extension}`;
                    console.log(`${url}`)
                    message.guild.emojis
                        .create({attachment: url, name: parsedEmoji.name})
                        .then((emoji) => message.reply({ embeds: [embed1] }))
                }
            }

        } else {
            return;
        }

    },
};