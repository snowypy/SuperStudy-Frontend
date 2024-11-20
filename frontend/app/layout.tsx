import './globals.css'
import { Inter } from 'next/font/google'
import { AuthProvider } from './auth-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'SuperStudy',
  description: 'A powerful study tool with flash cards',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}