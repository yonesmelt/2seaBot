const { default: axios } = require("axios");
const { Message, Client, EmbedBuilder } = require("discord.js");

module.exports = {
    name: "lyrics",
    description: "Get the lyrics of any song.",
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        const songtitle = args.slice(0).join(' ');

        const embedEdit = new EmbedBuilder()
        .addFields({name: `<a:CM_loading:1025126604793454602> loading lyrics...`, value: `please wait`})
        .setColor(0x87d083)

        const loadingMsg = await message.reply({ embeds: [embedEdit] });

        function substring(length, value) {
            const replaced = value.replace(/\n/g, "--");
            const regex = `.{1,${length}}`;
            const lines = replaced
                .match(new RegExp(regex, "g"))
                .map((line) => line.replace(/--/g, "\n"));

            return lines;
        }

        const embed5 = new EmbedBuilder()
            .addFields({name:`failed to find lyrics`, value: `i did not find the lyrics of \`${songtitle}\`, please try again`})
            .setColor(0x87d083)
        const url = new URL('https://some-random-api.ml/lyrics');
        url.searchParams.append('title', songtitle)

        try {
            const { data } = await axios.get(url.href);

            const embeds = substring(4096, data.lyrics).map((value, index) => {
                const isFirst = index === 0;

                return new EmbedBuilder({
                    title: isFirst ? `${data.title} - ${data.author}` : null,
                    thumbnail: isFirst ? { url: data.thumbnail.genius } : null,
                    description: value,
                    color: 0x87d083, 
                });
            });



            return await loadingMsg.edit({ embeds });
        } catch (err) {
            console.log(err)
            loadingMsg.edit({ embeds: [embed5] });
        }
    },
};
