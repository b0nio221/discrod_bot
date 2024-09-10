const { Client, Interaction, ApplicationCommandOptionType, PermissionFlagsBits } = require('discord.js');

module.exports = {
    /**
     * Command callback
     * @param {Client} client 
     * @param {Interaction} interaction 
     */
    callback: async (client, interaction) => {
        const targetUserId = interaction.options.get('target-user').value;
        const reason = interaction.options.get('reason')?.value || "No reason provided";

        await interaction.deferReply();

        try {
            const targetUser = await interaction.guild.members.fetch(targetUserId);

            if (!targetUser) {
                await interaction.editReply("That user doesn't exist in this server.");
                return;
            }

            if (targetUser.id === interaction.guild.ownerId) {
                await interaction.editReply("You can't ban that user because they're the server owner.");
                return;
            }

            const targetUserRolePosition = targetUser.roles.highest.position;
            const requestUserRolePosition = interaction.member.roles.highest.position;
            const botRolePosition = interaction.guild.members.me.roles.highest.position;

            if (targetUserRolePosition >= requestUserRolePosition) {
                await interaction.editReply("You can't ban that user because they have a higher or equal role than you.");
                return;
            }

            if (targetUserRolePosition >= botRolePosition) {
                await interaction.editReply("I can't ban that user because they have a higher or equal role than me.");
                return;
            }

            // Ban the targetUser
            await targetUser.ban({ reason });
            await interaction.editReply(`User ${targetUser.user.tag} was banned.\nReason: ${reason}`);
        } catch (error) {
            console.error(error);
            await interaction.editReply('An error occurred while trying to ban the user.');
        }
    },
    name: 'ban',
    description: 'Bans a member.',
    options: [
        {
            name: 'target-user',
            description: 'The user to ban.',
            required: true,
            type: ApplicationCommandOptionType.Mentionable,
        },
        {
            name: 'reason',
            description: 'The reason for the ban.',
            required: false, // Make this optional as per usual practice
            type: ApplicationCommandOptionType.String,
        }
    ],
    permissionsRequired: [PermissionFlagsBits.BanMembers],
    botPermissions: [PermissionFlagsBits.BanMembers],
};