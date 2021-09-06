const express = require('express');
const paypal = require('paypal-rest-sdk');
const { Client, Intents } = require('discord.js');
const items = require('./items.json');
const onSuccess = require('./functions/onSuccess');
const db = require('quick.db');
require('dotenv').config();
const host = 'https://discord-pay-demo.herokuapp.com'; // Change this either into 'http://localhost:2000' or your hosting domain

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
const app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));

paypal.configure({
    mode: 'sandbox', // change to 'live' when in production
    client_id: process.env.PAYPAL_ID,
    client_secret: process.env.PAYPAL_SECRET
})
client.on('ready', () => {
    console.log("\x1b[32m" + "Successfully connected to Discord" + "\x1b[37m");
})

app.get('/', (req, res) => {
    // Render store form
    res.render('index.ejs', {client, items});
})

app.get('/failed', (req, res) => {
    res.render('fallback.ejs');
})

app.get('/success', (req, res) => {
    if(db.get(`successful_payment.${req.query.paymentId}`) && db.get(`successful_payment.${req.query.paymentId}`) === true) return;
    db.set(`successful_payment.${req.query.paymentId}`, true);
    paypal.payment.execute(req.query.paymentId, {
        payer_id: req.query.PayerID,
        transactions: [
            {
                amount: {
                    currency: 'USD',
                    total: items.find(it => it.name === req.query.item).price
                }
            }
        ]
    }, (err, payment) => {
        if(err) {
            // Do something when transaction failed
            return;
            // res.render('fallback.ejs');
        }
        res.render('success', {client})
        return onSuccess(client, {user_id: req.query.user_id, item: req.query.item});
    })
})

app.post('/checkout', (req, res) => {
    const payload = {
        intent: 'sale',
        payer: {
            payment_method: 'paypal'
        },
        redirect_urls: {
            return_url: `${host}/success?user_id=${req.query.user_id}&item=${req.query.item}`,
            cancel_url: `${host}/failed`
        },
        transactions: [
            {
                items_list: {
                    items
                },
                amount: {
                    currency: 'USD',
                    total: items.find(it => it.name === req.query.item).price
                },
                description: 'Example is an example'
            }
        ]
    };

    paypal.payment.create(payload, (error, payment) => {
        if(error) throw error;
        else {
            const redirect = payment.links.find(u => u.rel === 'approval_url');
            return res.json({
                message: "Success",
                redirect: redirect.href
            })
        }
    })
})

client.login(process.env.TOKEN);
app.listen(process.env.PORT || 2000, () => {
    console.log("\x1b[32m" + "Server is now listening to payments!" + "\x1b[37m");
})
