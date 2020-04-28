'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')

const app = express()

//set port or else set to 5000
app.set('port', (process.env.PORT || 5000))

//allows program to process the data
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

//routes

//default
app.get('/', function(req, res) {
	res.send("Hello World")
})

let token = "EAADTXVXZCI8gBAEsaq7YKrSrjbcrmaZB2jB6hRCIOb4MNJ4p4i7dfYRwOhyZBHlhqI82jdPxLZA3sbykmr29tHTALhmGQgkIyC6DnrgVWCZC9TgZAJPkiRVnk0fKMe58VXALsZBRm8ZBpDQHVRZBJHZA5RebAXfDW2OixdL6dI79Kk7gZDZD"

//facebook
app.get('/webhook/', function(req, res) {
	if (req.query['hub.verify_token'] === "carlos1337") {
		res.send(req.query['hub.challenge'])
	}
	res.send("incorrect token")
})

app.post('/webhook/', function(req, res) {
	let messaging_events = req.body.entry[0].messaging
	for (let i = 0; i < messaging_events.length; i++) {
		let event = messaging_events[i]
		let sender = event.sender.id
		if (event.mssage && event.message.text) {
			let text = event.message.text
			sendText(sender, "text echo" + text.substring(0, 100))
		}
	}
	res.sendStatus(200)
})


function sendText(sender, text) {
	let messageData = {text: text}
	request ({
		url: "https://graph.facebook.com/v2.6/me/messages",
		qs : {access_token, token},
		method: "POST",
		json: {
			recipient: {id: sender},
			message: messageData
            }
		}, function (error, response, body) {
			if (error) {
				console.log("error")
			} else if (response.body.error){
				console.log("body error")
			}
	})
}


app.listen(app.get('port'), function() {
	console.log("running: port")
})