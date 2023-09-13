const express = require('express')
const router = require('./routes')
const db = require('./config/database')
const app = express()
const port = process.env.PORT || 3000;

async function startDatabase() {
    try {
        await db.authenticate()
        await db.sync();
        console.log('database connection ready')
    } catch (error) {
        throw new Error(error)
    }
}

startDatabase()

app.use(express.json())

app.use('/', router)


app.listen(port, ()=> {
    console.log(`App running on port: ${port}`)
})