import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Checkbox } from './Checkbox'

const meta = {
  title: 'UI/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'Select product',
  },
}

export const Checked: Story = {
  args: {
    label: 'Select product',
    defaultChecked: true,
  },
}

export const ErrorState: Story = {
  args: {
    label: 'Accept terms',
    error: 'This field is required',
  },
}

export const Disabled: Story = {
  args: {
    label: 'Select product',
    disabled: true,
  },
}
