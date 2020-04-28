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

let token = "EAADTXVXZCI8gBAOgwCXniZCsoLEwha26qKQPsojuVxPZApCEQgQYXsVdgZBzdDXWZCuJzNyHZBMcs08FRStijjsjXWOhM5RolKrT0Rbfuq4CX3gZBklcgoa5oYnlITH8Th7xsJ6BKNr99yGeZA5644XXIFQqAhzNEYiII26EfkZABnwZDZD"

//facebook
app.get('/webhook', (req, res) => {

  // Your verify token. Should be a random string.
  let VERIFY_TOKEN = "carlos"
    
  // Parse the query params
  let mode = req.query['hub.mode'];
  let token = req.query['hub.verify_token'];
  let challenge = req.query['hub.challenge'];
    
  // Checks if a token and mode is in the query string of the request
  if (mode && token) {
  
    // Checks the mode and token sent is correct
    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
      
      // Responds with the challenge token from the request
      console.log('WEBHOOK_VERIFIED');
      res.status(200).send(challenge);
    
    } else {
      // Responds with '403 Forbidden' if verify tokens do not match
      res.sendStatus(403);      
    }
  }
});

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
		qs : {access_token : token},
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