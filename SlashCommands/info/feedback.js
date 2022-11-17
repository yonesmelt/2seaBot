const {
    Client,
    CommandInteraction,
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    MessageSelectRow,
    ButtonInteraction
} = require("discord.js");
const { ApplicationCommandType, ApplicationCommandOptionType } = require('discord.js');
const { ButtonStyle } = require('discord.js');

module.exports = {
    name: "feedback",
    description: "give jacob some feedback",
    type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: "title",
            description: "title of ur suggestion/feedback/bug/etc/whatever u wanna call it",
            required: true,
            type: ApplicationCommandOptionType.String,
            value: "title",
        },
        {
            name: "description",
            description: "tell me whats up",
            required: true,
            type: ApplicationCommandOptionType.String,
            value: "description",
        }
    ],
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {

        const iFilter = (interaction) => interaction.user.id === interaction.user.id;


        const embedTitle = interaction.options.getString("title");
        const embedDesc = interaction.options.getString("description");

        const feedbackEmbed = new EmbedBuilder()
            .setTitle(`${embedTitle}`)
            .addFields({ name: `Description`, value: `${embedDesc}`})
            .setColor("#87d083")
            .setFooter({ text: `By ${interaction.user.tag}`, iconURL: interaction.user.avatarURL() })
            .setTimestamp()

        const askButtons = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setLabel(`post`)
                .setCustomId('yesBtn')
                .setStyle(ButtonStyle.Success)
        )
        .addComponents(
            new ButtonBuilder()
                .setLabel(`cancel`)
                .setCustomId('noBtn')
                .setStyle(ButtonStyle.Danger)
        );

    const kissBtn = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setLabel(`no problem 2sea Bot`)
                .setCustomId('noProb')
                .setStyle(ButtonStyle.Primary)
        );


    const embed2 = new EmbedBuilder()
        .setTitle(`${embedTitle}`)
        .addFields({ name: `Description`, value: `${embedDesc}`})
        .setColor("#87d083")
        .setFooter({ text: `${interaction.user.tag}` })
        .setTimestamp()

        const embed1 = new EmbedBuilder()
        .setTitle(`👍 Success`)
        .setDescription(`Thank you for your feedback!`)
        .setColor("#87d083")

        const embed5 = new EmbedBuilder()
        .setTitle(`👨‍🦱 Canceled`)
        .setDescription(`Um okay... You left some crumbs`)
        .setColor("#87d083")

        const embed6 = new EmbedBuilder()
        .setThumbnail(`https://c.tenor.com/cd0bnz_7vPMAAAAM/kiss-leslie-odom-jr.gif`)
        .setColor("#87d083")

        let m = await interaction.followUp({
            content: `*looking good? should i send it to jacob?*`,
            embeds: [embed2],
            ephemeral: true,
            components: [askButtons]
        }).catch(err => {
            console.log(err);
        });

    const collector = m.createMessageComponentCollector({
        filter: iFilter,
        time: 30000
    });

    const msgDest = client.users.cache.get("852662250337468469");

    collector.on('collect', async i => {
        if (i.customId === 'yesBtn') {
            await interaction.editReply({
                content: ` `,
                embeds: [embed1],
                ephemeral: true,
                components: [kissBtn]
            }).catch(err => {
                console.log(err);
            });
            await msgDest.send({ embeds: [feedbackEmbed] }).catch(err => {
                console.log(err);
            });

        } else if (i.customId === 'noBtn') {
            await interaction.editReply({
                content: ` `,
                embeds: [embed5],
                ephemeral: true,
                components: []
            }).catch(err => {
                console.log(err);
            });
        } else if (i.customId === 'noProb') {
            await interaction.editReply({
                content: ` `,
                embeds: [embed6],
                ephemeral: true,
                components: []
            })
        }
    });
},
};