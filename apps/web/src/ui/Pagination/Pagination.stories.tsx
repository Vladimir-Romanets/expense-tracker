import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { fn } from 'storybook/test'
import { useState } from 'react'
import { Pagination } from './Pagination'

const meta = {
  title: 'UI/Pagination',
  component: Pagination,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    onPageChange: fn(),
  },
} satisfies Meta<typeof Pagination>

export default meta
type Story = StoryObj<typeof meta>

const defaultMeta = {
  page: 1,
  limit: 10,
  total: 145,
  totalPages: 15,
  hasNextPage: true,
  hasPrevPage: false,
}

// --- STATIC STATES (For Documentation) ---

export const FirstPage: Story = {
  args: {
    meta: defaultMeta,
  },
}

export const MiddlePage: Story = {
  args: {
    meta: {
      ...defaultMeta,
      page: 8,
      hasPrevPage: true,
    },
  },
}

export const LastPage: Story = {
  args: {
    meta: {
      ...defaultMeta,
      page: 15,
      hasNextPage: false,
      hasPrevPage: true,
    },
  },
}

export const FewPages: Story = {
  args: {
    meta: {
      page: 2,
      limit: 10,
      total: 40,
      totalPages: 4,
      hasNextPage: true,
      hasPrevPage: true,
    },
  },
}

export const WithLinks: Story = {
  args: {
    meta: {
      ...defaultMeta,
      page: 5,
      hasPrevPage: true,
    },
    createPageUrl: (page: number) => `?page=${page}`,
  },
}

// --- INTERACTIVE VERSION (For Testing) ---

export const Interactive: Story = {
  // Required by TS because 'meta' is a required prop in PaginationProps
  args: {
    meta: defaultMeta,
  },
  render: function Render() {
    const [page, setPage] = useState(1)
    const totalPages = 15

    return (
      <div className="flex flex-col items-center gap-4">
        <Pagination
          meta={{
            page,
            limit: 10,
            total: 145,
            totalPages,
            hasNextPage: page < totalPages,
            hasPrevPage: page > 1,
          }}
          onPageChange={setPage}
        />
        <div className="text-sm text-gray-500">
          Current page: <strong>{page}</strong>
        </div>
      </div>
    )
  },
}
