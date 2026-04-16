import PageHeader from "@/components/PageHeader";
import DangerZone from "@/components/settings/DangerZone";
import ProfileSection from "@/components/settings/ProfileSection";
import SecuritySection from "@/components/settings/SecuritySection";

export default function SettingsPage() {
  return (
    <main className="p-6 max-w-2xl mx-auto">
      <div className="mb-6">
        <PageHeader
          title="Settings"
          description="Manage your account preferences."
        />
      </div>

      <div className="flex flex-col gap-4">
        <ProfileSection />
        <SecuritySection />
        <DangerZone />
      </div>
    </main>
  );
}
