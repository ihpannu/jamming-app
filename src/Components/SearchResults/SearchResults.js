import React, { Component } from "react";
import "./SearchResults.css";
import TrackList from '../TrackList/TrackList';

class SearchResults extends Component {
  render() {
    return(
      <div className="SearchResults" >
        <h2>
          Results
          <TrackList tracks={this.props.searchResults} />
        </h2>
      </div>
    )
  }
}


export default SearchResults;