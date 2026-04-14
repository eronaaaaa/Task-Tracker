import type { Metadata } from 'next'
import './globals.css'
import Sidebar from '@/components/Sidebar'
import MobileHeader from '@/components/MobileHeader'
import MuiProvider from '@/components/MuiProvider'
import EmotionRegistry from '@/components/EmotionRegistry'
import { Box } from '@mui/material'

export const metadata: Metadata = {
  title: 'Task Tracker',
  description: 'A simple task management app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <EmotionRegistry>
          <MuiProvider>
            <Box sx={{ display: 'flex', minHeight: '100vh' }}>
              <Sidebar />
              <Box
                component="main"
                sx={{
                  flexGrow: 1,
                  bgcolor: 'background.default',
                  minHeight: '100vh',
                  ml: { xs: 0, md: '220px' },
                }}
              >
                <MobileHeader />
                {children}
              </Box>
            </Box>
          </MuiProvider>
        </EmotionRegistry>
      </body>
    </html>
  )
}