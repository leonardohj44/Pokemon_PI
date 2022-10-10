const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const typesRouter = require('./getTypes');
const pokemonsRouter = require('./getPokemons');
const postRouter = require('./postPokemon');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/types', typesRouter);
router.use('/pokemons', pokemonsRouter);
router.use('/pokemon', postRouter);
module.exports = router;
