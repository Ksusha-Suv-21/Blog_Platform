import { FC } from 'react';
import { Navigate } from 'react-router';
import { useAppSelector } from '../redux/store';
import { Spin } from 'antd'


export interface PrivateRouteProps {
  children: React.ReactNode;
}


export const PrivateRoute: FC<PrivateRouteProps> = ({ children }) => {
  const { user , isInitializing } = useAppSelector((state) => state.user);

 if (isInitializing && localStorage.getItem('token')) {
    return <Spin />;
  } 

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};