import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./User/UserSlice";
import topicReducer from "./Topic/TopicSlice";


export const createStore = (preloadedState: any = {}) => {
  const store = configureStore({
    reducer: {
        user:userReducer,
        topic:topicReducer
    },
    preloadedState
  });

  return store;
}

const store = createStore();

export default store;
