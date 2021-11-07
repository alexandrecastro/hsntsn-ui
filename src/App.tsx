import React from "react";
import { Search } from "./features/search/Search";
import "./App.sass";

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">&#8258; HSN / TSN &#8258;</h1>
      </header>
      <Search />
      <div className="app-footer">
        &#8258; <a href="https://kastro.io">kastro.io</a> &#8258;
      </div>
    </div>
  );
}

export default App;
