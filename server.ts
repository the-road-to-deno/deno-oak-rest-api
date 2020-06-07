import {
  Application,
  Router,
  helpers,
} from 'https://deno.land/x/oak/mod.ts';

const port = 8000;
const app = new Application();

const router = new Router();

router.get('/users', (ctx) => {
  ctx.response.body = 'GET HTTP method on user resource';
});

router.post('/users', (ctx) => {
  ctx.response.body = 'POST HTTP method on user resource';
});

router.put('/users/:userId', (ctx) => {
  const { userId } = helpers.getQuery(ctx, { mergeParams: true });
  ctx.response.body = `PUT HTTP method on user/${userId} resource`;
});

router.delete('/users/:userId', (ctx) => {
  const { userId } = helpers.getQuery(ctx, { mergeParams: true });
  ctx.response.body = `PUT DELETE method on user/${userId} resource`;
});

app.use(router.allowedMethods());
app.use(router.routes());

app.addEventListener('listen', () => {
  console.log(`Listening on: localhost:${port}`);
});

await app.listen({ port });
