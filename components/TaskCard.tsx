import Link from "next/link";
import type { Task } from "@/lib/tasks";

type TaskCardProps = {
  task: Task;
};

export default function TaskCard({ task }: TaskCardProps) {
  return (
    <div
      style={{
        background: "white",
        padding: "1rem",
        borderRadius: "8px",
        border: "1px solid #e5e7eb",
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
      }}
    >
      <Link
        href={`/tasks/${task.id}`}
        style={{
          fontWeight: 500,
          fontSize: "0.95rem",
          textDecoration: "none",
          color: "#111827",
        }}
      >
        {task.title}
      </Link>
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <span
          style={{
            fontSize: "0.75rem",
            padding: "2px 8px",
            borderRadius: "20px",
            background: task.status === "done" ? "#dcfce7" : "#f3f4f6",
            color: task.status === "done" ? "#166534" : "#374151",
            fontWeight: 500,
          }}
        >
          {task.status === "done" ? "Done" : "To do"}
        </span>
        {task.dueDate && (
          <span style={{ fontSize: "0.75rem", color: "#9ca3af" }}>
            Due {task.dueDate}
          </span>
        )}
      </div>
    </div>
  );
}
