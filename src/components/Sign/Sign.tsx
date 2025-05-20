
import { Link, useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { registerUser, loginUser } from '../../redux/reducers/UserSlice';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAppDispatch, useAppSelector } from '../../redux/store'
import { registerSchema, loginSchema } from './validatSign'
import { Alert, Spin } from 'antd'
import { TextField } from '@mui/material';

import classes from './Sign.module.scss';

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


const Sign: React.FC<AuthFormProps> = ({ mode }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isLoading , error } = useAppSelector((state => state.user))
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormData>({
    resolver: yupResolver(mode === 'login' ? loginSchema : registerSchema),
  });


  const onSubmitHandle = async (data: AuthFormData) => {
    try {
      if (mode === 'login') {
        const res = await dispatch(
          loginUser({
            email: data.email,
            password: data.password
          })
        ).unwrap();
        if(res) {
          navigate('/');
        }
      } else {
        const res = await dispatch(
          registerUser({
            email: data.email,
            password: data.password,
            username: data.username!
          })
        ).unwrap();
        if(res) {
          navigate('/');
        }
      }
    } catch (error) {
      if (typeof error === 'string') {
        console.error("Error fetching articles:", error);
      } else {
        console.error('Authentication failed');
      }
    }
  }

  return (
    <div className={classes.sign} onSubmit={handleSubmit(onSubmitHandle)}>

      <h1 className={classes['sign__title']}>
        {mode ==='login' ? 'Sign In' : 'Create new account'}
      </h1>

      {error && (
        <Alert 
            description="Что-то пошло не так, попробуйте обновить страницу"
            type="error"
            className={classes['sign__error']}
          />
      )}

      <form className={classes['sign__form']}>

        {mode === 'register' && (
            <TextField
            label="Username"
            {...register('username')}
            error={!!errors.username}
            helperText={errors.username?.message}
            fullWidth
          />
        )}
        
        <TextField
          label="Email address"
          type="email"
          {...register('email')}
          error={!!errors.email}
          helperText={errors.email?.message}
          fullWidth
        />

         <TextField
          label="Password"
          type="password"
          {...register('password')}
          error={!!errors.password}
          helperText={errors.password?.message}
          fullWidth
        />

        {mode === 'register' && (
          <>
            <TextField
            label="Repeat password"
            type="password"
            {...register('repeatPassword')}
            error={!!errors.repeatPassword}
            helperText={errors.repeatPassword?.message}
            fullWidth
          />
          
            <label className={classes['sign__label-chek']}>
              <div className={classes['sign__label-chek-wrap']}>
                <input
                  className={classes['sign__chekbox']}
                  type="checkbox"
                  {...register('acceptTerms')}
                />
                <span className={classes['sign__chekbox-box']} />
                <p className={classes['sign__chekbox-text']} >
                  I agree to the processing of my personal information <br />
                </p>
              </div>
            </label>

            {errors.acceptTerms && (
              <span className={classes['sign__error']}>{errors.acceptTerms.message}</span>
            )}
          </>
        )}

        <button className={classes['sign__btn']}>{isLoading === 'loading' ? <Spin size="large" /> : mode === 'login' ? 'Login' : 'Create'}</button>

        {mode === 'login' ? (
          <>
            <p className={classes['sign__question']}>
              Don’t have an account?
              <Link className={classes['sign__question-link']} to={`/sign-up`}>
                <span>Sign Up.</span>
              </Link>
            </p>
          </>
        ) : (
          <>
            <p className={classes['sign__question']}>
              Already have an account?
              <Link className={classes['sign__question-link']} to={`/sign-in`}>
                <span>Sign In.</span>
              </Link>
            </p>
          </>
        )}

      </form>
    </div>
    );
};

export default Sign;
