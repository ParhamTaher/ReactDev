const express = require('express');
const keys = require('./config/keys');
var bodyParser = require('body-parser');

var accountSid = keys.sID;
var authToken = keys.AuthToken;

var client = require('twilio')(accountSid, authToken);

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/twilio/sendsms', function(req, res) {
    client.messages
        .create({
            body:
                'Hey there, this is a message from ' +
                req.body.businessName +
                '. You are next in line! You will be serviced in approximately ' +
                req.body.avgWaitTime +
                '.',
            to: req.body.upNext.cNumber,
            from: keys.myNumber
        })
        .then(function(data) {
            console.log('Message Sent');
            res.send({
                responseMSG: 'success',
                message: 'it worked, sms sent'
            });
        })
        .catch(function(err) {
            console.error('Error sending message!!');
            console.error(err);
            res.send({
                responseMSG: 'error',
                message: 'Error sending message ' + err.message
            });
        });
});
app.get('/', (req, res) => {
    res.send({ server: 'running' });
});

// Heroku passes us runetime configurations
const PORT = process.env.PORT || 5000;
app.listen(PORT);
console.log('Listening...');
