export type Tag = {
  id: string;
  name: string;
  color: string;
};

export type Task = {
  id: string;
  title: string;
  status: "todo" | "done";
  dueDate: string | null;
  createdAt: string;
  description: string | null;
  tags: Tag[]; // ← add this
};

export async function getTags(): Promise<Tag[]> {
  return [
    { id: "1", name: "work", color: "#6366f1" },
    { id: "2", name: "personal", color: "#f59e0b" },
    { id: "3", name: "urgent", color: "#ef4444" },
    { id: "4", name: "design", color: "#8b5cf6" },
    { id: "5", name: "backend", color: "#10b981" },
  ];
}

export async function getTagById(id: string): Promise<Tag | null> {
  const tags = await getTags();
  return tags.find((t) => t.id === id) ?? null;
}

export async function getTaskById(id: string): Promise<Task | null> {
  const tasks = await getTasks();
  return tasks.find((t) => t.id === id) ?? null;
}

export async function getTaskStats() {
  const tasks = await getTasks();
  return {
    total: tasks.length,
    done: tasks.filter((t) => t.status === "done").length,
    todo: tasks.filter((t) => t.status === "todo").length,
  };
}

async function simulateDelay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function getTasks(): Promise<Task[]> {
  await simulateDelay(100);

  return [
    {
      id: "1",
      title: "Set up Next.js project",
      status: "done",
      dueDate: "2026-04-01",
      createdAt: "2026-04-01",
      description:
        "Initialize the project with TypeScript, ESLint, and App Router.",
      tags: [
        { id: "1", name: "work", color: "#6366f1" },
        { id: "5", name: "backend", color: "#10b981" },
      ],
    },
    {
      id: "2",
      title: "Build login page",
      status: "done",
      dueDate: "2026-04-02",
      createdAt: "2026-04-01",
      description: "Create the login and signup forms using MUI components.",
      tags: [
        { id: "1", name: "work", color: "#6366f1" },
        { id: "4", name: "design", color: "#8b5cf6" },
      ],
    },
    {
      id: "3",
      title: "Connect Supabase",
      status: "todo",
      dueDate: "2026-04-10",
      createdAt: "2026-04-02",
      description: "Set up Supabase project and configure PostgreSQL tables.",
      tags: [
        { id: "1", name: "work", color: "#6366f1" },
        { id: "3", name: "urgent", color: "#ef4444" },
        { id: "5", name: "backend", color: "#10b981" },
      ],
    },
    {
      id: "4",
      title: "Implement auth",
      status: "todo",
      dueDate: "2026-04-12",
      createdAt: "2026-04-02",
      description: null,
      tags: [{ id: "3", name: "urgent", color: "#ef4444" }],
    },
    {
      id: "5",
      title: "Build CRUD operations",
      status: "todo",
      dueDate: "2026-04-15",
      createdAt: "2026-04-03",
      description: null,
      tags: [],
    },
  ];
}
