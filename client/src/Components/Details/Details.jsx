import React, { useEffect} from 'react';
import styles  from './Details.module.css';
import {useDispatch, useSelector} from 'react-redux';
import { getPokemonDetails, clearDetails } from '../../Redux/Actions';
import { useParams } from 'react-router-dom';
import { Loading } from '../Loading/Loading';
import { NavBar } from '../NavBar/NavBar';

export function Details() {

    const {id} = useParams();
    const dispatch = useDispatch();
    const pokemonDetail = useSelector(state => state.details);
    
    useEffect(() => {
        dispatch(getPokemonDetails(id));
        return () => {
            dispatch(clearDetails());
        }
    }, [dispatch, id]);


    return (
        <>
        <div className={styles.nav}>
            <NavBar/>
        </div>
        <div className={styles.cont}>
            { pokemonDetail.length > 0 ?
                (pokemonDetail.map(p => (
                    <div key={p.id} className={styles.dex}>
                        <div className={styles.pic}>
                            <img src={p.image} alt={p.name} 
                                width={365} height={370}
                                onError={e => {
                                    e.target.onerror = null;
                                    e.target.src = "../Images/nose.jpg";
                                }}
                            />
                        </div>
                        <div className={styles.desc}>
                            <div className={styles.title}>
                                <h3>{p.name.toUpperCase()}</h3>
                                <p><strong>Types:</strong> {p.types.map(el => el[0].toUpperCase()+el.substring(1)).join(", ")}</p>
                            </div>
                            <div className={styles.grid}>
                                <p><strong>Id:</strong> {p.id}</p>
                                <p></p>
                                <p><strong>Life:</strong> {p.life}</p>
                                <p><strong>Attack:</strong> {p.attack}</p>
                                <p><strong>Defense:</strong> {p.defense}</p>
                                <p><strong>Speed:</strong> {p.defense}</p>
                                <p><strong>Weight:</strong> {p.weight}</p>
                                <p><strong>Height:</strong> {p.height}</p>
                                
                            </div>
                            
                        </div>
                    </div>
                )
                )): <Loading/>}
        </div>
        </>
    )
}
