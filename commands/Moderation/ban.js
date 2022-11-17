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
const configFile = require('../../config.json');

module.exports = {
    name: "ban1",
    description: "Bans the specified member.",
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {

        if (message.member.roles.cache.some(r => ["leadership team", "ownership team", "corporate team"].includes(r.name))) {

            const {
                member,
                mentions
            } = message

            const target = message.mentions.users.first() || message.guild.members.cache.get(args[0]);

            if (target) {
                let reason = args.slice(1).join(" ");
                if (!reason) {
                    reason = "No reason provided";
                }
                const memberTarget = message.guild.members.cache.get(target.id);

                if (memberTarget.id === message.author.id) {
                    const embed3 = new EmbedBuilder()
                        .setDescription(`You cannot ban yourself, idiot! 🤣🤣`)
                        .setColor('#87d083')
                    return message.reply({ embeds: [embed3] });
                }

                if(message.member.roles.highest.position < memberTarget.roles.highest.position) {
                    const embed3 = new EmbedBuilder()
                    .setDescription(`You cannot ban this person, idiot! 🤣🤣`)
                    .setColor('#ff0000')
                return message.reply({ embeds: [embed3] });
                }

                const embed3 = new EmbedBuilder()
                    .setTitle("<:jasmine:972378894932013116> Success!")
                    .setDescription(`Successfully banned <@${memberTarget.user.id}> **(${memberTarget.user.tag})** for the following reason:\n\`${reason}\``)
                    .setColor('#87d083')

                const msg5 = await message.reply({
                    embeds: [embed3]
                });

                let banEmbed = new EmbedBuilder()
                    .setColor("#ff0000")
                    .setTitle("❗ You have been banned from 2sea")
                    .setDescription(`You have been banned from the server for the following reason:\n\`${reason}\``)

                await new Promise(resolve => setTimeout(resolve, 1000));

                try {
                    await memberTarget.ban({ reason: reason });
                } catch (err) {
                    const newEmbed = msg5.embeds[0]
                    newEmbed.setTitle(""), newEmbed.setDescription(`There was an error while attempting to ban <@${memberTarget.user.id}> **(${memberTarget.user.tag})**\n*${err}*`), newEmbed.setColor('#FF0000')
                    return await msg5.edit({
                        embeds: [newEmbed]
                    })
                }

                const logMsg = new EmbedBuilder()
                    .setColor("#87d083")
                    .setTitle("New Member Banned")
                    .setDescription(`**Victim:** <@${memberTarget.user.id}> **(${memberTarget.user.tag})**\n**Moderator:** <@${message.author.id}> **(${message.author.tag})**\n**Reason:** \`${reason}\``)
                    .setTimestamp()
                    .setFooter({ text: `ID: ${memberTarget.user.id}` })

                const logChannel = client.channels.cache.get('748926005896544317')

                logChannel.send({ embeds: [logMsg] })

                memberTarget.send({
                    embeds: [banEmbed]
                });

            } else {
                const embed2 = new EmbedBuilder()
                    .setDescription('Please specify the member you want to ban.')
                    .setColor('#FF0000')
                message.reply({
                    embeds: [embed2]
                });
            }

        } else {
            return;
        };
    },
};