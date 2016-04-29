const USERS_PATH = "https://www.googleapis.com/gmail/v1/users";
const OAUTH_PATH = "https://www.googleapis.com/oauth2/v1/tokeninfo";

export default class GmailAPI {

  constructor(userId, accessToken) {
    this.userId = userId;
    this.accessToken = accessToken;
  }

  getThreads(params = {}) {
    const path = `/${this.userId}/threads`;
    const url = this._buildURL(USERS_PATH + path, params);
    return this._request(url);
  }

  getThread(id, params={}) {
    const path = `/${this.userId}/threads/${id}`;
    const url = this._buildURL(USERS_PATH + path, params);
    return this._request(url);
  }

  verifyToken(params={}) {
    const url = this._buildURL(OAUTH_PATH, params);
    return this._request(url);
  }

  _request(url) {
    console.log(url);
    return fetch(url).
      then((response) => {
        return response.json()
      }).
      then((body) =>{
        return body
      }).
      catch((err)=>{
        throw(err);
      });
  }

  _buildURL(path, params) {
    params.access_token = this.accessToken;
    const query = this._buildQueryString(params);
    return path + query;
  }

  _buildQueryString(data)  {
    // var query = "?";
    var params = [];
    Object.keys(data).forEach((key) => {
      params.push(`${key}=${data[key]}`);
    });
    return "?" + params.join("&");
  }
}