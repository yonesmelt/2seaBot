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
    name: "roledelete",
    aliases: ["roledel", "rd"],
    description: "Displays all the commands.",
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {

        if (message.member.roles.cache.some(r => ["corporate team", "ownership team", "leadership team"].includes(r.name))) {

            let roleMention = message.mentions.roles.first();
            if (!roleMention) {
                let embed131 = new EmbedBuilder()
                    .setDescription(`No role provided, you didn't provide a role for me to delete the counters for.`)
                    .setColor('#FF0000')
                return message.reply({
                    embeds: [embed131]
                });
            }
            let members = message.guild.members.cache.filter(member => member.roles.cache.some(r => [`${roleMention.name}`].includes(r.name)));
            let memberList = members.map(member => member.user.id).join("\n");
            console.log(`${memberList}`)
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

                                let embed = new EmbedBuilder()
                                    .setDescription(`**Working...**`)
                                    .setColor('#87d083')
                                const newMessage = await message.reply({
                                    embeds: [embed]
                                })


                                let memberListArray = memberList.split("\n");
                                let memberListArrayLength = memberListArray.length;
                                let memberListArrayCounter = 0;
                                let memberListArrayInterval = setInterval(async () => {
                                    if (memberListArrayCounter < memberListArrayLength) {
                                        await db.delete(`guildMessages_AC_${memberListArray[memberListArrayCounter]}`);
                                        await db.delete(`guildMessages_AMC_${memberListArray[memberListArrayCounter]}`);
                                        await db.delete(`guildMessages_CC_${memberListArray[memberListArrayCounter]}`);
                                        await db.delete(`guildMessages_IC_${memberListArray[memberListArrayCounter]}`);
                                        await db.delete(`guildMessages_CPC_${memberListArray[memberListArrayCounter]}`);
                                        let member = message.guild.members.cache.get(`${memberListArray[memberListArrayCounter]}`);
                                        let username = member.user.tag;
                                        await new Promise(resolve => setTimeout(resolve, 2000))
                                        let newEmbed = new EmbedBuilder()
                                            .setDescription(`Resetting global counters for **${username}**... *(${memberListArrayCounter}/${memberListArrayLength})*`)
                                            .setColor('#87d083')
                                        await newMessage.edit({
                                            embeds: [newEmbed],
                                        })
                                        memberListArrayCounter++;
                                    }
                                    else {
                                        clearInterval(memberListArrayInterval);
                                    }
                                }, 1000);

                                // when it's done, it'll say that it's done
                                setTimeout(async () => {
                                    let successEmbed = new EmbedBuilder()
                                        .setDescription(`Successfully reset the counter for all **${memberListArrayLength}** members that obtain the **${roleMention.name}** role.`)
                                        .setColor('#87d083')
                                    await newMessage.edit({
                                        embeds: [successEmbed],
                                    })
                                }
                                    , memberListArrayLength * 2000);
                                console.log("deleted all")
                                const logMsg = new EmbedBuilder()
                                    .setColor("#87d083")
                                    .setTitle("Message Counter Reset **(role)**")
                                    .setDescription(`**Moderator:** <@${message.author.id}> **(${message.author.tag})**\n**Target:** <@&${roleMention.id}>\n**Counter Type:** \`global (all)\``)
                                    .setTimestamp()
                                    .setFooter({ text: `ID: ${message.id}` })
                                const logChannel = client.channels.cache.get('748926005896544317')

                                logChannel.send({ embeds: [logMsg] })
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

                                let embed = new EmbedBuilder()
                                    .setDescription(`**Working...**`)
                                    .setColor('#87d083')
                                const newMessage = await message.reply({
                                    embeds: [embed]
                                })

                                let memberListArray = memberList.split("\n");
                                let memberListArrayLength = memberListArray.length;
                                let memberListArrayCounter = 0;
                                let memberListArrayInterval = setInterval(async () => {
                                    if (memberListArrayCounter < memberListArrayLength) {
                                        await db.delete(`guildMessages_AC_${memberListArray[memberListArrayCounter]}`);
                                        await new Promise(resolve => setTimeout(resolve, 2000))
                                        const newEmbed = newMessage.embeds[0]
                                        newEmbed.setDescription(`Resetting AC counter for **${memberListArray[memberListArrayCounter]}**... *(${memberListArrayCounter}/${memberListArrayLength})*`)
                                        newMessage.edit({
                                            embeds: [newEmbed],
                                        })
                                        memberListArrayCounter++;
                                    }
                                    else {
                                        clearInterval(memberListArrayInterval);
                                    }
                                }, 1000);

                                // when it's done, it'll say that it's done
                                setTimeout(async () => {
                                    const newEmbed = newMessage.embeds[0]
                                    newEmbed.setDescription(`Successfully reset the AC counter for all **${memberListArrayLength}** members that obtain the **${roleMention.name}** role.`)
                                    await newMessage.edit({
                                        embeds: [newEmbed],
                                    })
                                }
                                    , memberListArrayLength * 3000);
                                const logMsg = new EmbedBuilder()
                                    .setColor("#87d083")
                                    .setTitle("Message Counter Reset **(role)**")
                                    .setDescription(`**Moderator:** <@${message.author.id}> **(${message.author.tag})**\n**Target:** <@&${roleMention.id}>\n**Counter Type:** \`overall activity\``)
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

                                let embed = new EmbedBuilder()
                                    .setDescription(`**Working...**`)
                                    .setColor('#87d083')
                                const newMessage = await message.reply({
                                    embeds: [embed]
                                })

                                let memberListArray = memberList.split("\n");
                                let memberListArrayLength = memberListArray.length;
                                let memberListArrayCounter = 0;
                                let memberListArrayInterval = setInterval(async () => {
                                    if (memberListArrayCounter < memberListArrayLength) {
                                        await db.delete(`guildMessages_AMC_${memberListArray[memberListArrayCounter]}`);
                                        await new Promise(resolve => setTimeout(resolve, 2000))
                                        const newEmbed = newMessage.embeds[0]
                                        newEmbed.setDescription(`Resetting AMC counter for **${memberListArray[memberListArrayCounter]}**... *(${memberListArrayCounter}/${memberListArrayLength})*`)
                                        newMessage.edit({
                                            embeds: [newEmbed],
                                        })
                                        memberListArrayCounter++;
                                    }
                                    else {
                                        clearInterval(memberListArrayInterval);
                                    }
                                }, 1000);

                                // when it's done, it'll say that it's done
                                setTimeout(async () => {
                                    const newEmbed = newMessage.embeds[0]
                                    newEmbed.setDescription(`Successfully reset all AMC counters for **${memberListArrayLength}** members that obtain the **${roleMention.name}** role.`)
                                    await newMessage.edit({
                                        embeds: [newEmbed],
                                    })
                                }
                                    , memberListArrayLength * 3000);
                                const logMsg = new EmbedBuilder()
                                    .setColor("#87d083")
                                    .setTitle("Message Counter Reset **(role)**")
                                    .setDescription(`**Moderator:** <@${message.author.id}> **(${message.author.tag})**\n**Target:** <@&${roleMention.id}>**\n**Counter Type:** \`admin counter\``)
                                    .setTimestamp()
                                    .setFooter({ text: `ID: ${message.id}` })
                                const logChannel = client.channels.cache.get('748926005896544317')

                                logChannel.send({ embeds: [logMsg] })
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

                                let embed = new EmbedBuilder()
                                    .setDescription(`**Working...**`)
                                    .setColor('#87d083')
                                const newMessage = await message.reply({
                                    embeds: [embed]
                                })

                                let memberListArray = memberList.split("\n");
                                let memberListArrayLength = memberListArray.length;
                                let memberListArrayCounter = 0;
                                let memberListArrayInterval = setInterval(async () => {
                                    if (memberListArrayCounter < memberListArrayLength) {
                                        await db.delete(`guildMessages_CC_${memberListArray[memberListArrayCounter]}`);
                                        await new Promise(resolve => setTimeout(resolve, 2000))
                                        const newEmbed = newMessage.embeds[0]
                                        newEmbed.setDescription(`Resetting CC counter for **${memberListArray[memberListArrayCounter]}**... *(${memberListArrayCounter}/${memberListArrayLength})*`)
                                        newMessage.edit({
                                            embeds: [newEmbed],
                                        })
                                        memberListArrayCounter++;
                                    }
                                    else {
                                        clearInterval(memberListArrayInterval);
                                    }
                                }, 1000);

                                // when it's done, it'll say that it's done
                                setTimeout(async () => {
                                    const newEmbed = newMessage.embeds[0]
                                    newEmbed.setDescription(`Successfully reset all CC counters for **${memberListArrayLength}** members that obtain the **${roleMention.name}** role.`)
                                    await newMessage.edit({
                                        embeds: [newEmbed],
                                    })
                                }
                                    , memberListArrayLength * 3000);
                                let embed21 = new EmbedBuilder()
                                    .setDescription(`🗑️ Successfully reset the **claim check** counter!`)
                                    .setColor('#00FF00')
                                const logMsg = new EmbedBuilder()
                                    .setColor("#87d083")
                                    .setTitle("Message Counter Reset **(role)**")
                                    .setDescription(`**Moderator:** <@${message.author.id}> **(${message.author.tag})**\n**Target:** <@&${roleMention.id}>**\n**Counter Type:** \`claim check counter\``)
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

                                let embed = new EmbedBuilder()
                                    .setDescription(`**Working...**`)
                                    .setColor('#87d083')
                                const newMessage = await message.reply({
                                    embeds: [embed]
                                })

                                let memberListArray = memberList.split("\n");
                                let memberListArrayLength = memberListArray.length;
                                let memberListArrayCounter = 0;
                                let memberListArrayInterval = setInterval(async () => {
                                    if (memberListArrayCounter < memberListArrayLength) {
                                        await db.delete(`guildMessages_CPC_${memberListArray[memberListArrayCounter]}`);
                                        await new Promise(resolve => setTimeout(resolve, 2000))
                                        const newEmbed = newMessage.embeds[0]
                                        newEmbed.setDescription(`Resetting CPC counter for **${memberListArray[memberListArrayCounter]}**... *(${memberListArrayCounter}/${memberListArrayLength})*`)
                                        newMessage.edit({
                                            embeds: [newEmbed],
                                        })
                                        memberListArrayCounter++;
                                    }
                                    else {
                                        clearInterval(memberListArrayInterval);
                                    }
                                }, 1000);

                                // when it's done, it'll say that it's done
                                setTimeout(async () => {
                                    const newEmbed = newMessage.embeds[0]
                                    newEmbed.setDescription(`Successfully reset all CPC counters for **${memberListArrayLength}** members that obtain the **${roleMention.name}** role.`)
                                    await newMessage.edit({
                                        embeds: [newEmbed],
                                    })
                                }
                                    , memberListArrayLength * 3000);
                                const logMsg = new EmbedBuilder()
                                    .setColor("#87d083")
                                    .setTitle("Message Counter Reset **(role)**")
                                    .setDescription(`**Moderator:** <@${message.author.id}> **(${message.author.tag})**\n**Target:** <@&${roleMention.id}>**\n**Counter Type:** \`corporate check counter\``)
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

                                let embed = new EmbedBuilder()
                                    .setDescription(`**Working...**`)
                                    .setColor('#87d083')
                                const newMessage = await message.reply({
                                    embeds: [embed]
                                })

                                let memberListArray = memberList.split("\n");
                                let memberListArrayLength = memberListArray.length;
                                let memberListArrayCounter = 0;
                                let memberListArrayInterval = setInterval(async () => {
                                    if (memberListArrayCounter < memberListArrayLength) {
                                        await db.delete(`guildMessages_IC_${memberListArray[memberListArrayCounter]}`);
                                        await new Promise(resolve => setTimeout(resolve, 2000))
                                        const newEmbed = newMessage.embeds[0]
                                        newEmbed.setDescription(`Resetting IC counter for **${memberListArray[memberListArrayCounter]}**... *(${memberListArrayCounter}/${memberListArrayLength})*`)
                                        newMessage.edit({
                                            embeds: [newEmbed],
                                        })
                                        memberListArrayCounter++;
                                    }
                                    else {
                                        clearInterval(memberListArrayInterval);
                                    }
                                }, 1000);

                                // when it's done, it'll say that it's done
                                setTimeout(async () => {
                                    const newEmbed = newMessage.embeds[0]
                                    newEmbed.setDescription(`Successfully reset all IC counters for **${memberListArrayLength}** members that obtain the **${roleMention.name}** role.`)
                                    await newMessage.edit({
                                        embeds: [newEmbed],
                                    })
                                }
                                    , memberListArrayLength * 3000);
                                const logMsg = new EmbedBuilder()
                                    .setColor("#87d083")
                                    .setTitle("Message Counter Reset **(role)**")
                                    .setDescription(`**Moderator:** <@${message.author.id}> **(${message.author.tag})**\n**Target:** <@&${roleMention.id}>**\n**Counter Type:** \`interaction counter\``)
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