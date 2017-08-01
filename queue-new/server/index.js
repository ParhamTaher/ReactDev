const express = require('express');
const keys = require('./config/keys');
var bodyParser = require('body-parser');

var accountSid = keys.sIDTest;
var authToken = keys.AuthTokenTest;

var client = require('twilio')(accountSid, authToken);

console.log(keys.sID);

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/twilio/sendsms', function(req, res) {
    client.messages.create(
        {
            body: 'All in the game, yo',
            to: req.body.cNumber,
            from: keys.testNumber
        },
        function(err, sms) {
            if (err) {
                console.log(err);
                res.send({
                    message: 'There was an issue sending the text: ' + err
                });
            } else {
                res.send({ message: 'it worked, sms sent: ' + sms.sid });
                console.log('it worked:', sms.sid);
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
