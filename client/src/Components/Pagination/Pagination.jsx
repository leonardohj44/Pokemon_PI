import styles from './Pagination.module.css'
import { GrPrevious, GrNext } from 'react-icons/gr';

export function Pagination({fullPokemons, pokemonsPerPage, page, changePage}) {

    const numberOfPages = Math.ceil(fullPokemons.length/pokemonsPerPage);
    const buttons = [];
    for (let i = 0; i < numberOfPages; i++) buttons.push(i);
    
    return (
        <div className={styles.cont}>
            <button 
            className={page === 1 ? styles.bOff : styles.bOn } 
            onClick = {() => changePage(page - 1)}
            disabled={page === 1 ? true:false}
            > <GrPrevious/></button>
            {buttons.map(e => (
                <button
                key={e}
                className={page === e+1 ? styles.currentPageButton : styles.buttonPage}
                onClick={() => changePage(e+1)}
                >{e+1}</button>
                ))}
             <button 
            className={page === buttons.length - 1 ? styles.bOff : styles.bOn } 
            onClick = {() => changePage(page + 1)}
            disabled={page === buttons.length ? true:false}
            > <GrNext/></button>
        </div>
    )
}
