const {
    Message,
    Client
} = require("discord.js");
const {
    EmbedBuilder,
    ButtonBuilder,
    MessageComponent,
    ActionRowBuilder,
    SelectMenuBuilder,
    ButtonStyle
} = require('discord.js')
const Discord = require('discord.js');
const roblox = require('noblox.js');
const configFile = require('../../config.json');
const { QuickDB } = require('quick.db');
const db = new QuickDB();

module.exports = {
    name: "delete",
    aliases: ["del"],
    description: "Displays all the commands.",
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {

        if (message.member.roles.cache.some(r => ["corporate team", "ownership team", "leadership team"].includes(r.name))) {

            let member = message.mentions.members.first();
            if (!member) {
                let embed131 = new EmbedBuilder()
                    .setDescription(`No member provided, you didn't provide a member for me to delete the counters for.`)
                    .setColor('#FF0000')
                return message.reply({
                    embeds: [embed131]
                });
            }
            const guild = client.guilds.cache.get('748714289623334982');
            let embed2 = new EmbedBuilder()
                .setDescription(`Which counter would you like to reset?`)
                .setColor('#87d083')

            const selectMenu = new ActionRowBuilder()
                .addComponents(
                    new SelectMenuBuilder()
                        .setCustomId('counterSelect')
                        .setPlaceholder('please choose a counter to reset')
                        .addOptions([
                            {
                                label: "all counters",
                                description: "reset all counters",
                                value: "all",
                                emoji: "👨‍🦯",
                                customId: "all"
                            },
                            {
                                label: "activity check",
                                description: "reset the activity checks",
                                value: "ac",
                                emoji: "💅",
                                customId: "ac"
                            },
                            {
                                label: "admin checks",
                                description: "reset the admin checks",
                                value: "amc",
                                emoji: "🤞",
                                customId: "amc"
                            },
                            {
                                label: "claim checks",
                                description: "reset the claim checks",
                                value: "cc",
                                emoji: "🤑",
                                customId: "cc"
                            },
                            {
                                label: "corporate checks",
                                description: "reset the corporate checks",
                                value: "cpc",
                                emoji: "🤝",
                                customId: "cpc"
                            },
                            {
                                label: "executive",
                                description: "reset the executive checks",
                                value: "exc",
                                emoji: "🤓",
                                customId: "exc"
                            },
                            {
                                label: "interaction checks",
                                description: "reset the interaction checks",
                                value: "ic",
                                emoji: "😥",
                                customId: "ic"
                            }
                        ]),
                )

            const m = await message.reply({
                embeds: [embed2],
                components: [selectMenu],
            });

            const iFilter = (interaction) => interaction.user.id === message.author.id;

            const collector = m.createMessageComponentCollector({
                filter: iFilter,
                time: 30000
            });

            const askButtons = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setLabel(`yes`)
                        .setCustomId('yesBtn')
                        .setStyle(ButtonStyle.Success)
                )
                .addComponents(
                    new ButtonBuilder()
                        .setLabel(`no`)
                        .setCustomId('noBtn')
                        .setStyle(ButtonStyle.Danger)
                );

            collector.on('collect', async i => {

                if (!i.isSelectMenu()) return;

                if (i.customId === 'counterSelect') {
                    const [counter] = i.values;
                    if (counter === 'all') {
                        await m.delete();

                        let embed1 = new EmbedBuilder()
                            .setDescription(`Are you sure you want to reset **all** the message counters?`)
                            .setColor('#FF0000')

                        const m1 = await message.reply({
                            embeds: [embed1],
                            components: [askButtons],
                        });

                        const collector2 = m1.createMessageComponentCollector({
                            filter: iFilter,
                            time: 30000
                        });

                        collector2.on('collect', async i => {
                            let embed1 = new EmbedBuilder()
                                .setDescription(`🚫 Cancelled deletion proccess`)
                                .setColor('#FF0000')
                            if (i.customId === 'yesBtn') {
                                await m1.delete();
                                let embed21 = new EmbedBuilder()
                                    .setDescription(`🗑️ Successfully reset **all** the counters!`)
                                    .setColor('#00FF00')
                                await db.delete(`guildMessages_AC_${member.id}`);
                                await db.delete(`guildMessages_AMC_${member.id}`);
                                await db.delete(`guildMessages_CC_${member.id}`);
                                await db.delete(`guildMessages_IC_${member.id}`);
                                await db.delete(`guildMessages_CPC_${member.id}`);
                                await db.delete(`guildMessages_EXC_${member.id}`);
                                console.log("deleted all")
                                const logMsg = new EmbedBuilder()
                                    .setColor("#87d083")
                                    .setTitle("Message Counter Reset")
                                    .setDescription(`**Moderator:** <@${message.author.id}> **(${message.author.tag})**\n**Target:** <@${member.id}> **(${member.user.tag})**\n**Counter Type:** \`global (all)\``)
                                    .setTimestamp()
                                    .setFooter({ text: `ID: ${message.id}` })
                                const logChannel = client.channels.cache.get('748926005896544317')

                                logChannel.send({ embeds: [logMsg] })
                                await message.reply({ embeds: [embed21] });
                            } else if (i.customId === 'noBtn') {
                                await m1.delete();
                                await message.reply({
                                    embeds: [embed1]
                                });
                            }
                        })

                        console.log("ALL")
                    } else if (counter === 'ac') {
                        await m.delete();

                        let embed1 = new EmbedBuilder()
                            .setDescription(`Are you sure you want to reset the **activity check** message counter?`)
                            .setColor('#FF0000')

                        const m1 = await message.reply({
                            embeds: [embed1],
                            components: [askButtons],
                        });

                        const collector2 = m1.createMessageComponentCollector({
                            filter: iFilter,
                            time: 30000
                        });

                        collector2.on('collect', async i => {
                            let embed1 = new EmbedBuilder()
                                .setDescription(`🚫 Cancelled deletion proccess`)
                                .setColor('#FF0000')
                            if (i.customId === 'yesBtn') {
                                await m1.delete();
                                await db.delete(`guildMessages_AC_${member.id}`);
                                let embed21 = new EmbedBuilder()
                                    .setDescription(`🗑️ Successfully reset the **overall activity** counter!`)
                                    .setColor('#00FF00')
                                await message.reply({ embeds: [embed21] });
                                const logMsg = new EmbedBuilder()
                                    .setColor("#87d083")
                                    .setTitle("Message Counter Reset")
                                    .setDescription(`**Moderator:** <@${message.author.id}> **(${message.author.tag})**\n**Target:** <@${member.id}> **(${member.user.tag})**\n**Counter Type:** \`overall activity\``)
                                    .setTimestamp()
                                    .setFooter({ text: `ID: ${message.id}` })
                                const logChannel = client.channels.cache.get('748926005896544317')

                                logChannel.send({ embeds: [logMsg] })
                                console.log("deleted ac")
                            } else if (i.customId === 'noBtn') {
                                await m1.delete();
                                await message.reply({
                                    embeds: [embed1]
                                });
                            }
                        })
                        console.log("AC")
                    } else if (counter === 'amc') {
                        await m.delete();

                        let embed1 = new EmbedBuilder()
                            .setDescription(`Are you sure you want to reset the **admin check** message counter?`)
                            .setColor('#FF0000')

                        const m1 = await message.reply({
                            embeds: [embed1],
                            components: [askButtons],
                        });

                        const collector2 = m1.createMessageComponentCollector({
                            filter: iFilter,
                            time: 30000
                        });

                        collector2.on('collect', async i => {
                            let embed1 = new EmbedBuilder()
                                .setDescription(`🚫 Cancelled deletion proccess`)
                                .setColor('#FF0000')
                            let embed21 = new EmbedBuilder()
                                .setDescription(`🗑️ Successfully reset the **admin counter!**`)
                                .setColor('#00FF00')
                            if (i.customId === 'yesBtn') {
                                await m1.delete();
                                await db.delete(`guildMessages_AMC_${member.id}`);
                                await db.delete(`guildMessages_AR_${member.id}`);
                                const logMsg = new EmbedBuilder()
                                    .setColor("#87d083")
                                    .setTitle("Message Counter Reset")
                                    .setDescription(`**Moderator:** <@${message.author.id}> **(${message.author.tag})**\n**Target:** <@${member.id}> **(${member.user.tag})**\n**Counter Type:** \`admin counter\``)
                                    .setTimestamp()
                                    .setFooter({ text: `ID: ${message.id}` })
                                const logChannel = client.channels.cache.get('748926005896544317')

                                logChannel.send({ embeds: [logMsg] })
                                await message.reply({ embeds: [embed21] });
                                console.log("deleted amc")
                            } else if (i.customId === 'noBtn') {
                                await m1.delete();
                                await message.reply({
                                    embeds: [embed1]
                                });
                            }
                        })
                        console.log("AMC")
                    } else if (counter === 'cc') {
                        await m.delete();

                        let embed1 = new EmbedBuilder()
                            .setDescription(`Are you sure you want to reset the **claim check** message counter?`)
                            .setColor('#FF0000')

                        const m1 = await message.reply({
                            embeds: [embed1],
                            components: [askButtons],
                        });

                        const collector2 = m1.createMessageComponentCollector({
                            filter: iFilter,
                            time: 30000
                        });

                        collector2.on('collect', async i => {
                            let embed1 = new EmbedBuilder()
                                .setDescription(`🚫 Cancelled deletion proccess`)
                                .setColor('#FF0000')
                            if (i.customId === 'yesBtn') {
                                await m1.delete();
                                await db.delete(`guildMessages_CC_${member.id}`);
                                let embed21 = new EmbedBuilder()
                                    .setDescription(`🗑️ Successfully reset the **claim check** counter!`)
                                    .setColor('#00FF00')
                                await message.reply({ embeds: [embed21] });
                                const logMsg = new EmbedBuilder()
                                    .setColor("#87d083")
                                    .setTitle("Message Counter Reset")
                                    .setDescription(`**Moderator:** <@${message.author.id}> **(${message.author.tag})**\n**Target:** <@${member.id}> **(${member.user.tag})**\n**Counter Type:** \`claim check counter\``)
                                    .setTimestamp()
                                    .setFooter({ text: `ID: ${message.id}` })
                                const logChannel = client.channels.cache.get('748926005896544317')

                                logChannel.send({ embeds: [logMsg] })
                                console.log("deleted cc")
                            } else if (i.customId === 'noBtn') {
                                await m1.delete();
                                await message.reply({
                                    embeds: [embed1]
                                });
                            }
                        })
                        console.log("CC")
                    } else if (counter === 'cpc') {
                        await m.delete();

                        let embed1 = new EmbedBuilder()
                            .setDescription(`Are you sure you want to reset the **corporate check** message counter?`)
                            .setColor('#FF0000')

                        const m1 = await message.reply({
                            embeds: [embed1],
                            components: [askButtons],
                        });

                        const collector2 = m1.createMessageComponentCollector({
                            filter: iFilter,
                            time: 30000
                        });

                        collector2.on('collect', async i => {
                            let embed1 = new EmbedBuilder()
                                .setDescription(`🚫 Cancelled deletion proccess`)
                                .setColor('#FF0000')
                            if (i.customId === 'yesBtn') {
                                await m1.delete();
                                await db.delete(`guildMessages_CPC_${member.id}`);
                                let embed21 = new EmbedBuilder()
                                    .setDescription(`🗑️ Successfully reset the **corporate check** counter!`)
                                    .setColor('#00FF00')
                                await message.reply({ embeds: [embed21] });
                                const logMsg = new EmbedBuilder()
                                    .setColor("#87d083")
                                    .setTitle("Message Counter Reset")
                                    .setDescription(`**Moderator:** <@${message.author.id}> **(${message.author.tag})**\n**Target:** <@${member.id}> **(${member.user.tag})**\n**Counter Type:** \`corporate check counter\``)
                                    .setTimestamp()
                                    .setFooter({ text: `ID: ${message.id}` })
                                const logChannel = client.channels.cache.get('748926005896544317')

                                logChannel.send({ embeds: [logMsg] })
                                console.log("deleted cpc")
                            } else if (i.customId === 'noBtn') {
                                await m1.delete();
                                await message.reply({
                                    embeds: [embed1]
                                });
                            }
                        })
                        console.log("CPC")
                    } else if (counter === 'exc') {
                        await m.delete();

                        let embed1 = new EmbedBuilder()
                            .setDescription(`Are you sure you want to reset the **executive checks** message counter?`)
                            .setColor('#FF0000')

                        const m1 = await message.reply({
                            embeds: [embed1],
                            components: [askButtons],
                        });

                        const collector2 = m1.createMessageComponentCollector({
                            filter: iFilter,
                            time: 30000
                        });

                        collector2.on('collect', async i => {
                            let embed1 = new EmbedBuilder()
                                .setDescription(`🚫 Cancelled deletion proccess`)
                                .setColor('#FF0000')
                            if (i.customId === 'yesBtn') {
                                await m1.delete();
                                await db.delete(`guildMessages_EXC_${member.id}`);
                                let embed21 = new EmbedBuilder()
                                    .setDescription(`🗑️ Successfully reset the **executive check** counter!`)
                                    .setColor('#00FF00')
                                await message.reply({ embeds: [embed21] });
                                const logMsg = new EmbedBuilder()
                                    .setColor("#87d083")
                                    .setTitle("Message Counter Reset")
                                    .setDescription(`**Moderator:** <@${message.author.id}> **(${message.author.tag})**\n**Target:** <@${member.id}> **(${member.user.tag})**\n**Counter Type:** \`executive activity\``)
                                    .setTimestamp()
                                    .setFooter({ text: `ID: ${message.id}` })
                                const logChannel = client.channels.cache.get('748926005896544317')

                                logChannel.send({ embeds: [logMsg] })
                                console.log("deleted ac")
                            } else if (i.customId === 'noBtn') {
                                await m1.delete();
                                await message.reply({
                                    embeds: [embed1]
                                });
                            }
                        })
                        console.log("AC")
                    } else if (counter === 'ic') {
                        await m.delete();

                        let embed1 = new EmbedBuilder()
                            .setDescription(`Are you sure you want to reset the **interaction check** message counter?`)
                            .setColor('#FF0000')

                        const m1 = await message.reply({
                            embeds: [embed1],
                            components: [askButtons],
                        });

                        const collector2 = m1.createMessageComponentCollector({
                            filter: iFilter,
                            time: 30000
                        });

                        collector2.on('collect', async i => {
                            let embed1 = new EmbedBuilder()
                                .setDescription(`🚫 Cancelled deletion proccess`)
                                .setColor('#FF0000')
                            if (i.customId === 'yesBtn') {
                                await m1.delete();
                                await db.delete(`guildMessages_IC_${member.id}`);
                                let embed21 = new EmbedBuilder()
                                    .setDescription(`🗑️ Successfully reset the **interaction** counter!`)
                                    .setColor('#00FF00')
                                await message.reply({ embeds: [embed21] });
                                const logMsg = new EmbedBuilder()
                                    .setColor("#87d083")
                                    .setTitle("Message Counter Reset")
                                    .setDescription(`**Moderator:** <@${message.author.id}> **(${message.author.tag})**\n**Target:** <@${member.id}> **(${member.user.tag})**\n**Counter Type:** \`interaction counter\``)
                                    .setTimestamp()
                                    .setFooter({ text: `ID: ${message.id}` })
                                const logChannel = client.channels.cache.get('748926005896544317')

                                logChannel.send({ embeds: [logMsg] })
                                console.log("deleted ic")
                            } else if (i.customId === 'noBtn') {
                                await m1.delete();
                                await message.reply({
                                    embeds: [embed1]
                                });
                            }
                        })
                        console.log("IC")
                    }
                }
            });
        } else {
            return;
        }
    },
};