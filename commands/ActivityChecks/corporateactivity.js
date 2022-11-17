const {
    Message,
    Client
} = require("discord.js");
const {
    EmbedBuilder,
    MessageButton,
    MessageComponent,
    MessageActionRow
} = require('discord.js')
const Discord = require('discord.js');
const roblox = require('noblox.js');
const configFile = require('../../config.json');
const { QuickDB } = require('quick.db');
const db = new QuickDB();

module.exports = {
    name: "corporateactivity",
    aliases: ["ca"],
    description: "Displays all the commands.",
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {

        if (message.member.roles.cache.some(r => ["ownership team", "leadership team"].includes(r.name))) {

        let member = message.mentions.members.first() || message.member;

        let ac = await db.get(`guildMessages_AC_${member.id}`);
        let exc = await db.get(`guildMessages_EXC_${member.id}`);
        let cpc = await db.get(`guildMessages_CPC_${member.id}`);

        let total = ac + exc + cpc

        if (total === null) {
            total = 0;
        }

        let embed2 = new EmbedBuilder()
            .setTitle('<:jasmine:972378894932013116> Corporate Activity Checks')
            .setDescription(`<@${member.user.id}> **(${member.user.tag}):**\n\n**Overall:**\n\`${ac}\` messages sent\n\n**Executive Check:**\n\`${exc}\` messages sent\n\n**Corporate Checks:**\n\`${cpc}\` messages sent\n\n**Total:**\n\`${total}\` messages sent`)
            .setColor('#87d083')

        message.reply({ embeds: [embed2] });
    } else {
        return;
    }
    },
};