const { Events } = require('discord.js');

// Evento para notificar quando o cliente estiver pronto, execute este código (apenas uma vez)
module.exports = {
  name: Events.Error,
  once: true,
  execute(err) {
    console.log(err.message);
  },
};
