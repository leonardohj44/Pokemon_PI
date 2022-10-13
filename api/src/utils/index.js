const axios = require('axios');
const { Pokemon, Types } = require('../db.js');

const getAllTypes = async () => {
    try {
        const typeAPI = await axios.get("https://pokeapi.co/api/v2/type");  // trae type de la API
        const types = typeAPI.data.results.map(type =>type.name);
        types.forEach(type => {   // recorro cada type
          Types.findOrCreate({     // si no existe, lo creo
            where: {name: type}
          })
        });
        let typeDB = await Types.findAll();  // trae type of DB
        return typeDB;

    } catch (error) {
        console.log(error);
    }
  }

const getFromAPI = async () => {
  try {
      const pokemonsAPI = await axios.get("https://pokeapi.co/api/v2/pokemon?offset=40&limit=10");   // No se por qué se redujo de 40 a 24 cards como max. Estoy castigado
      const subreq = pokemonsAPI.data.results.map(async e => await axios.get(e.url))
      const result = await Promise.all(subreq); // ---> [{},{},{}]
      const pokemons = result.map( e => {
          return {
              id: e.data.id,
              name: e.data.name,              
              life: e.data.stats[0].base_stat,
              attack: e.data.stats[1].base_stat,
              defense: e.data.stats[2].base_stat,
              speed: e.data.stats[5].base_stat,
              height: e.data.height,
              weight: e.data.weight,
              types: e.data.types.map(t => t.type.name),
              image: e.data.sprites.other.dream_world.front_default,
              isDefault: e.data.is_default
          }
      })
      return await pokemons; 
  } catch (error) {
      console.log(error);
  }
}

const getFromDB = async () => {
  try {
      let infoDB = await Pokemon.findAll({
          include:{
              model: Types,
              attributes: ['name'],
              through: {attributes: []}
          }
      })
      // infoDB is an merged array between Pokemon and Types
      let pokemonsDB = await infoDB?.map(e => {
          return {
              id: e.id,
              name: e.name,
              life: e.life,
              attack: e.attack,
              defense: e.defense,
              speed: e.speed,
              height: e.height,
              weight: e.weight,
              types: e.types?.map(type => type.name),
              image: e.image,
              isDefault: e.is_default
          }
      })
      
      return pokemonsDB;
  } catch (error) {
      console.log(error);
  }
}

const getPokemonsById = async (id) => {
  const pokeID = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}/`);
  const pokemonID = {
      id: pokeID.data.id,
      name: pokeID.data.name,
      life: pokeID.data.stats[0].base_stat,
      attack: pokeID.data.stats[1].base_stat,
      defense: pokeID.data.stats[2].base_stat,
      speed: pokeID.data.stats[5].base_stat,
      height: pokeID.data.height,
      weight: pokeID.data.weight,
      types: pokeID.data.types.map(t => t.type.name),
      image: pokeID.data.sprites.other.dream_world.front_default,
      isDefault: pokeID.data.is_default
  }
  return pokemonID;
}

const getTotalPokemons = async () => {
  try {
      const dataAPI = await getFromAPI();
      const dataDB = await getFromDB();
      const totalDB = dataDB.concat(dataAPI);
      return totalDB
  } catch (error) {
      console.log(error);
  }
}

const postPokemon = async (pokeDataForm) => {
  try {
      const {name, image, life, attack, defense, speed, height, weight, types} = pokeDataForm;   //types ---> ["type1", "type2",....]
      const newPokemonCreated = await Pokemon.create({              // newPokemonCreated --> it is an object
          name,
          life,
          attack,
          defense,
          speed,
          height,
          weight,
          image
      })
      types.forEach(e => {Types.findOrCreate({where: {name: e}})})
      let typesAddedToNewPokemon = await Types.findAll({where: {name: types}}); //--> []
      
      let addedTypes = await  newPokemonCreated.addTypes(typesAddedToNewPokemon)
      return addedTypes;
  } catch (error) {
      console.log(error)
  }
}

module.exports = {
    getAllTypes,
    getFromAPI,
    getFromDB,
    getPokemonsById,
    getTotalPokemons,
    postPokemon
  }