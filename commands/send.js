const {
    Message,
    Client,
    Util
} = require("discord.js");
const {
    EmbedBuilder,
    MessageButton,
    MessageComponent,
    MessageCollector,
} = require('discord.js')
const Discord = require('discord.js');
const roblox = require('noblox.js');
const configFile = require('../config.json');

module.exports = {
    name: "send",
    description: "Picapuff.",
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {

        if (message.member.roles.cache.some(r => ["leadership team", "ownership team"].includes(r.name))) {
            const filter = message => message.author.id === message.author.id;
            const embed1 = new EmbedBuilder()
                .setDescription("Please specify a text channel!")
                .setColor("#FF0000")

            const channel = message.mentions.channels.first();
            if (!channel) {
                return message.reply({ embeds: [embed1] })
            };

            function SendDirectMessage(Title, Description) {
                const DirectEmbedBuilder = new EmbedBuilder()
                    .setTitle(Title)
                    .setDescription(Description)
                    .setColor("#87d083")

                channel.send({
                    embeds: [DirectEmbedBuilder]
                }).catch(err => {
                    console.log(err);
                    return;
                });
            };

            let titleAsk = new EmbedBuilder()
                .setDescription(`please state what title you want for the embed`)
                .setColor("#87d083")

            let descAsk = new EmbedBuilder()
                .setDescription(`please state what description you want for the embed.`)
                .setColor("#87d083")

            const titleCollector = new MessageCollector(message.channel, filter, {
                max: '1',
                maxMatches: '1',
                time: '120000',
                errors: ['time']
            })

            await message.reply({
                embeds: [titleAsk]
            });


            titleCollector.on('collect', async title => {
                if (title.author.id === message.author.id) {
                    titleCollector.stop('done');

                    const descCollector = new MessageCollector(message.channel, filter, {
                        max: '1',
                        maxMatches: '1',
                        time: '120000',
                        errors: ['time']
                    })

                    await message.reply({
                        embeds: [descAsk]
                    });

                    descCollector.on('collect', async desc => {
                        if (desc.author.id === message.author.id) {
                            descCollector.stop('done');
                            SendDirectMessage(title.content, desc.content);
                        }
                    })
                }
            })

        } else {
            return;
        }

    },
};