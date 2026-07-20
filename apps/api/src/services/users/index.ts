import { usersModel } from '@models';
import { users } from '@db/schema';

type UserBasic = typeof users.$inferInsert;

const create = async (user: UserBasic) => {
  const result = await usersModel.create(user);

  return result[0];
};

export default {
  create,
};
