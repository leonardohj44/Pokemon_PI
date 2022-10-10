import {useDispatch, useSelector} from 'react-redux';
import React, {useState} from 'react';
import {  orderAlphabetically, filterByTypes, filterCreate, filterByAttack} from '../../Redux/Actions';
import styles from './Filters.module.css'
import { SearchBar } from '../SearchBar/SearchBar';

export function Filters({fullPokemons}) {
    const dispatch = useDispatch();
    const typesPok = useSelector(state => state.types);
  
    const [filtersState, setfiltersState] = useState({
        alphabeticalOrder: 0,
        typesFilter:0,
        filterCreated: 0,
        filterAttack: 0
    })

    const handleSort = (e) => {
        dispatch(orderAlphabetically(e.target.value))
        setfiltersState({
            ...filtersState,
            alphabeticalOrder: e.target.value,
            filterAttack: 0
        })
    }

    const handleTypeFilter = (e) => {
        dispatch(filterByTypes(e.target.value))
        setfiltersState({
            ...filtersState,
            typesFilter: e.target.value,
            alphabeticalOrder: 0,
            filterCreated: 0,
            filterAttack: 0
        }) 
    }

    const handleCreated = (e) => {
        dispatch(filterCreate(e.target.value))
        setfiltersState({
            ...filtersState,
            filterCreated: e.target.value,
            alphabeticalOrder: 0,
            filterAttack:0,
            typesFilter:0
        })
    }

    const handleAttack = (e) => {
        dispatch(filterByAttack(e.target.value))
        setfiltersState({
            ...filtersState,
            filterAttack: e.target.value,
            orderAlphabetically: 0,
            alphabeticalOrder:0
        })
    }

    return (
        <div className={styles.filtContainer}>
            <div className={styles.search}>
                <SearchBar/>
            </div>

            <div className={styles.filt}>
            <select name="type" id="Type Filter" onChange={handleTypeFilter} value={filtersState.typesFilter}>
                <option value="">Filter by types</option>
                {typesPok.map(e => 
                    (<option  key={e.id} value={e.name}>{e.name}</option>)
                    )}
            </select>
            </div>
            
            <div className={styles.filt}>
            <select name="sort" id="Alphabetical order" value={filtersState.alphabeticalOrder} onChange={handleSort} >
                <option value = "0" disabled>Order ...</option>
                <option value="A">Ascending</option>
                <option value="Z">Descending</option>
            </select>
            </div>
            
            <div className={styles.filt}>
            <select  name="attack" id="Attack Filter" onChange={handleAttack} value={filtersState.filterAttack}>
                <option value="0" disabled>Order by Attack</option>
                <option value="HIGH">High to Low</option>
                <option value="LOW">Low to High</option>
            </select>
            </div>

            <div className={styles.filt}>
            <select  name="created" id="Created Filter" onChange={handleCreated} value={filtersState.filterCreated}>
                <option value="0" disabled>Source database</option>
                <option value="API">Pokemons from API</option>
                <option value="POKEMONS CREATED">Pokemons from Database</option>
                <option value="ALL">Show All</option>
            </select>
            </div>
          
        </div>
    )
}
