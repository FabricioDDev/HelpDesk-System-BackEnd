const express = require('express');

const router = require('./routes');
const db = require('./config/database');
const { port } = require('./config');

const app = express();


app.use(express.json());

app.use(`/api`, router)


async function startDatabase() {
    try {
        await db.authenticate()
        await db.sync();
        console.log('database connection ready')
    } catch (error) {
        throw new Error(error)
    }
};

startDatabase();

app.listen(port, ()=> {
    console.log(`App running on port: ${port}`);
});