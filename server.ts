import { v4 } from 'https://deno.land/std/uuid/mod.ts';

import {
  Application,
  Router,
  helpers,
} from 'https://deno.land/x/oak/mod.ts';

import models from './models/index.ts';

const port = 8000;
const app = new Application();

const router = new Router();

router.get('/session', (ctx) => {
  ctx.response.body = ctx.state.models.users.get(ctx.state.me.id);
});

router.get('/users', (ctx) => {
  ctx.response.body = Array.from(ctx.state.models.users.values());
});

router.get('/users/:userId', (ctx) => {
  const { userId } = helpers.getQuery(ctx, { mergeParams: true });
  ctx.response.body = ctx.state.models.users.get(userId);
});

router.get('/messages', (ctx) => {
  ctx.response.body = Array.from(ctx.state.models.messages.values());
});

router.get('/messages/:messageId', (ctx) => {
  const { messageId } = helpers.getQuery(ctx, { mergeParams: true });
  ctx.response.body = ctx.state.models.messages.get(messageId);
});

router.post('/messages', async (ctx) => {
  const id = v4.generate();

  const {
    value: { text },
  } = await ctx.request.body();

  ctx.state.models.messages.set(id, {
    id,
    text,
    userId: ctx.state.me.id,
  });

  ctx.response.body = ctx.state.models.messages.get(id);
});

router.delete('/messages/:messageId', async (ctx) => {
  const { messageId } = helpers.getQuery(ctx, { mergeParams: true });

  const isDeleted = ctx.state.models.messages.delete(messageId);

  ctx.response.body = isDeleted;
});

app.use(async (ctx, next) => {
  ctx.state = {
    models,
    me: models.users.get('1'),
  };

  await next();
});

app.use(router.allowedMethods());
app.use(router.routes());

app.addEventListener('listen', () => {
  console.log(`Listening on: localhost:${port}`);
});

await app.listen({ port });
