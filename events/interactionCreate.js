const client = require("../index");
const { ApplicationCommandType, ApplicationCommandOptionType } = require('discord.js');

client.on("interactionCreate", async (interaction) => {
    // Slash Command Handling
    if (interaction.isCommand()) {
        await interaction.deferReply({
            ephemeral: true
        }).catch(() => { });

        const cmd = client.slashCommands.get(interaction.commandName);
        if (!cmd)
            return interaction.followUp({
                content: "An error has occured "
            });

        const args = [];

        for (let option of interaction.options.data) {
            if (option.type === ApplicationCommandOptionType.SubCommand) {
                if (option.name) args.push(option.name);
                option.options?.forEach((x) => {
                    if (x.value) args.push(x.value);
                });
            } else if (option.value) args.push(option.value);
        }
        interaction.member = interaction.guild.members.cache.get(interaction.user.id);

        cmd.run(client, interaction, args);
    }

    // Context Menu Handling
    if (interaction.isContextMenuCommand ()) {
        await interaction.deferReply({
            ephemeral: false
        });
        const command = client.slashCommands.get(interaction.commandName);
        if (command) command.run(client, interaction);
    }

    // Reaction Roles Handling
    if (!interaction.isSelectMenu()) {
        return;
    }

    const { customId, values, member, message } = interaction

    if (customId === 'auto_roles') {

        const component = interaction.component
        const removed = component.options.filter((option) => {
            return !values.includes(option.value)
        })

        await interaction.reply({
            content: '<a:CM_loading:1025126604793454602> Updating roles, please be patient...',
            ephemeral: true
        }).catch(async err => {
            await console.log(err);
        })

        for (const id of removed) {
            try {
                await member.roles.remove(id.value)
            } catch {
                await console.log(err);
            }
        }

        for (const id of values) {
            try {
                await member.roles.add(id)
            } catch {
                await console.log(err);
            }
        }
        await interaction.editReply({
            content: 'Your roles have successfully been updated!',
            ephemeral: true
        }).catch(async err => {
            await console.log(err);
        })
    }
});