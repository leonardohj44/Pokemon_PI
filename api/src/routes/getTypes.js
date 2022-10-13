const { Router } = require('express');
const router = Router();
const { getAllTypes } = require('../utils/index.js');

router.get("/", async (req, res) => {
    try {
      let pokemonTypesDB = await getAllTypes();
      res.status(200).send(pokemonTypesDB);
    } catch (error) {
      console.log("ERROR EN RUTA GET A /types", error);
    }
  });

module.exports = router;