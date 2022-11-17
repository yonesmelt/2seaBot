const {
    Client,
    CommandInteraction,
    EmbedBuilder,
    MessageActionRow,
    MessageButton,
    MessageSelectRow,
    ButtonInteraction
} = require("discord.js");
const { ApplicationCommandType, ApplicationCommandOptionType } = require('discord.js');
const { ButtonStyle } = require('discord.js');
module.exports = {
    name: "prefix",
    description: "sends the prefix for the bot",
    type: ApplicationCommandType.ChatInput,
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        const embed1 = new EmbedBuilder()
            .setTitle("<:jasmine:972378894932013116> 2sea Prefix")
            .setDescription("The prefix for the 2sea bot is `=`")
            .setColor("#87d083")

        interaction.followUp({
            embeds: [embed1]
        });
    },
};