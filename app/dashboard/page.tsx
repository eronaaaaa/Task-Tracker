import { getTasks, getTaskStats } from "@/lib/tasks";
import PageHeader from "@/components/PageHeader";
import TaskCard from "@/components/TaskCard";
import AddTaskButton from "@/components/AddTaskButton";
import StatsBar from "@/components/StatsBar";
import { Box, Grid } from "@mui/material";

//this dashboard page in itself is a server component, it has no use client
//but it can render AddTaskButton which is a client component
//server components can render client components, but client components cannot render server components

export default async function DashboardPage() {
  const [tasks, stats] = await Promise.all([getTasks(), getTaskStats()]);

  return (
    <Box sx={{ p: 3 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          mb: 3,
        }}
      >
        <PageHeader
          title="Dashboard"
          description="Here's what's on your plate today."
        />
        <AddTaskButton />
      </Box>

      <StatsBar total={stats.total} done={stats.done} todo={stats.todo} />

      <Grid container spacing={2}>
        {tasks.map((task) => (
          <Grid key={task.id} size={{ xs: 12, sm: 6, md: 4 }}>
            <TaskCard task={task} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
