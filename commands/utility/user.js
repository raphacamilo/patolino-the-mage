const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('user')
    .setDescription('Retorna a informação do usuário.'),
  async execute(interaction) {
    await interaction.reply(
      `Esse comando foi executado por ${interaction.user.username}, que entrou em ${interaction.member.joinedAt}.`
    );
  },
};
