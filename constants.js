exports.adalConfiguration = {
  authority: 'https://login.microsoftonline.com/common',
  clientID: 'cc885a9e-c825-4843-b466-4ebd9425a709',
  clientSecret: 'h2wgQRFv9YfodSqjUXACIE3fzCofK6Lk9iixQxU9aWw=',
  redirectUri: 'http://localhost:3000/callback'
};

exports.subscriptionConfiguration = {
  changeType: 'Created,Updated',
  notificationUrl: 'https://8ce1e797.ngrok.io/listen',
  resource: 'me/mailFolders(\'Inbox\')/messages',
  clientState: 'cLIENTsTATEfORvALIDATION'
};
