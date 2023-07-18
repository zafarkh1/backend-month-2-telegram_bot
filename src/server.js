import express from "express";
import TelegramBot from "node-telegram-bot-api";
import { API_KEY } from "./config/app.config.js";
import { keyboards } from "./keyboards/branches.keyboard.js";
import menuKeyboardName from "./keyboards/menu.keyboard-name.js";
import languageKeyboardName from "./keyboards/language.keyboard-name.js";
import { readFileCustom } from "./helpers/read-helper.js";
import { centerHandler } from "./handler/center.handler.js";
import { writeFileCustom } from "./helpers/write-helper.js";

const bot = new TelegramBot(API_KEY, { polling: true });

const app = express();

bot.onText(/\/start/, (message) => {
  bot.sendMessage(message.chat.id, `Hello ${message.from.first_name}. Choose`, {
    reply_markup: {
      keyboard: [
        [
          {
            text: "Ozbek",
          },
          {
            text: "Русский",
          },
        ],
        [
          {
            text: "English",
          },
        ],
      ],
      resize_keyboard: true,
    },
  });
});

app.post("/center", (req, res) => {
	const { name } = req.body;
	console.log(name);
  // const allCenters = readFileCustom("centers.json");

  // allCenters.push({
  //   id: allCenters.at(-1)?.id + 1 || 1,
  //   name,
  // });

  // writeFileCustom("centers.json", allCenters);

  // res.sendStatus(201).json({
  //   message: "Success",
  // });
});

app.get("/students", (_, res) => {
  const allStudents = readFileCustom("students.json");

  res.json({
    students: allStudents,
  });
});

bot.on("message", (message) => {
  const chatId = message.chat.id;

  if (message.text == languageKeyboardName.uz) {
    bot.sendMessage(
      chatId,
      `
		My Schoolga Hush Kelibsiz 😊👋

Quyida mos tugmani tanlang 👇🙋🏻‍♂️
		`,
      {
        reply_markup: {
          keyboard: keyboards.menuUz,
          resize_keyboard: true,
        },
      }
    );
  }

  if (message.text == menuKeyboardName.backLangUz) {
    bot.sendMessage(message.chat.id, `Choose`, {
      reply_markup: {
        keyboard: keyboards.lang,
        resize_keyboard: true,
      },
    });
  }

  if (message.text == languageKeyboardName.ru) {
    bot.sendMessage(
      chatId,
      `
		Добро пожаловать в <b>CAMBRIDGE</b> 😊👋

Выберите подходящие кнопки 👇🙋🏻‍♂️`,
      {
        reply_markup: {
          keyboard: keyboards.menuRu,
          resize_keyboard: true,
        },
      }
    );
  }

  if (message.text == menuKeyboardName.backLangRu) {
    bot.sendMessage(
      message.chat.id,
      `Hello ${message.from.first_name}. Choose`,
      {
        reply_markup: {
          keyboard: keyboards.lang,
          resize_keyboard: true,
        },
      }
    );
  }

  if (message.text == languageKeyboardName.eng) {
    bot.sendMessage(
      chatId,
      `
		Welcome to <b>CAMBRIDGE</b> 😊👋

Choose appropriate buttons below 👇🙋🏻‍♂️`,
      {
        reply_markup: {
          keyboard: keyboards.menuEng,
          resize_keyboard: true,
        },
      }
    );
  }

  if (message.text == menuKeyboardName.backLangEng) {
    bot.sendMessage(message.chat.id, `Choose`, {
      reply_markup: {
        keyboard: keyboards.lang,
        resize_keyboard: true,
      },
    });
  }
});

bot.on("message", (message) => {
  const chatId = message.chat.id;

  if (message.text == menuKeyboardName.registerUz) {
    bot.sendMessage(
      chatId,
      "🗒 Siz kurslarga quyidagi havola orqali yozilishingiz mumkin",
      {
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: `👉🏻Kursga yozilish`,
                url: `https://app.cambridgeonline.uz/register/telegram`,
              },
            ],
          ],
        },
      }
    );
  }

  if (message.text == menuKeyboardName.branchesUz) {
    bot.sendMessage(chatId, "Tanlang", {
      reply_markup: {
        keyboard: keyboards.centers,
        resize_keyboard: true,
      },
    });
  }

  if (message.text == menuKeyboardName.backLangUz) {
    bot.sendMessage(
      chatId,
      `
		My Schoolga Hush Kelibsiz 😊👋

Quyida mos tugmani tanlang 👇🙋🏻‍♂️
		`,
      {
        reply_markup: {
          keyboard: keyboards.menuUz,
          resize_keyboard: true,
        },
      }
    );
  }

  if (message.text == menuKeyboardName.contactUz) {
    bot.sendMessage(chatId, "Ijtimoyi tarmoqlar", {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "Telegram",
              url: "t.me/the_deve1oper",
            },
            {
              text: "Instagram",
              url: "https://www.instagram.com/_zafa7_kh/",
            },
          ],
        ],
      },
    });
  }
});

bot.on("message", (message) => {
  const chatId = message.chat.id;

  const foundCenter = readFileCustom("centers.json").find(
    (el) => el.name == message.text
  );

  if (foundCenter) {
    centerHandler(bot, chatId, foundCenter);
  }

  if (message.text == languageKeyboardName.backUz) {
    bot.sendMessage(
      chatId,
      `
		My Schoolga Hush Kelibsiz 😊👋

Quyida mos tugmani tanlang 👇🙋🏻‍♂️
		`,
      {
        reply_markup: {
          keyboard: keyboards.menuUz,
          resize_keyboard: true,
        },
      }
    );
  }
});

bot.on("callback_query", async (message) => {
  const chatId = message.from.id;
  const foundCenter = readFileCustom("centers.json").find(
    (el) => el.name == message.data
  );

  if (foundCenter) {
    await bot.sendMessage(chatId, "Kontaktingizni yuboring", {
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
});

const data = {};

bot.on("contact", async (message) => {
  data.contact = message.contact.phone_number;

  const allUsers = readFileCustom("students.json");

  allUsers.push({
    id: allUsers.at(-1)?.id + 1 || 1,
    contact: data.contact,
    username: message.from.first_name,
  });

  writeFileCustom("students.json", allUsers);

  await bot.sendMessage(
    -819172199,
    `
		<b>contact: ${data.contact}</b>\n<b>username: ${
      message.from.first_name
    }</b>\n<b>orderedAt: ${new Date().toLocaleString()}</b>
	`,
    {
      parse_mode: "HTML",
    }
  );

  await bot.sendMessage(message.from.id, "So'rovingiz qabul qilindi", {
    reply_markup: {
      keyboard: keyboards.menuUz,
      resize_keyboard: true,
    },
  });
});

bot.on("new_chat_members", (message) => {
  bot.sendMessage(message.chat.id, `Welcome ${message.from.first_name}`);
});

app.listen(2024, console.log("listening ..."));
