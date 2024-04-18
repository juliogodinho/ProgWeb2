"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
//import TelegramBot = require("node-telegram-bot-api");
const client_1 = require("@prisma/client");
const node_telegram_bot_api_1 = __importDefault(require("node-telegram-bot-api"));
(0, dotenv_1.config)();
// require('dotenv').config();
//const TelegramBot = require('node-telegram-bot-api');
const token = process.env.TOKEN;
//const bot = new TelegramBot(token!, {polling: true});
if (typeof token === "string") {
    const bot = new node_telegram_bot_api_1.default(token, { polling: true });
    const prisma = new client_1.PrismaClient();
    bot.onText(/\/echo (.+)/, (msg, match) => {
        const chatId = msg.chat.id;
        if (match) {
            const resp = match[1];
            bot.sendMessage(chatId, resp);
        }
        else {
            bot.sendMessage(chatId, "Ocorreu um erro na comunicação");
        }
    });
    /*bot.on("message", (msg) => {
      const chatId = msg.chat.id;
  
      bot.sendMessage(chatId, "Received your message");
    });*/
    bot.on('message', (msg) => {
        const chatId = msg.chat.id;
        const usumsg = msg.text;
        let usumsgstring = ' ';
        const timemsg = new Date();
        //console.log(timemsg);
        const horamsg = timemsg.getHours();
        console.log(horamsg);
        if (typeof usumsg === "string") {
            usumsgstring = usumsg;
            let site = ".com";
            if (usumsgstring.includes(site)) {
                //bot.sendMessage(chatId, 'passei no .com');
            }
            else {
                if (usumsgstring != 'email' && usumsgstring != 'sair') {
                    if (horamsg >= 9 && horamsg < 18) {
                        bot.sendMessage(chatId, 'https://faesa.br');
                    }
                    else {
                        bot.sendMessage(chatId, 'Horário de funcionamento: 9:00 as 18:00.');
                        bot.sendMessage(chatId, 'Digite email se deseja deixar seu email e sair se deseja sair', {
                            "reply_markup": {
                                "inline_keyboard": [
                                    [
                                        { "text": "email", "callback_data": "email" },
                                        { "text": "sair", "callback_data": "sair" }
                                    ]
                                ]
                            }
                        });
                        //bot.sendMessage(chatId, 'passei aqui 1'); 
                    }
                }
            }
        }
        else {
            bot.sendMessage(chatId, 'Erro. Mensagem não está em formato string.');
        }
    });
    bot.on('message', (msg) => {
        const chatId = msg.chat.id;
        const usumsg2 = msg.text;
        let usumsgstring2 = ' ';
        if (typeof usumsg2 === "string") {
            usumsgstring2 = usumsg2;
            if (usumsgstring2 === 'email') {
                bot.sendMessage(chatId, 'Digite agora seu email. Em caso de erro ao digitar e enviar email, reinicie a sessão com o bot.');
            }
            else {
                if (usumsgstring2 === 'sair') {
                    bot.sendMessage(chatId, 'Obrigado por usar o bot.');
                    //bot.stopPolling();
                }
                else {
                    //bot.sendMessage(chatId, 'passei aqui else');
                }
            }
        }
        else {
            bot.sendMessage(chatId, 'Erro. Mensagem não está em formato string.');
        }
    });
    bot.on('message', (msg) => {
        const chatId = msg.chat.id;
        const digemail = msg.text;
        let digemail2 = ' ';
        let site2 = ".com";
        if (typeof digemail === "string" && digemail.includes(site2)) {
            digemail2 = digemail;
            function main() {
                return __awaiter(this, void 0, void 0, function* () {
                    const timemsg2 = new Date();
                    let timestampmsg = timemsg2.getTime();
                    timestampmsg = timestampmsg - 1713323826601;
                    //let result = parseInt(timestampmsg.toString().slice(0, -3));
                    let result = timestampmsg;
                    //bot.sendMessage(chatId, 'passei aqui teste email');
                    console.log(result);
                    const user = yield prisma.user.create({
                        data: {
                            id: result,
                            email: digemail2,
                        },
                    });
                    console.log(user);
                });
            }
            main()
                .then(() => __awaiter(void 0, void 0, void 0, function* () {
                yield prisma.$disconnect();
                bot.sendMessage(chatId, 'Email recebido e armazenado com sucesso.');
                //bot.stopPolling();
                return;
            }))
                .catch((e) => __awaiter(void 0, void 0, void 0, function* () {
                bot.sendMessage(chatId, 'Erro ao tentar armazenar email.');
                console.error(e);
                yield prisma.$disconnect();
                process.exit(1);
            }));
        }
        else {
            if (typeof digemail != "string") {
                bot.sendMessage(chatId, 'Erro: Email não está em formato string.');
                //bot.stopPolling();
            }
        }
    });
}
