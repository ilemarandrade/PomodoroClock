import contenedorDeReducers from "./reducers";
import { createStore } from "redux";

const store = createStore(contenedorDeReducers);
export default store;
