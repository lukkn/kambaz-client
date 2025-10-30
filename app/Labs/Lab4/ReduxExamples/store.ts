import { configureStore } from "@reduxjs/toolkit";
import helloReducer from "./HelloRedux/helloReducer";
import counterReducer from "./CounterRedux/counterReducer";
import addReducer from "./AddRedux/addReducer";
import todosReducer from "./todos/todosReducer";

// Store for Lab4 Redux examples only
const store = configureStore({
  reducer: {
    hello: helloReducer,
    counter: counterReducer,
    add: addReducer,
    todos: todosReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
