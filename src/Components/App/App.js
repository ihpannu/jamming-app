import React, {Component} from 'react';
import './App.css';

import SearchBar from '../SearchBar/SearchBar';
import Playlist from '../Playlist/Playlist';
import SearchResults from '../SearchResults/SearchResults';
import Spotify from '../../util/Spotify';



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      SearchResults: [],
      playlistName: "New Playlist",
      playlistTracks: []
    };

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  //If track is not found in playlist, adds the track
  addTrack(track) {
    let tracks = [...this.state.playlistTracks, track];
    // tracks.push(track);

    this.setState({ playlistTracks: tracks });
  }

  removeTrack(track) {
    let tracks = this.state.playlistTracks;
    tracks = tracks.filter(currentTrack => currentTrack.id !== track.id);

    this.setState({ playlistTracks: tracks });
  }

  updatePlaylistName(name) {
    this.setState({ playlistName: name });
  }

  savePlaylist() {
    const trackURIs = this.state.playlistTracks.map(track => track.uri);
    Spotify.savePlaylist(this.state.playlistName, trackURIs);
    // const playlist = "New Playlist";
    this.setState({ playlistName: "New Playlist", playlistTracks: [] });
  }

  //Calls on the util file to run the AJAX call for Spotify API, then sets state
  search(term) {
    Spotify.search(term).then(response =>
      this.setState({ SearchResults: response })
    );
  }

  render() {
    return (
      <div>
        <h1>
          Ja<span className="highlight">mmm</span>ing
        </h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults
              searchResults={this.state.SearchResults}
              onAdd={this.addTrack}
            />
            <Playlist
              playlistName={this.state.playlistName}
              playlistTracks={this.state.playlistTracks}
              onRemove={this.removeTrack}
              onNameChange={this.updatePlaylistName}
              onSave={this.savePlaylist}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;







// import React, {Component} from 'react';
// import './App.css';

// import SearchBar from '../SearchBar/SearchBar';
// import Playlist from '../Playlist/Playlist';
// import SearchResults from '../SearchResults/SearchResults';
// import Spotify from '../../util/Spotify';

// class App extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       searchResults: ["name", "artist", "album"],
//       playlistName: "Punjabi Mix",
//       playlistTracks: ["name", "artist", "album"]
//     };
//     this.addTrack = this.addTrack.bind(this);
//     this.removeTrack = this.removeTrack.bind(this);
//     this.savePlaylist = this.savePlaylist.bind(this);
//     this.search = this.search.bind(this);
//   }

//   addTrack(track) {
//     let tracks = this.state.playlistTracks;

//     if (!tracks.some(playlistTrack => playlistTrack.id === track.id)) {
//       tracks.push(track);
//       this.setState({ playlistTracks: tracks });
//     } else {
//       console.log("Song Already Added to Playlist");
//     }
//   }

//   removeTrack(track) {
//     let newPlaylistTracks = this.state.playlistTracks.filter(
//       playlistTrack => playlistTrack !== track.id
//     );
//     this.setState({
//       playlistTracks: newPlaylistTracks
//     });
//   }

//   updatePlaylistname(name) {
//     this.setState({ playlistName: name });
//   }

//   savePlaylist() {
//     let tracks = this.props.playlistTracks;
//     let trackUris = tracks.map(track => track.uri);
//   }


//   search(term) {
//     if (term !== "") {
//       Spotify.search(term).then(results => {
//         console.log(results);
//       });
//     } else {
//       this.setState({ searchResults: [] });
//     }
//   }

//   render() {
//     return (
//       <div>
//         <h1>
//           Ja<span className="highlight">mmm</span>ing
//         </h1>
//         <div className="App">¯
//           <SearchBar onSearch={this.search} />

//           <div className="App-playlist">
//             <SearchResults
//               searchResults={this.state.searchResults}
//               onAdd={this.addTrack}
//             />
//             <Playlist
//               playlistName={this.state.playlistName}
//               playlistTracks={this.state.playlistTracks}
//               onRemove={this.removeTrack}
//               onSave={this.savePlaylist}
//             />
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

// export default App;
