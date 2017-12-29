const clientId = "a437b2ac07cb4dbb9a59b4b552b0a3de";
const redirectUri = "http://localhost:3000/";

let userAccessToken;

const Spotify = {

  // To check if users access token is already set or not
  getUserAccessToken: function () {
    if (userAccessToken) {
      return userAccessToken;
    } else if (window.location.href.match(/access_token=([^&]*)/) != null) {
      userAccessToken = window.location.href.match(/access_token=([^&]*)/)[0].split("=")[1];
      let expiresIn = window.location.href.match(/expires_in=([^&]*)/)[0].split("=")[1];
      
      // To wipe the access token and url parameters
      window.setTimeout(() => userAccessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
    } else {
      const authUri = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
      console.log(authUri);
      window.location.href = authUri;
    }
  },

  // This function returns a promise that will resolve to the list of tracks.
  search: async function (term) {
    this.getUserAccessToken();
    let url = `https://api.spotify.com/v1/search?type=track&q=${term}`;
    try {
      let response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + userAccessToken
        }
      });
      if (response.ok) {
        let jsonResponse = await response.json();
        let tracks = jsonResponse.tracks.items.map(track => {
          return {
            ID: track.id,
            Artist: track.id[0].name,
            Name: track.name,
            Album: track.album.name,
            URI: track.uri
          }
        })
        return tracks;
      }
      throw new Error('Error while getting data from Spotigy');
    } catch (error) {
      console.log(error);
    }

  },


  savePlaylist: async function (name, trackUris) {
    if (!trackUris || name === undefined) {
      return
    } 
    const userAccessToken = Spotify.getUserAccessToken();
    const headers = {'Authorization': 'Bearer ' + userAccessToken};
    let userId;

    return fetch('https://api.spotify.com/v1/me', { headers: headers })
    .then(response => response.json())
      .then(jsonResponse => {
        userId = jsonResponse.id;
        return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
          headers: headers,
          method: 'POST',
          body: JSON.stringify({name: name})
        })
        .then( response => response.json())
          .then(jsonResponse => {
            const playlistId = jsonResponse.id;
            return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
              headers: headers,
              method: 'POST',
              body: JSON.stringify({uris: trackUris})
            });
          })
    })
  }

}
export default Spotify