import { Box, Paper, Typography } from '@mui/material'

type StatsBarProps = {
  total: number
  done: number
  todo: number
}

export default function StatsBar({ total, done, todo }: StatsBarProps) {
  const stats = [
    { label: 'Total', value: total, color: 'text.primary' },
    { label: 'To do', value: todo, color: 'primary.main' },
    { label: 'Done', value: done, color: 'success.main' },
  ]

  return (
    <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
      {stats.map(({ label, value, color }) => (
        <Paper
          key={label}
          variant="outlined"
          sx={{ px: 2.5, py: 1.5, minWidth: 80 }}
        >
          <Typography variant="h5" fontWeight={600} color={color}>
            {value}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {label}
          </Typography>
        </Paper>
      ))}
    </Box>
  )
}