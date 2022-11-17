const { Message, Client, EmbedBuilder } = require("discord.js");
const { QueryType } = require("discord-player");
const { Player } = require("discord-player");
const { DisTube } = require("distube");
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
    name: "play2",
    description: "Picapuff.",
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    run: async (client, message, args) => {

        if (message.member.roles.cache.some(r => ["leadership team", "ownership team"].includes(r.name))) {

            client.DisTube = new DisTube(client, {
                leaveOnStop: false,
                emitNewSongOnly: true,
                emitAddSongWhenCreatingQueue: false,
                emitAddListWhenCreatingQueue: false,
            })

            const embed = new EmbedBuilder()
                .setDescription('Please join a voice channel first!')
                .setColor('#FF0000')
            if (!message.member.voice.channel)
                return message.reply({
                    embeds: [embed],
                });

            const songtitle = args.slice(0).join(' ');
            const embed32 = new EmbedBuilder()
                .setDescription('Please provide a song url or query for me to play.')
                .setColor('#FF0000')
            if (!songtitle)
                return message.reply({
                    embeds: [embed32],
                });

            
            await client.DisTube.play(message.member.voice.channel, songtitle, {
                member: message.member,
                textChannel: message.channel,
                message,
                position: 0
            }).then(client.DisTube.on("playSong", async (queue, song) => {
                const songTitl = hyperlink(`${song.name} | (${song.formattedDuration})`, `${song.url}`);
                const embed1 = new EmbedBuilder()
                    .setDescription(`**${songTitl}** has been added to que/playing.`)
                    .setColor('#87d083')

                await message.reply({ embeds: [embed1] })
            }))


        } else {
            return;
        }

    },
};