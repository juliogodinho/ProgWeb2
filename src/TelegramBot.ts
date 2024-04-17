import { config } from "dotenv";
import TelegramBot = require("node-telegram-bot-api");
import { PrismaClient } from '@prisma/client';
import { EndOfLineState } from "typescript";
config();
// require('dotenv').config();
// const TelegramBot = require('node-telegram-bot-api');

const token = process.env.TOKEN;
const bot = new TelegramBot(token!, {polling: true});
const prisma = new PrismaClient();

// Matches "/echo [whatever]"
bot.onText(/\/echo (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const resp = match![1]; 
  bot.sendMessage(chatId, resp);
});

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const usumsg = msg.text;
  let usumsgstring = ' ';
  const timemsg = new Date()
  //console.log(timemsg);
  const horamsg = timemsg.getHours();
  console.log(horamsg);
  if (typeof usumsg === "string"){
    usumsgstring = usumsg;
    let site = ".com";
    if (usumsgstring.includes(site)){
      //bot.sendMessage(chatId, 'passei no .com');
    }else{
      if (usumsgstring != 'email' && usumsgstring != 'sair'){
        if (horamsg >= 9 && horamsg <= 18){
          bot.sendMessage(chatId, 'https://faesa.br');
        }else{
          bot.sendMessage(chatId, 'Horário de funcionamento: 9:00 as 18:00.');
          bot.sendMessage(chatId,'Digite email se deseja deixar seu email e sair se deseja sair', {
            "reply_markup": {
              "inline_keyboard": [
                [
                  {"text": "email", "callback_data": "email"},
                  {"text": "sair", "callback_data": "sair"}
                ]
              ]
            }
          });
          //bot.sendMessage(chatId, 'passei aqui 1'); 
        }
      }
    }
  }else{
    bot.sendMessage(chatId, 'Erro. Mensagem não está em formato string.');
  }
});

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const usumsg2 = msg.text;
  let usumsgstring2 = ' ';    
  if (typeof usumsg2 === "string"){
    usumsgstring2 = usumsg2;
    if (usumsgstring2 === 'email'){
      bot.sendMessage(chatId, 'Digite agora seu email. Em caso de erro ao digitar e enviar email, reinicie a sessão com o bot.');
      bot.on('message', (msg) => {
        const timemsg2 = new Date()
        let timestampmsg = timemsg2.getTime();
        timestampmsg = timestampmsg - 1713323826601;
        let result = parseInt(timestampmsg.toString().slice(0, -3));
        console.log(result);
        const digemail = msg.text;
        let digemail2 = ' ';
        if (typeof digemail === "string") {
          digemail2 = digemail;
          async function main() {
            const user = await prisma.user.create({
              data: {
                id: result,
                email: digemail2,
              },
            })
            console.log(user)
          }
          main()
          .then(async () => {
            await prisma.$disconnect()
            bot.sendMessage(chatId, 'Email recebido e armazenado com sucesso.');
            bot.stopPolling();
          })
          .catch(async (e) => {
            bot.sendMessage(chatId, 'Erro ao tentar armazenar email.');
            console.error(e)
            await prisma.$disconnect()
            process.exit(1)
          })  
        }else {
          bot.sendMessage(chatId, 'Erro: Email não está em formato string.');
          bot.stopPolling();
        }
      });
    }else{
        if(usumsgstring2 === 'sair'){
          bot.sendMessage(chatId, 'Obrigado por usar o bot. Sua sessão será terminada. passei aqui 9');
          bot.stopPolling();
        }else{
          bot.sendMessage(chatId, 'passei aqui else');
        }
    }
  }else{
    bot.sendMessage(chatId, 'Erro. Mensagem não está em formato string.');
  }  
});     