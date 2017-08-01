//import https from 'https';
var https = require("https")
var host = 'graph.microsoft.com';
module.exports = {
  /**
 * Generates a POST request (of Content-type ```application/json```)
 * @param {string} path the path, relative to the host, to which this request will be sent
 * @param {string} token the access token with which the request should be authenticated
 * @param {string} data the data which will be 'POST'ed
 * @param {callback} callback
 */
  postData: function (path, token, data, callback) {
    var options = {
      host: host,
      path: path,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
        'Content-Length': data.length
      }
    };
   

    var req = https.request(options, res => {
      var subscriptionData = '';
 console.log(data);
      res.on('data', chunk => (subscriptionData += chunk));
      res.on('end', () => {
        if (res.statusCode === 201) 
          callback(null, JSON.parse(subscriptionData));
        else 
          callback(JSON.parse(subscriptionData), null);
        }
      );
    });

    req.write(data);
    req.end();

    req.on('error', error => callback(error, null));
  },

  /**
 * Generates a GET request (of Content-type ```application/json```)
 * @param {string} path the path, relative to the host, to which this request will be sent
 * @param {string} token the acess token with which the request should be authenticated
 * @param {callback} callback
 */
  getData: function (path, token, callback) {
    var options = {
      host: host,
      path: path,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json;odata.metadata=minimal;odata.streaming=true;IEEE754Compatible=f' +
            'alse',
        Authorization: 'Bearer ' + token
      }
    };

    var req = https.request(options, res => {
      var endpointData = '';

      res.on('data', chunk => (endpointData += chunk));
      res.on('end', () => {
        if (res.statusCode === 200) 
          callback(null, JSON.parse(endpointData));
        else 
          callback(JSON.parse(endpointData), null);
        }
      );
    });

    req.write('');
    req.end();

    req.on('error', error => callback(error, null));
  },

  /**
 * Generates a DELETE request
 * @param {string} path the path, relative to the host, to which this request will be sent
 * @param {string} token the acess token with which the request should be authenticated
 * @param {callback} callback
 */
  deleteData: function (path, token, callback) {

    var options = {
      host: host,
      path: path,
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain',
        'X-HTTP-Method': 'DELETE',
        Authorization: 'Bearer ' + token
      }
    };

    var req = https.request(options, res => {
      var endpointData = '';
      res.on('data', chunk => (endpointData += chunk));
      res.on('end', () => callback(null));
    });

    req.end();

    req.on('error', error => callback(error));
  }
}