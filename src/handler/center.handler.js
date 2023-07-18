export const centerHandler = (bot, chatId, center) => {
	bot.sendPhoto(chatId, "https://cambridgeonline.uz/img/background/Novza.jpg", {
    caption: `<i>📍 My School ${center.name} filiali xaritasi </i>`,
    parse_mode: "HTML",
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: center.name,
            callback_data: center.name,
          },
        ],
      ],
    },
  });
}