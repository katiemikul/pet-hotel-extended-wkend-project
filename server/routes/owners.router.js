const router = require('express').Router();
const pool = require('../modules/pool');

// GET request for owners table on database
router.get('/', (req, res) => {
    pool.query(`SELECT * FROM "owners"`)
    .then((results) => {
        res.send(results.rows)
        console.log(results)
    })
    .catch((error) => {
        console.log('error with GET to /owners', error);
    });
})

//POST request from owner.html/client.js and posts to database
router.post('/', (req, res) => {
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

module.exports=router;