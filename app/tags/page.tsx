import { getTags } from '@/lib/data/tags'
import { requireUser } from '@/lib/auth/getUser'
import PageHeader from '@/components/PageHeader'
import TagList from '@/components/tags/TagList'

export default async function TagsPage() {
  await requireUser()
  const tags = await getTags()

  return (
    <main className="p-6 max-w-2xl">
      <div className="mb-6">
        <PageHeader
          title="Tags"
          description="Organise your tasks with tags."
        />
      </div>
      <TagList initialTags={tags} />
    </main>
  )
}