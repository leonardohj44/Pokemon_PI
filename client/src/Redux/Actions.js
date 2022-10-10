import axios from 'axios';
export const GET_ALL_POKEMONS = "GET_ALL_POKEMONS"; // 40 pokemons
export const GET_POKEMON_DETAILS = "GET_POKEMON_DETAILS"; 
export const GET_POKEMON_NAME = "GET_POKEMON_NAME"; 
export const CLEAR_DETAILS = "CLEAR_DETAILS"; 
export const GET_TYPES = "GET_TYPES"; 
export const MSG_ERROR = "MSG_ERROR"; 
export const CLEAR_POKEMONS = "CLEAR_POKEMONS";
export const POST_POKEMON = "POST_POKEMON";
export const ORDER_ALPHABET = "ORDER_ALPHABET";
export const FILTER_ATTACK = "FILTER_ATTACK";
export const FILTER_TYPE = "FILTER_TYPE";
export const FILTER_CREATED = "FILTER_CREATED";
export const FILTER_TYPES = "FILTER_TYPES";
export const CLEAR_FILTERS = "CLEAR_FILTERS";


const msgErr = {
    type: MSG_ERROR,
    payload: ["ERROR 404 - POKEMON NOT FOUND"]
}

export const getAllPokemons = () => {
    return async function(dispatch){
        try {
            const response = await axios.get("/pokemons");
            const pokemons = response.data; // ---> [{}. {},...]
            return dispatch({
                type: GET_ALL_POKEMONS,
                payload: pokemons
            })
        } catch (error) {
            console.log(error);
        }
    }
}

export const getPokemonDetails = (id) => {
    return async function(dispatch){
        try {
            const response = await axios.get(`/pokemons/${id}`)
            const pokemon = response.data; // --> {}
            return dispatch({
                type: GET_POKEMON_DETAILS,
                payload: pokemon
            })
        } catch (error) {
            console.log(error);
        }
    }
}

export const clearDetails = () => {
    return {
        type: CLEAR_DETAILS,
        payload: []
    }
}

export const getPokemonByName = (name) => {
    return async function(dispatch){
        try {
            if(name){
                const responseName = await axios.get(`/pokemons?name=${name}`);
                const pokemonFound = responseName.data; // --> [{}, {}]
                    return dispatch({
                        type: GET_POKEMON_NAME,
                        payload: pokemonFound
                    })
            }
        } catch (error) {
            return dispatch(msgErr)
        }
        }
    }


export const getTypes = () => {
    return async function(dispatch){
        try {
            const resTypes = await axios.get("/types");
            const types = resTypes.data;
            return dispatch({
                type: GET_TYPES,
                payload: types
            })
        } catch (error) {
            console.log(error);
        }
    }
}


export const clearPokemons = () => {
    return {
        type: CLEAR_POKEMONS,
        payload: []
    }
}

export const postPokemon = (formData) => {
    return async function(dispatch){
        await axios.post('/pokemon', formData);
        return dispatch({type: POST_POKEMON})
    }
}

//Filters
export const orderAlphabetically = (order) => {
    return {
        type: ORDER_ALPHABET,
        payload: order
    }
}

export const filterByTypes = (types) => {
    return {
        type: FILTER_TYPES,
        payload: types
    }
}

export const filterCreate = (origin) => {
    return {
        type: FILTER_CREATED,
        payload: origin
    }
}

export const filterByAttack = (attack) => {
    return {
        type: FILTER_ATTACK,
        payload: attack
    }
}

export const clearFilters = (allPokes) => {
    return {
        type: CLEAR_FILTERS,
        payload: allPokes
    }
}