import { getTasks, getTaskStats } from "@/lib/tasks";
import PageHeader from "@/components/PageHeader";
import TaskCard from "@/components/TaskCard";
import AddTaskButton from "@/components/AddTaskButton";
import StatsBar from "@/components/StatsBar";

//this dashboard page in itself is a server component, it has no use client
//but it can render AddTaskButton which is a client component
//server components can render client components, but client components cannot render server components

export default async function DashboardPage() {
  const [tasks, stats] = await Promise.all([getTasks(), getTaskStats()]);

  return (
    <main style={{ padding: "2rem" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: "1.5rem",
        }}
      >
        <PageHeader
          title="Dashboard"
          description="Here's what's on your plate today."
        />
        <AddTaskButton />
      </div>

      <StatsBar total={stats.total} done={stats.done} todo={stats.todo} />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "1rem",
        }}
      >
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </main>
  );
}
