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
    name: "add",
    aliases: ["add"],
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
                    .setDescription(`No member provided, you didn't provide a member for me to add the counters for.`)
                    .setColor('#FF0000')
                return message.reply({
                    embeds: [embed131]
                });
            }

            let amount = args[1];

            if (!amount || isNaN(args[1])) {
                let embed131 = new EmbedBuilder()
                    .setDescription(`Invalid amount provided. Please provide a number for me to add!`)
                    .setColor('#FF0000')
                return message.reply({
                    embeds: [embed131]
                });
            }
            const guild = client.guilds.cache.get('748714289623334982');
            let embed2 = new EmbedBuilder()
                .setDescription(`Which counter would you like to add?`)
                .setColor('#87d083')

            const selectMenu = new ActionRowBuilder()
                .addComponents(
                    new SelectMenuBuilder()
                        .setCustomId('counterSelect')
                        .setPlaceholder('please choose a counter to add')
                        .addOptions([
                            {
                                label: "all counters",
                                description: "add all counters",
                                value: "all",
                                emoji: "👨‍🦯",
                                customId: "all"
                            },
                            {
                                label: "activity check",
                                description: "add the activity checks",
                                value: "ac",
                                emoji: "💅",
                                customId: "ac"
                            },
                            {
                                label: "admin checks",
                                description: "add the admin checks",
                                value: "amc",
                                emoji: "🤞",
                                customId: "amc"
                            },
                            {
                                label: "claim checks",
                                description: "add the claim checks",
                                value: "cc",
                                emoji: "🤑",
                                customId: "cc"
                            },
                            {
                                label: "corporate checks",
                                description: "add the corporate checks",
                                value: "cpc",
                                emoji: "🤝",
                                customId: "cpc"
                            },
                            {
                                label: "executive",
                                description: "add the executive checks",
                                value: "exc",
                                emoji: "🤓",
                                customId: "exc"
                            },
                            {
                                label: "interaction checks",
                                description: "add the interaction checks",
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
                            .setDescription(`Are you sure you want to add *${amount}* to **all** the message counters?`)
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
                                .setDescription(`🚫 Cancelled addion proccess`)
                                .setColor('#FF0000')
                            if (i.customId === 'yesBtn') {
                                await m1.delete();
                                let embed21 = new EmbedBuilder()
                                    .setDescription(`🗑️ Successfully added ${amount} from **all** the counters!`)
                                    .setColor('#00FF00')
                                await db.add(`guildMessages_AC_${member.id}`, `${amount}`);
                                await db.add(`guildMessages_AMC_${member.id}`, `${amount}`);
                                await db.add(`guildMessages_CC_${member.id}`, `${amount}`);
                                await db.add(`guildMessages_IC_${member.id}`, `${amount}`);
                                await db.add(`guildMessages_CPC_${member.id}`, `${amount}`);
                                await db.add(`guildMessages_EXC_${member.id}`, `${amount}`);
                                console.log("added all")
                                const logMsg = new EmbedBuilder()
                                    .setColor("#87d083")
                                    .setTitle("Message Counter add")
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
                            .setDescription(`Are you sure you want to add *${amount}* from the **activity check** message counter?`)
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
                                .setDescription(`🚫 Cancelled addion proccess`)
                                .setColor('#FF0000')
                            if (i.customId === 'yesBtn') {
                                await m1.delete();
                                await db.add(`guildMessages_AC_${member.id}`, `${amount}`);
                                let embed21 = new EmbedBuilder()
                                    .setDescription(`🗑️ Successfully added ${amount} from the **overall activity** counter!`)
                                    .setColor('#00FF00')
                                await message.reply({ embeds: [embed21] });
                                const logMsg = new EmbedBuilder()
                                    .setColor("#87d083")
                                    .setTitle("Message Counter added")
                                    .setDescription(`**Moderator:** <@${message.author.id}> **(${message.author.tag})**\n**Target:** <@${member.id}> **(${member.user.tag})**\n**Amount:** \`${amount}\`\n**Counter Type:** \`overall activity\``)
                                    .setTimestamp()
                                    .setFooter({ text: `ID: ${message.id}` })
                                const logChannel = client.channels.cache.get('748926005896544317')

                                logChannel.send({ embeds: [logMsg] })
                                console.log("added ac")
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
                            .setDescription(`Are you sure you want to add the **admin check** message counter?`)
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
                                .setDescription(`🚫 Cancelled addion proccess`)
                                .setColor('#FF0000')
                            let embed21 = new EmbedBuilder()
                                .setDescription(`🗑️ Successfully add the **admin counter!**`)
                                .setColor('#00FF00')
                            if (i.customId === 'yesBtn') {
                                await m1.delete();
                                await db.add(`guildMessages_AMC_${member.id}`, `${amount}`);
                                await db.add(`guildMessages_AR_${member.id}`, `${amount}`);
                                const logMsg = new EmbedBuilder()
                                    .setColor("#87d083")
                                    .setTitle("Message Counter add")
                                    .setDescription(`**Moderator:** <@${message.author.id}> **(${message.author.tag})**\n**Target:** <@${member.id}> **(${member.user.tag})**\n**Counter Type:** \`admin counter\``)
                                    .setTimestamp()
                                    .setFooter({ text: `ID: ${message.id}` })
                                const logChannel = client.channels.cache.get('748926005896544317')

                                logChannel.send({ embeds: [logMsg] })
                                await message.reply({ embeds: [embed21] });
                                console.log("added amc")
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
                            .setDescription(`Are you sure you want to add the **claim check** message counter?`)
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
                                .setDescription(`🚫 Cancelled addion proccess`)
                                .setColor('#FF0000')
                            if (i.customId === 'yesBtn') {
                                await m1.delete();
                                await db.add(`guildMessages_CC_${member.id}`, `${amount}`);
                                let embed21 = new EmbedBuilder()
                                    .setDescription(`🗑️ Successfully add the **claim check** counter!`)
                                    .setColor('#00FF00')
                                await message.reply({ embeds: [embed21] });
                                const logMsg = new EmbedBuilder()
                                    .setColor("#87d083")
                                    .setTitle("Message Counter add")
                                    .setDescription(`**Moderator:** <@${message.author.id}> **(${message.author.tag})**\n**Target:** <@${member.id}> **(${member.user.tag})**\n**Counter Type:** \`claim check counter\``)
                                    .setTimestamp()
                                    .setFooter({ text: `ID: ${message.id}` })
                                const logChannel = client.channels.cache.get('748926005896544317')

                                logChannel.send({ embeds: [logMsg] })
                                console.log("added cc")
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
                            .setDescription(`Are you sure you want to add the **corporate check** message counter?`)
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
                                .setDescription(`🚫 Cancelled addion proccess`)
                                .setColor('#FF0000')
                            if (i.customId === 'yesBtn') {
                                await m1.delete();
                                await db.add(`guildMessages_CPC_${member.id}`, `${amount}`);
                                let embed21 = new EmbedBuilder()
                                    .setDescription(`🗑️ Successfully add the **corporate check** counter!`)
                                    .setColor('#00FF00')
                                await message.reply({ embeds: [embed21] });
                                const logMsg = new EmbedBuilder()
                                    .setColor("#87d083")
                                    .setTitle("Message Counter add")
                                    .setDescription(`**Moderator:** <@${message.author.id}> **(${message.author.tag})**\n**Target:** <@${member.id}> **(${member.user.tag})**\n**Counter Type:** \`corporate check counter\``)
                                    .setTimestamp()
                                    .setFooter({ text: `ID: ${message.id}` })
                                const logChannel = client.channels.cache.get('748926005896544317')

                                logChannel.send({ embeds: [logMsg] })
                                console.log("added cpc")
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
                            .setDescription(`Are you sure you want to add the **executive checks** message counter?`)
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
                                .setDescription(`🚫 Cancelled addion proccess`)
                                .setColor('#FF0000')
                            if (i.customId === 'yesBtn') {
                                await m1.delete();
                                await db.add(`guildMessages_EXC_${member.id}`, `${amount}`);
                                let embed21 = new EmbedBuilder()
                                    .setDescription(`🗑️ Successfully add the **executive check** counter!`)
                                    .setColor('#00FF00')
                                await message.reply({ embeds: [embed21] });
                                const logMsg = new EmbedBuilder()
                                    .setColor("#87d083")
                                    .setTitle("Message Counter add")
                                    .setDescription(`**Moderator:** <@${message.author.id}> **(${message.author.tag})**\n**Target:** <@${member.id}> **(${member.user.tag})**\n**Counter Type:** \`executive activity\``)
                                    .setTimestamp()
                                    .setFooter({ text: `ID: ${message.id}` })
                                const logChannel = client.channels.cache.get('748926005896544317')

                                logChannel.send({ embeds: [logMsg] })
                                console.log("added ac")
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
                            .setDescription(`Are you sure you want to add the **interaction check** message counter?`)
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
                                .setDescription(`🚫 Cancelled addion proccess`)
                                .setColor('#FF0000')
                            if (i.customId === 'yesBtn') {
                                await m1.delete();
                                await db.add(`guildMessages_IC_${member.id}`, `${amount}`);
                                let embed21 = new EmbedBuilder()
                                    .setDescription(`🗑️ Successfully add the **interaction** counter!`)
                                    .setColor('#00FF00')
                                await message.reply({ embeds: [embed21] });
                                const logMsg = new EmbedBuilder()
                                    .setColor("#87d083")
                                    .setTitle("Message Counter add")
                                    .setDescription(`**Moderator:** <@${message.author.id}> **(${message.author.tag})**\n**Target:** <@${member.id}> **(${member.user.tag})**\n**Counter Type:** \`interaction counter\``)
                                    .setTimestamp()
                                    .setFooter({ text: `ID: ${message.id}` })
                                const logChannel = client.channels.cache.get('748926005896544317')

                                logChannel.send({ embeds: [logMsg] })
                                console.log("added ic")
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