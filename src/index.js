const tmi = require('tmi.js');

const client = new tmi.Client({
	options: { debug: true, messagesLogLevel: "info" },
	connection: {
		reconnect: true,
		secure: true
	},
	channels: [ 'funkykay' ]
});
client.connect().catch(console.error);
client.on('message', (channel, tags, message, self) => {
	if(self) {return};
	
	var chatParagraph = document.createElement('p');
	chatParagraph.innerHTML = message;
	document.body.appendChild(chatParagraph);
});
