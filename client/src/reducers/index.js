import { combineReducers } from "redux";
import productsSearchReducer from "./productsSearchReducer";
export default combineReducers({
    productsData: productsSearchReducer
})