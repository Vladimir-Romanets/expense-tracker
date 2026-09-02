import { getCategories } from './getCategories'

export const getCategoryOptions = async () => {
  // limit of 100 - is safe to keep it hardcoded
  const categories = await getCategories({ page: 1, limit: 100 })

  const options = categories.data.map((el) => ({
    value: el.id,
    label: el.name,
  }))
  options.unshift({ label: 'Remove category', value: 0 })

  return options
}
