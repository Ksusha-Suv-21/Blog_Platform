import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchArticle as fetchArticleApi,
  fetchArticlesApi,
} from "../../services/articlesApi";

import {
  //ArticleType,
  //ArticlesResponse,
  ArticlesState,
} from "../../types/ArticleInterfaces";

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

interface FetchArticlesParams {
  limit: number;
  offset: number;
}

const initialState: ArticlesState = {
  articles: [],
  currentArticle: null,
  isLoading: true,
  error: null,
  currentPage: 1,
  totalArticles: 0,
};

export const fetchArticles = createAsyncThunk(
  "articles/fetchArticles",
  async (params: FetchArticlesParams) => {
    const response = await fetchArticlesApi(params);
    return response;
  },
);

export const fetchArticle = createAsyncThunk(
  "articles/fetchArticle",
  async (slug: string) => {
    try {
      const response = await fetchArticleApi(slug);
      return response.article;
    } catch (e) {
      console.warn("API failed → using mock article");

      return mockArticles[0];
    }
  },
);

const articlesSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.isLoading = false;
        state.articles = action.payload.articles;
        state.totalArticles = action.payload.articlesCount;
        state.error = null;
      })
      .addCase(fetchArticles.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchArticle.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchArticle.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentArticle = action.payload;
      })
      .addCase(fetchArticle.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default articlesSlice.reducer;
export const { setCurrentPage } = articlesSlice.actions;
