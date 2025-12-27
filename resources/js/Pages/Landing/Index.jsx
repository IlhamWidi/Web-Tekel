import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import HeroSection from '@/Components/HeroSection';
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

            {/* Hero Section - Enhanced with Visual Elements */}
            <HeroSection />

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
                            { name: 'Revolver Gold GL', size: '60x60 cm', type: 'Floor Tile', finish: 'Glazed', colors: ['from-amber-300', 'via-yellow-400', 'to-amber-500'] },
                            { name: 'Marble White', size: '50x50 cm', type: 'Floor Tile', finish: 'Polished', colors: ['from-gray-50', 'via-gray-100', 'to-gray-200'] },
                            { name: 'Stone Grey', size: '60x60 cm', type: 'Floor/Wall', finish: 'Matt', colors: ['from-slate-400', 'via-slate-500', 'to-slate-600'] },
                            { name: 'Wood Brown', size: '30x60 cm', type: 'Wall Tile', finish: 'Matt', colors: ['from-amber-600', 'via-amber-700', 'to-amber-800'] },
                            { name: 'Granite Black', size: '40x40 cm', type: 'Floor Tile', finish: 'Polished', colors: ['from-gray-800', 'via-gray-900', 'to-black'] },
                            { name: 'Classic Beige', size: '25x50 cm', type: 'Wall Tile', finish: 'Glazed', colors: ['from-stone-200', 'via-stone-300', 'to-stone-400'] },
                        ].map((product, idx) => (
                            <div key={idx} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                                <div className={`relative h-64 bg-gradient-to-br ${product.colors.join(' ')} overflow-hidden group`}>
                                    {/* Ceramic texture pattern */}
                                    <div className="absolute inset-0 opacity-30" style={{
                                        backgroundImage: `
                                            linear-gradient(45deg, rgba(255,255,255,0.1) 25%, transparent 25%),
                                            linear-gradient(-45deg, rgba(255,255,255,0.1) 25%, transparent 25%),
                                            linear-gradient(45deg, transparent 75%, rgba(255,255,255,0.1) 75%),
                                            linear-gradient(-45deg, transparent 75%, rgba(255,255,255,0.1) 75%)
                                        `,
                                        backgroundSize: '20px 20px',
                                        backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'
                                    }}></div>
                                    {/* Glossy shine effect */}
                                    <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-white/30 to-transparent"></div>
                                    {/* Hover overlay */}
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-sm font-medium bg-blue-600 px-4 py-2 rounded-lg">
                                            Lihat Detail
                                        </div>
                                    </div>
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
                            { title: 'Residensial', description: 'Rumah, apartemen, dan kompleks perumahan premium', gradient: 'from-blue-400 to-blue-600', icon: Building2 },
                            { title: 'Komersial', description: 'Mall, perkantoran, dan pusat bisnis', gradient: 'from-purple-400 to-purple-600', icon: Building2 },
                            { title: 'Hospitality', description: 'Hotel, resort, dan restoran mewah', gradient: 'from-pink-400 to-pink-600', icon: Building2 },
                            { title: 'Fasilitas Publik', description: 'Bandara, stasiun, dan gedung pemerintahan', gradient: 'from-green-400 to-green-600', icon: Building2 },
                        ].map((segment, idx) => (
                            <div key={idx} className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group">
                                <div className={`relative h-48 bg-gradient-to-br ${segment.gradient} rounded-lg mb-4 overflow-hidden`}>
                                    {/* Building silhouette pattern */}
                                    <div className="absolute inset-0 opacity-20" style={{
                                        backgroundImage: `
                                            repeating-linear-gradient(90deg, rgba(255,255,255,0.1) 0px, rgba(255,255,255,0.1) 2px, transparent 2px, transparent 20px),
                                            repeating-linear-gradient(0deg, rgba(255,255,255,0.1) 0px, rgba(255,255,255,0.1) 2px, transparent 2px, transparent 25px)
                                        `
                                    }}></div>
                                    {/* Icon */}
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <segment.icon className="w-16 h-16 text-white/80 group-hover:scale-110 transition-transform duration-300" />
                                    </div>
                                    {/* Shine effect */}
                                    <div className="absolute -top-20 -right-20 w-40 h-40 bg-white/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-500"></div>
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
                            { 
                                date: '15 Nov 2025', 
                                title: 'Peluncuran Koleksi Motif Baru', 
                                excerpt: 'Kami memperkenalkan 5 motif baru dengan teknologi printing terkini...', 
                                gradient: 'from-slate-700 via-slate-600 to-slate-500',
                                type: 'product'
                            },
                            { 
                                date: '10 Okt 2025', 
                                title: 'Partisipasi di Indonesia BuildTech Expo', 
                                excerpt: 'PT Surya Multi Cemerlang berpartisipasi aktif dalam pameran konstruksi terbesar...', 
                                gradient: 'from-blue-600 via-indigo-600 to-purple-600',
                                type: 'expo'
                            },
                            { 
                                date: '5 Sep 2025', 
                                title: 'Program Pelatihan Operator Produksi', 
                                excerpt: 'Meluncurkan program pelatihan komprehensif untuk meningkatkan skill operator...', 
                                gradient: 'from-emerald-600 via-teal-600 to-cyan-600',
                                type: 'training'
                            },
                        ].map((news, idx) => (
                            <div key={idx} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group cursor-pointer">
                                <div className={`relative h-56 bg-gradient-to-br ${news.gradient} overflow-hidden`}>
                                    {/* Peluncuran Produk - Ceramic Tiles Display */}
                                    {news.type === 'product' && (
                                        <>
                                            {/* Ceramic tiles grid pattern */}
                                            <div className="absolute inset-0 opacity-20" style={{
                                                backgroundImage: `
                                                    repeating-linear-gradient(0deg, transparent, transparent 50px, rgba(255,255,255,0.15) 50px, rgba(255,255,255,0.15) 52px),
                                                    repeating-linear-gradient(90deg, transparent, transparent 50px, rgba(255,255,255,0.15) 50px, rgba(255,255,255,0.15) 52px)
                                                `,
                                            }}></div>
                                            {/* Ceramic tile samples */}
                                            <div className="absolute inset-0 flex items-center justify-center gap-2 p-4">
                                                <div className="w-20 h-28 bg-gradient-to-br from-amber-300 to-amber-500 rounded shadow-lg transform -rotate-6 opacity-80"></div>
                                                <div className="w-20 h-28 bg-gradient-to-br from-slate-200 to-slate-400 rounded shadow-lg transform rotate-3 opacity-90 scale-110"></div>
                                                <div className="w-20 h-28 bg-gradient-to-br from-blue-300 to-blue-500 rounded shadow-lg transform -rotate-3 opacity-80"></div>
                                            </div>
                                            {/* Sparkle effects for new product */}
                                            <div className="absolute top-8 right-12 w-3 h-3 bg-white rounded-full animate-ping"></div>
                                            <div className="absolute bottom-12 left-8 w-2 h-2 bg-white rounded-full animate-pulse"></div>
                                        </>
                                    )}
                                    
                                    {/* Expo - Exhibition Booth */}
                                    {news.type === 'expo' && (
                                        <>
                                            {/* Exhibition hall pattern */}
                                            <div className="absolute inset-0 opacity-15" style={{
                                                backgroundImage: `
                                                    linear-gradient(135deg, transparent 0%, transparent 45%, rgba(255,255,255,0.2) 45%, rgba(255,255,255,0.2) 55%, transparent 55%, transparent 100%)
                                                `,
                                                backgroundSize: '30px 30px'
                                            }}></div>
                                            {/* Booth structure */}
                                            <div className="absolute inset-0 flex items-end justify-center pb-8">
                                                {/* Booth panels */}
                                                <div className="flex items-end gap-2">
                                                    <div className="w-16 h-32 bg-white/20 backdrop-blur-sm rounded-t-lg border-2 border-white/30"></div>
                                                    <div className="w-24 h-40 bg-white/25 backdrop-blur-sm rounded-t-lg border-2 border-white/40 flex flex-col items-center justify-center gap-2">
                                                        <div className="w-16 h-12 bg-white/30 rounded"></div>
                                                        <div className="w-12 h-2 bg-white/40 rounded"></div>
                                                        <div className="w-12 h-2 bg-white/40 rounded"></div>
                                                    </div>
                                                    <div className="w-16 h-32 bg-white/20 backdrop-blur-sm rounded-t-lg border-2 border-white/30"></div>
                                                </div>
                                            </div>
                                            {/* People silhouettes */}
                                            <div className="absolute bottom-4 left-8 w-6 h-10 bg-white/30 rounded-full"></div>
                                            <div className="absolute bottom-4 right-12 w-6 h-10 bg-white/30 rounded-full"></div>
                                        </>
                                    )}
                                    
                                    {/* Training - Classroom/Factory Setting */}
                                    {news.type === 'training' && (
                                        <>
                                            {/* Classroom/factory grid */}
                                            <div className="absolute inset-0 opacity-15" style={{
                                                backgroundImage: `
                                                    repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(255,255,255,0.15) 40px, rgba(255,255,255,0.15) 42px)
                                                `,
                                            }}></div>
                                            {/* Training scene elements */}
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                {/* Presentation board/screen */}
                                                <div className="w-48 h-32 bg-white/20 backdrop-blur-sm rounded-lg border-2 border-white/40 flex flex-col items-center justify-center gap-2 p-4">
                                                    {/* Chart/diagram representation */}
                                                    <div className="flex gap-1 items-end h-16">
                                                        <div className="w-6 h-8 bg-white/40 rounded-t"></div>
                                                        <div className="w-6 h-12 bg-white/50 rounded-t"></div>
                                                        <div className="w-6 h-16 bg-white/60 rounded-t"></div>
                                                        <div className="w-6 h-10 bg-white/40 rounded-t"></div>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* Participant icons */}
                                            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2">
                                                {[...Array(5)].map((_, i) => (
                                                    <div key={i} className="w-8 h-8 bg-white/30 rounded-full border border-white/40"></div>
                                                ))}
                                            </div>
                                            {/* Award/certificate icon */}
                                            <div className="absolute top-6 right-6 w-10 h-10 bg-yellow-400/30 rounded-lg rotate-12 flex items-center justify-center">
                                                <Award className="w-6 h-6 text-white" />
                                            </div>
                                        </>
                                    )}
                                    
                                    {/* Date badge */}
                                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-gray-800">
                                        {news.date}
                                    </div>
                                    {/* Hover overlay */}
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
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
                                        <p className="text-gray-600">Jl. Raya Semambung No.296, Semambung Lor, Semambung, Kec. Wonoayu, Kabupaten Sidoarjo, Jawa Timur</p>
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

                            {/* Google Maps Embed */}
                            <div className="rounded-lg overflow-hidden shadow-lg">
                                <iframe 
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4692.909311267798!2d112.61105117574566!3d-7.436275073266963!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e780a0221ba3db7%3A0x408150c4174ca7f0!2sJl.%20Raya%20Semambung%20No.296%2C%20Semambung%20Lor%2C%20Semambung%2C%20Kec.%20Wonoayu%2C%20Kabupaten%20Sidoarjo%2C%20Jawa%20Timur%2061261!5e1!3m2!1sen!2sid!4v1765878966908!5m2!1sen!2sid" 
                                    width="100%" 
                                    height="300" 
                                    style={{ border: 0 }} 
                                    allowFullScreen="" 
                                    loading="lazy" 
                                    referrerPolicy="no-referrer-when-downgrade"
                                    className="w-full"
                                ></iframe>
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
