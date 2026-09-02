import type { Metadata } from 'next'
import { Typography } from '@/shared/ui'
import { ProfileForm } from '@/features/profile'

export const metadata: Metadata = {
  title: 'Profile | Expense Tracker',
  description: 'View and update your profile',
}

const ProfilePage = () => {
  return (
    <>
      <Typography
        variant="muted"
        className="mb-6"
      >
        Update your personal information and photo.
      </Typography>

      <div className="w-full max-w-3xl">
        <ProfileForm />
      </div>
    </>
  )
}

export default ProfilePage
