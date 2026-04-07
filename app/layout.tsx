import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import MuiProvider from "@/components/MuiProvider";

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
    <html lang="en">
      <body>
        <MuiProvider> 
          {/* added MuiProvider to prevent hydration warnings */}
          <div style={{ display: "flex", minHeight: "100vh" }}>
            <Sidebar />
            <div style={{ flex: 1 }}>{children}</div>
          </div>
        </MuiProvider>
      </body>
    </html>
  );
}
