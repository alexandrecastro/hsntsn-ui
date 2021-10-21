import React from "react";
import { Search } from "./features/search/Search";
import "./App.css";

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">HSN / TSN</h1>
      </header>
      <Search />
      <p className="app-footer">
        Made with <code>&#8258;</code> by Castro
      </p>
    </div>
  );
}

export default App;
