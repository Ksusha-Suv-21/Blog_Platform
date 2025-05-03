
import { Link } from 'react-router';
import { useForm } from 'react-hook-form';
import classes from './SignUp.module.scss';

export interface AuthFormData {
  username?: string;
  email: string;
  password: string;
  repeatPassword?: string;
  acceptTerms?: boolean;
}

export interface AuthFormProps {
  mode: 'login' | 'register';
}


  
const SignUp: React.FC = () => {

  const {
    register,


  } = useForm<AuthFormData>({});

return (
    <div className={classes.signUp}>
      <h1 className={classes['signUp__title']}>Create new account</h1>
      <form className={classes['signUp__form']}>
        <label className={classes['signUp__label']}>
            Username
            <input className={classes['signUp__input']}
                   placeholder='Username'
                   {...register('username')}
            />
        </label>

        <label className={classes['signUp__label']}>
            Email address
            <input className={classes['signUp__input']}
                   placeholder='Email address'
                   {...register('email')}
            />
        </label>

        <label className={classes['signUp__label']}>
            Password
            <input className={classes['signUp__input']}
                  placeholder='Password'
                  type="password"
                  //pattern="^(?=.*[a-zA-Z])(?=\w*[0-9])\w{6,12}$"
                  required
                  {...register('password')}
            />
            
        </label>

        <label className={classes['signUp__label']}>
            Repeat Password
            <input className={classes['signUp__input']}
            placeholder='Password'
            type="password"
            {...register('repeatPassword')}
            />
            
        </label>

        <label className={classes['signUp__label-chek']}>
            <div className={classes['signUp__label-chek-wrap']}>
              <input
               className={classes['signUp__chekbox']}
                type="checkbox"
                {...register('acceptTerms')}

                required
              />
              <span className={classes['signUp__chekbox-box']} />
              <p>
                I agree to the processing of my personal information <br />
              </p>
            </div>
            
          </label>
          <button className={classes['signUp__btn']}>Create</button>
          <p className={classes['signUp__question']}>
            Already have an account?
            <Link className={classes['signUp__question-link']} to={`/sign-in`}>
              <span>Sign In.</span>
            </Link>
          </p>
        
      </form>
    </div>
    );
};

export default SignUp;

