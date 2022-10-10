const { Router } = require('express');
const router = Router();

//const {T_type} = require('../db');

// router.get("/", async (req, res) => {
//     try {
//         const pokemonTypesDB = await T_type.findAll(); 
//         res.status(201).json(pokemonTypesDB);
//     } catch (error) {
//         res.status(404).send("ERROR EN RUTA GET A /types")
//     }
// })

const { getAllTypes } = require('../utils/index.js');

router.get("/", async (req, res) => {
    try {
      let pokemonTypesDB = await getAllTypes();
      //console.log(pokemonTypesDB.map(p => p.toJSON()))
      res.status(200).send(pokemonTypesDB);
    } catch (error) {
      //res.status(404).send("ERROR EN RUTA GET A /types")
      console.log("ERROR EN RUTA GET A /types", error);
    }
  });

module.exports = router;