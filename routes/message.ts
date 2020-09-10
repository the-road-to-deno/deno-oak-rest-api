import { Router, helpers } from 'https://deno.land/x/oak/mod.ts';
import { v4 } from 'https://deno.land/std/uuid/mod.ts';

const router = new Router();

router.get('/messages', (ctx) => {
  ctx.response.body = Array.from(ctx.state.models.messages.values());
});

router.get('/messages/:messageId', (ctx) => {
  const { messageId } = helpers.getQuery(ctx, { mergeParams: true });
  ctx.response.body = ctx.state.models.messages.get(messageId);
});

router.post('/messages', async (ctx) => {
  const id = v4.generate();

  const { value } = ctx.request.body({ type: 'json' });
  const { text } = await value;

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

export default router;
