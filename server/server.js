const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const pg = require('pg');
const PORT = process.env.PORT || 5000;

const Pool = pg.Pool;
const pool = require('/modules/pool');

app.use(bodyParser.json());
app.use(express.static('server/public'));

app.listen(PORT, () =>{
    console.log('listening on port,', PORT);
})