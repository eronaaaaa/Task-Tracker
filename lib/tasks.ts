export type Task = {
  id: string;
  title: string;
  status: "todo" | "done";
  dueDate: string | null;
  createdAt: string;
  description: string | null;
};

async function simulateDelay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function getTasks(): Promise<Task[]> {
  await simulateDelay(200);

  return [
    {
      id: "1",
      title: "Set up Next.js project",
      status: "done",
      dueDate: "2026-04-01",
      createdAt: "2026-04-01",
      description:
        "Initialize the project with TypeScript, ESLint, and App Router. Set up the folder structure and install base dependencies.",
    },
    {
      id: "2",
      title: "Build login page",
      status: "done",
      dueDate: "2026-04-02",
      createdAt: "2026-04-01",
      description:
        "Create the login and signup forms using MUI components. Add form validation and error states.",
    },
    {
      id: "3",
      title: "Connect Supabase",
      status: "todo",
      dueDate: "2026-04-10",
      createdAt: "2026-04-02",
      description:
        "Set up Supabase project, configure PostgreSQL tables, and install the Supabase JS client.",
    },
    {
      id: "4",
      title: "Implement auth",
      status: "todo",
      dueDate: "2026-04-12",
      createdAt: "2026-04-02",
      description: null,
    },
    {
      id: "5",
      title: "Build CRUD operations",
      status: "todo",
      dueDate: "2026-04-15",
      createdAt: "2026-04-03",
      description: null,
    },
  ];
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
