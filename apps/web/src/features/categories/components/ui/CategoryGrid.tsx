import { CategoryEntity } from '../../types'
import { CategoryCard } from './CategoryCard'

type Props = {
  categories: CategoryEntity[]
}

export const CategoryGrid = ({ categories }: Props) => (
  <ul className="grid grid-cols-1 gap-2.5 md:grid-cols-2 xl:grid-cols-4">
    {categories.map((card) => (
      <CategoryCard
        key={card.id}
        {...card}
      />
    ))}
  </ul>
)
