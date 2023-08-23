var bot = new (require('node-telegram-bot-api'))('6613870366:AAFp1tNj0tQcPGAuK6ki6cc6X4LbsWDkhjk', {polling: true});
bot.on('message', msg => {OnMessage(msg)});
//
SetMyCommands([ // Комманды
	['info', 'Информация'],
	['help', 'Помощь'],
	['open', 'Оператор']
]);
//
//
//
function OnMessage(msg) { // Обработка входящих сообщений
	var message = msg.text;
	//
	if(message == '/start') {
		bot.sendMessage(msg.chat.id, 'Бот запустился!');
		ButtonMassageF(msg.chat.id, 'Начальные команды', [['Информация', '1'], ['Помощь', '2']])
	} else {
		bot.sendMessage(msg.chat.id, msg.text);
	}
	//
}
//
bot.on('callback_query', msg => {
	console.log(msg);
});
//
// git remote add origin https://github.com/Dekillston/telegram-bot-HR_PRO.git
// Помогающие функции
function SetMyCommands(m) { // Функцию меню
	var mass = [];
	for(var n = 0; n <= m.length-1; n++) {
		mass.push({command: '/'+(m[n][0]), description: m[n][1]});
	}
	bot.setMyCommands(mass);
}
//
function ButtonMassageF(id, text, m) { // Создание кнопок
	var button = [];
	for(var n = 0; n <= m.length-1; n++) {
		button.push([{text: m[n][0], callback_data: m[n][1]}]);
	}
	//
	var ButtonMassage = {reply_markup: JSON.stringify({inline_keyboard: button})};
    bot.sendMessage(id, text, ButtonMassage);
}


// Запускать npm run dev
// 1 - Если пользователь завис, то бот вам пишет и присылает ссылку на него.
// 2 - Создать так что бы вы добавляли ссылки и видео
// 3 - Создавать массовую рассылку, с админа
// 4 - Сделать так что бы админ мог общаеться с пользователем
// 5 - Спросить про таблицы выплат и остольное по работе.