import React, { Component } from "react";
import "./Playlist.css";
import TrackList from '../TrackList/TrackList';

class Playlist extends Component {
  render() {
    return (
      <div className="Playlist">
        <input defaultValue="New Playlist" />
        <TrackList tracks={this.props.playlistTracks}
        onAdd={this.props.onAdd} />
        <a className="Playlist-save" >Save to Spotify</a>
      </div>
    );
  }
}

export default Playlist;
