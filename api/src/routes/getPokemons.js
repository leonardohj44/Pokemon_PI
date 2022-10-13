const { Router } = require('express'); 
const { getPokemonsById, getTotalPokemons } = require('../utils/index');
const router = Router();

router.get("/", async (req, res) => {
    const {name} = req.query;
    const totalPokemons= await getTotalPokemons();
    try {
        if(name){
            let pokemonMatches = await totalPokemons.filter(e => e.name.toLowerCase()===name.toLowerCase());
            if(pokemonMatches.length > 0) res.status(201).json(pokemonMatches);
            else res.status(404).json([{error: 'The pokemon name does not exist'}]);
        }
        else {
            return res.status(201).json(totalPokemons);
        }
    } catch (error) {
        res.status(404).send("Error while requesting pokemons")
    }
})

router.get("/:id", async (req, res) => {
    const {id} = req.params;
    const fullPokemons = await getTotalPokemons();
    try {
        if(id){
            if(!isNaN(id)){
                let pokeDetails = await getPokemonsById(id);
                res.status(201).json(pokeDetails);
            }
            else{
                let pokeDetails = fullPokemons.filter(e => e.id === id);
                if(pokeDetails.length > 0) res.status(201).json(pokeDetails[0]);
                else res.status(201).send("Pokemon ID not found")
            }
        }
    } catch (error) {
        res.status(404).send(`Pokemon with ID ${id} does not exist`);
    }
})

module.exports = router;