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
    this.removeTrack = this.removeTrack.bind(this);
  }

  addTrack(track) {
    let tracks = this.state.playlistTracks;

    if (!tracks.some(playlistTrack => playlistTrack.id === track.id)) {
      tracks.push(track);
      this.setState({ playlistTracks: tracks });
    } else {
      console.log("Song Already Added to Playlist");
    }
  }

  removeTrack(track) {
    let newPlaylistTracks = this.state.playlistTracks.filter(
      playlistTrack => playlistTrack !== track.id
    );
    this.setState({
      playlistTracks: newPlaylistTracks
    });
  }

  updatePlaylistname(name) {
    this.setState({ playlistName: name });
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
            <SearchResults
              searchResults={this.state.searchResults}
              onAdd={this.addTrack}
            />
            <Playlist
              playlistName={this.state.playlistName}
              playlistTracks={this.state.playlistTracks}
              onRemove={this.removeTrack}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
