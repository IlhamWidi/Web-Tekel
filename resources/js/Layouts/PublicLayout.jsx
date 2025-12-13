import { Link } from '@inertiajs/react';
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from 'lucide-react';

export default function PublicLayout({ children }) {
    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between h-20">
                        {/* Logo */}
                        <Link href="/" className="flex items-center">
                            <div className="text-2xl font-bold text-gray-900">
                                PT Surya Multi Cemerlang
                            </div>
                        </Link>

                        {/* Navigation */}
                        <nav className="hidden md:flex items-center space-x-8">
                            <a href="#tentang" className="text-gray-700 hover:text-blue-600 transition-colors">
                                Tentang
                            </a>
                            <a href="#produk" className="text-gray-700 hover:text-blue-600 transition-colors">
                                Produk
                            </a>
                            <a href="#kualitas" className="text-gray-700 hover:text-blue-600 transition-colors">
                                Kualitas
                            </a>
                            <a href="#berita" className="text-gray-700 hover:text-blue-600 transition-colors">
                                Berita
                            </a>
                            <a href="#kontak" className="text-gray-700 hover:text-blue-600 transition-colors">
                                Kontak
                            </a>
                            <button
                                onClick={() => window.location.href = '/login'}
                                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
                                type="button"
                            >
                                Login
                            </button>
                        </nav>
                    </div>
                </div>
            </header>

            {/* Main content */}
            <main>
                {children}
            </main>

            {/* Footer */}
            <footer className="bg-gray-900 text-white">
                <div className="container mx-auto px-4 py-12">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {/* Company Info */}
                        <div>
                            <h3 className="text-xl font-bold mb-4">PT Surya Multi Cemerlang</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                Produsen keramik berkualitas premium dengan sistem kontrol produksi per shift yang terstandarisasi.
                            </p>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h4 className="text-lg font-semibold mb-4">Link Cepat</h4>
                            <ul className="space-y-2">
                                <li><a href="#tentang" className="text-gray-400 hover:text-white transition-colors">Tentang Kami</a></li>
                                <li><a href="#produk" className="text-gray-400 hover:text-white transition-colors">Produk</a></li>
                                <li><a href="#kualitas" className="text-gray-400 hover:text-white transition-colors">Kualitas</a></li>
                                <li><a href="#berita" className="text-gray-400 hover:text-white transition-colors">Berita</a></li>
                            </ul>
                        </div>

                        {/* Products */}
                        <div>
                            <h4 className="text-lg font-semibold mb-4">Produk Kami</h4>
                            <ul className="space-y-2">
                                <li className="text-gray-400">Keramik Lantai</li>
                                <li className="text-gray-400">Keramik Dinding</li>
                                <li className="text-gray-400">Granite Tile</li>
                                <li className="text-gray-400">Porcelain Tile</li>
                            </ul>
                        </div>

                        {/* Contact */}
                        <div>
                            <h4 className="text-lg font-semibold mb-4">Kontak</h4>
                            <ul className="space-y-3">
                                <li className="flex items-start gap-2">
                                    <MapPin className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                                    <span className="text-gray-400 text-sm">
                                        Jl. Industri No. 123, Kawasan Industri, Jakarta
                                    </span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <Phone className="w-5 h-5 text-gray-400" />
                                    <span className="text-gray-400 text-sm">+62 21 1234 5678</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <Mail className="w-5 h-5 text-gray-400" />
                                    <span className="text-gray-400 text-sm">info@suryamulticemerlang.com</span>
                                </li>
                            </ul>
                            
                            {/* Social Media */}
                            <div className="flex gap-3 mt-4">
                                <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
                                    <Facebook className="w-5 h-5" />
                                </a>
                                <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-pink-600 transition-colors">
                                    <Instagram className="w-5 h-5" />
                                </a>
                                <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
                                    <Linkedin className="w-5 h-5" />
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
                        <p>&copy; {new Date().getFullYear()} PT Surya Multi Cemerlang. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
