var bot = new (require('node-telegram-bot-api'))('6613870366:AAFp1tNj0tQcPGAuK6ki6cc6X4LbsWDkhjk', {polling: true});
bot.on('message', msg => {OnMessage(msg)});
// Оператор
var operator = '1884219679';
//

SetMyCommands([ // Комманды
	['/start', 'Стартовать']
]);
// Простой сервер
const fs = require('fs');
function SimpleServerCommand(action, d) {
	var folder_id = 'id_data';
	//
	if(action == '/send') {
		fs.open((folder_id+'/')+d.id+'.txt', 'w', (err) => {});
	} else if(action == '/mailing') {
		fs.readdir((folder_id+'/'), (err, files) => {
		  files.forEach(file => {
		  	bot.sendMessage((file.split('.'))[0], d.text);
		  });
		});
	} else if(action == '/mailing_num') {
		fs.readdir((folder_id+'/'), (err, files) => {
  			d.fun({length: files.length, ld: d});
		});
	}
}
//
function OnMessage(msg) { // Обработка входящих сообщений
	var text = msg.text; var id = msg.chat.id;
	console.log(msg.chat.id + '___' + msg.chat.first_name+'___'+text);
	//
	// Оператор
	if(id == operator) {
		if(text == '/start') {
			ButtonMassage(id, 'Привет оператор!\nДоступные программы для теста', [['Количество подписчиков', '/num_sub'],['Рассылка', '/sub_operator']]);
		}
		//
		if(TextSimi('/SUO', text)) {
			console.log(text.replace('/SUO', ''));
			SimpleServerCommand('/mailing', {text: text.replace('/SUO', '')});
		}
		return;
	}
	//
	// Пользователь
	if(text == '/start') {
		ButtonMassage(id, 'Привет пользователь!\nДоступные программы для теста', [['Подписка на рассылку', '/sub'], ['Связаться с оператором', '/operator']]);
	}
}
//
bot.on('callback_query', msg => {
	var id = msg.message.chat.id; var data = msg.data;
	//
	// Оператор
	if(id == operator) {
		if(data == '/sub_operator') {
			bot.sendMessage(id, 'Напишите /SUO А затем ваш текст который вы хотите отправить');
		} else if(data == '/num_sub') {
			SimpleServerCommand('/mailing_num', {fun: (d) => {
				bot.sendMessage(d.ld.id, 'Количество подписчиков: '+d.length);
			}, id: id});
		} 
		return;
	}
	//
	// Пользователь
	if(data == '/sub') {
		SimpleServerCommand('/send', {id: id});
		//
		bot.sendMessage(id, 'Спасибо, вы подписались на рассылку!\nТеперь оператор сможет присылать вам сообщения');
	}
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
function ButtonMassage(id, text, m) { // Создание кнопок
	var button = [];
	for(var n = 0; n <= m.length-1; n++) {
		button.push([{text: m[n][0], callback_data: m[n][1]}]);
	}
	//
	var ButtonMassage = {reply_markup: JSON.stringify({inline_keyboard: button})};
    bot.sendMessage(id, text, ButtonMassage);
}
//
function TextSimi(str1, str2) { // Найти текст
     if((str2.toUpperCase()).indexOf(str1.toUpperCase()) >= 0) {
        return true;
    } else {
        return false;
    }
}

// Запускать npm run dev
// 1 - Если пользователь завис, то бот вам пишет и присылает ссылку на него.
// 2 - Создать так что бы вы добавляли ссылки и видео
// 3 - Создавать массовую рассылку, с админа
// 4 - Сделать так что бы админ мог общаеться с пользователем
// 5 - Спросить про таблицы выплат и остольное по работе.