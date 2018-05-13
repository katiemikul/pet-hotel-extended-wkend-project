const router = require('express').Router();
const pool = require('../modules/pool');

//GET request for pets table on database
router.get('/', (req, res) => {
    pool.query(`SELECT "owner_name", "pets"."id", "pet_name", "breed", "color", "check_in", "phone_num" FROM "owners"
    FULL OUTER JOIN "pets" ON "owners"."id" = "pets"."owner_id";`)
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
    pool.query(`INSERT INTO "pets" ("pet_name", "breed", "color", "check_in", "owner_id")
    VALUES ($1, $2, $3, $4, $5);`, [pet.pet_name, pet.breed, pet.color, pet.check_in, pet.owner_id])
    .then((results) => {
        res.sendStatus(200);
    })
    .catch((error) => {
        console.log('error with POST /dashboard', error);
    });
})

// DELETE pets
router.delete('/:id', (req, res) => {
    console.log(req.params); 
    const pets_id = req.params.id;
    pool.query('DELETE FROM "pets" WHERE "id" = $1;', [pets_id])
    .then((result) => {
        res.sendStatus(200);
    }).catch((error) => {
        console.log('Error making query', error);
        res.sendStatus(500);
    });
});

module.exports=router;