const TelegramBot = require('node-telegram-bot-api');
const bot = new TelegramBot('6033856238:AAEUyg7tcey_gkWQx7S6V3OqGNABA9HaFE4', { polling: true }); 
const freshPriceUrl = 'https://jumper-cloud.fra1.digitaloceanspaces.com/93280288/export/xls/23/%D0%9C%D0%BE%D1%8F%20%D1%86%D1%96%D0%BD%D0%B0.%20%D0%97%D0%B0%D0%B3%D0%B0%D0%BB%D1%8C%D0%BD%D0%B8%D0%B9.xlsx?uuid=766291';
const household = 'https://jumper-cloud.fra1.digitaloceanspaces.com/93280288/export/xls/24/%D0%9C%D0%BE%D1%8F%20%D1%86%D1%96%D0%BD%D0%B0.%20%D0%9F%D0%BE%D0%B1%D1%83%D1%82%D0%BE%D0%B2%D0%B0%20%D1%82%D0%B5%D1%85%D0%BD%D1%96%D0%BA%D0%B0.xlsx?uuid=911552';

const sendMorningMessage = async () => {
  try {
    const chatId = '@mmarketkiev';

    bot.sendMessage(chatId, `Доброго ранку до вашого ознайомлення
         \n <a href="${freshPriceUrl}">👉 Свіжий повний прайс 👈</a>
         \n <a href="${household}">👉 Свіжий прайс тільки побутова техніка 👈</a>
         `, {
        parse_mode: 'HTML',
      reply_markup: {
        inline_keyboard: [[
          {
            text: '👨‍💼 замовити/запитати 👩‍⚕️',
            url: 'https://t.me/mmarketkiev_bot',
          }
        ]]
      }
    }).catch((error) => {
      console.error('Виникла помилка під час надсилання повідомлення:', error);
    });

    console.log('Повідомлення надіслано успішно.');
  } catch (error) {
    console.error('Помилка при надсиланні повідомлення:', error.message);
  }
};

const checkAndSendMorningMessage = () => {
  const now = new Date();
  const kievTimeZoneOffset = 3;

  if (now.getUTCHours() === 9 - kievTimeZoneOffset && now.getUTCMinutes() === 0) {
    sendMorningMessage();
  }
};

setInterval(checkAndSendMorningMessage, 60000);