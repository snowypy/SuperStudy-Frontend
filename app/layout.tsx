import './globals.css'
import './global-styles.css'
import { Toaster } from '@/components/ui/toaster'
import { ThemeProvider } from '@/lib/theme-provider'
import localFont from 'next/font/local';
import Header from "@/app/components/header";
import Footer from "@/app/components/footer";

export const metadata = {
    title: 'ZapLearn - Studying done right',
    description: 'Learn quick + fast ❤️',
}

const monaspacekrypton = localFont({
    src: [
        {
            path: '../public/fonts/MonaspaceNeon-Regular.woff',
            weight: '400',
            style: 'normal',
        }
    ],
    variable: '--font-krypton'
});

export default function RootLayout({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
        <body className={monaspacekrypton.className}>
        <ThemeProvider>
            <Header />
            <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white transition-colors duration-300">
                <main className="min-h-screen ny-bg">{children}</main>
            </div>
            <Footer />
            <Toaster />
        </ThemeProvider>
        </body>
        </html>
    )
}