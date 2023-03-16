import todoReducer from "./todo-reducer";
import { createStore } from "redux";

const store = createStore(todoReducer);

export default store;