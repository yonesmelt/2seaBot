const {
    Message,
    Client,
    Util
} = require("discord.js");
const {
    EmbedBuilder,
    MessageButton,
    MessageComponent,
} = require('discord.js')
const Discord = require('discord.js');
const roblox = require('noblox.js');
const configFile = require('../config.json');

module.exports = {
    name: "rblxemoji",
    aliases: ["robloxemoji", "re"],
    description: "Picapuff.",
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {

        if (message.member.roles.cache.some(r => ["leadership team", "ownership team", "corporate team"].includes(r.name))) {

            let username = args[0];
            if (!username) {
                let embed11 = new EmbedBuilder()
                    .setDescription(`No username provided, you didn't provide a username for me to pban.`)
                    .setColor('#FF0000')
                return message.reply({
                    embeds: [embed11]
                });
            }
            let rbxID
            try {
                rbxID = await roblox.getIdFromUsername(username);
            } catch {
                let embed111 = new EmbedBuilder()
                    .setDescription(`Invalid username, the username that you provided isn't a valid ROBLOX username.`)
                    .setColor('#FF0000')
                return message.reply({
                    embeds: [embed111]
                });
            }

            username = await roblox.getUsernameFromId(rbxID);
            let thumbnail_default = await roblox.getPlayerThumbnail(rbxID, "420x420", "png", false, "Bust")
            let thumbnail_circHeadshot = await roblox.getPlayerThumbnail(rbxID, 420, "png", true, "Headshot")
            let thumbnails_body = await roblox.getPlayerThumbnail([rbxID, 234567, 345678], "150x200", "jpeg", false, "Body")

            const embed1 = new EmbedBuilder()
            .setDescription(`Successfully created an emoji and named it **${username}**!`)
            .setColor("#00FF00")
            let url = `${thumbnail_default[0].imageUrl}`
            message.guild.emojis
            .create({attachment: url, name: username})
            .then(message.reply({embeds: [embed1]}))

        } else {
            return;
        }

    },
};