import 'dotenv/config'
import { db } from './'
import { categories, stores } from './schema'
import { sql } from 'drizzle-orm'

const storesSeed = [
  {
    name: 'Lidl',
  },
  {
    name: 'Kaufland',
  },
  {
    name: 'Albert',
  },
  {
    name: 'Penny Market',
  },
  {
    name: 'Tesco',
  },
  {
    name: 'Billa',
  },
]

const categoriesSeed = [
  {
    name: 'Dairy & Eggs',
    description: 'Milk, cheese, yogurt, butter, sour cream, and eggs.',
    isSystem: true,
    imageKey: '/system/categories/dairy-eggs.webp',
  },
  {
    name: 'Meat & Poultry',
    description: 'Beef, pork, chicken, turkey, sausages, and bacon.',
    isSystem: true,
    imageKey: '/system/categories/meat-poultry.webp',
  },
  {
    name: 'Seafood',
    description: 'Fresh fish, frozen shrimp, salmon, tuna, and shellfish.',
    isSystem: true,
    imageKey: '/system/categories/seafood.webp',
  },
  {
    name: 'Produce',
    description: 'Fresh vegetables, fruits, berries, herbs, and salad greens.',
    isSystem: true,
    imageKey: '/system/categories/produce.webp',
  },
  {
    name: 'Bakery & Bread',
    description: 'Sliced bread, buns, pita, tortillas, pastries, and cakes.',
    isSystem: true,
    imageKey: '/system/categories/bakery-bread.webp',
  },
  {
    name: 'Pantry & Groceries',
    description: 'Rice, pasta, flour, sugar, oil, sauces, spices, and canned food.',
    isSystem: true,
    imageKey: '/system/categories/pantry-groceries.webp',
  },
  {
    name: 'Breakfast & Cereal',
    description: 'Oatmeal, cornflakes, muesli, granola, and maple syrup.',
    isSystem: true,
    imageKey: '/system/categories/breakfast-cereal.webp',
  },
  {
    name: 'Beverages',
    description: 'Water, juice, soda, coffee, tea, energy drinks, and alcohol.',
    isSystem: true,
    imageKey: '/system/categories/beverages.webp',
  },
  {
    name: 'Snacks',
    description: 'Chips, crackers, nuts, popcorn, and pretzels.',
    isSystem: true,
    imageKey: '/system/categories/snacks.webp',
  },
  {
    name: 'Candy',
    description: 'Chocolate, gummy candy, lollipops, and sweets.',
    isSystem: true,
    imageKey: '/system/categories/candy.webp',
  },
  {
    name: 'Frozen Foods',
    description: 'Ice cream, frozen pizzas, ready meals, and frozen vegetables.',
    isSystem: true,
    imageKey: '/system/categories/frozen-foods.webp',
  },
  {
    name: 'Deli & Prepared Foods',
    description: 'Sliced ham, rotisserie chicken, prepared salads, and olives.',
    isSystem: true,
    imageKey: '/system/categories/deli-prepared-foods.webp',
  },
  {
    name: 'Laundry & Detergents',
    description: 'Washing powders, liquid detergents, fabric softeners, and stain removers.',
    isSystem: true,
    imageKey: '/system/categories/laundry-detergents.webp',
  },
  {
    name: 'Household Goods',
    description: 'Cleaning supplies, paper towels, trash bags, and tableware.',
    isSystem: true,
    imageKey: '/system/categories/household-goods.webp',
  },
  {
    name: 'Electronics',
    description: 'Small appliances, batteries, chargers, and basic consumer electronics.',
    isSystem: true,
    imageKey: '/system/categories/electronics.webp',
  },
  {
    name: 'Fuel & Gasoline',
    description: 'Petrol, diesel, car fluids, and gas station convenience products.',
    isSystem: true,
    imageKey: '/system/categories/fuel-gasoline.webp',
  },
]

async function main() {
  console.info('🌱 Start fill in DB with data...')

  await db
    .insert(categories)
    .values(categoriesSeed)
    .onConflictDoUpdate({
      target: categories.name,
      set: {
        description: sql`excluded.description`,
        imageKey: sql`excluded.image_key`,
        isSystem: sql`excluded.is_system`,
      },
    })
  await db.insert(stores).values(storesSeed).onConflictDoNothing()

  console.info('✅ Seeding completed successfully')
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('❌ Seeding error:', err)
    process.exit(1)
  })
