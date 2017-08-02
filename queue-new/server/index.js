const express = require('express');
const keys = require('./config/keys');
var bodyParser = require('body-parser');

var accountSid = keys.sID;
var authToken = keys.AuthToken;

var client = require('twilio')(accountSid, authToken);

console.log(keys.sID);

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/twilio/sendsms', function(req, res) {
    client.messages.create(
        {
            body:
                'Hey there, this is a message from ' +
                req.body.businessName +
                '. You are next in line! You will be serviced in approximately ' +
                req.body.avgWaitTime +
                '.',
            to: req.body.upNext.cNumber,
            from: keys.myNumber
        },
        function(err, sms) {
            if (err) {
                console.log(err);
                res.send({
                    responseMSG: 'error',
                    message: 'There was an issue sending the text: ' + err
                });
            } else {
                console.log('it worked:', sms.sid, req.body.upNext.cName);
                res.send({
                    responseMSG: 'success',
                    message: 'it worked, sms sent: ' + sms.sid
                });
            }
        }
    );
});
app.get('/', (req, res) => {
    res.send({ server: 'running' });
});

// Heroku passes us runetime configurations
const PORT = process.env.PORT || 5000;
app.listen(PORT);
console.log('Listening...');
