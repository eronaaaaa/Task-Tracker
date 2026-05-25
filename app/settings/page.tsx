import { requireUser, getUserProfile } from '@/lib/auth/getUser'
import ProfileSection from '@/components/settings/ProfileSection'
import SecuritySection from '@/components/settings/SecuritySection'
import DangerZone from '@/components/settings/DangerZone'

export default async function SettingsPage() {
  const [user, profile] = await Promise.all([
    requireUser(),
    getUserProfile(),
  ])

  return (
    <main className="p-6 max-w-2xl">
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-gray-900">Settings</h1>
        <p className="text-sm text-gray-400 mt-0.5">
          Manage your account preferences
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <ProfileSection
          initialName={profile?.name ?? user.user_metadata?.name ?? ''}
          initialEmail={user.email ?? ''}
        />
        <SecuritySection />
        <DangerZone />
      </div>
    </main>
  )
}