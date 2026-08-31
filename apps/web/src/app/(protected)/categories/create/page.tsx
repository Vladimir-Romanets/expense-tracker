import type { Metadata } from 'next'
import { Typography } from '@/shared/ui'
import { AddCategoryForm } from '@/features/categories'

export const metadata: Metadata = {
  title: 'Create Category | Expense Tracker',
}

const CreateCategoryPage = async () => {
  return (
    <>
      <Typography
        variant="muted"
        className="mb-6"
      >
        Add a new category to organize your expenses.
      </Typography>

      <div className="w-full max-w-3xl">
        <AddCategoryForm onSuccessRedirect="/categories" />
      </div>
    </>
  )
}

export default CreateCategoryPage
