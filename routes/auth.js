var express = require("express");
var http = require("http")
var requesthelper =require('../helpers/requestHelper');
var authhelper =require('../helpers/authHelper');
var subscriptionConfiguration =require('../constants').subscriptionConfiguration;
var dbHelper =require('../helpers/dbHelper');
var authRouter = express.Router();

// Redirect to start page
authRouter.get('/', (req, res) => {
  res.redirect('/index.html');
});

authRouter.get('/signin', (req, res) => {
  console.log("find the signin")
  res.redirect(authhelper.getAuthUrl());
  
});

authRouter.get('/callback', (req, res, next) => {
   authhelper.getTokenFromCode(req.query.code, (authenticationError, token) => {
    if (token) {
     
      // Request this subscription to expire one day from now.
      // Note: 1 day = 86400000 milliseconds
      console.log(token.accessToken)
      
      subscriptionConfiguration.expirationDateTime = new Date(Date.now() + 86400000).toISOString();
        // Make the request to subscription service.
      requesthelper.postData(
        '/v1.0/subscriptions',
        token.accessToken,
        JSON.stringify(subscriptionConfiguration),
        (requestError, subscriptionData) => {
          if (subscriptionData) {
            subscriptionData.userId = token.userId;
            subscriptionData.accessToken = token.accessToken;
            dbHelper.saveSubscription(subscriptionData, null);

            // The name of the property coming from the service might change from
            // subscriptionId to id in the near future.
            res.redirect(
              '/home.html?subscriptionId=' + subscriptionData.id +
              '&userId=' + subscriptionData.userId
            );
          } else if (requestError) {
            res.status(500);
            next(requestError);
          }
        }
      );
    }
   })
});
// Start authentication flow
module.exports = authRouter