import React, { Component } from "react";
import "./SearchBar.css";


// Search Bar for users to search tracks on spotify
class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = { term: "" };
    this.search = this.search.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
    this.onKeyPressHandler = this.onKeyPressHandler.bind(this);
  }

  search() {
    this.props.onSearch(this.state.term);
  }

  handleTermChange(event) {
    this.setState({ term: event.target.value });
  }

  onKeyPressHandler(event) {
    if (event.keyCode === 13) {
      this.props.onSearch(this.state.term);
    }
  }

  render() {
    return (
      <div className="SearchBar">
        <input
          placeholder="Enter a Song, Album, or Artist"
          onChange={this.handleTermChange}
          onKeyDown={this.onKeyPressHandler}
        />
        <a onClick={this.search}>Search</a>
      </div>
    );
  }
}

export default SearchBar;