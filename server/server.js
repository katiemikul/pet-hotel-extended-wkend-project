const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const pg = require('pg');
const PORT = process.env.PORT || 5000;

const pool = require('./modules/pool');

app.use(bodyParser.json());
app.use(express.static('server/public'));

// Routes to be moved to folder_______________________________________
// GET request for owners table on database
app.get('/owners', (req, res) => {
    pool.query(`SELECT * FROM "owners"`)
    .then((results) => {
        res.send(results.rows)
        console.log(results)
    })
    .catch((error) => {
        console.log('error with GET to /owners', error);
    });
})

//GET request for pets table on database
app.get('/dashboard', (req, res) => {
    pool.query(`SELECT * FROM "pets"`)
    .then((results) => {
        res.send(results.rows)
        console.log(results)
    })
    .catch((error) => {
        console.log('error with GET to /pets', error);
    });
})

//POST request from owner.html/client.js and posts to database
app.post('/owners', (req, res) => {
    console.log(req.body);
    const owner = req.body;
    pool.query(`INSERT INTO "owners" ("owner_name", "phone_num")
    VALUES ($1, $2);`, [owner.owner_name, owner.phone_num])
    .then((results) => {
        res.sendStatus(200);
    })
    .catch((error) => {
        console.log('error with POST /owners', error);
    });
})

//POST request from dashboard.html/client.js and posts to database
app.post('/dashboard', (req, res) => {
    console.log(req.body);
    const pet = req.body;
    pool.query(`INSERT INTO "pets" ("owner_name", "pet_name", "breed", "color")
    VALUES ($1, $2, $3, $4);`, [pet.owner_name, pet.pet_name, pet.breed, pet.color])
    .then((results) => {
        res.sendStatus(200);
    })
    .catch((error) => {
        console.log('error with POST /dashboard', error);
    });
})

app.listen(PORT, () =>{
    console.log('listening on port,', PORT);
})