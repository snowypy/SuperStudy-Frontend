import './globals.css'
import './global-styles.css'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/lib/theme-provider'
import Header from "@/app/components/header";
import Footer from "@/app/components/footer";

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
    title: 'ZapLearn - Studying done right',
    description: 'Learn quick + fast ❤️',
}

export default function RootLayout({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
        <body className={inter.className}>
        <ThemeProvider>
            <Header />
            <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white transition-colors duration-300">
                <main className="min-h-screen ny-bg">{children}</main>
            </div>
            <Footer />
        </ThemeProvider>
        </body>
        </html>
    )
}