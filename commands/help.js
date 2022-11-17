const {
    Message,
    Client
} = require("discord.js");
const {
    EmbedBuilder,
    ButtonBuilder,
    MessageComponent,
    ActionRowBuilder
} = require('discord.js')
const Discord = require('discord.js');
const roblox = require('noblox.js');
const configFile = require('../config.json');
const paginationEmbed = require('discordjs-button-pagination');
const { ButtonStyle } = require('discord.js');
const buttonPages = require("../functions/pagination");

module.exports = {
    name: "help",
    aliases: ["h"],
    description: "Displays all the commands.",
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args, interaction) => {

        if (message.member.roles.cache.some(r => ["leadership team", "ownership team", "corporate team"].includes(r.name))) {

            const embed1 = new EmbedBuilder()
                .setColor('#87d083')
                .setTitle('<:jasmine:972378894932013116> Help Menu')
                .setDescription("Navigate between categories using the buttons")
                .addFields({ name: '=help', value: 'Displays all the commands.' })
                .addFields({ name: '/prefix', value: 'Displays the prefix of the bot.' })
                .setFooter({ text: "Page 1 of 3" })

            const embed2 = new EmbedBuilder()
                .setColor('#87d083')
                .setTitle('<:jasmine:972378894932013116> Help Menu | Moderation')
                .setDescription(`Navigate between categories using the buttons\nThese commands are restricted to corporates+`)
                .addFields({ name: '=kick @*mention* *reason*', value: 'Kick a member from the server.' })
                .addFields({ name: '=ban @*mention* *reason*', value: 'Ban a member from the server.' })
                .addFields({ name: '=unban *userID*', value: 'Unban a member from the server using their ID.' })
                .setFooter({ text: "Page 2 of 3" })

            const embed3 = new EmbedBuilder()
                .setColor('#87d083')
                .setTitle('<:jasmine:972378894932013116> Help Menu | Activity Checks')
                .setDescription(`Navigate between categories using the buttons\nThese commands are restricted to corporates+`)
                .addFields({ name: '=checkall/all @*mention*', value: 'Check all activities listed below.' })
                .addFields({ name: '=activitycheck/ac @*mention*', value: 'Check someones overall activity.' })
                .addFields({ name: '=claimcheck/cc @*mention*', value: 'Check someones claim activity.' })
                .addFields({ name: '=admincheck/amc @*mention*', value: 'Check someones admin activity.' })
                .addFields({ name: '=interactioncheck/ic @*mention*', value: 'Check someones interaction activity.' })
                .addFields({ name: '=corporatecheck/cpc @*mention*', value: 'Check corporates activity.' })
                .addFields({ name: '=executivecheck/exc @*mention*', value: 'Check someones executive chat activity.' })
                .addFields({ name: '=staffactivity/sa @*mention*', value: 'Check someones staff chats (ac, cc, ic & amc) activity.' })
                .addFields({ name: '=corporateactivity/ca @*mention*', value: 'Check someones corporate chats (ac, cpc, exc) activity.' })
                .addFields({ name: '=delete/del', value: 'Reset the message counter manually.' })
                .addFields({ name: '=sub/subtract *amount*', value: 'Subtract the message counter manually.' })
                .addFields({ name: '=add/addition *amount*', value: 'Add to the message counter manually.' })
                .setFooter({ text: "Page 3 of 3" })

            const pages = [embed1, embed2, embed3];

            buttonPages(message, pages);

        } else {

            const embed1 = new EmbedBuilder()
                .setColor('#87d083')
                .setTitle('<:jasmine:972378894932013116> Help Menu')
                .setDescription("Navigate between categories using the buttons")
                .addFields({ name: '=help', value: 'Displays all the commands.' })
                .addFields({ name: '/prefix', value: 'Displays the prefix of the bot.' })
                .addFields({ name: '/feedback', value: 'Give feedback/bug reports/suggestions to the bot creator.' })
                .setFooter({ text: "Page 1 of 2" })

            const embed2 = new EmbedBuilder()
                .setColor('#87d083')
                .setTitle('<:jasmine:972378894932013116> Help Menu | Moderation')
                .setDescription(`Navigate between categories using the buttons\nThese commands are restricted to corporates+`)
                .addFields({ name: '=kick @*mention* *reason*', value: 'Kick a member from the server.' })
                .addFields({ name: '=ban @*mention* *reason*', value: 'Ban a member from the server.' })
                .addFields({ name: '=unban *userID*', value: 'Unban a member from the server using their ID.' })
                .setFooter({ text: "Page 2 of 2" })



            const pages = [embed1, embed2];

            buttonPages(interaction, pages);

        };
    },
};