const express = require('express')
const session = require('express-session');
const router = require('./routes')
const apiRouter = require('./routes/apiRouter')
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
app.use(session({
    secret: 'Mi string secreto',
    expires: new Date(Date.now() + (30 * 60000 * 60 * 1000))
}))
app.use('/', router)
app.use(apiRouter)


app.listen(port, () => {
    console.log(`App running on port: ${port}`)
})