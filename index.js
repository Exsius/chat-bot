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
app.get('/webhook/', function(req, res) {
	if (req.query['hub.verify_token'] === "carlos1337") {
		res.send(req.query['hub.challenge'])
	}
	res.send("incorrect token")
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