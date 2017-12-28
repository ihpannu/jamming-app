import React, { Component } from "react";
import "./Playlist.css";
import TrackList from '../TrackList/TrackList';

class Playlist extends Component {
  constructor(props) {
    super();
    this.handleNameChange = this.handleNameChange.bind(this);
  }

  handleNameChange(event) {
    this.props.onNameChange(event.target.value);
  }

  render() {
    return (
      <div className="Playlist">
        <input defaultValue="New Playlist" onChange={this.handleNameChange} />
        <TrackList
          tracks={this.props.playlistTracks}
          onAdd={this.props.onAdd}
          onRemove={this.props.onRemove}
        />
        <a className="Playlist-save"
        onClick={this.props.onSave}
        >Save to Spotify</a>
      </div>
    );
  }
}

export default Playlist;
