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
    name: "unban",
    description: "Unbans the specified member.",
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        const {
            member,
            mentions
        } = message

        const embed2 = new EmbedBuilder()
            .setDescription('Please specify the member you want to unban.')
            .setColor('#FF0000')

        if (message.member.roles.cache.some(r => ["leadership team", "ownership team", "corporate team"].includes(r.name))) {
            if (!args[0]) return message.reply({
                embeds: [embed2]
            });
            const user = await message.guild.members.unban(args[0])
            const embed3 = new EmbedBuilder()
                .setTitle("<:jasmine:972378894932013116> Success!")
                .setDescription(`Successfully unbanned <@${user.id}> **(${user.tag})**`)
                .setColor('#87d083')

                const logMsg = new EmbedBuilder()
                .setColor("#87d083")
                .setTitle("New Member Unbanned")
                .setDescription(`**Victim:** <@${user.id}> **(${user.tag})**\n**Moderator:** <@${message.author.id}> **(${message.author.tag})**`)
                .setTimestamp()
                .setFooter({ text: `ID: ${user.id}`})

            const logChannel = client.channels.cache.get('748926005896544317')
            
            logChannel.send({embeds: [logMsg]})

            return message.reply({
                embeds: [embed3]
            });
        } else {
            return;
        };
    },
};