const BASE_PATH = "https://www.googleapis.com/gmail/v1/users";

export default class GmailAPI {

  constructor(userId, accessToken) {
    this.userId = userId;
    this.accessToken = accessToken;
  }

  getThreads(params = {}) {
    const path = `${this.userId}/threads`;
    this._buildURL(path, params);

    fetch(url).
      then((response) => {
        return response.json()
      }).
      then
  }

  _buildURL(path, queryParams) {
    queryParams.access_token = this.accessToken;


  }

  _buildQueryString(data)  {
    // var params = filterObject(data, function(value) {
    //   return value !== undefined;
    // });

    // var query = map(
    //   flatten(encodeParamsObject(params)),
    //   Util.method("join", "=")
    // ).join("&");

    // return query;
    //
    for (let i = 0; i < Object.keys(data); i++) {

    }
  }


}