"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import type { Task } from "@/lib/tasks";

type Filter = "all" | "todo" | "done";

type Props = {
  tasks: Task[];
};

export default function TaskFilter({ tasks }: Props) {
  const [filter, setFilter] = useState<Filter>("all");

  const filtered = tasks.filter((t) => {
    if (filter === "all") return true;
    return t.status === filter;
  });

  const filters: { label: string; value: Filter }[] = [
    { label: `All (${tasks.length})`, value: "all" },
    {
      label: `To do (${tasks.filter((t) => t.status === "todo").length})`,
      value: "todo",
    },
    {
      label: `Done (${tasks.filter((t) => t.status === "done").length})`,
      value: "done",
    },
  ];

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-1.5 p-1 bg-gray-100/80 rounded-xl w-fit">
        {filters.map(({ label, value }) => (
          <button
            key={value}
            onClick={() => setFilter(value)}
            className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-all ${
              filter === value
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <TaskTableFiltered tasks={filtered} filter={filter} />
    </div>
  );
}

import TaskTable from "@/components/TaskTable";

function TaskTableFiltered({
  tasks,
  filter,
}: {
  tasks: Task[];
  filter: "all" | "todo" | "done";
}) {
  return <TaskTable tasks={tasks} filter={filter} />;
}
