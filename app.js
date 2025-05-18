const express = require('express');
const app = express();
const port = 3000;

//json web token
const jwt = require('jsonwebtoken')
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

app.listen(port, ()=>{
    console.log(`Server on running http://localhost:${port}`);
})