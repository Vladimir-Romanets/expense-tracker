'use client'

import { CategoryEntity } from '../../types'
import { CategoryCard } from './CategoryCard'
import { deleteCategory } from '../../actions/deleteCategory'

type Props = {
  categories: CategoryEntity[]
}

export const CategoryGrid = ({ categories }: Props) => (
  <ul className="grid grid-cols-1 gap-2.5 md:grid-cols-2 lg:grid-cols-4">
    {categories.map((card) => (
      <CategoryCard
        key={card.id}
        {...card}
        onDelete={deleteCategory}
      />
    ))}
  </ul>
)
