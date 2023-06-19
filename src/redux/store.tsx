import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./User/UserSlice";
import topicReducer from "./Topic/TopicSlice";
import entryReducer from "./Entry/EntrySlice";


export const createStore = (preloadedState: any = {}) => {
  const store = configureStore({
    reducer: {
        user:userReducer,
        topic:topicReducer,
        entry:entryReducer
    },
    preloadedState
  });

  return store;
}

const store = createStore();

export type RootState = ReturnType<typeof store.getState>;

export default store;
