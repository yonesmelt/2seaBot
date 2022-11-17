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
    name: "staffactivity",
    aliases: ["sa"],
    description: "Displays all the commands.",
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {

        if (message.member.roles.cache.some(r => ["corporate team", "ownership team", "leadership team"].includes(r.name))) {

        let member = message.mentions.members.first() || message.member;

        let ac = await db.get(`guildMessages_AC_${member.id}`);
        let amc = await db.get(`guildMessages_AMC_${member.id}`);
        let cc = await db.get(`guildMessages_CC_${member.id}`);
        let ic = await db.get(`guildMessages_IC_${member.id}`);

        let total = ac + amc + cc + ic

        if (total === null) {
            total = 0;
        }

        let embed2 = new EmbedBuilder()
            .setTitle('<:jasmine:972378894932013116> Staff Activity Checks')
            .setDescription(`<@${member.user.id}> **(${member.user.tag}):**\n\n**Overall:**\n\`${ac}\` messages sent\n\n**Admin Checks:**\n\`${amc}\` messages sent\n\n**Staff Claims:**\n\`${cc}\` messages sent\n\n**Interaction Checks:**\n\`${ic}\` messages sent\n\n**Total:**\n\`${total}\` messages sent`)
            .setColor('#87d083')

        message.reply({ embeds: [embed2] });
    } else {
        return;
    }
    },
};