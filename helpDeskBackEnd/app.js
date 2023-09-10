const express = require('express');
const app = express();
const session = require('express-session');
//const methodOverride = require('method-override');
const userRoutes = require('./routes/userRoutes')
const db = require('./database/models')


app.use(session({
    secret: 'Mi string secreto',
    expires: new Date(Date.now() + (30 * 60000 * 60 * 1000))
}))
//app.use(methodOverride('_method'));
//app.use(express.urlencoded({ extended: false }));
app.use(express.json())
app.use(userRoutes)



app.get('/', (req, res) => {
    db.Users.findAll()
        .then((usuarios) => {
            return res.send(usuarios)
        })

})


app.listen(3015, () => {
    console.log('Corriendo en puerto 3015')
})