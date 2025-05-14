
import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import { useAppDispatch, useAppSelector } from '../../redux/store'
import { profileSchema } from './validatProfile';
import { updateUserProfile } from '../../redux/reducers/UserSlice';
import { Alert, Spin } from 'antd'
import { TextField } from '@mui/material';

import classes from './ProfilePage.module.scss';

interface FormData {
  username: string;
  email: string;
  newPassword: string;
  image: string;
}



const ProfilePage: React.FC = () => {
  const dispatch = useAppDispatch();

  const { user, isLoading , error } = useAppSelector((state => state.user))
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(profileSchema),
    defaultValues: {
      username: user?.username || '',
      email: user?.email || '',
      newPassword: '',
      image: user?.image || '',
    },
  });

  const onSubmit = async (data: FormData) => {
    const updateData: any = {
        username: data.username,
        email: data.email,
    }
    
    if (data.newPassword) {
      updateData.password = data.newPassword;
    }

    if (data.image) {
      updateData.image = data.image;
    }
    await dispatch(updateUserProfile(updateData))
  }

  

  return (
    <div className={classes.profile} onSubmit={handleSubmit(onSubmit)}>

      <h1 className={classes['profile__title']}>
        Edit Profile
      </h1>

      {error && (
        <Alert 
            description="Что-то пошло не так, попробуйте обновить страницу"
            type="error"
            className={classes['profile__error']}
          />
      )}

      <form className={classes['profile__form']}>

        <TextField
            label="Username"
            {...register('username')}
            error={!!errors.username}
            helperText={errors.username?.message}
            fullWidth
        />
       
        <TextField
            label="Email address"
            type="email"
            {...register('email')}
            error={!!errors.email}
            helperText={errors.email?.message}
            fullWidth
        />

        <TextField
            label="New password"
            type="password"
            {...register('newPassword')}
            error={!!errors.newPassword}
            helperText={errors.newPassword?.message}
            fullWidth
        />

        <TextField
            label="Avatar image (url)"
            {...register('image')}
            error={!!errors.image}
            helperText={errors.image?.message}
            fullWidth
        />

        <button className={classes['profile__btn']}>{isLoading === 'loading' ? <Spin size="large" /> : 'Save'}</button>

      </form>
    </div>
    );
};

export default ProfilePage;
