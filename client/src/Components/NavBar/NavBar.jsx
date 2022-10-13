import {Link} from 'react-router-dom';
import styles from './NavBar.module.css';

export function NavBar({backHome}) {

    return (
        <>
            <div className={styles.fullCont}>
                <div className={styles.header}>
                    <Link to="/">
                        <button className={styles.menu}>INICIO</button>
                    </Link>
                    <p className={styles.titulo}>P&nbsp; O&nbsp; K&nbsp; E&nbsp; M&nbsp; O&nbsp; N&nbsp; S&nbsp;&nbsp;&nbsp; C&nbsp; A&nbsp; R&nbsp; D</p>
                    <nav>
                    <ul className={styles.navContainer}>
                        <li>
                            <Link to="/home">
                                <button onClick={backHome} className={styles.menu}>HOME</button>
                            </Link>
                        </li>
                        <li>
                            <Link to="/pokemon">
                                <button className={styles.menu}>ADD NEW POKEMON</button>
                            </Link>
                        </li>
                    </ul>
                    </nav>
                </div>
            </div>
        </>
    )
}
