process.env.NTBA_FIX_319 = 1;
const TelegramBot = require('node-telegram-bot-api');
const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});
client.connect();
client.query('SELECT name FROM films;', (err, res) => {
  bot.on('message', (msg) => {
    const chatId = msg.chat.id;

    // send a message to the chat acknowledging receipt of their message
    bot.sendMessage(chatId, res);
  });
  client.end();
});

// replace the value below with the Telegram token you receive from @BotFather
const token = '1247311435:AAGJySOJzjXpAjT_BP30oQEGf5Vqhpxdm4o';

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});

// Matches "/echo [whatever]"
bot.onText(/\/echo (.+)/, (msg, match) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message

  const chatId = msg.chat.id;
  const resp = match[1]; // the captured "whatever"

  // send back the matched "whatever" to the chat
  bot.sendMessage(chatId, resp);
});

bot.onText(/\/start/, (msg) => {

  bot.sendMessage(msg.chat.id, `Привет ${msg.from.first_name}. Чем могу помочь?`, {
    "reply_markup": {
      "keyboard": [["Sample text", "Second sample"], ["Keyboard"], ["I'm robot"]]
    }
  });

});