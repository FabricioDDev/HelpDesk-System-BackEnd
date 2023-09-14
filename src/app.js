const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const router = require('./routes');
const db = require('./config/database');
const { port } = require('./config');

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('dev'));

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