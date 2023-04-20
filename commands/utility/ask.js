require('dotenv').config();
const { SlashCommandBuilder } = require('discord.js');
const { default: fetch } = require('node-fetch');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ask')
    .setDescription('Pergunte qualquer coisa para o grande Mago!')
    .addStringOption((option) =>
      option
        .setName('input')
        .setDescription('Entrada para o mago responder')
        .setRequired(true)
    ),
  async execute(interaction) {
    const stringRequest = interaction.options.getString('input');
    if (!stringRequest) {
      return interaction.reply(`Você deve preencher o "input".`);
    }

    await interaction.deferReply();

    try {
      const response = await fetch(
        'https://api.openai.com/v1/chat/completions',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${process.env.OPENAI_TOKEN}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [
              {
                role: 'system',
                content:
                  'Responda todas as perguntas como se você fosse um mago poderoso com um tom de superioridade.',
              },
              { role: 'user', content: stringRequest },
            ],
          }),
        }
      );

      const data = await response.json();
      await interaction.editReply(
        `Pergunta: ${stringRequest}\n\n${data.choices[0].message.content}`
      );
    } catch (error) {
      await interaction.editReply('Ocorreu um erro inesperado');
    }
  },
};
