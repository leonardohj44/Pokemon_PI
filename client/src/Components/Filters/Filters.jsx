import {useDispatch, useSelector} from 'react-redux';
import React, {useState} from 'react';
import {  orderAlphabetically, filterByTypes, filterCreate, orderByAttack, getAllPokemons, clearPokemons} from '../../Redux/Actions';
import styles from './Filters.module.css'
import { SearchBar } from '../SearchBar/SearchBar';
import banner from "../Images/banner.gif";

export function Filters({backHome}) {
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

    const handleCreated = (e) => {
        dispatch(filterCreate(e.target.value));
        
        setfiltersState({
            ...filtersState,
            filterCreated: e.target.value,
            alphabeticalOrder: 0,
            filterAttack:0,
            typesFilter:0
        })
    }

    const handleAttack = (e) => {
        dispatch(orderByAttack(e.target.value))
        setfiltersState({
            ...filtersState,
            filterAttack: e.target.value,
            orderAlphabetically: 0,
            alphabeticalOrder:0
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

    const clearAllFilters = () => {
        dispatch(clearPokemons())
        dispatch(getAllPokemons())
        setfiltersState({
            ...filtersState,
            alphabeticalOrder: 0,
            typesFilter:0,
            filterCreated: 0,
            filterAttack: 0
        })
    }

    // uncheked radiobutton
    const [checked, setChecked] = useState({A:false, Z:false, HIGH:false, LOW:false});
    const changeRadio = (e) => {
      setChecked(() => {return { A:false, Z:false, HIGH:false, LOW:false, [e.target.value]: true}});
    };

    return (
        <div className={styles.filtContainer}>
            <input type="image" src={banner} width={404} height={60} onClick={clearAllFilters} alt="clear"/>
            <div className={styles.search}>
                <SearchBar />
            </div>

            <div className={styles.filtDB}>
                <select name="created" id="Created Filter" onChange={handleCreated} value={filtersState.filterCreated} onFocus={()=>setChecked(()=>({A:false, Z:false, HIGH:false, LOW:false}))}>
                    <option value="0" disabled>Source database</option>
                    <option value="API">Pokemons from API</option>
                    <option value="POKEMONS CREATED">Pokemons from Database</option>
                    <option value="ALL" >Show All</option>
                </select>
            </div>

            <div className={styles.filtType}>
            <select name="type" id="Type Filter" onChange={handleTypeFilter} value={filtersState.typesFilter} onFocus={()=>setChecked(()=>({A:false, Z:false, HIGH:false, LOW:false}))}>
                <option value="">Filter by types</option>
                {typesPok.map(e => 
                    (<option  key={e.id} value={e.name}>{e.name}</option>)
                    )}
            </select>
            </div>
            
            <div className={styles.filtRadio}>
                <div>
                    <input type="radio" checked={checked.A} value="A" name="sort" onChange={changeRadio} onFocus={handleSort}  id="radio1"/>
                    <label>Order by Alphabetical A-Z</label>
                </div>
                <div>
                    <input type="radio" checked={checked.Z} value="Z" name="sort" onChange={changeRadio} onFocus={handleSort} id="radio1" />
                    <label>Order by Alphabetical Z-A</label>
                </div>       
            </div>
            
            <div className={styles.filtRadio}>
                <div>
                    <input type="radio" checked={checked.HIGH} value="HIGH" name="sort" onChange={changeRadio} onFocus={handleAttack} id="radio2" />
                    <label>Order by Attack High-Low</label>
                </div>
                <div>
                    <input type="radio" checked={checked.LOW} value="LOW" name="sort" onChange={changeRadio} onFocus={handleAttack} id="radio2" />
                    <label>Order by Attack Low-High</label>
                </div>  
            </div>
        </div>
    )
}

