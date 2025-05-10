import { configureStore } from '@reduxjs/toolkit'
import { useDispatch, useSelector} from "react-redux"
import ArticleReducer from './reducers/ArticleSlice'
import UserReducer from './reducers/UserSlice'


  
export const store = configureStore({
    reducer: { 
        articles: ArticleReducer,
        user: UserReducer
    }

})


export type AppStore = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<AppStore>()



/*

export const useAppStore = useStore.withTypes<AppStore>()
export const createAppSelector = createSelector.withTypes<AppStore>()

*/