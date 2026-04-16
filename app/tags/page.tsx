import { getTags } from "@/lib/tasks";
import PageHeader from "@/components/PageHeader";
import TagList from "@/components/tags/TagList";

export default async function TagsPage() {
  const tags = await getTags();

  return (
    <main className="p-6 max-w-full">
      <div className="mb-6">
        <PageHeader title="Tags" description="Organise your tasks with tags." />
      </div>
      <TagList initialTags={tags} />
    </main>
  );
}
