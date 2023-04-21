const {
  createAudioPlayer,
  AudioPlayerStatus,
  createAudioResource,
  joinVoiceChannel,
} = require('@discordjs/voice');
const { SlashCommandBuilder } = require('discord.js');
const { join } = require('node:path');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('magic')
    .setDescription('Uma magia misteriosa'),
  async execute(interaction) {
    const guild = interaction.client.guilds.cache.get(interaction.guildId);
    const member = guild.members.cache.get(interaction.member.user.id);
    const voiceChannel = member.voice.channel;

    const player = createAudioPlayer();

    player.on(AudioPlayerStatus.Playing, () => {
      console.log('O aúdio começou a tocar');
    });

    player.on('error', (error) => {
      console.log(`Error: ${error.message}`);
    });

    const resource = createAudioResource(join(__dirname, 'mago.mp4'));
    player.play(resource);

    const connection = joinVoiceChannel({
      channelId: voiceChannel.id,
      guildId: interaction.guildId,
      adapterCreator: voiceChannel.guild.voiceAdapterCreator,
    });

    await interaction.reply('Você conjurou a magia suprema.');

    const subscription = connection.subscribe(player);

    if (subscription) {
      setTimeout(() => subscription.unsubscribe(), 223000);
    }
  },
};
