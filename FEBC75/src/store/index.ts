import { configureStore } from "@reduxjs/toolkit";
import  listJobReducer from "./../pages/HomeTemplate/HomePage/slide";
const store = configureStore({
    reducer: {
      // Add reducers here
      listJobReducer,
    },
  });
  
  // Infer the `RootState` and `AppDispatch` types from the store itself
  export type RootState = ReturnType<typeof store.getState>;
  // Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
  export type AppDispatch = typeof store.dispatch;
  
  export default store;
  