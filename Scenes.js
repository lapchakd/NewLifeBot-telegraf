const Scene = require("telegraf/scenes/base");
const { Markup } = require("telegraf");
const { Telegraf } = require('telegraf')

const bot = new Telegraf(process.env.BOT_TOKEN);

class SceneGenerator {
    StartGameScene() {
        const startGame = new Scene("startGame");
        startGame.enter(async (ctx) =>{
            const photo = "https://lutsk.rayon.in.ua/upload/news/1/2018-03/1519943828130/t_1_zamok.jpg";
            const buttons = Markup.inlineKeyboard([
                Markup.callbackButton("Звичайно 😉", "Yes"),
                Markup.callbackButton("Треба подумати  😑", "No"),
            ]);
            const description = "Вибрані варіанти відповідей впливають на розвиток подій в подальшому." +
                "Засновано на не реальних подіях.Готові почати історію?P.s.: __Події починаються в Луцьку__ 🤫";
            await bot.telegram.sendPhoto(ctx.chat.id,photo, {
                caption:description,
                reply_markup:buttons,
            });
        })
        startGame.on("callback_query",async query => {
                if(query.callbackQuery.data === "Yes"){
                   await query.answerCbQuery("Історія починається",true);
                   await query.scene.enter("name");
                }else {
                   await query.reply("Що тут думати 🙄 ! В разі чого введіть /start, щоб почати історію.");
                }
        });
        return startGame;

    }
    GetNameScene() {
        const name = new Scene("name");
        name.enter( (ctx) => {
            ctx.reply("Привіт мене звати Сельвадорес ,а тебе?");
        })
        name.on("text", async (ctx) => {
            const name = ctx.message.text;
            if(typeof(name) == "string" && !(name>0)){
                console.log(typeof(name));
                await ctx.reply("Привіт," + name);
                await ctx.scene.leave();
            }else {
                await ctx.reply("Не можу розпізнати.... Повторіть спробу🤯");
                await ctx.scene.reenter();
            }
        })
        name.on("message",async (ctx) =>{
            await ctx.reply("Не можу розпізнати.... Повторіть спробу🤯");
            await ctx.scene.reenter();
        })
        return name;
    }
}

module.exports = SceneGenerator;