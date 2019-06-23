const express = require('express');
const app = express();

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.static('assets'));

app.use((req, res, next) => {
    console.log('Hej, jestem pośrednikiem między żądaniem a odpowiedzią!');
    next();
});

app.get('/', (req,res) => {
    console.log('Otrzymałem żądanie GET');
    res.sendFile('/index.html');
});

app.get('/auth/google', (req, res) => {
    const response = {
        first_name: req.query.first_name,
        last_name: req.query.last_name
    };
    res.render('logged-in');
});

const server = app.listen(3000, 'localhost', () => {
    const host = server.address().address;
    const port = server.address().port;

    console.log(`Przykładowa aplikacja nasłuchuje na http://${host}:${port}`);
});
app.use(function (req, res, next) {
    res.status(404).send('Wybacz, nie mogliśmy odnaleźć tego, czego żądasz!')
});