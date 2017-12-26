import React, { Component } from "react";
import "./Playlist.css";

class Playlist extends Component {
  render() {
    return (
      <div className="Playlist">
        <input defaultValue="New Playlist" />
        {/* Add a Tracklist Component here  */}
        <a className="Playlist-save" >Save to Spotify</a>
      </div>
    );
  }
}

export default Playlist;
