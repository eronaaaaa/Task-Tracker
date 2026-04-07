"use client";

import Link from "next/link";
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  Divider,
} from "@mui/material";

export default function LoginPage() {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        bgcolor: "#f9fafb",
        p: 2,
      }}
    >
      <Card
        sx={{ width: "100%", maxWidth: 400 }}
        elevation={0}
        variant="outlined"
      >
        <CardContent sx={{ p: 3 }}>
          <Typography variant="h5" fontWeight={600} mb={0.5}>
            Sign in
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={3}>
            Enter your credentials to access your tasks
          </Typography>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              id="email"
              label="Email"
              type="email"
              placeholder="you@example.com"
              fullWidth
              size="small"
            />
            <TextField
              id="password"
              label="Password"
              type="password"
              placeholder="••••••••"
              fullWidth
              size="small"
            />
          </Box>

          <Button variant="contained" fullWidth size="large" sx={{ mt: 3 }}>
            Sign in
          </Button>

          <Divider sx={{ my: 2 }} />

          <Typography variant="body2" textAlign="center" color="text.secondary">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              style={{ color: "#4f46e5", textDecoration: "none" }}
            >
              Sign up
            </Link>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
