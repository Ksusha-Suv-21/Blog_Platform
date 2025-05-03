import axios from 'axios';
import { ArticleType, ArticleFilters, ArticlesResponse } from "../types/ArticleInterfaces";


export const apiBaseUrl = 'https://blog-platform.kata.academy/api';

export const apiClient = axios.create({
  baseURL:apiBaseUrl,
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);


export const fetchArticlesApi = async (params: ArticleFilters): Promise<ArticlesResponse> => {
  const response = await apiClient.get<ArticlesResponse>('/articles', { params });
  return response.data;
};

export const fetchArticle = async (slug: string): Promise<{ article: ArticleType }> => {
  const response = await apiClient.get<{ article: ArticleType }>(`/articles/${slug}`);
  return response.data;
};



  
/*
export const getArticleList = 
 async (page: number): Promise<ArticleType> => {
    try {
      const response = await axios.get<ArticleType>(
        `${apiBaseUrl}/articles?&limit=5&offset=${page * 5 - 5}`,
      );

      return response.data;
    } catch (error) {
      console.error("Error fetching articles:", error);
      throw error; 
    }
  }
*/
