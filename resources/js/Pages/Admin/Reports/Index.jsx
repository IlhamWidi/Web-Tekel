import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import Input from '@/Components/Input';
import Button from '@/Components/Button';
import FlashMessage from '@/Components/FlashMessage';
import { Plus, Search, Eye, Edit, Trash2, CheckCircle, XCircle, FileText } from 'lucide-react';
import { useState } from 'react';

export default function Index({ reports, filters, shifts, lines, auth }) {
    const [search, setSearch] = useState(filters.search || '');

    const handleSearch = (e) => {
        e.preventDefault();
        router.get('/admin/reports', {
            search,
            shift_id: filters.shift_id,
            line_id: filters.line_id,
            motif_id: filters.motif_id,
            status: filters.status,
            date_from: filters.date_from,
            date_to: filters.date_to,
        }, { preserveState: true });
    };

    const handleFilter = (key, value) => {
        router.get('/admin/reports', {
            ...filters,
            [key]: value,
            search,
        }, { preserveState: true });
    };

    const handleDelete = (id) => {
        if (confirm('Apakah Anda yakin ingin menghapus laporan ini?')) {
            router.delete(`/admin/reports/${id}`);
        }
    };

    const handleApprove = (id) => {
        if (confirm('Apakah Anda yakin ingin menyetujui laporan ini?')) {
            router.post(`/admin/reports/${id}/approve`, {
                status: 'approved'
            });
        }
    };

    const handleReject = (id) => {
        const reason = prompt('Alasan penolakan:');
        if (reason) {
            router.post(`/admin/reports/${id}/approve`, {
                status: 'rejected',
                rejection_reason: reason
            });
        }
    };

    const getStatusBadge = (status) => {
        const badges = {
            draft: 'bg-gray-100 text-gray-800',
            pending: 'bg-blue-100 text-blue-800',
            approved: 'bg-green-100 text-green-800',
            rejected: 'bg-red-100 text-red-800',
        };
        const labels = {
            draft: 'Draft',
            pending: 'Menunggu Approval',
            approved: 'Disetujui',
            rejected: 'Ditolak',
        };
        return (
            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${badges[status]}`}>
                {labels[status]}
            </span>
        );
    };

    const canApprove = auth.user.permissions.includes('approve production reports');
    const canEdit = auth.user.permissions.includes('edit production reports');
    const canDelete = auth.user.permissions.includes('delete production reports');

    return (
        <AdminLayout title="Laporan Produksi">
            <Head title="Laporan Produksi" />

            <FlashMessage />

            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Laporan Produksi</h2>
                {auth.user.permissions.includes('create production reports') && (
                    <Link href="/admin/reports/create">
                        <Button variant="primary" className="flex items-center gap-2">
                            <Plus className="w-4 h-4" />
                            Buat Laporan
                        </Button>
                    </Link>
                )}
            </div>

            {/* Filters */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <form onSubmit={handleSearch} className="space-y-4">
                    {/* Search */}
                    <div className="flex gap-2">
                        <div className="flex-1">
                            <Input
                                type="text"
                                placeholder="Cari berdasarkan catatan..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                        <Button type="submit" variant="primary">
                            <Search className="w-4 h-4 mr-2" />
                            Cari
                        </Button>
                    </div>

                    {/* Advanced Filters */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal Dari</label>
                            <input
                                type="date"
                                value={filters.date_from || ''}
                                onChange={(e) => handleFilter('date_from', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal Sampai</label>
                            <input
                                type="date"
                                value={filters.date_to || ''}
                                onChange={(e) => handleFilter('date_to', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Shift</label>
                            <select
                                value={filters.shift_id || ''}
                                onChange={(e) => handleFilter('shift_id', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
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
                                value={filters.line_id || ''}
                                onChange={(e) => handleFilter('line_id', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Semua Line</option>
                                {lines.map(line => (
                                    <option key={line.id} value={line.id}>{line.name}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                            <select
                                value={filters.status || ''}
                                onChange={(e) => handleFilter('status', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Semua Status</option>
                                <option value="draft">Draft</option>
                                <option value="pending">Menunggu Approval</option>
                                <option value="approved">Disetujui</option>
                                <option value="rejected">Ditolak</option>
                            </select>
                        </div>
                    </div>
                </form>
            </div>

            {/* Table */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">No. Laporan</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tanggal</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Shift</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Line</th>
                                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Target</th>
                                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Aktual</th>
                                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">NG</th>
                                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Status</th>
                                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {reports.data.length === 0 ? (
                                <tr>
                                    <td colSpan="9" className="px-4 py-8 text-center text-gray-500">
                                        Tidak ada data laporan
                                    </td>
                                </tr>
                            ) : (
                                reports.data.map(report => (
                                    <tr key={report.id} className="hover:bg-gray-50">
                                        <td className="px-4 py-3 text-sm font-mono text-gray-900">{report.report_number}</td>
                                        <td className="px-4 py-3 text-sm text-gray-900">{report.date}</td>
                                        <td className="px-4 py-3 text-sm text-gray-900">{report.shift}</td>
                                        <td className="px-4 py-3 text-sm text-gray-900">{report.line}</td>
                                        <td className="px-4 py-3 text-sm text-right text-gray-900">
                                            {report.total_target?.toLocaleString() || 0}
                                        </td>
                                        <td className="px-4 py-3 text-sm text-right font-semibold text-blue-600">
                                            {report.total_actual?.toLocaleString() || 0}
                                        </td>
                                        <td className="px-4 py-3 text-sm text-right text-red-600">
                                            {report.total_ng?.toLocaleString() || 0}
                                        </td>
                                        <td className="px-4 py-3 text-center">
                                            {getStatusBadge(report.status)}
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="flex items-center justify-center gap-2">
                                                <Link href={`/admin/reports/${report.id}`}>
                                                    <button className="text-blue-600 hover:text-blue-800" title="Lihat Detail">
                                                        <Eye className="w-4 h-4" />
                                                    </button>
                                                </Link>

                                                {report.can_edit && (
                                                    <Link href={`/admin/reports/${report.id}/edit`}>
                                                        <button className="text-green-600 hover:text-green-800" title="Edit">
                                                            <Edit className="w-4 h-4" />
                                                        </button>
                                                    </Link>
                                                )}

                                                {report.can_approve && (
                                                    <>
                                                        <button
                                                            onClick={() => handleApprove(report.id)}
                                                            className="text-green-600 hover:text-green-800"
                                                            title="Setujui"
                                                        >
                                                            <CheckCircle className="w-4 h-4" />
                                                        </button>
                                                        <button
                                                            onClick={() => handleReject(report.id)}
                                                            className="text-red-600 hover:text-red-800"
                                                            title="Tolak"
                                                        >
                                                            <XCircle className="w-4 h-4" />
                                                        </button>
                                                    </>
                                                )}

                                                {canDelete && report.can_edit && (
                                                    <button
                                                        onClick={() => handleDelete(report.id)}
                                                        className="text-red-600 hover:text-red-800"
                                                        title="Hapus"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {reports.links.length > 3 && (
                    <div className="px-4 py-3 border-t border-gray-200">
                        <div className="flex items-center justify-between">
                            <div className="text-sm text-gray-700">
                                Menampilkan <span className="font-semibold">{reports.from}</span> sampai{' '}
                                <span className="font-semibold">{reports.to}</span> dari{' '}
                                <span className="font-semibold">{reports.total}</span> data
                            </div>
                            <div className="flex gap-1">
                                {reports.links.map((link, index) => (
                                    <button
                                        key={index}
                                        onClick={() => link.url && router.get(link.url)}
                                        disabled={!link.url}
                                        className={`px-3 py-1 text-sm rounded ${
                                            link.active
                                                ? 'bg-blue-600 text-white'
                                                : link.url
                                                ? 'bg-white text-gray-700 hover:bg-gray-100'
                                                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                        }`}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
