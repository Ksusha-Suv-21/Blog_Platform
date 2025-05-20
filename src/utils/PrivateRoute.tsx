import { FC } from 'react';
import { Navigate } from 'react-router';
import { useAppSelector } from '../redux/store';



export interface PrivateRouteProps {
  children: React.ReactNode;
}


export const PrivateRoute: FC<PrivateRouteProps> = ({ children }) => {
  const { user  } = useAppSelector((state) => state.user);

 

  if (!user) {
    return <Navigate to="sign-in" replace />;
  }

  return <>{children}</>;
};