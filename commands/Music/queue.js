const { Message, Client, EmbedBuilder } = require("discord.js");
const { QueryType } = require("discord-player");
const { Player } = require("discord-player");
const { DisTube } = require("../../client/player");
const {
    blockQuote,
    bold,
    channelMention,
    codeBlock,
    formatEmoji,
    hideLinkEmbed,
    hyperlink,
    inlineCode,
    italic,
    quote,
    roleMention,
    spoiler,
    strikethrough,
    time,
    TimestampStyles,
    underscore,
    userMention,
} = require('@discordjs/builders');

module.exports = {
    name: "queue",
    aliases: ["q"],
    description: "Picapuff.",
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    run: async (client, message, args) => {

        if (message.member.roles.cache.some(r => ["leadership team", "ownership team"].includes(r.name))) {

            const queue = client.DisTube.getQueue("939705138493407264")
            const embed = new EmbedBuilder()
                .setDescription('There is nothing playing right now!')
                .setColor('#FF0000')
            if (!queue)
                return message.reply({
                    embeds: [embed],
                });

            const q = queue.songs
                .map((song, i) => `${hyperlink(`${song.name} | (${song.formattedDuration})`, `${song.url}`)}`)
                .join('\n')
                
            const embed2 = new EmbedBuilder()
                .setTitle(`2sea | Server Queue`)
                .setDescription(`${q}`)
                .setColor("#87d083")
            message.reply({embeds: [embed2]})

        } else {
            return;
        }

    },
};