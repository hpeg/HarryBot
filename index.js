const Discord = require('discord.js');
const client = new Discord.Client();
const { prefix, token } = require('./config.json');

const moment = require('moment-timezone');

client.once('ready', () => {
	console.log('Ready!');
});

client.on('message', message => {

	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();

	if (command === 'time') {

		message.channel.send(moment.tz('America/Los_Angeles').format('ha z')); // PDT
		message.channel.send(moment.tz('America/New_York').format('ha z')); // EDT


		if (!args.length) {
			return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
		}

		const amount = parseInt(args[0]);

		const type = args[1];

		const zone = args[2];

		if (isNaN(amount)) {
			return message.reply('That doesn\'t seem to be a valid number.');
		} else if (amount < 1 || amount > 12) {
			return message.reply('You need to input a number between 2 and 100.');
		}

		console.log(type);

		if (!(type == 'am' || type == 'pm')) {
			return message.reply('Invalid time argument.');
		}


		// message.channel.send(`Command name: ${command}\nArguments: ${args}`);

		message.channel.send('Time  ' + amount + type);
	}

});

client.login(token);