const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const pg = require('pg');
const ownerRouter = require('./routes/owners.router');
const dashboardRouter = require('./routes/dashboard.router');
const PORT = process.env.PORT || 5000;

const pool = require('./modules/pool');

app.use(bodyParser.json());
app.use(express.static('server/public'));

app.use('/owners', ownerRouter);
app.use('/dashboard', dashboardRouter);

app.listen(PORT, () =>{
    console.log('listening on port,', PORT);
})