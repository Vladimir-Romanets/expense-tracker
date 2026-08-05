import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Expense Tracker',
    short_name: 'ET',
    start_url: '/',
    description:
      'Expense Tracker application. It provides a dashboard for detailed purchase entry, price dynamics visualization, and budget limit monitoring.',
    icons: [
      {
        src: '/icons/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icons/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/icons/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
        purpose: 'any',
      },
    ],
    theme_color: '#ffffff',
    background_color: '#ffffff',
    display: 'minimal-ui',
  }
}
