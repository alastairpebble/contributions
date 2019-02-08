import React from "react";
import ReactDOM from "react-dom";
import SmartNavTop from "./SmartNavTop";
import SmartModal from "./SmartModal";

import SmartNavTopBreadcrumbs from "./SmartNavTopBreadcrumbs";
import Pages from "./pages";
//import PotText from "./pottext";

import "./styles.css";
import "./pages.css";

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
