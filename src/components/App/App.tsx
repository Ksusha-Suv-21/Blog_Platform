import { Routes, Route} from 'react-router';

import Layout from '../../pages/Layout';
import  Homepage  from '../../pages/Homepage/Homepage';
import ArticlePost from '../ArticlePost';

import LoginPage from '../../pages/LoginPage';
import RegisterPage from '../../pages/RegisterPage';


const App: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Homepage />} />
          <Route path="/articles" element={<Homepage />} /> 
          <Route path="/articles/:slug" element={<ArticlePost />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
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
