'use client'

const CategoriesError = ({ error }: { error: Error }) => {
  return <p>Failed to load categories: {error.message}</p>
}

export default CategoriesError
