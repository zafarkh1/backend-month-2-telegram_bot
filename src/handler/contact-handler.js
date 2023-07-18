export default (bot, chatId) => {
	bot.sendMessage(chatId, "Kontaktingizni yuboring", {
    reply_markup: {
      keyboard: [
        [
          {
            text: "Kontaktni jo'natish",
            request_contact: true,
          },
        ],
      ],
      one_time_keyboard: true,
      resize_keyboard: true,
    },
  });
}