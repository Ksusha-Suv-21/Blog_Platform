import { Link, Outlet } from 'react-router'
import classes from './Layout.module.scss'

 
const Layout = () => {
    return (
        <>
        <header className={classes.header}>
            <Link to="/">
                <p className={classes['header__title']}>Realworld Blog</p>
            </Link>
            <div className={classes['header__button']}>
                <Link to="/sign-in">
                    <button className={classes['header__sign-in-btn']}>Sign in</button>
                </Link>
                <Link to="/sign-up">
                    <button className={classes['header__sign-up-btn']}>Sign up</button>
                </Link>
            </div>
        </header>

            <Outlet />

        </>
     )
}

export { Layout };