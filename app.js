require('dotenv').config()
const express = require('express');
const app = express();
const port = 3000;

//json web token
const jwt = require('jsonwebtoken');

app.use(express.json())
const posts = [
    {
        username: 'Kabirul',
        title:'Post 1'
    },
    {
        username: 'Hossain',
        title: 'Post 2'
    }
]
//Youtube link: 
app.get('/', (req, res)=>{
    res.send("JWT");
})

app.get('/posts', (req, res)=>{
    res.json(posts)
})

app.post('/login', (req, res)=>{
    //Authenticate user
    const username = req.body.username;
    const user = {name: username};
    jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
    console.log(process.env.ACCESS_TOKEN_SECRET);
})

app.listen(port, ()=>{
    console.log(`Server on running http://localhost:${port}`);
})