const express = require('express');
const keys = require('./config/keys');
var bodyParser = require('body-parser');

var accountSid = keys.sIDTest;
var authToken = keys.AuthTokenTest;

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
            from: keys.testNumber
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

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));

    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

// Heroku passes us runetime configurations
const PORT = process.env.PORT || 5000;
app.listen(PORT);
console.log('Listening...');
