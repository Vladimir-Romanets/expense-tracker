import React from 'react'
import { Typography } from '@/ui'
import { AddCategoryForm } from '@/features/categories'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Create Category | Expense Tracker',
}

export default function CreateCategoryPage() {
  return (
    <div className="flex w-full flex-col gap-6 pt-6 pb-12">
      <Typography
        variant="muted"
        className="flex flex-col gap-2"
      >
        Add a new category to organize your expenses.
      </Typography>

      <div className="w-full max-w-3xl rounded-xl border border-surface-border bg-surface-card p-6 shadow-sm">
        <AddCategoryForm onSuccessRedirect="/categories" />
      </div>
    </div>
  )
}
