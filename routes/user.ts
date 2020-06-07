import { Router, helpers } from 'https://deno.land/x/oak/mod.ts';

const router = new Router();

router.get('/users', (ctx) => {
  ctx.response.body = Array.from(ctx.state.models.users.values());
});

router.get('/users/:userId', (ctx) => {
  const { userId } = helpers.getQuery(ctx, { mergeParams: true });
  ctx.response.body = ctx.state.models.users.get(userId);
});

export default router;
