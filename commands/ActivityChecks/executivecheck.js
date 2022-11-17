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
    name: "executivecheck",
    aliases: ["exc"],
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

        let guild = await db.get(`guildMessages_EXC_${member.id}`);

        if (guild === null) {
            guild = 0;
        }

        let embed2 = new EmbedBuilder()
            .setTitle('<:jasmine:972378894932013116> Executive Activity Check')
            .setDescription(`<@${member.user.id}> **(${member.user.tag}):**\n\`${guild}\` messages sent`)
            .setColor('#87d083')

        message.reply({ embeds: [embed2] });
    } else {
        return;
    }
    },
};