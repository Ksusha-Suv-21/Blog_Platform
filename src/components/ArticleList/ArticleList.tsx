import { ChangeEvent, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/store'
import { useSearchParams } from 'react-router';

import { Alert, Spin } from 'antd'
import { Pagination, Box } from '@mui/material';
import { fetchArticles, setCurrentPage } from '../..//redux/reducers/ArticleSlice';
import Article from '../Article/Article';
import { ArticleType } from "../../types/ArticleInterfaces";

import classes from './ArticleList.module.scss'


const ArticleList: React.FC = () => {

  const dispatch = useAppDispatch();
  const { articles, isLoading, error, totalArticles } = useAppSelector((state) => state.articles);
 
  const [searchParams, setSearchParams] = useSearchParams();

  const totalPages = Math.ceil(totalArticles / 5);
  const currentPageFromParams = Number(searchParams.get('page')) || 1;


  useEffect(() => {
    dispatch(
      fetchArticles({
        limit: 5,
        offset: (currentPageFromParams - 1) * 5,
      })
    );
  }, [dispatch, currentPageFromParams]);

  const handlePageChange = (_: ChangeEvent<unknown>, page: number) => {
    setSearchParams({ page: page.toString() });
    dispatch(setCurrentPage(page));
  };

  if (isLoading === true) {
    return (
      <div className={classes['articleList__loader']}>
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return (
        <Alert 
        description="Что-то пошло не так, попробуйте обновить страницу"
        type="error"
        className={classes['articleList__error']}
         />
    );
  }


  return (
    <>
      <div className={classes.articleList}>
        {!articles ? (
          <Spin />
        ) : articles.length === 0 ? (
          <Alert 
          description="Что-то пошло не так, попробуйте обновить страницу"
          type="error"
          className={classes['articleList__error']}
          />
        ) : (
          <>
            {articles.map((article: ArticleType) => (
              <Article key={article.slug} article={article} />
            ))}
            <Box
                sx={{
                    margin: "auto",
                    width: "fit-content",
                    alignItems: "center",
                    
                }}
            >
              <Pagination
                className={classes['articleList__pagination']}
                count={totalPages}
                onChange={handlePageChange}
                page={currentPageFromParams}
                shape="rounded"
                color='primary'
              />
            </Box>
          </>
        )}
      </div>
    </>
  );
};

export default ArticleList;

  