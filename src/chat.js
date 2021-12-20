import 'tmi.js';

import mustache from 'mustache';

import '../less/message.less'

var message_template = `
<div class="row message-box">
	<div class="col-6 message-user">{{ display_name }}</div>
	<div class="col-6 message-text">{{ message }}</div>
</div>
`

export default function startChat() {

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

		var message_rendered = mustache.render(message_template, {
			display_name: tags['display-name'],
			message: message,
		});

		document.body.insertAdjacentHTML('beforeend', message_rendered);
	});
}
