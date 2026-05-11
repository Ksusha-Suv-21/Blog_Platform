import axios from "axios";
import {
  ArticleType,
  ArticleFilters,
  ArticlesResponse,
  ICreateArticle,
} from "../types/ArticleInterfaces";

const mockArticle = {
  slug: "mock-article",
  title: "Mock Article",
  description: "API is unavailable, showing fallback data",
  body: "This is mock content because backend is down.",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  tagList: ["mock"],
  favorited: false,
  favoritesCount: 0,
  id: "1",
  author: {
    username: "mockuser",
    bio: null,
    image: null,
    following: false,
  },
};
const mockArticles = Array.from({ length: 5 }).map((_, index) => ({
  slug: `mock-${index + 1}`,
  title: `Mock Article #${index + 1}`,
  description: "Fallback article (API down)",
  body: "Demo content",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  tagList: ["mock"],
  favorited: false,
  favoritesCount: index,
  id: String(index + 1),
  author: {
    username: "demo_user",
    bio: null,
    image: null,
    following: false,
  },
}));

export const apiBaseUrl = "https://blog-platform.kata.academy/api";

export const apiClient = axios.create({
  baseURL: apiBaseUrl,
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
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
  },
);

export const fetchArticlesApi = async (
  params: ArticleFilters,
): Promise<ArticlesResponse> => {
  try {
    const response = await apiClient.get<ArticlesResponse>("/articles", {
      params,
    });

    return response.data;
  } catch (error) {
    console.warn("API failed → fallback mock articles");

    return {
      articles: mockArticles,
      articlesCount: mockArticles.length,
    };
  }
};

export const fetchArticle = async (
  slug: string,
): Promise<{ article: ArticleType }> => {
  try {
    const response = await apiClient.get<{ article: ArticleType }>(
      `/articles/${slug}`,
    );

    return response.data;
  } catch (error) {
    console.warn("API failed → fallback mock article");

    return {
      article: mockArticle,
    };
  }
};

export const favoriteArticleApi = async (slug: string) => {
  const response = await apiClient.post(`/articles/${slug}/favorite`);
  return response.data;
};

export const unfavoriteArticleApi = async (slug: string) => {
  const response = await apiClient.delete(`/articles/${slug}/favorite`);
  return response.data;
};

export const createArticle = async (
  articleData: ICreateArticle,
): Promise<{ article: ArticleType }> => {
  const response = await apiClient.post<{ article: ArticleType }>("/articles", {
    article: articleData,
  });
  return response.data;
};

export const updateArticle = async (
  slug: string,
  articleData: ICreateArticle,
): Promise<{ article: ArticleType }> => {
  const response = await apiClient.put<{ article: ArticleType }>(
    `/articles/${slug}`,
    { article: articleData },
  );
  return response.data;
};

export const deleteArticle = async (slug: string): Promise<void> => {
  await apiClient.delete(`/articles/${slug}`);
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


  export const apiBaseUrl = 'https://blog-platform.kata.academy/api';
const token = localStorage.getItem('token');

export const getArticleList = 
 async (page: number): Promise<ArticleInterface> => {
    try {
      
      const response = await axios.get<ArticleInterface>(
        `${apiBaseUrl}/articles?&limit=5&offset=${page * 5 - 5}`,
        {
          headers: {
            Authorization: `Token ${token}`, // Используйте шаблонную строку для добавления токена
          },
          params: {
            page
          }
        }
      );

      return response.data;
    } catch (error) {
      console.error("Error fetching articles:", error);
      throw error; 
    }
  }
*/
