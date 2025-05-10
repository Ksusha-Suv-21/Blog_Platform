import { Link, Outlet, useNavigate} from 'react-router'
import { useAppDispatch, useAppSelector } from '../../redux/store'
import { logout } from '../../redux/reducers/UserSlice'
import classes from './Layout.module.scss'
import logo from './Rec.svg';

 
const Layout = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user} = useAppSelector((state) => state.user);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <>
      <header className={classes.header}>
        <Link to="/">
            <p className={classes['header__title']}>Realworld Blog</p>
        </Link>


        <div className={classes['header__button']}>
          {user ? (
            <div className={classes['header__profile-btn']}>
              <Link to="/new-article">
                <button className={classes['header__create-art-btn']}>Create article</button>
              </Link>

              <Link to="/profile">
              <div className={classes['header__user-info']}>
                <span className={classes['header__username']}>{user.username}</span>

                <img src={user.image || '/avatar.svg'} alt="Avatar" className={classes['header__user-img']} 
                onError={(event) => {event.currentTarget.src = logo}} />

                
              </div>
              </Link>

              <button className={classes['header__logout']} onClick={handleLogout}>Log Out</button>

            </div>
            ) : (
            <>
              <Link to="/login">
                <button className={classes['header__sign-in-btn']}>Sign in</button>
                </Link>
              <Link to="/register">
                <button className={classes['header__sign-up-btn']}>Sign up</button>
              </Link>
            </>
            )}
        </div>

      </header>

      <Outlet />

    </>
  )
}

export { Layout };