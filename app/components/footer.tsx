import Link from 'next/link'

export default function Footer() {
    return (
        <footer className="border-t border-gray-800 mt-12 py-8">
            <div className="container mx-auto px-4">
                <div className="flex flex-wrap justify-between">
                    <div className="w-full md:w-1/3 mb-6 md:mb-0">
                        <h2 className="text-2xl font-bold mb-4">ZapLearn</h2>
                        <p className="text-gray-400">Supercharge your learning with our study tool.</p>
                    </div>
                    <div className="w-full md:w-1/3 mb-6 md:mb-0">
                        <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li><Link href="/#" className="text-gray-400 hover:text-yellow-400">Home</Link></li>
                            <li><Link href="/#features" className="text-gray-400 hover:text-yellow-400">Features</Link>
                            </li>
                            <li><Link href="mailto:contact@snowyjs.lol"
                                      className="text-gray-400 hover:text-yellow-400">Support</Link></li>
                        </ul>
                    </div>
                    <div className="w-full md:w-1/3">
                        <h3 className="text-lg font-semibold mb-4">Connect</h3>
                        <ul className="space-y-2">
                            <li><Link href="https://github.com/snowypy"
                                      className="text-gray-400 hover:text-yellow-400">Github</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="mt-8 text-center text-gray-400">
                    <p>2025 ZapLearn</p>
                </div>
                <div className="text-center text-gray-400">
                    <p>Made with ❤️ by <Link className="hover:text-yellow-400 hover:underline" href="https://snowy.codes">Cigan</Link></p>
                </div>
            </div>
        </footer>
    )
}