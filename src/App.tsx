import React from "react";
import { Search } from "./features/search/Search";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">HSN / TSN</h1>
      </header>
      <Search />
      <p>
        Made with <code>&#8258;</code> by Castro
      </p>
    </div>
  );
}

export default App;
