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
  },
  {
    name: 'Meat & Poultry',
    description: 'Beef, pork, chicken, turkey, sausages, and bacon.',
  },
  {
    name: 'Seafood',
    description: 'Fresh fish, frozen shrimp, salmon, tuna, and shellfish.',
  },
  {
    name: 'Produce',
    description: 'Fresh vegetables, fruits, berries, herbs, and salad greens.',
  },
  {
    name: 'Bakery & Bread',
    description: 'Sliced bread, buns, pita, tortillas, pastries, and cakes.',
  },
  {
    name: 'Pantry & Groceries',
    description: 'Rice, pasta, flour, sugar, oil, sauces, spices, and canned food.',
  },
  {
    name: 'Breakfast & Cereal',
    description: 'Oatmeal, cornflakes, muesli, granola, and maple syrup.',
  },
  {
    name: 'Beverages',
    description: 'Water, juice, soda, coffee, tea, energy drinks, and alcohol.',
  },
  {
    name: 'Snacks',
    description: 'Chips, crackers, nuts, popcorn, and pretzels.',
  },
  {
    name: 'Candy',
    description: 'Chocolate, gummy candy, lollipops, and sweets.',
  },
  {
    name: 'Frozen Foods',
    description: 'Ice cream, frozen pizzas, ready meals, and frozen vegetables.',
  },
  {
    name: 'Deli & Prepared Foods',
    description: 'Sliced ham, rotisserie chicken, prepared salads, and olives.',
  },
  {
    name: 'Laundry & Detergents',
    description: 'Washing powders, liquid detergents, fabric softeners, and stain removers.',
  },
  {
    name: 'Household Goods',
    description: 'Cleaning supplies, paper towels, trash bags, and tableware.',
  },
  {
    name: 'Electronics',
    description: 'Small appliances, batteries, chargers, and basic consumer electronics.',
  },
  {
    name: 'Fuel & Gasoline',
    description: 'Petrol, diesel, car fluids, and gas station convenience products.',
  },
]

async function main() {
  console.log('🌱 Start fill in DB with data...')

  await db.insert(categories).values(categoriesSeed).onConflictDoNothing()
  await db.insert(stores).values(storesSeed).onConflictDoNothing()

  console.log('✅ Seeding completed successfully')
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('❌ Seeding error:', err)
    process.exit(1)
  })
