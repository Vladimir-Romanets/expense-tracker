import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Typography from './Typography';

const meta = {
  title: 'UI/Typography',
  component: Typography,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['h1', 'h2', 'h3', 'h4', 'p', 'blockquote', 'lead', 'large', 'small', 'muted', 'code', 'price'],
    },
    weight: {
      control: 'select',
      options: ['normal', 'medium', 'semibold', 'bold', 'extrabold'],
    },
    style: {
      control: 'select',
      options: ['normal', 'italic'],
    },
  },
} satisfies Meta<typeof Typography>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Heading1: Story = {
  args: {
    variant: 'h1',
    children: 'Heading 1',
  },
};

export const Paragraph: Story = {
  args: {
    variant: 'p',
    children: 'The quick brown fox jumps over the lazy dog.',
  },
};

export const LeadText: Story = {
  args: {
    variant: 'lead',
    children: 'This is a leading paragraph to catch attention.',
  },
};

export const PriceCode: Story = {
  args: {
    variant: 'price',
    children: '$99.99',
  },
};
