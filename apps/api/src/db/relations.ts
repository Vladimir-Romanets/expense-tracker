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
      from: relation.categories.id,
      to: relation.products.categoryId,
    }),
    receiptItems: relation.many.receiptItems(),
  },
  receipts: {
    users: relation.one.users({
      from: relation.users.id,
      to: relation.receipts.userId,
    }),
    stores: relation.one.stores({
      from: relation.stores.id,
      to: relation.receipts.storeId,
    }),
    items: relation.many.receiptItems(),
  },
  receiptItems: {
    receipts: relation.one.receipts({
      from: relation.receipts.id,
      to: relation.receiptItems.receiptId,
    }),
    products: relation.one.products({
      from: relation.products.id,
      to: relation.receiptItems.productId,
    }),
  },
}));
