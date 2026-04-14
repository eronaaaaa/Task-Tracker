import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import MuiProvider from "@/components/MuiProvider";
import EmotionRegistry from "@/components/EmotionRegistry";
import { Box } from "@mui/material";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: "Task Tracker",
  description: "A simple task management app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn("font-sans", inter.variable)}>
      <body suppressHydrationWarning>
        <EmotionRegistry>
          <MuiProvider>
            <Box sx={{ display: "flex", minHeight: "100vh" }}>
              <Sidebar />
              <Box
                component="main"
                sx={{
                  flexGrow: 1,
                  bgcolor: "background.default",
                  minHeight: "100vh",
                  ml: "220px",
                }}
              >
                {children}
              </Box>
            </Box>
          </MuiProvider>
        </EmotionRegistry>
      </body>
    </html>
  );
}
