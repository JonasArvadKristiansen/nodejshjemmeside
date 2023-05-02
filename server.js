const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

// set the view engine to ejs
app.set('view engine', 'ejs')

// use res.render to load up an ejs view file

app.get('/', (req, res) => {
    res.render('index')
});

app.get('/about', (req, res) => {
    res.render('about')
});

app.get('/login', (req, res) => {
    res.render('login')
});

app.get('/createuser', (req, res) => {
    res.render('createuser')
});

app.post('/login', (req, res) => {
    console.log(req.body);

    res.render('index')
});

app.post('/create', (req, res) => {
    console.log(req.body);

    res.render('index')
});

app.listen(3000, () => {
   
   console.log("app is running on port 3000")
});
