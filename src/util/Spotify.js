const clientId = "a437b2ac07cb4dbb9a59b4b552b0a3de";
const redirectURI = "http://localhost:3000/";

let userAccessToken;

const Spotify ={

  getAccessToken() {
    if (userAccessToken) {
      return userAccessToken;
    } else if (window.location.href.match(/access_token=([^&]*)/) != null) {
      userAccessToken = window.location.href.match(/access_token=([^&]*)/)[0].split("=")[1];
      let expiresIn = window.location.href .match(/expires_in=([^&]*)/)[0].split("=")[1];
      window.setTimeout(() => userAccessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
    } else {
      const authUri = ``;
    }
  }
}
export default Spotify