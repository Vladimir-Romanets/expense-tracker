import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Textarea } from './Textarea'

const meta = {
  title: 'UI/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  argTypes: {
    disabled: { control: 'boolean' },
    error: { control: 'text' },
  },
} satisfies Meta<typeof Textarea>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    placeholder: 'Enter your message...',
  },
}

export const WithLabel: Story = {
  args: {
    label: 'Description',
    placeholder: 'Enter a detailed description...',
  },
}

export const WithError: Story = {
  args: {
    label: 'Description',
    placeholder: 'Enter a detailed description...',
    error: 'This field is required',
  },
}

export const Disabled: Story = {
  args: {
    label: 'Description',
    placeholder: 'You cannot edit this...',
    disabled: true,
  },
}
