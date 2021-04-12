const express = require('express');
const router = require('./router.js');
const db = require('./db');
const app = express();
const port = 3000;
const cors = require('cors');
require('crypto').randomBytes(48).toString('hex')
//Midelwares
app.use(cors());
app.use(express.json());
app.use(router);

db.then(() => {
    app.listen(port, () => {
    })
}).catch(console.log);