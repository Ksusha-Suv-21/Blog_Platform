
import { Link } from 'react-router';
//import { useForm } from 'react-hook-form';
import classes from './SignIn.module.scss';


// на удаление
  
const SignIn: React.FC = () => {


return (
    <div className={classes.signIn}>
      <h1 className={classes['signIn__title']}>Sign In</h1>
      <form className={classes['ssignIn__form']}>
        

        <label className={classes['signIn__label']}>
            Email address
            <input className={classes['signIn__input']}
                   placeholder='Email address'
                   
            />
        </label>

        <label className={classes['signIn__label']}>
            Password
            <input className={classes['signIn__input']}
                  placeholder='Password'
                  type="password"
                  //pattern="^(?=.*[a-zA-Z])(?=\w*[0-9])\w{6,12}$"
                  required
                  
            />
        </label>

    
          <button className={classes['signIn__btn']}>Login</button>
          <p className={classes['signIn__question']}>
            Don’t have an account?
            <Link className={classes['signIn__question-link']} to={`/sign-up`}>
              <span>Sign Up.</span>
            </Link>
          </p>
        
      </form>
    </div>
    );
};

export default SignIn;

