// require('dotenv').config()
// const express = require('express');
// const app = express();
// const port = 3000;

// //json web token
// const jwt = require('jsonwebtoken');

// app.use(express.json())
// const posts = [
//     {
//         username: 'Kabirul',
//         title:'Post 1'
//     },
//     {
//         username: 'Hossain',
//         title: 'Post 2'
//     }
// ]
// //Youtube link: 
// app.get('/', (req, res)=>{
//     res.send("JWT");
// })

// app.get('/posts', authenticateToken, (req, res)=>{
//     res.json(posts.filter(post => post.username === req.user.name))
// })

// app.post('/login', (req, res)=>{
//     //Authenticate user
//     const username = req.body.username;
//     const user = {name: username};
//     const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
//     console.log(process.env.ACCESS_TOKEN_SECRET);
//     res.json({accessToken: accessToken})
    
// })

// function authenticateToken(req, res, next){
//     const authHeader = req.headers['authorization']
//     const token = authHeader && authHeader.split('')[1]
//     if(token == null) return res.sendStatus(401)

//     jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user)=>{
//         if(err){
//             req.user = user
//             next()
//         }
//     })
//     }

// app.listen(port, ()=>{
//    console.log(`Server on running http://localhost:${port}`);
// })

require('dotenv').config();  // 🔹 Load environment variables from .env file

const express = require('express'); // 🔹 Express web framework
const jwt = require('jsonwebtoken'); // 🔹 JSON Web Token library
const app = express();
app.use(express.json());  // 🔹 Middleware to parse JSON body

const PORT = 3000;

// ✅ Dummy user (usually comes from database)
const user = {
    id: 1,
    username: 'kabirul',
    email: 'kabirul@example.com'
};

// 🔐 Route: Login — returns JWT
app.post('/login', (req, res) => {
    // 🔹 In real case, you'd verify username & password here
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30m' });
    res.json({ accessToken });
});

// 🔒 Middleware: Verify JWT
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']; // 🔹 Format: Bearer TOKEN
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).json({ message: 'Token required' });

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: 'Invalid or expired token' });
        req.user = user; // 🔹 Attach user info to request
        next(); // 🔹 Go to next route
    });
}

// ✅ Protected Route
app.get('/dashboard', authenticateToken, (req, res) => {
    res.json({
        message: 'Welcome to your dashboard!',
        user: req.user // 🔹 Send back decoded user info
    });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
