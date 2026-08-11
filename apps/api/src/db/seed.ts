import 'dotenv/config'
import { db } from './'
import { categories, stores } from './schema'

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
  },
  {
    name: 'Meat & Poultry',
    description: 'Beef, pork, chicken, turkey, sausages, and bacon.',
    isSystem: true,
  },
  {
    name: 'Seafood',
    description: 'Fresh fish, frozen shrimp, salmon, tuna, and shellfish.',
    isSystem: true,
  },
  {
    name: 'Produce',
    description: 'Fresh vegetables, fruits, berries, herbs, and salad greens.',
    isSystem: true,
  },
  {
    name: 'Bakery & Bread',
    description: 'Sliced bread, buns, pita, tortillas, pastries, and cakes.',
    isSystem: true,
  },
  {
    name: 'Pantry & Groceries',
    description: 'Rice, pasta, flour, sugar, oil, sauces, spices, and canned food.',
    isSystem: true,
  },
  {
    name: 'Breakfast & Cereal',
    description: 'Oatmeal, cornflakes, muesli, granola, and maple syrup.',
    isSystem: true,
  },
  {
    name: 'Beverages',
    description: 'Water, juice, soda, coffee, tea, energy drinks, and alcohol.',
    isSystem: true,
  },
  {
    name: 'Snacks',
    description: 'Chips, crackers, nuts, popcorn, and pretzels.',
    isSystem: true,
  },
  {
    name: 'Candy',
    description: 'Chocolate, gummy candy, lollipops, and sweets.',
    isSystem: true,
  },
  {
    name: 'Frozen Foods',
    description: 'Ice cream, frozen pizzas, ready meals, and frozen vegetables.',
    isSystem: true,
  },
  {
    name: 'Deli & Prepared Foods',
    description: 'Sliced ham, rotisserie chicken, prepared salads, and olives.',
    isSystem: true,
  },
  {
    name: 'Laundry & Detergents',
    description: 'Washing powders, liquid detergents, fabric softeners, and stain removers.',
    isSystem: true,
  },
  {
    name: 'Household Goods',
    description: 'Cleaning supplies, paper towels, trash bags, and tableware.',
    isSystem: true,
  },
  {
    name: 'Electronics',
    description: 'Small appliances, batteries, chargers, and basic consumer electronics.',
    isSystem: true,
  },
  {
    name: 'Fuel & Gasoline',
    description: 'Petrol, diesel, car fluids, and gas station convenience products.',
    isSystem: true,
  },
]

async function main() {
  console.info('🌱 Start fill in DB with data...')

  await db.insert(categories).values(categoriesSeed).onConflictDoNothing()
  await db.insert(stores).values(storesSeed).onConflictDoNothing()

  console.info('✅ Seeding completed successfully')
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('❌ Seeding error:', err)
    process.exit(1)
  })
