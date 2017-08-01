var fs = require('fs');
var sql = require('sqlite3');

var dbFile = './helpers/database.sqlite3';
var sqlite3 = sql.verbose();

module.exports = {
  /**
 * Create SQLite3 table Subscription.
 */
  createDatabase: function () {
    const dbExists = fs.existsSync(dbFile);
    const db = new sqlite3.Database(dbFile);
    const createSubscriptionStatement = 'CREATE TABLE Subscription (UserId TEXT NOT NULL, SubscriptionId TEXT NOT NULL, A' +
        'ccessToken TEXT NOT NULL, Resource TEXT NOT NULL, ChangeType TEXT NOT NULL, Clie' +
        'ntState TEXT NOT NULL, NotificationUrl TEXT NOT NULL, SubscriptionExpirationDate' +
        'Time TEXT NOT NULL)';

    db.serialize(() => {
      if (!dbExists) {
        db.run(createSubscriptionStatement, [], error => {
          if (error !== null) 
            throw error;
          }
        );
      }
    });
    db.close();
  },

  getSubscription: function (subscriptionId, callback) {
    const db = new sqlite3.Database(dbFile);
    const getUserDataStatement = 'SELECT UserId as userId, SubscriptionId as subscriptionId, AccessToken as access' +
        'Token, Resource as resource, ChangeType as changeType, ClientState as clientStat' +
        'e, NotificationUrl as notificationUrl, SubscriptionExpirationDateTime as subscri' +
        'ptionExpirationDateTime FROM Subscription WHERE SubscriptionId = $subscriptionId' +
        ' AND SubscriptionExpirationDateTime > datetime(\'now\')';

    db.serialize(() => {
      db.get(getUserDataStatement, {
        $subscriptionId: subscriptionId
      }, callback);
    });
  },

  saveSubscription: function (subscriptionData, callback) {
    const db = new sqlite3.Database(dbFile);
    const insertStatement = 'INSERT INTO Subscription (UserId, SubscriptionId, AccessToken, Resource, ChangeT' +
        'ype, ClientState, NotificationUrl, SubscriptionExpirationDateTime) VALUES ($user' +
        'Id, $subscriptionId, $accessToken, $resource, $changeType, $clientState, $notifi' +
        'cationUrl, $subscriptionExpirationDateTime)';

    db.serialize(() => {
      db.run(insertStatement, {
        $userId: subscriptionData.userId,
        $subscriptionId: subscriptionData.id,
        $accessToken: subscriptionData.accessToken,
        $resource: subscriptionData.resource,
        $clientState: subscriptionData.clientState,
        $changeType: subscriptionData.changeType,
        $notificationUrl: subscriptionData.notificationUrl,
        $subscriptionExpirationDateTime: subscriptionData.expirationDateTime
      }, callback);
    });
  },

  deleteSubscription: function (subscriptionId, callback) {
    const db = new sqlite3.Database(dbFile);
    const deleteStatement = 'DELETE FROM Subscription WHERE SubscriptionId = $subscriptionId';

    db.serialize(() => {
      db.run(deleteStatement, {
        $subscriptionId: subscriptionId
      }, callback);
    });
  }

}