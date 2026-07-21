import { db } from '@db';
import { stores } from '@db/schema';

type BasicStore = typeof stores.$inferInsert;

const create = async (payload: Pick<BasicStore, 'name'>) => {
  const result = await db.insert(stores).values(payload).returning();

  return result;
};

export default {
  create,
};
