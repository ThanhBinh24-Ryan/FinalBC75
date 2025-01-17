import { configureStore } from "@reduxjs/toolkit";
import  listJobReducer from "../pages/HomeTemplate/components/Header/slide";
import listMenuReducer from "../pages/HomeTemplate/components/Menu/slide";
import detailJobReducer from "../pages/HomeTemplate/Detail-Job/slide";
import listCommentsReducer from "../pages/HomeTemplate/Detail-Job/slide-comments";
const store = configureStore({
    reducer: {
      // Add reducers here
      listJobReducer,
      listMenuReducer,
      detailJobReducer,
      listCommentsReducer,
    },
  });
  
  // Infer the `RootState` and `AppDispatch` types from the store itself
  export type RootState = ReturnType<typeof store.getState>;
  // Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
  export type AppDispatch = typeof store.dispatch;
  
  export default store;
  