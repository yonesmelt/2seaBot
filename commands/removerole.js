const {
    Message,
    Client,
    Util
} = require("discord.js");
const {
    EmbedBuilder,
    MessageButton,
    MessageComponent,
    ActionRowBuilder,
    MessageSelectMenu,
    SelectMenuBuilder,
    SelectMenuOptionBuilder
} = require('discord.js')
const Discord = require('discord.js');
const roblox = require('noblox.js');
const configFile = require('../config.json');
const { ApplicationCommandType, ApplicationCommandOptionType } = require('discord.js');
const { GatewayIntentBits, Partials } = require('discord.js');
module.exports = {
    name: "removerole",
    description: "Picapuff.",
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    run: async (client, message, args) => {

        if (message.member.roles.cache.some(r => ["leadership team", "ownership team"].includes(r.name))) {

            const embed1 = new EmbedBuilder()
                .setDescription("Please specify a text channel!")
                .setColor("#FF0000")

            const channel = message.mentions.channels.first();
            if (!channel) {
                return message.reply({ embeds: [embed1] })
            };

            const messageId = args[1]

            const role = message.mentions.roles.first() || args[2];
            if (!role) {
                const embed12 = new EmbedBuilder()
                    .setDescription("Unknown role, please try again!")
                    .setColor("#FF0000")
                return message.reply({ embeds: [embed12] })
            }

            const targetMessage = await channel.messages.fetch({message: messageId, 
                cache: true,
                force: true
            })

            if (!targetMessage) {
                const embed12 = new EmbedBuilder()
                    .setDescription("Unknown messageId, please try again!")
                    .setColor("#FF0000")
                return message.reply({ embeds: [embed12] })
            }

            if (targetMessage.author.id !== client.user?.id) {
                const embed12 = new EmbedBuilder()
                    .setDescription(`Please enter a messageId that was sent from <@${client.user?.id}>`)
                    .setColor("#FF0000")
                return message.reply({ embeds: [embed12] })
            }

            let row = targetMessage.components[0]
            if (!row) {
                row = new ActionRowBuilder()
            }

            const option = [
                {
                    label: role.name,
                    value: role.id,
                    emoji: args[3],
                    description: args.slice(4).join(" ")
                }
            ]

            const nmbr = args[3] - 1
            if (!nmbr) {
                const embed12 = new EmbedBuilder()
                    .setDescription("Unknown option, please try again!")
                    .setColor("#FF0000")
                return message.reply({ embeds: [embed12] })
            }
            console.log(nmbr)
            let menu = SelectMenuBuilder.from(row.components[0])
            if (menu) {
                for (const o of menu.options) {
                    if (o.value === option[0].value) {
                        console.log(`${o.label}`)
                        menu.spliceOptions(`${nmbr}`, 1)
                        menu.setMaxValues(menu.options.length)
                    }
                }
            } else {
                return;
            }

            targetMessage.edit({
                components: [row]
            })

            const embed444 = new EmbedBuilder()
                .setDescription(`Removed <@&${role.id}> from the auto roles menu.`)
                .setColor("#00FF00")

            message.reply({ embeds: [embed444] })

        } else {
            return;
        }

    },
};