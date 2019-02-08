import { combineReducers } from "redux";
import calculate from "./calculate";
import counter from "./counter";
import personas from "./personas";

export default combineReducers({
  calculate,
  counter,
  personas
});
