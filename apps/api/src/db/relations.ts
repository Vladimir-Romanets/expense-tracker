import { defineRelations } from "drizzle-orm";
import * as schema from "./schema";

export const relations = defineRelations(schema, (relation) => ({
  users: {
    receipts: relation.many.receipts(),
  },
  stores: {
    receipts: relation.many.receipts(),
  },
  categories: {
    products: relation.many.products(),
  },
  products: {
    categories: relation.one.categories({
      from: relation.products.categoryId,
      to: relation.categories.id,
    }),
    receiptItems: relation.many.receiptItems(),
  },
  receipts: {
    users: relation.one.users({
      from: relation.receipts.userId,
      to: relation.users.id,
    }),
    stores: relation.one.stores({
      from: relation.receipts.storeId,
      to: relation.stores.id,
    }),
    items: relation.many.receiptItems(),
  },
  receiptItems: {
    receipts: relation.one.receipts({
      from: relation.receiptItems.receiptId,
      to: relation.receipts.id,
    }),
    products: relation.one.products({
      from: relation.receiptItems.receiptId,
      to: relation.products.id,
    }),
  },
}));
