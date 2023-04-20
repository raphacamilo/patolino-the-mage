const { Events } = require('discord.js');

// Evento para notificar quando o cliente estiver pronto, execute este código (apenas uma vez)
module.exports = {
  name: Events.ClientReady,
  once: true,
  execute(client) {
    console.log(`Ready! Logged in as ${client.user.tag}`);
  },
};
