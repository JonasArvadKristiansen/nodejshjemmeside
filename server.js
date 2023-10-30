const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const users = require('./routes/users.routes');
const about = require('./routes/about.routes');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(users);
app.use(about);

// Define a static directory where your static files are located (CSS, JS, images).
app.use(express.static('public'));

// set the view engine to ejs
app.set('view engine', 'ejs');

// use res.render to load up an ejs view file
app.get('/', (req, res) => {
    res.render('index');
});

app.listen(3000, () => {
    console.log('app is running on port 3000');
});
