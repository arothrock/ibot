'use strict'
const express = require('express')
const Slapp = require('slapp')
const BeepBoopConvoStore = require('slapp-convo-beepboop')
const BeepBoopContext = require('slapp-context-beepboop')
if (!process.env.PORT) throw Error('PORT missing but required')

var slapp = Slapp({
  convo_store: BeepBoopConvoStore(),
  context: BeepBoopContext()
})

var Botkit = require('botkit');
var controller = Botkit.slackbot({
	interactive_replies: false,
	debug: false,
});


var app = slapp.attachToExpress(express())


//Asks a random question
controller.hears(['go'], 'direct_message,direct_mention,mention', function(bot, message) {

	//ask a random question from the database
	//bot.startConversation(message, askrandom);

	//usersID = bot.api.users.identity({members: message.id});
	var usersID = message.user;
	var teamID = message.team;
	var catID = 0;
	var qcount = 0;

	console.log("Hello, from BotKit.");
/*
	bot.startPrivateConversation({ user: usersID },function(err,dm) {
		dm.say("Hi! To stop, say: `stop`. To skip a question, say: `skip`.");
	});

	requestQuestion(catID, usersID, teamID, qcount);
*/
	//connectDB(usersID, teamID, subject);
	//console.log("The team id is: "+teamID);
	//console.log(message);

});


slapp.message('hi (.*)', ['direct_message'], (msg, text, match1) => {
  msg.say({
    text: 'How are you?',
    attachments: [
      {
        text: '',
        callback_id: 'how_are_you',
        actions: [
          {
            name: 'answer',
            text: ':thumbsup:',
            type: 'button',
            value: 'up',
            style: 'default'
          },
          {
            name: 'answer',
            text: ':thumbsdown:',
            type: 'button',
            value: 'down',
            style: 'default'
          }
        ]
      }
    ]
  }).route('handleHi', { what: match1 })
})


slapp.action('how_are_you', 'answer', (msg, val) => {
	msg.respond('You are ' + val)
})

/*
slapp.route('handleHi', (msg, state) => {
  if (msg.type != 'action') {
    msg.say('You must choose a button!').route('handleHi', state)
    return
  }
  msg.say(':smile: ' + state.what)
})
*/



app.get('/', function (req, res) {
  res.send('Hello')
})

console.log('Listening on :' + process.env.PORT)
app.listen(process.env.PORT)
