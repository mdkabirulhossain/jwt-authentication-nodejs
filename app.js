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

app.get('/posts', authenticateToken, (req, res)=>{
    res.json(posts.filter(post => post.username === req.user.name))
})

app.post('/login', (req, res)=>{
    //Authenticate user
    const username = req.body.username;
    const user = {name: username};
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
    console.log(process.env.ACCESS_TOKEN_SECRET);
    res.json({accessToken: accessToken})
    
})

function authenticateToken(req, res, next){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split('')[1]
    if(token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user)=>{
        if(err){
            req.user = user
            next()
        }
    })
    }

app.listen(port, ()=>{
   console.log(`Server on running http://localhost:${port}`);
})