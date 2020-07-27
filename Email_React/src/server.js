const express = require('express');
const faker = require('faker');
const cors = require('cors');
const bodyParser = require('body-parser')
const app = express()
const minDelay = 1000;
const maxDelay = 3000;

let inboxEmails = Array.from(Array(100), (_, i) => i + 1).map(n => ({
    from: faker.internet.email(),
    to: 'me',
    subject: `subject ${n}`,
    message: `message ${n}`,
    isDelete: 0
}));

let sentEmails = [1, 2, 3, 4, 5].map(n => ({
    from: 'me',
    to: faker.internet.email(),
    subject: `subject ${n}`,
    message: `message ${n}`,
    isDelete: 0
}));

let trashEmails = [];

app.use(cors());

app.use(bodyParser.json());

sendWithRandomDelay = (res, data) =>
    setTimeout(() => res.send(data), minDelay + Math.floor(Math.random() * (maxDelay - minDelay)));

app.get('/api/inbox', (req, res) => {
    sendWithRandomDelay(res, inboxEmails);
})

app.get('/api/sent', (req, res) => {
    sendWithRandomDelay(res, sentEmails);
})

app.get('/api/trash', (req, res) => {
    sendWithRandomDelay(res, trashEmails);
})

app.post('/api/login', (req, res) => {
    if (req.body.username === 'ivp' && req.body.password === 'ivp') {
        sendWithRandomDelay(res, {
            'status': 'success',
            'user': 'ivp',
            'email': 'ivp@ivp.com'
        });
    } else sendWithRandomDelay(res, {
        'status': 'failure'
    });
});

app.post('/api/send', (req, res) => {
    sentEmails = [({
        from: 'me',
        to: req.body.To,
        subject: req.body.Subject,
        message: req.body.Message,
        isDelete: 0
    }), ...sentEmails];
    sendWithRandomDelay(res, {
        'status': 'success'
    });
});

app.post('/api/update', (req, res) => {
    //console.log(req.tab);
    if (req.body.tab === 'inbox') {
        trashEmails = inboxEmails.filter((email, idx) => req.body.statusEmails[idx] === 1).concat(trashEmails);
        inboxEmails = inboxEmails.filter((email, idx) => req.body.statusEmails[idx] === 0);
        res.send(inboxEmails);
    }
    else if (req.body.tab === 'sent') {
        trashEmails = sentEmails.filter((email, idx) => req.body.statusEmails[idx] === 1).concat(trashEmails);
        sentEmails = sentEmails.filter((email, idx) => req.body.statusEmails[idx] === 0);
        res.send(sentEmails);
    }
    else {
        trashEmails = trashEmails.filter((email, idx) => req.body.statusEmails[idx] === 0);
        res.send(trashEmails);
    }
});
app.listen(3005)