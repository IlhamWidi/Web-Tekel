import { useForm, Head } from '@inertiajs/react';
import Input from '@/Components/Input';
import { Factory, ShieldCheck, LogIn } from 'lucide-react';

export default function Login() {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post('/login', {
            onSuccess: () => {
                console.log('Login successful');
            },
            onError: (errors) => {
                console.error('Login failed', errors);
            }
        });
    };

    return (
        <>
            <Head title="Login" />
            
            {/* Background with gradient and pattern */}
            <div className="min-h-screen relative overflow-hidden flex items-center justify-center px-4 py-12">
                {/* Animated gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800">
                    {/* Animated shapes */}
                    <div className="absolute top-0 left-0 w-96 h-96 bg-blue-400/30 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-500/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
                </div>

                {/* Grid pattern overlay */}
                <div className="absolute inset-0 opacity-10" style={{
                    backgroundImage: `
                        repeating-linear-gradient(90deg, rgba(255,255,255,0.1) 0px, rgba(255,255,255,0.1) 1px, transparent 1px, transparent 50px),
                        repeating-linear-gradient(0deg, rgba(255,255,255,0.1) 0px, rgba(255,255,255,0.1) 1px, transparent 1px, transparent 50px)
                    `
                }}></div>

                {/* Content */}
                <div className="relative z-10 w-full max-w-md">
                    {/* Logo and Company Name */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-xl rounded-2xl mb-4 border border-white/20 shadow-2xl">
                            <Factory className="w-10 h-10 text-white" />
                        </div>
                        <h1 className="text-3xl font-bold text-white mb-2 drop-shadow-lg">
                            PT Surya Multi Cemerlang
                        </h1>
                        <p className="text-blue-100 text-sm drop-shadow">
                            Sistem Pencatatan Laporan Produksi Premium
                        </p>
                    </div>

                    {/* Glass Card */}
                    <div className="relative backdrop-blur-2xl bg-white/10 rounded-3xl shadow-2xl border border-white/20 p-8 md:p-10">
                        {/* Shine effect */}
                        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
                        
                        {/* Card Header */}
                        <div className="flex items-center gap-3 mb-8">
                            <div className="flex items-center justify-center w-12 h-12 bg-white/10 rounded-xl border border-white/20">
                                <LogIn className="w-6 h-6 text-white" />
                            </div>
                            <h2 className="text-2xl font-bold text-white">Login</h2>
                        </div>
                        
                        <form onSubmit={submit} className="space-y-6">
                            {/* Email Input */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-white mb-2 drop-shadow">
                                    Email <span className="text-red-300">*</span>
                                </label>
                                <div className="relative">
                                    <input
                                        id="email"
                                        type="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        required
                                        autoFocus
                                        placeholder="nama@perusahaan.com"
                                        className="w-full px-4 py-3 bg-white/10 backdrop-blur-xl border border-white/30 rounded-xl text-white placeholder-blue-200/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 transition-all shadow-lg"
                                    />
                                </div>
                                {errors.email && (
                                    <p className="mt-2 text-sm text-red-200 drop-shadow">{errors.email}</p>
                                )}
                            </div>

                            {/* Password Input */}
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-white mb-2 drop-shadow">
                                    Password <span className="text-red-300">*</span>
                                </label>
                                <div className="relative">
                                    <input
                                        id="password"
                                        type="password"
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                        required
                                        placeholder="Masukkan password"
                                        className="w-full px-4 py-3 bg-white/10 backdrop-blur-xl border border-white/30 rounded-xl text-white placeholder-blue-200/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 transition-all shadow-lg"
                                    />
                                </div>
                                {errors.password && (
                                    <p className="mt-2 text-sm text-red-200 drop-shadow">{errors.password}</p>
                                )}
                            </div>

                            {/* Remember Me */}
                            <div className="flex items-center">
                                <input
                                    id="remember"
                                    type="checkbox"
                                    checked={data.remember}
                                    onChange={(e) => setData('remember', e.target.checked)}
                                    className="w-4 h-4 text-blue-600 bg-white/20 border-white/30 rounded focus:ring-white/50 focus:ring-2 backdrop-blur-xl"
                                />
                                <label htmlFor="remember" className="ml-2 text-sm text-white drop-shadow cursor-pointer">
                                    Ingat saya
                                </label>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={processing}
                                className="group relative w-full px-6 py-3.5 text-base font-semibold text-blue-700 bg-white rounded-xl hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-xl hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] overflow-hidden"
                            >
                                {/* Button shine effect */}
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                                
                                <span className="relative flex items-center justify-center gap-2">
                                    {processing ? (
                                        <>
                                            <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            <span>Memproses...</span>
                                        </>
                                    ) : (
                                        <>
                                            <LogIn className="w-5 h-5" />
                                            <span>Masuk ke Sistem</span>
                                        </>
                                    )}
                                </span>
                            </button>
                        </form>

                        {/* Security Badge */}
                        <div className="mt-6 flex items-center justify-center gap-2 text-white/80 text-xs">
                            <ShieldCheck className="w-4 h-4" />
                            <span className="drop-shadow">Terenkripsi & Aman</span>
                        </div>
                    </div>

                    {/* Back to Home Link */}
                    <div className="mt-6 text-center">
                        <a 
                            href="/" 
                            className="inline-flex items-center gap-2 text-sm text-white hover:text-blue-100 transition-colors drop-shadow-lg group"
                        >
                            <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Kembali ke Halaman Utama
                        </a>
                    </div>

                    {/* Decorative elements */}
                    <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-400/20 rounded-full blur-2xl"></div>
                    <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-purple-400/20 rounded-full blur-2xl"></div>
                </div>
            </div>
        </>
    );
}
