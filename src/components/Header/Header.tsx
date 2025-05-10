import { Link } from 'react-router';
import classes from './Header.module.scss';

// на удаление

const Header: React.FC = () => {
  return (
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
  )
}

export default Header
