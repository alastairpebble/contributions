import React from "react";
import ReactDOM from "react-dom";

/* https://codesandbox.io/s/github/schafeld/React-Redux-Counter */
import { Provider } from "react-redux";
import { createStore } from "redux";

import SmartNavTop from "./SmartNavTop";
import SmartModal from "./SmartModal";

import SmartNavTopBreadcrumbs from "./SmartNavTopBreadcrumbs";
import Pages from "./pages";
//import PotText from "./pottext";

import "./styles.css";
import "./pages.css";
import "./piesegments.css";

import reducer from "./reducers/index";

const store = createStore(reducer);
store.dispatch({ type: "CALCULATECURRENT" });
store.dispatch({ type: "GETPERSONAS" });
store.dispatch({ type: "NEWPERSONA" });
console.log(store.getState());

/*
function calculateAmount(time) {
  switch (time) {
    case "current":
      return 1234;
      break;
    case "future":
      return 5678;
      break;
  }
  return 1234;
}
*/
/*
function reducer(state = initialState, action) {
  // console.log(action)

  switch (action.type) {
    case "INCREMENT":
      return {
        count: state.count + 1
      };
    case "DECREMENT":
      return {
        count: calculateAmount("current")
      };
    case "CALCULATECURRENT":
      return {
        amount: calculateAmount("current")
      };
    case "CALCULATEFUTURE":
      return {
        amount: calculateAmount("future")
      };
    default:
      return state;
  }
}

function calculate(state = initialState, action) {
  switch (action.type) {
    case "CALCULATECURRENT":
      return {
        amount: calculateAmount("current")
      };
    case "CALCULATEFUTURE":
      return {
        amount: calculateAmount("future")
      };
    default:
      return state;
  }
}

const store = createStore(reducer);
*/
/*
function App() {
  return (
    <div className="App">
      <SmartNavTop />
      <SmartNavTopBreadcrumbs />
      <SmartModal>
        <Pages />
      </SmartModal>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
*/

const App = () => (
  <Provider store={store}>
    <div className="App">
      <SmartNavTop />
      <SmartNavTopBreadcrumbs />
      <SmartModal>
        <Pages />
      </SmartModal>
    </div>
  </Provider>
);

ReactDOM.render(<App />, document.getElementById("root"));
