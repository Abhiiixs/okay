const express = require("express");
const path = require("path");
const { listenerCount } = require("process");
const app = express();
const bodyparser = require("body-parser");
const mongoose = require("mongoose");

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://localhost:27017/contact');
}

const port = 80;


// define mongoose schema 


const contactschema = new mongoose.Schema({
    name: String,
    phone: Number,
    email: String,
    address: String,
    desc: String

})

const contact = mongoose.model('contact', contactschema);

app.use(express.static('static'))
app.use('/static', express.static('static'))
app.use(express.urlencoded())


app.set('views engine ', 'pug')
app.set('views', path.join(__dirname, 'views'))


app.get('/', (req, res) => {
    const params = {}
    res.status(200).render('index.pug', params);
})
app.get('/contact', (req, res) => {
    const params = {}
    res.status(200).render('contact.pug', params);
})
app.post('/contact', (req, res) => {
    var myData = new contact(req.body);
    myData.save().then(() => {
            res.send("This items has been save on database ")
        }).catch(() => {
            res.status(400).send("items was not save to database ")
        })
        // res.status(200).render('contact.pug' );
})


app.listen(port, () => {
    console.log(`The application started successfully on port ${port}`);
})