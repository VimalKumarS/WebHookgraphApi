//import { AuthenticationContext } from 'adal-node';
var AuthenticationContext = require('adal-node').AuthenticationContext;
var adalConfiguration= require('../constants').adalConfiguration;
var resource = 'https://graph.microsoft.com/';

module.exports = {
/**
 * Generate a fully formed uri to use for authentication based on the supplied resource argument
 * @return {string} a fully formed uri with which authentication can be completed.
 */
getAuthUrl: function getAuthUrl() {
  return adalConfiguration.authority + '/oauth2/authorize' +
    '?client_id=' + adalConfiguration.clientID +
    '&response_type=code' +
    '&redirect_uri=' + adalConfiguration.redirectUri;
},

/**
 * Gets a token for a given resource.
 * @param {string} code An authorization code returned from a client.
 * @param {AcquireTokenCallback} callback The callback function.
 */
getTokenFromCode :function (code, callback) {
  var authContext = new AuthenticationContext(adalConfiguration.authority);
  authContext.acquireTokenWithAuthorizationCode(
    code,
    adalConfiguration.redirectUri,
    resource,
    adalConfiguration.clientID,
    adalConfiguration.clientSecret,
    (error, token) => {
      if (error) callback(error, null);
      else callback(null, token);
    }
  );
}

}