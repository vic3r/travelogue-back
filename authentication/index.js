const express = require('express');
const mongoose = require('mongoose');

const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');
const joi = require('@hapi/joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const key = require('./jwtRS256.key');

const app = express();

// MIDDLEWARES
app.use(bodyParser.json());
app.use(cors());


// DATA BASE
mongoose.connect('mongodb://localhost:27017/webpage', {useUnifiedTopology: true, useNewUrlParser: true}, 
() => console.log('connected to DB'));


// VALIDATION AND SCHEMA
const PostSchema = mongoose.Schema({
    firstName: joi.string().required(),
    lastName: joi.string().required(),
    age: joi.number().required(),
    email: joi.string().required(),
    password: joi.string().required()
});

const model = mongoose.model('user', PostSchema);

// VALIDATE TOKENS
function auth (req,res,next) {
    const token = req.header('auth-token');
    if(!token) return res.status(401).send('Access Denied');

    try{
        const verified = jwt.verify(token, key);
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).send('Invalid Token');
    }
}

// ROUTES
app.get('/', (req, res) => {
    res.end('Hello World!');
});

app.get('/books', (req, res) => {
    res.json({
        'Books': [
            'pfokfd',
            'lcmcx',
            'ldldlfd',
            'jjjjj'
        ]
    });
});

app.get('/food', (req, res) => {
    res.json({
        'today': ['sdnnsd', 
                    'fsdf',
                    'fdssdf'
                ],
        'yesterday': ['bbhbc',
                    'sssa',
                    'ffdsd',
                    'eedsds'
                ]
    });
});

app.get('/drinks', (req, res) => {
    res.json({
        'drinks': [
            'adsadsa',
            'efefe',
            'sbsad',
            'savcvn'
        ]
    });
});

app.get('/photos', (req, res) => {
    const { id } = req.query;
    return axios.get(`https://api.unsplash.com/search/photos?query=${id}&client_id=gcaXVPV0ytT7fbMHWkx5htzMGUiQvmmVoLX9ieuLYqk`)
        .then(({ data }) => res.send(data))
        .catch(error => res.send(error));
});


// GET A POST
app.get('/user', async (req, res) => {
     try{   
        const posts = await model.find();
        res.json(posts);
     } catch (err) {
         res.json({ message: err });
     }
});

// CREATE A POST
app.post('/user', async (req, res) => {

    // CHECKING EMAIL
    const emailExist = await model.findOne({ email: req.body.email });
    if (emailExist) {
        return res.status(400).send('Email already exists');
    }

    const {
        firstName,
        lastName,
        age,
        email,
        password } = req.body;
    // HASH PASSWORD
    const salt = await bcrypt.genSalt(10);
    const hashpass = await bcrypt.hash(password, salt);

    const post = new model({
        firstName,
        lastName,
        age,
        email,
        password: hashpass
    });
    try {
        const savedpost = await post.save();
        res.send(savedpost);
    } catch(err) {
        res.status(400).send(err);
    }
});

// FIND OR READ A POST
app.get('/user/:postId', async (req, res) => {
    try{
        const post = await model.findById(req.params.postId);
        res.json(post);
    } catch (err) {
        res.json({ message: err });
    }
});

//UPDATE A POST
app.patch('/user/:postId', async (req, res) => {
    try{
        const update = await model.updateOne(
            { _id: req.params.postId },
            { $set: { FirstName: req.body.FirstName }
        });
        res.json(update);
    } catch (err) {
        res.json({ message: err });
    }
})

// DELETE A POST
app.delete('/user/:postId', async (req, res) => {
    try{
        const remove =  await model.remove({ _id: req.params.postId });
        res.json(remove);
    } catch (err) {
        res.json({ massage: err});
    }
});

// LOGIN
app.post('/login', auth, async (req, res) => {

    // CHECKING EMAIL
    const user = await model.findOne({ email: req.body.email });
    if(!user) return res.status(400).send('Email is not found');

    // COMPARE PASSWORDS
    const validpass = await bcrypt.compare(req.body.password, user.password);
    if(!validpass) return res.status(400).send('Password is wrong');

    // CREATE AND ASSIGN A TOKEN
    const token = jwt.sign({ _id: user._id }, key);
    res.header('auth-token', token).send(token);
});

// SERVER
console.log(`localhost:8080`);

app.listen(8080);