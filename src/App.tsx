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
      <div className="app-footer">Made with &#8258; by Castro</div>
    </div>
  );
}

export default App;
