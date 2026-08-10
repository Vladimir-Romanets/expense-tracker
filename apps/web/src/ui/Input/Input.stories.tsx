import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Input } from './Input'

const meta = {
  title: 'UI/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    hideNativeControl: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    placeholder: 'Enter text here...',
  },
}

export const ErrorState: Story = {
  args: {
    placeholder: 'Invalid input',
    error: 'Not valid e-mail',
    defaultValue: 'some-mail@domain.',
  },
}

export const TypePassword: Story = {
  args: {
    value: 'qwe123',
    type: 'password',
    placeholder: 'Enter your password',
  },
}
