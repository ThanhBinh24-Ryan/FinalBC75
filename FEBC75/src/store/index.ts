import { configureStore } from "@reduxjs/toolkit";
import  listJobReducer from "../pages/HomeTemplate/components/Header/slide";
import listMenuReducer from "../pages/HomeTemplate/components/Menu/slide";
import detailJobReducer from "../pages/HomeTemplate/Detail-Job/slide";
import listCommentsReducer from "../pages/HomeTemplate/Detail-Job/slide-comments";
import detailMenuReducer from "../pages/HomeTemplate/components/Menu/slide-detail";
import listForIDReducer from "../pages/HomeTemplate/detailType/slide";
import loginReducer from "../pages/Auth/Login/slide";
import addCommentsReducer from "../pages/HomeTemplate/Detail-Job/slide-comments";
import listThueReducer from "../pages/HomeTemplate/Detail-Job/slide-thue";
const store = configureStore({
    reducer: {
      // Add reducers here
      listJobReducer,
      listMenuReducer,
      detailJobReducer,
      listCommentsReducer,
      detailMenuReducer,
      listForIDReducer,
      loginReducer,
      addCommentsReducer,
      listThueReducer,
    },
  });
  
  // Infer the `RootState` and `AppDispatch` types from the store itself
  export type RootState = ReturnType<typeof store.getState>;
  // Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
  export type AppDispatch = typeof store.dispatch;
  
  export default store;
  