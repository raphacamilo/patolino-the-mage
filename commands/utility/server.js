const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('server')
    .setDescription('Retorna informação do servidor.'),
  async execute(interaction) {
    await interaction.reply(
      `Esse servidor é ${interaction.guild.name} e tem ${interaction.guild.memberCount} membros.`
    );
  },
};
