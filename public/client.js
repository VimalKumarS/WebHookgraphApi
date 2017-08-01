const socket = io.connect('http://localhost:3001'); // eslint-disable-line no-undef

// Socket `notification_received` event handler.
socket.on('notification_received', mailData => {
  const listItem = document.createElement('div');
  listItem.className = 'ms-ListItem is-selectable';
  listItem.onclick = () => {
    window.open(mailData.webLink, 'outlook');
  };

  const primaryText = document.createElement('span');
  primaryText.className = 'ms-ListItem-primaryText';
  primaryText.innerText = mailData.sender.emailAddress.name;

  const secondaryText = document.createElement('span');
  secondaryText.className = 'ms-ListItem-secondaryText';
  secondaryText.innerText = mailData.subject;

  listItem.appendChild(primaryText);
  listItem.appendChild(secondaryText);

  document.getElementById('notifications').appendChild(listItem);
});

// When the page first loads, create the socket room.
const subscriptionId = getQueryStringParameter('subscriptionId');
socket.emit('create_room', subscriptionId);
document.getElementById('subscriptionId').innerHTML = subscriptionId;

// The page also needs to send the userId to properly sign out the user.
const userId = getQueryStringParameter('userId');
document.getElementById('userId').innerHTML = userId;
document.getElementById('signOutButton').onclick = () => {
  location.href = '/signout/' + subscriptionId;
};

function getQueryStringParameter(paramToRetrieve) {
  const params = document.URL.split('?')[1].split('&');

  for (let i = 0; i < params.length; i++) {
    const singleParam = params[i].split('=');

    if (singleParam[0] === paramToRetrieve) return singleParam[1];
  }
  return null;
}
