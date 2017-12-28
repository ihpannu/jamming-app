import React, {Component} from 'react';
import './App.css';

// import SearchBar from '../SearchBar/SearchBar';
import Playlist from '../Playlist/Playlist';
import SearchResults from '../SearchResults/SearchResults';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: ["name", "artist", "album"],
      playlistName: "Punjabi Mix",
      playlistTracks: ["name", "artist", "album"]
    };
    this.addTrack = this.addTrack.bind(this);
  }

  addTrack(track) {
    if (this.state.playlistTracks.every(plTrack => plTrack.id !== track.id)) {

      let newPlaylistTracks = this.state.playlistTracks.concat(track);
      this.setState({ playlistTracks: newPlaylistTracks });
    }
  }

  render() {
    return (
      <div>
        <h1>
          Ja<span className="highlight">mmm</span>ing
        </h1>
        <div className="App">
          {/* <!-- Add a SearchBar component --> */}
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults}
             onAdd={this.addTrack}
             />
            <Playlist
              playlistName={this.state.playlistName}
              playlistTracks={this.state.playlistTracks}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
