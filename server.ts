import {
  Application,
  Router,
  helpers,
} from 'https://deno.land/x/oak/mod.ts';

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

const port = 8000;
const app = new Application();

const router = new Router();

router.get('/users', (ctx) => {
  ctx.response.body = Array.from(users.values());
});

router.get('/users/:userId', (ctx) => {
  const { userId } = helpers.getQuery(ctx, { mergeParams: true });
  ctx.response.body = users.get(userId);
});

router.get('/messages', (ctx) => {
  ctx.response.body = Array.from(messages.values());
});

router.get('/messages/:messageId', (ctx) => {
  const { messageId } = helpers.getQuery(ctx, { mergeParams: true });
  ctx.response.body = messages.get(messageId);
});

app.use(router.allowedMethods());
app.use(router.routes());

app.addEventListener('listen', () => {
  console.log(`Listening on: localhost:${port}`);
});

await app.listen({ port });
