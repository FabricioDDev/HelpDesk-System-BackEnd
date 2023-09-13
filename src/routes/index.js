const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const userRouter = require("./userRouter");
const rolRouter = require('./roleRouter');
const accountStateRouter = require('./accountStateRouter');
const loginFailRouter = require('./loginFailRouter');



const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/users", userRouter)
router.use("/roles", rolRouter)
router.use("/accountStates", accountStateRouter)
router.use("/loginFails", loginFailRouter)

module.exports = router;
