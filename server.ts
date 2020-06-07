import {
  Application,
  Router,
  Context,
} from 'https://deno.land/x/oak/mod.ts';

const port = 8000;
const app = new Application();

const routerOne = new Router();

routerOne.get('/1', (ctx) => {
  ctx.response.body = 'Hello Deno 1';
});

const routerTwo = new Router();

routerTwo.get('/2', (ctx) => {
  ctx.response.body = 'Hello Deno 2';
});

app.use(routerOne.routes());
app.use(routerOne.allowedMethods());

app.use(routerTwo.routes());
app.use(routerTwo.allowedMethods());

const logging = async (ctx: Context, next: Function) => {
  console.log(`HTTP ${ctx.request.method} on ${ctx.request.url}`);
  await next();
};

app.use(logging);

app.use((ctx) => {
  console.log('returning a response ...');
  ctx.response.body = 'Hello Deno';
});

app.addEventListener('listen', () => {
  console.log(`Listening on: localhost:${port}`);
});

await app.listen({ port });
