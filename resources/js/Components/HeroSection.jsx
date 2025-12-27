import { ArrowRight, CheckCircle, Star, Award } from 'lucide-react';

export default function HeroSection() {
    return (
        <section className="relative min-h-screen flex items-center overflow-hidden">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                {/* Dummy ceramic background using gradient to simulate ceramic tiles pattern */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900">
                    {/* Simulated ceramic tiles pattern overlay */}
                    <div className="absolute inset-0 opacity-20" style={{
                        backgroundImage: `
                            linear-gradient(90deg, transparent 0%, transparent 48%, rgba(255,255,255,0.1) 48%, rgba(255,255,255,0.1) 52%, transparent 52%, transparent 100%),
                            linear-gradient(0deg, transparent 0%, transparent 48%, rgba(255,255,255,0.1) 48%, rgba(255,255,255,0.1) 52%, transparent 52%, transparent 100%)
                        `,
                        backgroundSize: '60px 60px'
                    }}></div>
                </div>
                
                {/* Gradient Overlay for better text readability - Left side only */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-900/95 via-blue-900/75 to-blue-900/20"></div>
                
                {/* Animated floating particles effect */}
                <div className="absolute inset-0 overflow-hidden">
                    {[...Array(20)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute w-1 h-1 bg-white rounded-full opacity-40 animate-pulse"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                animationDelay: `${Math.random() * 3}s`,
                                animationDuration: `${3 + Math.random() * 2}s`
                            }}
                        ></div>
                    ))}
                </div>
            </div>

            {/* Quality Control & Manufacturing Scene - Right Side */}
            <div className="absolute right-0 top-0 bottom-0 w-1/2 hidden lg:flex items-center justify-center z-10 pointer-events-none">
                <div className="relative w-full h-full flex items-center justify-center p-12">
                    {/* Manufacturing & Quality Control Illustration */}
                    <div className="relative w-full max-w-2xl h-[500px]">
                        
                        {/* Production Line Background */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl border border-white/20 shadow-2xl overflow-hidden">
                            {/* Grid pattern for technical feel */}
                            <div className="absolute inset-0 opacity-10" style={{
                                backgroundImage: `
                                    repeating-linear-gradient(0deg, transparent, transparent 20px, rgba(255,255,255,0.15) 20px, rgba(255,255,255,0.15) 21px),
                                    repeating-linear-gradient(90deg, transparent, transparent 20px, rgba(255,255,255,0.15) 20px, rgba(255,255,255,0.15) 21px)
                                `
                            }}></div>
                        </div>

                        {/* Quality Control Dashboard */}
                        <div className="absolute top-8 left-8 right-8 bg-white/20 backdrop-blur-md rounded-lg p-4 border border-white/30 shadow-xl">
                            <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-2">
                                    <CheckCircle className="w-5 h-5 text-green-300" />
                                    <span className="text-white text-sm font-semibold">Quality Control Dashboard</span>
                                </div>
                                <div className="flex gap-1">
                                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse delay-100"></div>
                                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse delay-200"></div>
                                </div>
                            </div>
                            {/* Stats bars */}
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <div className="text-white/80 text-xs w-20">Premium</div>
                                    <div className="flex-1 h-2 bg-white/20 rounded-full overflow-hidden">
                                        <div className="h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full" style={{width: '95%'}}></div>
                                    </div>
                                    <span className="text-white/90 text-xs font-semibold">95%</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="text-white/80 text-xs w-20">Dimensi</div>
                                    <div className="flex-1 h-2 bg-white/20 rounded-full overflow-hidden">
                                        <div className="h-full bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full" style={{width: '98%'}}></div>
                                    </div>
                                    <span className="text-white/90 text-xs font-semibold">98%</span>
                                </div>
                            </div>
                        </div>

                        {/* Manufacturing Process Visualization */}
                        <div className="absolute top-32 left-8 right-8 flex items-center justify-between px-4">
                            {/* Ceramic tiles on production line */}
                            {[0, 1, 2, 3].map((idx) => (
                                <div key={idx} className="relative group" style={{animationDelay: `${idx * 0.2}s`}}>
                                    <div className={`w-20 h-28 bg-gradient-to-br ${
                                        idx === 0 ? 'from-slate-200 to-slate-400' :
                                        idx === 1 ? 'from-blue-200 to-blue-400' :
                                        idx === 2 ? 'from-amber-200 to-amber-400' :
                                        'from-gray-100 to-gray-300'
                                    } rounded-lg shadow-xl transform group-hover:scale-110 transition-transform duration-300 border-2 border-white/30`}>
                                        {/* Quality check mark */}
                                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center border-2 border-white shadow-lg">
                                            <CheckCircle className="w-4 h-4 text-white" />
                                        </div>
                                        {/* Ceramic texture */}
                                        <div className="absolute inset-0 opacity-30 rounded-lg" style={{
                                            backgroundImage: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.3) 0%, transparent 50%)`
                                        }}></div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Measurement & Quality Icons */}
                        <div className="absolute top-64 left-1/2 transform -translate-x-1/2 flex gap-4">
                            {/* Measurement tool */}
                            <div className="relative group">
                                <div className="w-24 h-24 bg-white/20 backdrop-blur-md rounded-lg border border-white/30 flex flex-col items-center justify-center shadow-xl hover:scale-105 transition-transform">
                                    <svg className="w-10 h-10 text-cyan-300 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                    </svg>
                                    <span className="text-white text-xs font-medium">Dimensi</span>
                                </div>
                            </div>
                            
                            {/* Quality badge */}
                            <div className="relative group">
                                <div className="w-24 h-24 bg-gradient-to-br from-yellow-400/30 to-amber-500/30 backdrop-blur-md rounded-lg border border-yellow-400/40 flex flex-col items-center justify-center shadow-xl hover:scale-105 transition-transform">
                                    <Award className="w-10 h-10 text-yellow-300 mb-1" />
                                    <span className="text-white text-xs font-medium">Premium</span>
                                </div>
                            </div>
                            
                            {/* Shift control */}
                            <div className="relative group">
                                <div className="w-24 h-24 bg-white/20 backdrop-blur-md rounded-lg border border-white/30 flex flex-col items-center justify-center shadow-xl hover:scale-105 transition-transform">
                                    <svg className="w-10 h-10 text-blue-300 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span className="text-white text-xs font-medium">Per Shift</span>
                                </div>
                            </div>
                        </div>

                        {/* Quality Seal/Stamp */}
                        <div className="absolute bottom-8 right-8 transform rotate-12 hover:rotate-0 transition-transform duration-300">
                            <div className="relative w-32 h-32">
                                <div className="absolute inset-0 bg-gradient-to-br from-green-400/30 to-emerald-600/30 backdrop-blur-sm rounded-full border-4 border-green-400/50 flex items-center justify-center shadow-2xl">
                                    <div className="text-center">
                                        <Star className="w-8 h-8 text-yellow-300 mx-auto mb-1" />
                                        <div className="text-white text-xs font-bold">QUALITY</div>
                                        <div className="text-white text-xs font-bold">APPROVED</div>
                                    </div>
                                </div>
                                {/* Stamp effect */}
                                <div className="absolute inset-0 rounded-full border-2 border-dashed border-white/30 animate-spin-slow"></div>
                            </div>
                        </div>

                        {/* Factory worker silhouettes */}
                        <div className="absolute bottom-8 left-8 flex gap-3">
                            {[0, 1, 2].map((idx) => (
                                <div key={idx} className="relative group">
                                    <div className="w-12 h-16 bg-white/20 backdrop-blur-sm rounded-lg border border-white/30 flex items-end justify-center pb-2 hover:bg-white/30 transition-colors">
                                        <svg className="w-8 h-8 text-white/70" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="container mx-auto px-4 py-20 relative z-10">
                <div className="max-w-3xl">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6 text-sm text-white/90">
                        <Award className="w-4 h-4 text-yellow-400" />
                        <span>Produsen Keramik Premium #1 di Indonesia</span>
                    </div>

                    {/* Main Heading */}
                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                        Keramik Premium
                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-300">
                            Kualitas Terjamin
                        </span>
                    </h1>

                    {/* Subheading */}
                    <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed">
                        Manufaktur keramik dengan sistem kontrol kualitas per shift. 
                        Menghadirkan konsistensi premium di setiap produk dengan standar dimensi ketat 
                        dan quality control terstandarisasi.
                    </p>

                    {/* Key Features */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
                        {[
                            { icon: CheckCircle, text: 'QC Per Shift' },
                            { icon: Star, text: 'Premium Quality' },
                            { icon: Award, text: 'Garansi Terpercaya' }
                        ].map((feature, idx) => (
                            <div key={idx} className="flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-3">
                                <feature.icon className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                                <span className="text-white font-medium">{feature.text}</span>
                            </div>
                        ))}
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex flex-wrap gap-4 mb-12">
                        <a 
                            href="#produk" 
                            className="group inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-900 rounded-lg font-semibold hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                        >
                            <span>Lihat Katalog Produk</span>
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </a>
                        <a 
                            href="#kontak" 
                            className="inline-flex items-center gap-2 px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-blue-900 transition-all duration-300"
                        >
                            Hubungi Kami
                        </a>
                    </div>

                    {/* Statistics */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-white/20 pb-20">
                        {[
                            { value: '25+', label: 'Tahun Pengalaman' },
                            { value: '1000+', label: 'Proyek Selesai' },
                            { value: '50+', label: 'Variasi Motif' },
                            { value: '3', label: 'Shift Produksi' }
                        ].map((stat, idx) => (
                            <div key={idx} className="text-white">
                                <div className="text-3xl md:text-4xl font-bold mb-1 text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-cyan-200">
                                    {stat.value}
                                </div>
                                <div className="text-sm text-blue-200">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom Wave Decoration */}
            <div className="absolute bottom-0 left-0 right-0 z-0 -mb-1">
                <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
                    <path 
                        d="M0 0L60 10C120 20 240 40 360 46.7C480 53 600 47 720 43.3C840 40 960 40 1080 46.7C1200 53 1320 67 1380 73.3L1440 80V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z" 
                        fill="white"
                    />
                </svg>
            </div>
        </section>
    );
}
