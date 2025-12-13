import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import { 
    CheckCircle, 
    Award, 
    Factory, 
    Shield, 
    Users, 
    TrendingUp,
    Download,
    Mail,
    Building2,
    Leaf,
    Briefcase
} from 'lucide-react';

export default function Index() {
    return (
        <PublicLayout>
            <Head title="PT Surya Multi Cemerlang - Produsen Keramik Premium" />

            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-blue-900 to-blue-700 text-white py-24">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl">
                        <h1 className="text-5xl md:text-6xl font-bold mb-6">
                            Manufaktur Keramik Premium dengan Kontrol Kualitas Per Shift
                        </h1>
                        <p className="text-xl md:text-2xl mb-8 text-blue-100">
                            Menghadirkan kualitas konsisten melalui sistem pencatatan produksi terstandarisasi dan kontrol kualitas premium di setiap shift produksi.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <a 
                                href="#produk" 
                                className="px-8 py-4 bg-white text-blue-900 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                            >
                                Lihat Katalog Produk
                            </a>
                            <a 
                                href="#kontak" 
                                className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-blue-900 transition-colors"
                            >
                                Hubungi Tim Sales
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Trust Indicators */}
            <section className="py-6 bg-gray-100 border-y border-gray-200">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {[
                            { icon: CheckCircle, label: 'Kontrol Kualitas Per Shift' },
                            { icon: TrendingUp, label: 'Produksi Konsisten' },
                            { icon: Building2, label: 'Dukungan Proyek' },
                            { icon: Factory, label: 'Distribusi Nasional' },
                        ].map((item, idx) => (
                            <div key={idx} className="flex items-center gap-3">
                                <item.icon className="w-8 h-8 text-blue-600 flex-shrink-0" />
                                <span className="text-sm font-medium text-gray-700">{item.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Tentang Perusahaan */}
            <section id="tentang" className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-4xl font-bold text-gray-900 mb-6">Tentang PT Surya Multi Cemerlang</h2>
                        <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
                            <p>
                                PT Surya Multi Cemerlang adalah produsen keramik terkemuka yang mengutamakan konsistensi kualitas melalui 
                                sistem pencatatan laporan produksi premium per shift. Dengan pengalaman puluhan tahun di industri keramik, 
                                kami telah melayani ribuan proyek dari residensial hingga komersial di seluruh Indonesia.
                            </p>
                            <p>
                                Komitmen kami terhadap kualitas tercermin dalam setiap aspek produksi. Sistem kontrol per shift memastikan 
                                setiap batch keramik memenuhi standar dimensi dan kualitas pembakaran yang ketat. Proses multi-point 
                                measurement dan pencatatan detail defect memungkinkan kami menjaga konsistensi premium di setiap produk.
                            </p>
                            <p>
                                Fokus pada quality-controlled manufacturing, konsistensi dimensi, dan dukungan penuh untuk proyek besar 
                                menjadikan kami mitra terpercaya untuk kebutuhan keramik Anda.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Keunggulan Utama */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">Keunggulan Utama</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                icon: Award,
                                title: 'Quality-Controlled Manufacturing',
                                description: 'Sistem pencatatan produksi per shift dengan pengukuran multi-titik untuk memastikan konsistensi kualitas.'
                            },
                            {
                                icon: CheckCircle,
                                title: 'Consistent Dimensional Accuracy',
                                description: 'Toleransi dimensi ketat dengan pengukuran X1, X2, X3, Y1, Y2, Y3 di setiap batch produksi.'
                            },
                            {
                                icon: Factory,
                                title: 'Variasi Motif & Ukuran',
                                description: 'Puluhan pilihan motif dan ukuran dari 25x50 hingga 60x60 untuk berbagai aplikasi.'
                            },
                            {
                                icon: Building2,
                                title: 'Dukungan Proyek & Konsultasi Material',
                                description: 'Tim ahli siap membantu pemilihan material dan kalkulasi kebutuhan proyek Anda.'
                            },
                            {
                                icon: Shield,
                                title: 'Garansi Kualitas',
                                description: 'Setiap produk telah melalui quality control ketat dengan dokumentasi lengkap per shift.'
                            },
                            {
                                icon: TrendingUp,
                                title: 'Kapasitas Produksi Tinggi',
                                description: 'Tiga shift produksi memastikan ketersediaan stok dan lead time yang cepat.'
                            },
                        ].map((item, idx) => (
                            <div key={idx} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                                <item.icon className="w-12 h-12 text-blue-600 mb-4" />
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">{item.title}</h3>
                                <p className="text-gray-600">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Produk & Katalog */}
            <section id="produk" className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">Produk & Katalog</h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Koleksi keramik premium dengan berbagai motif dan ukuran untuk memenuhi kebutuhan proyek Anda
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                        {[
                            { name: 'Revolver Gold GL', size: '60x60 cm', type: 'Floor Tile', finish: 'Glazed' },
                            { name: 'Marble White', size: '50x50 cm', type: 'Floor Tile', finish: 'Polished' },
                            { name: 'Stone Grey', size: '60x60 cm', type: 'Floor/Wall', finish: 'Matt' },
                            { name: 'Wood Brown', size: '30x60 cm', type: 'Wall Tile', finish: 'Matt' },
                            { name: 'Granite Black', size: '40x40 cm', type: 'Floor Tile', finish: 'Polished' },
                            { name: 'Classic Beige', size: '25x50 cm', type: 'Wall Tile', finish: 'Glazed' },
                        ].map((product, idx) => (
                            <div key={idx} className="bg-gray-100 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                                <div className="h-48 bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
                                    <span className="text-gray-500 text-sm">Product Image</span>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{product.name}</h3>
                                    <p className="text-gray-600 mb-1">Ukuran: {product.size}</p>
                                    <p className="text-gray-600 mb-1">Tipe: {product.type}</p>
                                    <p className="text-gray-600">Finishing: {product.finish}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="text-center">
                        <button className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                            <Download className="w-5 h-5" />
                            Unduh Katalog Produk (PDF)
                        </button>
                    </div>
                </div>
            </section>

            {/* Quality & Compliance */}
            <section id="kualitas" className="py-20 bg-blue-50">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-4xl font-bold text-center text-gray-900 mb-6">Quality & Compliance</h2>
                        <p className="text-xl text-center text-gray-700 mb-12">
                            Sistem kontrol kualitas terstandarisasi dengan pencatatan detail di setiap shift produksi
                        </p>

                        <div className="bg-white rounded-lg shadow-lg p-8">
                            <h3 className="text-2xl font-semibold text-gray-900 mb-6">Proses Kontrol Kualitas</h3>
                            <ul className="space-y-4">
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <strong>Pencatatan Laporan Produksi Premium Per Shift:</strong>
                                        <p className="text-gray-600">Setiap shift (I, II, III) melakukan pencatatan detail produksi premium dan defect untuk monitoring konsistensi.</p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <strong>Pengukuran Dimensi Multi Titik:</strong>
                                        <p className="text-gray-600">Pengukuran X1, X2, X3, Y1, Y2, Y3 pada setiap sampel untuk memastikan akurasi dimensi.</p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <strong>Klasifikasi Defect Sistematis:</strong>
                                        <p className="text-gray-600">Pencatatan crack, surface, gupil, dan reject lainnya untuk analisis root cause dan improvement.</p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <strong>Approval Supervisor:</strong>
                                        <p className="text-gray-600">Setiap laporan diverifikasi dan diapprove oleh supervisor produksi untuk akuntabilitas.</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Portofolio / Use Case */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">Segmen & Portofolio</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { title: 'Residensial', description: 'Rumah, apartemen, dan kompleks perumahan premium' },
                            { title: 'Komersial', description: 'Mall, perkantoran, dan pusat bisnis' },
                            { title: 'Hospitality', description: 'Hotel, resort, dan restoran mewah' },
                            { title: 'Fasilitas Publik', description: 'Bandara, stasiun, dan gedung pemerintahan' },
                        ].map((segment, idx) => (
                            <div key={idx} className="bg-gray-50 p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
                                <div className="h-32 bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg mb-4 flex items-center justify-center">
                                    <Building2 className="w-12 h-12 text-gray-500" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">{segment.title}</h3>
                                <p className="text-gray-600">{segment.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Sustainability & CSR */}
            <section className="py-20 bg-green-50">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <Leaf className="w-16 h-16 text-green-600 mx-auto mb-6" />
                        <h2 className="text-4xl font-bold text-gray-900 mb-6">Sustainability & CSR</h2>
                        <p className="text-lg text-gray-700 leading-relaxed mb-8">
                            Kami berkomitmen pada praktik manufaktur yang bertanggung jawab terhadap lingkungan. 
                            Efisiensi energi kiln, pengelolaan limbah yang tepat, dan program CSR untuk komunitas sekitar 
                            adalah bagian integral dari operasional kami.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {[
                                { label: 'Efisiensi Energi', value: 'Program optimasi kiln untuk mengurangi konsumsi energi' },
                                { label: 'Pengelolaan Limbah', value: 'Sistem pengelolaan limbah terintegrasi dan ramah lingkungan' },
                                { label: 'Kontribusi Sosial', value: 'Program pelatihan dan pemberdayaan masyarakat lokal' },
                            ].map((item, idx) => (
                                <div key={idx} className="bg-white p-6 rounded-lg shadow-md">
                                    <h3 className="font-semibold text-gray-900 mb-2">{item.label}</h3>
                                    <p className="text-sm text-gray-600">{item.value}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* News / Updates */}
            <section id="berita" className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">Berita & Kegiatan</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { date: '15 Nov 2025', title: 'Peluncuran Koleksi Motif Baru', excerpt: 'Kami memperkenalkan 5 motif baru dengan teknologi printing terkini...' },
                            { date: '10 Okt 2025', title: 'Partisipasi di Indonesia BuildTech Expo', excerpt: 'PT Surya Multi Cemerlang berpartisipasi aktif dalam pameran konstruksi terbesar...' },
                            { date: '5 Sep 2025', title: 'Program Pelatihan Operator Produksi', excerpt: 'Meluncurkan program pelatihan komprehensif untuk meningkatkan skill operator...' },
                        ].map((news, idx) => (
                            <div key={idx} className="bg-gray-50 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                                <div className="h-48 bg-gradient-to-br from-blue-200 to-blue-300 flex items-center justify-center">
                                    <span className="text-gray-600">News Image</span>
                                </div>
                                <div className="p-6">
                                    <p className="text-sm text-blue-600 mb-2">{news.date}</p>
                                    <h3 className="text-xl font-semibold text-gray-900 mb-3">{news.title}</h3>
                                    <p className="text-gray-600">{news.excerpt}</p>
                                    <button className="mt-4 text-blue-600 font-medium hover:text-blue-700">
                                        Baca Selengkapnya →
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Careers */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <Briefcase className="w-16 h-16 text-blue-600 mx-auto mb-6" />
                        <h2 className="text-4xl font-bold text-gray-900 mb-6">Karir di PT Surya Multi Cemerlang</h2>
                        <p className="text-lg text-gray-700 leading-relaxed mb-8">
                            Bergabunglah dengan tim profesional kami yang mengutamakan safety, quality, dan continuous improvement. 
                            Kami menawarkan lingkungan kerja yang mendukung pengembangan karir dan work-life balance.
                        </p>
                        <button className="px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                            Lihat Lowongan Kerja
                        </button>
                    </div>
                </div>
            </section>

            {/* Contact & CTA Final */}
            <section id="kontak" className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">Hubungi Kami</h2>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Contact Info */}
                        <div>
                            <h3 className="text-2xl font-semibold text-gray-900 mb-6">Informasi Kontak</h3>
                            <div className="space-y-4 mb-8">
                                <div className="flex items-start gap-3">
                                    <Factory className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                                    <div>
                                        <p className="font-medium text-gray-900">Alamat Pabrik</p>
                                        <p className="text-gray-600">Jl. Industri No. 123, Kawasan Industri MM2100, Cikarang, Bekasi</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <Mail className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                                    <div>
                                        <p className="font-medium text-gray-900">Email</p>
                                        <p className="text-gray-600">info@suryamulticemerlang.com</p>
                                        <p className="text-gray-600">sales@suryamulticemerlang.com</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <Users className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                                    <div>
                                        <p className="font-medium text-gray-900">Telepon</p>
                                        <p className="text-gray-600">+62 21 1234 5678</p>
                                        <p className="text-gray-600">+62 812 3456 7890 (Sales)</p>
                                    </div>
                                </div>
                            </div>

                            {/* Map Placeholder */}
                            <div className="h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                                <span className="text-gray-500">Google Maps Embed</span>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div>
                            <h3 className="text-2xl font-semibold text-gray-900 mb-6">Kirim Pesan</h3>
                            <form className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Nama</label>
                                    <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                    <input type="email" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Perusahaan</label>
                                    <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Telepon</label>
                                    <input type="tel" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Tujuan</label>
                                    <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                                        <option>Penawaran Proyek</option>
                                        <option>Informasi Produk</option>
                                        <option>Karir</option>
                                        <option>Lain-lain</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Pesan</label>
                                    <textarea rows="4" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
                                </div>
                                <button type="submit" className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                                    Kirim Pesan
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
