import style from './Loading.module.css'

export function Loading() {
    return (
        <div className={style.loaderContainer}>
            <div className={style.loader}>
                <p><strong>LOADING...</strong></p>
            </div>
        </div>
    )
}
