import { Routes, Route} from 'react-router';
import { PrivateRoute } from '../../utils/PrivateRoute';
import { fetchCurrentUser } from '../../redux/reducers/UserSlice';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { useEffect } from 'react';
import { Spin } from 'antd'

import Layout from '../../pages/Layout';
import  Homepage  from '../../pages/Homepage/Homepage';
import ArticlePost from '../ArticlePost';

import LoginPage from '../../pages/LoginPage';
import RegisterPage from '../../pages/RegisterPage';
import ProfilePage from '../../pages/ProfilePage';
import CreateArticlePage from '../../pages/CreateArticlePage';
import EditArticlePage from '../../pages/EditArticlePage';


const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const {isLoading: userState} = useAppSelector((state) => state.user)

  //чтобы при перезагрузке страницы залогиненный пользователь сохранялся
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(fetchCurrentUser());
    }
  }, [dispatch]);

  if (userState === 'loading' && localStorage.getItem('token')) {
    return <Spin />;
  };

  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Homepage />} />
          <Route path="/articles" element={<Homepage />} /> 
          <Route path="/articles/:slug" element={<ArticlePost />} />
          <Route path="/sign-in" element={<LoginPage />} />
          <Route path="/sign-up" element={<RegisterPage />} />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <ProfilePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/new-article"
            element={
              <PrivateRoute>
                <CreateArticlePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/articles/:slug/edit"
            element={
              <PrivateRoute>
                <EditArticlePage />
              </PrivateRoute>
            }
          />
        </Route> 
      </Routes>

    </>
  )
}

export default App





/*
//import { lazy ,useState } from 'react';

//const Homepage = lazy(() => import('../../pages/Homepage'));
//const ArticlePost = lazy(() => import('../ArticlePost'));


  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Homepage />} />
          <Route path="/articles" element={<Homepage />} /> 
          <Route path="/articles/:slug" element={<ArticlePost />} />
          <Route path="/sign-up" element={<SignUp />} />
        </Route> 
      </Routes>

    </>
  )
import Header from '../Header';

  return (
    <>
      <Header />
        <Routes>
            <Route path='/' element={<Homepage />} />
            <Route path="/articles" element={<Homepage />} /> 
            <Route path="/articles/:slug" element={<ArticlePost />} />
            <Route path="/sign-up" element={<SignUp />} />
        </Routes>
    </>
  )
*/
