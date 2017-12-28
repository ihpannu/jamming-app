import React, { Component } from "react";
import "./SearchBar.css";

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.search = this.search.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
  }

  search() {
    this.props.onSearch(this.state.term);
  }

  handleTermChange(event) {
    this.setState({term: event.target.value});
  }

  render() {
    return (
      <div className="SearchBar">
        <input placeholder="Enter a Song, Album, or Artist" 
        onChange={this.handleTermChange}
        />
        <a>Search</a>
      </div>
    );
  }
}

export default SearchBar;