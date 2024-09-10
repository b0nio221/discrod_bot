const { Client, IntentsBitField, EmbedBuilder, ActivityType, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    name: 'info',
    description: 'Information about bot',
    // devOnly: Boolean,
    // testOnly: Boolean,
    // options: Object[],

    callback: (client, interaction) => {
        const embed = new EmbedBuilder()
            .setTitle("Hi!")
            .setDescription(`My name is Bonio_bot. I'm ready for your orders.
            If you wanna test me enter commands:
            ban
            addrole
            ping
            timeout
            `
            )
            .setColor("Random")
            .setAuthor({name:"Bonio_Bot", iconURL: "https://imgur.com/J3yj6uL.png"})
            .setThumbnail('https://imgur.com/J3yj6uL.png')
            .setFooter({ text: "Made by b0niu#2644", iconURL: "https://imgur.com/J3yj6uL.png" })
            .setImage("https://imgur.com/J3yj6uL.png");
            

        interaction.reply({ embeds: [embed] });
    }
};