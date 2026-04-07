import { Box, Typography } from "@mui/material";

type PageHeaderProps = {
  title: string;
  description?: string;
};

export default function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <Box>
      <Typography variant="h5" component="h1">
        {title}
      </Typography>
      {description && (
        <Typography variant="body2" color="text.secondary" mt={0.5}>
          {description}
        </Typography>
      )}
    </Box>
  );
}
