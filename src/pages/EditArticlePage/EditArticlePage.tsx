import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../redux/store'
import { fetchArticle } from '../../redux/reducers/ArticleSlice';
import { Spin } from 'antd'
import { updateArticle } from '../../services/articlesApi';
import { toast } from 'react-toastify';
import { ICreateArticle } from '../../types/ArticleInterfaces';

import CreateArticle from "../../components/CreateArticle";
//import { PrivateRoute } from '../../utils/PrivateRoute';
import classes from './EditArticlePage.module.scss';

const EditArticlePage = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const {
        currentArticle: article,
        isLoading: articleStatus,
        error: articleError,
    } = useAppSelector((state) => state.articles);

    const { isLoading: userStatus } = useAppSelector((state) => state.user);

    useEffect(() => {
        if (slug && userStatus === 'succeeded') {
        dispatch(fetchArticle(slug));
        }
    }, [dispatch, slug, userStatus]);

    const handleSubmit = async (data: ICreateArticle) => {
        if (!slug) return;
        try {
        const response = await updateArticle(slug, data);
        toast.success('Article updated successfully');
        navigate(`/articles/${response.article.slug}`);
        } catch (error) {
        toast.error('Error updating article');
        }
    };

    if (userStatus === 'loading' || articleStatus === true || !article) {
        return (
        <div className={classes.editArticlePage}>
            <Spin size="large" />
        </div>
        );
    }

    if (articleError) {
        navigate('/articles');
        return null;
    }

    return <CreateArticle mode="edit" initialData={article} onSubmit={handleSubmit} />

};

export default EditArticlePage;