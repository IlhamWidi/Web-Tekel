import { Head, useForm, usePage } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import Input from '@/Components/Input';
import Button from '@/Components/Button';
import { Download, FileText, Printer } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { useState } from 'react';

export default function Index({ 
    summary, 
    daily_recap, 
    shift_recap, 
    line_recap, 
    motif_recap, 
    filters, 
    shifts, 
    lines, 
    motifs 
}) {
    const [activeTab, setActiveTab] = useState('daily');
    const { data, setData, get, processing } = useForm(filters);

    const handleFilter = (e) => {
        e.preventDefault();
        get('/admin/recap', { preserveState: true });
    };

    const tabs = [
        { id: 'daily', label: 'Rekap Harian' },
        { id: 'shift', label: 'Per Shift' },
        { id: 'line', label: 'Per Line' },
        { id: 'motif', label: 'Per Motif' },
    ];

    const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'];

    return (
        <AdminLayout title="Rekap Premium">
            <Head title="Rekap Premium" />

            {/* Filter Section */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Filter Rekap</h3>
                <form onSubmit={handleFilter} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                    <Input
                        type="date"
                        label="Tanggal Dari"
                        value={data.date_from}
                        onChange={(e) => setData('date_from', e.target.value)}
                    />
                    <Input
                        type="date"
                        label="Tanggal Sampai"
                        value={data.date_to}
                        onChange={(e) => setData('date_to', e.target.value)}
                    />
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Shift</label>
                        <select
                            value={data.shift_id || ''}
                            onChange={(e) => setData('shift_id', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Semua Shift</option>
                            {shifts.map(shift => (
                                <option key={shift.id} value={shift.id}>{shift.name}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Line</label>
                        <select
                            value={data.line_id || ''}
                            onChange={(e) => setData('line_id', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Semua Line</option>
                            {lines.map(line => (
                                <option key={line.id} value={line.id}>{line.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="flex items-end">
                        <Button type="submit" variant="primary" className="w-full" disabled={processing}>
                            {processing ? 'Loading...' : 'Filter'}
                        </Button>
                    </div>
                </form>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-lg shadow-md">
                    <p className="text-sm opacity-90 mb-1">Total Premium</p>
                    <p className="text-3xl font-bold">{summary.total_premium.toLocaleString()}</p>
                </div>
                <div className="bg-gradient-to-br from-red-500 to-red-600 text-white p-6 rounded-lg shadow-md">
                    <p className="text-sm opacity-90 mb-1">Total Defects</p>
                    <p className="text-3xl font-bold">{summary.total_defects.toLocaleString()}</p>
                </div>
                <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-lg shadow-md">
                    <p className="text-sm opacity-90 mb-1">Total Produksi</p>
                    <p className="text-3xl font-bold">{summary.total_production.toLocaleString()}</p>
                </div>
                <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-lg shadow-md">
                    <p className="text-sm opacity-90 mb-1">Total Laporan</p>
                    <p className="text-3xl font-bold">{summary.total_reports}</p>
                </div>
                <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white p-6 rounded-lg shadow-md">
                    <p className="text-sm opacity-90 mb-1">Rata-rata Premium</p>
                    <p className="text-3xl font-bold">{summary.average_premium_pct.toFixed(1)}%</p>
                </div>
                <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white p-6 rounded-lg shadow-md">
                    <p className="text-sm opacity-90 mb-1">Rata-rata Defect</p>
                    <p className="text-3xl font-bold">{summary.average_defect_pct.toFixed(1)}%</p>
                </div>
            </div>

            {/* Export Buttons */}
            <div className="flex gap-3 mb-6">
                <a href={`/admin/recap/export-excel?${new URLSearchParams(data).toString()}`}>
                    <Button variant="success" className="flex items-center gap-2">
                        <Download className="w-4 h-4" />
                        Export Excel
                    </Button>
                </a>
                <a href={`/admin/reports/batch/export-pdf?${new URLSearchParams(data).toString()}`} target="_blank">
                    <Button variant="danger" className="flex items-center gap-2">
                        <FileText className="w-4 h-4" />
                        Export PDF
                    </Button>
                </a>
                <Button variant="outline" className="flex items-center gap-2" onClick={() => window.print()}>
                    <Printer className="w-4 h-4" />
                    Print
                </Button>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-lg shadow-md">
                <div className="border-b border-gray-200">
                    <div className="flex space-x-1 p-1">
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex-1 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                                    activeTab === tab.id
                                        ? 'bg-blue-600 text-white'
                                        : 'text-gray-600 hover:bg-gray-100'
                                }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="p-6">
                    {/* Daily Recap */}
                    {activeTab === 'daily' && (
                        <div className="space-y-6">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {/* Line Chart */}
                                <div>
                                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Trend Premium Harian</h4>
                                    <ResponsiveContainer width="100%" height={300}>
                                        <LineChart data={daily_recap}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="date" />
                                            <YAxis />
                                            <Tooltip />
                                            <Legend />
                                            <Line type="monotone" dataKey="total_premium" stroke="#3B82F6" name="Premium" strokeWidth={2} />
                                            <Line type="monotone" dataKey="total_defects" stroke="#EF4444" name="Defects" strokeWidth={2} />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>

                                {/* Bar Chart */}
                                <div>
                                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Produksi Harian</h4>
                                    <ResponsiveContainer width="100%" height={300}>
                                        <BarChart data={daily_recap}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="date" />
                                            <YAxis />
                                            <Tooltip />
                                            <Legend />
                                            <Bar dataKey="total_production" fill="#10B981" name="Total Produksi" />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>

                            {/* Table */}
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tanggal</th>
                                            <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Premium</th>
                                            <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Defects</th>
                                            <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Total Produksi</th>
                                            <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Laporan</th>
                                            <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Avg Premium %</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {daily_recap.map((day, idx) => (
                                            <tr key={idx} className="hover:bg-gray-50">
                                                <td className="px-4 py-3 text-sm text-gray-900">{day.date}</td>
                                                <td className="px-4 py-3 text-sm text-right font-semibold text-blue-600">{day.total_premium.toLocaleString()}</td>
                                                <td className="px-4 py-3 text-sm text-right text-red-600">{day.total_defects.toLocaleString()}</td>
                                                <td className="px-4 py-3 text-sm text-right font-semibold">{day.total_production.toLocaleString()}</td>
                                                <td className="px-4 py-3 text-sm text-right">{day.report_count}</td>
                                                <td className="px-4 py-3 text-sm text-right text-green-600">{day.average_premium_pct.toFixed(2)}%</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* Shift Recap */}
                    {activeTab === 'shift' && (
                        <div className="space-y-6">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <div>
                                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Premium per Shift</h4>
                                    <ResponsiveContainer width="100%" height={300}>
                                        <BarChart data={shift_recap}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="shift_name" />
                                            <YAxis />
                                            <Tooltip />
                                            <Legend />
                                            <Bar dataKey="total_premium" fill="#3B82F6" name="Premium" />
                                            <Bar dataKey="total_defects" fill="#EF4444" name="Defects" />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>

                                <div>
                                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Persentase Premium per Shift</h4>
                                    <ResponsiveContainer width="100%" height={300}>
                                        <PieChart>
                                            <Pie
                                                data={shift_recap}
                                                dataKey="total_premium"
                                                nameKey="shift_name"
                                                cx="50%"
                                                cy="50%"
                                                outerRadius={100}
                                                label
                                            >
                                                {shift_recap.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                ))}
                                            </Pie>
                                            <Tooltip />
                                            <Legend />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Shift</th>
                                            <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Premium</th>
                                            <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Defects</th>
                                            <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Total</th>
                                            <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Laporan</th>
                                            <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Avg %</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {shift_recap.map((shift, idx) => (
                                            <tr key={idx} className="hover:bg-gray-50">
                                                <td className="px-4 py-3 text-sm font-semibold text-gray-900">{shift.shift_name}</td>
                                                <td className="px-4 py-3 text-sm text-right font-semibold text-blue-600">{shift.total_premium.toLocaleString()}</td>
                                                <td className="px-4 py-3 text-sm text-right text-red-600">{shift.total_defects.toLocaleString()}</td>
                                                <td className="px-4 py-3 text-sm text-right">{shift.total_production.toLocaleString()}</td>
                                                <td className="px-4 py-3 text-sm text-right">{shift.report_count}</td>
                                                <td className="px-4 py-3 text-sm text-right text-green-600">{shift.average_premium_pct.toFixed(2)}%</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* Line Recap */}
                    {activeTab === 'line' && (
                        <div className="space-y-6">
                            <div>
                                <h4 className="text-lg font-semibold text-gray-900 mb-4">Premium per Line</h4>
                                <ResponsiveContainer width="100%" height={350}>
                                    <BarChart data={line_recap} layout="horizontal">
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis type="number" />
                                        <YAxis dataKey="line_name" type="category" />
                                        <Tooltip />
                                        <Legend />
                                        <Bar dataKey="total_premium" fill="#3B82F6" name="Premium" />
                                        <Bar dataKey="total_defects" fill="#EF4444" name="Defects" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Line</th>
                                            <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Premium</th>
                                            <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Defects</th>
                                            <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Total</th>
                                            <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Laporan</th>
                                            <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Avg %</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {line_recap.map((line, idx) => (
                                            <tr key={idx} className="hover:bg-gray-50">
                                                <td className="px-4 py-3 text-sm font-semibold text-gray-900">{line.line_name}</td>
                                                <td className="px-4 py-3 text-sm text-right font-semibold text-blue-600">{line.total_premium.toLocaleString()}</td>
                                                <td className="px-4 py-3 text-sm text-right text-red-600">{line.total_defects.toLocaleString()}</td>
                                                <td className="px-4 py-3 text-sm text-right">{line.total_production.toLocaleString()}</td>
                                                <td className="px-4 py-3 text-sm text-right">{line.report_count}</td>
                                                <td className="px-4 py-3 text-sm text-right text-green-600">{line.average_premium_pct.toFixed(2)}%</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* Motif Recap */}
                    {activeTab === 'motif' && (
                        <div className="space-y-6">
                            <div>
                                <h4 className="text-lg font-semibold text-gray-900 mb-4">Premium per Motif</h4>
                                <ResponsiveContainer width="100%" height={400}>
                                    <BarChart data={motif_recap}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="motif_name" angle={-45} textAnchor="end" height={100} />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Bar dataKey="total_premium" fill="#10B981" name="Premium" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Motif</th>
                                            <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Premium</th>
                                            <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Defects</th>
                                            <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Total</th>
                                            <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Laporan</th>
                                            <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Avg %</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {motif_recap.map((motif, idx) => (
                                            <tr key={idx} className="hover:bg-gray-50">
                                                <td className="px-4 py-3 text-sm font-semibold text-gray-900">{motif.motif_name}</td>
                                                <td className="px-4 py-3 text-sm text-right font-semibold text-blue-600">{motif.total_premium.toLocaleString()}</td>
                                                <td className="px-4 py-3 text-sm text-right text-red-600">{motif.total_defects.toLocaleString()}</td>
                                                <td className="px-4 py-3 text-sm text-right">{motif.total_production.toLocaleString()}</td>
                                                <td className="px-4 py-3 text-sm text-right">{motif.report_count}</td>
                                                <td className="px-4 py-3 text-sm text-right text-green-600">{motif.average_premium_pct.toFixed(2)}%</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}
