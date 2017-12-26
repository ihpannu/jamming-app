import React, { Component } from "react";
import "./SearchBar.css";

class SearchBar extends Component {
  render() {
    return(
      <div className="SearchBar" >
        <input placeholder="Enter a Song, Album, or Artist" />
        <a>Search</a>
      </div>
    )
  }
}

export default SearchBar;