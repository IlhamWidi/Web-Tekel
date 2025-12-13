import { Head, Link, usePage } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { TrendingUp, FileText, Package, BarChart3, Eye } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function Dashboard({ stats, premium_trend, latest_reports }) {
    const { auth } = usePage().props;

    return (
        <AdminLayout title="Dashboard">
            <Head title="Dashboard" />

            {/* Welcome Section */}
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900">
                    Selamat Datang, {auth.user.name}!
                </h2>
                <p className="text-gray-600">Ringkasan produksi dan laporan hari ini</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-600">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600 mb-1">Total Premium Hari Ini</p>
                            <p className="text-3xl font-bold text-gray-900">{stats.total_premium_today}</p>
                        </div>
                        <Package className="w-12 h-12 text-blue-600 opacity-50" />
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-600">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600 mb-1">Laporan Masuk Hari Ini</p>
                            <p className="text-3xl font-bold text-gray-900">{stats.reports_count_today}</p>
                        </div>
                        <FileText className="w-12 h-12 text-green-600 opacity-50" />
                    </div>
                </div>

                {stats.premium_by_shift.slice(0, 2).map((shift, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-lg shadow-md border-l-4 border-purple-600">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 mb-1">{shift.shift_name}</p>
                                <p className="text-3xl font-bold text-gray-900">{shift.total_premium}</p>
                            </div>
                            <BarChart3 className="w-12 h-12 text-purple-600 opacity-50" />
                        </div>
                    </div>
                ))}
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Premium Trend */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Trend Premium 7 Hari Terakhir</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={premium_trend}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="premium" stroke="#3B82F6" strokeWidth={2} name="Premium" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                {/* Premium by Shift */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Premium per Shift Hari Ini</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={stats.premium_by_shift}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="shift_name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="total_premium" fill="#10B981" name="Premium" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Latest Reports */}
            <div className="bg-white rounded-lg shadow-md">
                <div className="p-6 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900">Laporan Terbaru</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Shift</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Line</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Motif</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dimensi</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Premium</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dibuat Oleh</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {latest_reports.map((report) => (
                                <tr key={report.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => window.location.href = `/admin/reports/${report.id}`}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{report.date}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{report.shift}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{report.line}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{report.motif}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{report.dimension}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">{report.total_premium?.toLocaleString() || 0}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                                            report.status === 'approved' ? 'bg-green-100 text-green-800' :
                                            report.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                            report.status === 'rejected' ? 'bg-red-100 text-red-800' :
                                            'bg-gray-100 text-gray-800'
                                        }`}>
                                            {report.status === 'approved' ? 'Disetujui' :
                                             report.status === 'pending' ? 'Pending' :
                                             report.status === 'rejected' ? 'Ditolak' :
                                             'Draft'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{report.created_by}</td>
                                </tr>
                            ))}
                            {latest_reports.length === 0 && (
                                <tr>
                                    <td colSpan="8" className="px-6 py-8 text-center text-gray-500">
                                        Belum ada laporan
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AdminLayout>
    );
}
