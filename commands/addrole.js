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
    SelectMenuBuilder
} = require('discord.js')
const Discord = require('discord.js');
const roblox = require('noblox.js');
const configFile = require('../config.json');

module.exports = {
    name: "addrole",
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

            const emoji = args[3]

            const description = args.slice(4).join(" ");

            const targetMessage = await channel.messages.fetch(messageId, {
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

            const desc = args.slice(4).join(" ")
            if (!desc) {
                const embed12 = new EmbedBuilder()
                    .setDescription("Unknown option description, please try again!")
                    .setColor("#FF0000")
                return message.reply({ embeds: [embed12] })
            }
            const emoj = args[3]
            if (!emoj) {
                const embed12 = new EmbedBuilder()
                    .setDescription("Unknown option emoji, please try again!")
                    .setColor("#FF0000")
                return message.reply({ embeds: [embed12] })
            }

            const option = [
                {
                    label: role.name,
                    value: role.id,
                    emoji: emoj,
                    description: desc
                }
            ]

            let menu = row.components[0]
            if (menu) {
                for (const o of menu.options) {
                    if (o.value === option[0].value) {
                        const embed12 = new EmbedBuilder()
                            .setDescription(`<@&${o.value}> is already part of this menu.`)
                            .setColor("#FF0000")
                        return message.reply({ embeds: [embed12] })
                    }
                }
                menu.addOptions(option)
                menu.setMaxValues(menu.options.length)
            } else {
                row.addComponents(
                    new SelectMenuBuilder()
                        .setCustomId('auto_roles')
                        .setMinValues(0)
                        .setMaxValues(1)
                        .setPlaceholder('choose your roles...')
                        .addOptions(option)
                )
            }

            targetMessage.edit({
                components: [row]
            })

            const embed444 = new EmbedBuilder()
                .setDescription(`Added <@&${role.id}> to the auto roles menu.`)
                .setColor("#00FF00")

            message.reply({ embeds: [embed444] })

        } else {
            return;
        }

    },
};