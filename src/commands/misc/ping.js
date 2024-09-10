module.exports = {
    name: 'ping',
    description: 'pong!',
    //devOnly: Boolen,
    //testOnly: Boolen,
    //options: Object[],


    callback:(client, interaction) => {
        interaction.reply(`Pong! ${client.ws.ping}ms`)
    }
}