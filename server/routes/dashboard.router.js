const router = require('express').Router();
const pool = require('../modules/pool');

//GET request for pets table on database
router.get('/', (req, res) => {
    pool.query(`SELECT * FROM "pets"`)
    .then((results) => {
        res.send(results.rows)
        console.log(results)
    })
    .catch((error) => {
        console.log('error with GET to /pets', error);
    });
})

//POST request from dashboard.html/client.js and posts to database
router.post('/', (req, res) => {
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

module.exports=router;