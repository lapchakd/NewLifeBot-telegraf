const { Telegraf } = require('telegraf')

const {
     Extra,
     Markup,
     Stage,
     session
} = Telegraf
const bot = new Telegraf(process.env.BOT_TOKEN)
const SceneGenerator = require("./Scenes")
const currentScene = new SceneGenerator()
const startScene =currentScene.StartGameScene()
const nameScene = currentScene.GetNameScene()
const stage = new Stage ([startScene,nameScene])


bot.use(session())
bot.use(stage.middleware())

bot.command("start", (ctx) => {
     ctx.scene.enter("startGame")
});
bot.on("text", async (ctx) =>{
     ctx.reply("Можливо ви хотіли почати гру?😁 /start")
})

bot.launch()