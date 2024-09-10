const { Client, IntentsBitField, EmbedBuilder, ActivityType, ActionRowBuilder, ButtonBuilder, ButtonStyle, Events} = require('discord.js');

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ],
});

const roles = [
    {
        id: "1239516723477221388",
        label: 'Red'
    },
    {
        id: "1239516981800210533",
        label: 'Green'
    },
    {
        id: "1239517030101549066",
        label: 'Blue'
    }
];


const handleAddRole = async (client, interaction) => {
    if (interaction.isCommand()) {
        try {
            const channel = client.channels.cache.get('1238068228048162859');
            if (!channel) return;

            const row = new ActionRowBuilder();

            roles.forEach((role) => {
                row.addComponents(
                    new ButtonBuilder()
                        .setCustomId(role.id)
                        .setLabel(role.label)
                        .setStyle(ButtonStyle.Primary)
                );
            });

            await interaction.reply({
                content: 'Claim or remove a role below.',
                components: [row],
            });
        } catch (error) {
            console.error(error);
        }
    }
    
}
module.exports = {
    name: 'addrole',
    description: 'Use it to add or delete role on our server',
    callback: handleAddRole
}