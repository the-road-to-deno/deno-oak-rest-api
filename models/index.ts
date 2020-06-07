interface User {
  id: string;
  username: string;
}

const users = new Map<string, User>();

users.set('1', {
  id: '1',
  username: 'Robin Wieruch',
});

users.set('2', {
  id: '2',
  username: 'Dave Davids',
});

interface Message {
  id: string;
  text: string;
  userId: string;
}

const messages = new Map<string, Message>();

messages.set('1', {
  id: '1',
  text: 'Hello World',
  userId: '1',
});

messages.set('2', {
  id: '2',
  text: 'By World',
  userId: '2',
});

export default {
  users,
  messages,
};
