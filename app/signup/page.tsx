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
  Alert,
} from "@mui/material";
import { useState } from "react";

export default function SignUpPage() {
  const [error, setError] = useState("");

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        bgcolor: "background.default",
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
            Create an account
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={3}>
            Sign up to start tracking your tasks
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              id="name"
              label="Full name"
              type="text"
              placeholder="Alice Smith"
              fullWidth
              size="small"
            />
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
              helperText="Minimum 8 characters"
            />
            <TextField
              id="confirmPassword"
              label="Confirm password"
              type="password"
              placeholder="••••••••"
              fullWidth
              size="small"
            />
          </Box>

          <Button
            variant="contained"
            fullWidth
            size="large"
            sx={{ mt: 3 }}
            onClick={() => setError("Auth not wired up yet — coming Day 17!")}
          >
            Create account
          </Button>

          <Divider sx={{ my: 2 }} />

          <Typography variant="body2" textAlign="center" color="text.secondary">
            Already have an account?{" "}
            <Link
              href="/login"
              style={{ color: "#4f46e5", textDecoration: "none" }}
            >
              Sign in
            </Link>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
