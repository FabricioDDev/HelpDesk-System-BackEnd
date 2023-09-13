const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const userRouter = require("./userRouter");
const rolRouter = require('./rolRouter');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/users", userRouter)
router.use("/roles", rolRouter)

module.exports = router;
