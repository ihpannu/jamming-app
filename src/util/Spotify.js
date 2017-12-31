// Ajax call to Spotify API

const clientID = "a437b2ac07cb4dbb9a59b4b552b0a3de";
const redirectURI = 'http://localhost:3000/';
let accessToken;

let Spotify = {
  getAccessToken: function() {
    if (accessToken) {
      return accessToken;
    }

    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
    if (accessTokenMatch && expiresInMatch) {
      accessToken = accessTokenMatch[1];
      const expiresIn = Number(expiresInMatch[1]);
      window.setTimeout(() => (accessToken = ''), expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
    } else {
      const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
      window.location = accessUrl;
    }
  },


  // To search Spotify for tracks
  search(term) {
    const accessToken = Spotify.getAccessToken();
    return fetch(
      `https://api.spotify.com/v1/search?type=track&q=${term}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    )
      .then(response => response.json())
      .then(jsonResponse => {
        if (!jsonResponse.tracks) {
          return [];
        }
        return jsonResponse.tracks.items.map(track => ({
          id: track.id,
          name: track.name,
          artist: track.artists[0].name,
          album: track.album.name,
          uri: track.uri
        }));
      });
  },


// This function saves the playlis to Spo
  savePlaylist(name, trackUris) {
    if (name && trackUris) {
      const accessToken = Spotify.getAccessToken();
      const headers = {
        Authorization: `Bearer ${accessToken}`
      };
      let userId;

      return fetch(
        "https://cors-anywhere.herokuapp.com/https://api.spotify.com/v1/me",
        { headers: headers }
      )
        .then(response => response.json())
        .then(jsonResponse => {
          userId = jsonResponse.id;
          return fetch(
            `https://api.spotify.com/v1/users/${userId}/playlists`,
            {
              headers: headers,
              method: "POST",
              body: JSON.stringify({ name: name })
            }
          )
            .then(response => response.json())
            .then(jsonResponse => {
              const playlistId = jsonResponse.id;
              return fetch(
                `https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`,
                {
                  headers: headers,
                  method: "POST",
                  body: JSON.stringify({ uris: trackUris })
                }
              );
            });
        });
    } else {
      return;
    }
  }
};

export default Spotify;
