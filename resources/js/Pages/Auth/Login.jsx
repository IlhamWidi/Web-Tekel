import { useForm, Head } from '@inertiajs/react';
import Input from '@/Components/Input';

export default function Login() {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        console.log('Form submitted', data); // Debug log
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
            
            <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
                <div className="max-w-md w-full">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">
                            PT Surya Multi Cemerlang
                        </h1>
                        <p className="text-gray-600">
                            Sistem Pencatatan Laporan Produksi Premium
                        </p>
                    </div>

                    <div className="bg-white rounded-lg shadow-lg p-8">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Login</h2>
                        
                        <form onSubmit={submit} className="space-y-6">
                            <Input
                                type="email"
                                label="Email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                error={errors.email}
                                required
                                autoFocus
                            />

                            <Input
                                type="password"
                                label="Password"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                error={errors.password}
                                required
                            />

                            <div className="flex items-center">
                                <input
                                    id="remember"
                                    type="checkbox"
                                    checked={data.remember}
                                    onChange={(e) => setData('remember', e.target.checked)}
                                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                />
                                <label htmlFor="remember" className="ml-2 text-sm text-gray-700">
                                    Ingat saya
                                </label>
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                onClick={(e) => {
                                    console.log('Button clicked!'); // Debug
                                    if (!processing) {
                                        console.log('Submitting form...');
                                    }
                                }}
                                className="w-full px-6 py-3 text-base font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                style={{ cursor: processing ? 'not-allowed' : 'pointer' }}
                            >
                                {processing ? 'Loading...' : 'Login'}
                            </button>
                        </form>

                        <div className="mt-6 text-center text-sm text-gray-600">
                            <p>Demo Credentials:</p>
                            <p className="mt-2">
                                <span className="font-medium">Admin:</span> admin@suryamulticemerlang.com / password
                            </p>
                            <p>
                                <span className="font-medium">Supervisor:</span> supervisor@suryamulticemerlang.com / password
                            </p>
                            <p>
                                <span className="font-medium">Operator:</span> operator1@suryamulticemerlang.com / password
                            </p>
                        </div>
                    </div>

                    <div className="mt-4 text-center">
                        <a href="/" className="text-sm text-blue-600 hover:text-blue-700">
                            ← Kembali ke Halaman Utama
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
}
