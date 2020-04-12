process.env.NTBA_FIX_319 = 1;
const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');

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

// Matches "/echo [whatever]"
bot.onText(/\/\+ (.+)/, (msg, match) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message

  const chatId = msg.chat.id;
  const resp = match[1]; // the captured "whatever"
  if (resp)
    fs.writeFile(`${msg.chat.id}.txt`, `${resp}\r\n`, {flag: 'a+'}, err => {
      if (err) console.error(err)
    })

  // send back the matched "whatever" to the chat
  bot.sendMessage(chatId, `${resp} сохранен`);
});

// Matches "/echo [whatever]"
bot.onText(/\/list/, (msg, match) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message

  const chatId = msg.chat.id;

  fs.readFile(`${msg.chat.id}.txt`, 'utf8', function(err, contents) {
    bot.sendMessage(chatId, contents);
  });

  // send back the matched "whatever" to the chat

});

bot.onText(/\/start/, (msg) => {

  bot.sendMessage(msg.chat.id, `Привет ${msg.from.first_name}. Чем могу помочь?`, {
    "reply_markup": {
      "keyboard": [["/list", "Second sample"], ["Keyboard"], ["I'm robot"]]
    }
  });

});