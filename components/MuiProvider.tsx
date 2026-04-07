"use client";

import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#4f46e5",
    },
  },
  typography: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  },
  shape: {
    borderRadius: 8,
  },
});

export default function MuiProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
