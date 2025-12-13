import { Head, Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import Button from '@/Components/Button';
import { ArrowLeft, CheckCircle, XCircle, FileText, Download } from 'lucide-react';

export default function Show({ report, auth }) {
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
            <span className={`px-3 py-1 text-sm font-semibold rounded-full ${badges[status]}`}>
                {labels[status]}
            </span>
        );
    };

    const canApprove = auth.user.permissions.includes('approve production reports') && report.status === 'pending';

    return (
        <AdminLayout title={`Detail Laporan #${report.id}`}>
            <Head title={`Detail Laporan #${report.id}`} />

            {/* Header */}
            <div className="mb-6">
                <Link href="/admin/reports">
                    <Button variant="outline" size="sm" className="flex items-center gap-2 mb-4">
                        <ArrowLeft className="w-4 h-4" />
                        Kembali
                    </Button>
                </Link>
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">Detail Laporan Produksi</h2>
                        <p className="text-gray-600 mt-1">{report.report_number}</p>
                    </div>
                    <div className="flex items-center gap-3">
                        {getStatusBadge(report.status)}
                        <a href={`/admin/reports/${report.id}/export-pdf`} target="_blank">
                            <Button variant="outline" className="flex items-center gap-2">
                                <Download className="w-4 h-4" />
                                Export PDF
                            </Button>
                        </a>
                    </div>
                </div>
            </div>

            {/* Header Information */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b pb-2">Informasi Laporan</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div>
                        <p className="text-sm text-gray-600 mb-1">Nomor Laporan</p>
                        <p className="text-base font-mono font-semibold text-gray-900">{report.report_number}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-600 mb-1">Tanggal Produksi</p>
                        <p className="text-base font-semibold text-gray-900">{report.production_date}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-600 mb-1">Shift</p>
                        <p className="text-base font-semibold text-gray-900">{report.shift.name}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-600 mb-1">Line Produksi</p>
                        <p className="text-base font-semibold text-gray-900">{report.line.name}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-600 mb-1">Dibuat Oleh</p>
                        <p className="text-base font-semibold text-gray-900">{report.created_by}</p>
                    </div>
                    {report.notes && (
                        <div className="lg:col-span-3">
                            <p className="text-sm text-gray-600 mb-1">Catatan</p>
                            <p className="text-base text-gray-900">{report.notes}</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Summary Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-lg shadow-md">
                    <p className="text-sm opacity-90 mb-1">Target</p>
                    <p className="text-3xl font-bold">{report.total_target.toLocaleString()}</p>
                    <p className="text-sm opacity-90 mt-1">Qty yang ditargetkan</p>
                </div>
                <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-lg shadow-md">
                    <p className="text-sm opacity-90 mb-1">Aktual</p>
                    <p className="text-3xl font-bold">{report.total_actual.toLocaleString()}</p>
                    <p className="text-sm opacity-90 mt-1">{report.achievement_percentage.toFixed(2)}% dari target</p>
                </div>
                <div className="bg-gradient-to-br from-red-500 to-red-600 text-white p-6 rounded-lg shadow-md">
                    <p className="text-sm opacity-90 mb-1">NG (Not Good)</p>
                    <p className="text-3xl font-bold">{report.total_ng.toLocaleString()}</p>
                    <p className="text-sm opacity-90 mt-1">Produk cacat</p>
                </div>
                <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-lg shadow-md">
                    <p className="text-sm opacity-90 mb-1">Jumlah Item</p>
                    <p className="text-3xl font-bold">{report.details.length}</p>
                    <p className="text-sm opacity-90 mt-1">Motif/Dimensi berbeda</p>
                </div>
            </div>

            {/* Detail Table */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b pb-2">Detail Produksi per Motif/Dimensi</h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">No</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Motif</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Dimensi</th>
                                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Target</th>
                                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Aktual</th>
                                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">NG</th>
                                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Achievement</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Catatan</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {report.details.map((detail, index) => (
                                <tr key={detail.id} className="hover:bg-gray-50">
                                    <td className="px-4 py-3 text-center font-semibold">{index + 1}</td>
                                    <td className="px-4 py-3">
                                        <div className="font-medium text-gray-900">{detail.motif.code}</div>
                                        <div className="text-xs text-gray-500">{detail.motif.name}</div>
                                    </td>
                                    <td className="px-4 py-3 text-gray-900">{detail.dimension.size}</td>
                                    <td className="px-4 py-3 text-right text-gray-900">{detail.target_quantity.toLocaleString()}</td>
                                    <td className="px-4 py-3 text-right font-semibold text-blue-600">
                                        {detail.actual_quantity.toLocaleString()}
                                    </td>
                                    <td className="px-4 py-3 text-right text-red-600">{detail.ng_quantity.toLocaleString()}</td>
                                    <td className="px-4 py-3 text-center">
                                        <span className={`px-2 py-1 text-xs font-semibold rounded ${
                                            detail.target_quantity > 0 && (detail.actual_quantity / detail.target_quantity * 100) >= 100
                                                ? 'bg-green-100 text-green-800'
                                                : detail.target_quantity > 0 && (detail.actual_quantity / detail.target_quantity * 100) >= 90
                                                ? 'bg-yellow-100 text-yellow-800'
                                                : 'bg-red-100 text-red-800'
                                        }`}>
                                            {detail.target_quantity > 0 
                                                ? ((detail.actual_quantity / detail.target_quantity) * 100).toFixed(1) + '%'
                                                : '0%'
                                            }
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-sm text-gray-600">{detail.notes || '-'}</td>
                                </tr>
                            ))}
                            <tr className="bg-gray-100 font-bold">
                                <td colSpan={3} className="px-4 py-3 text-right">TOTAL:</td>
                                <td className="px-4 py-3 text-right text-gray-900">
                                    {report.total_target.toLocaleString()}
                                </td>
                                <td className="px-4 py-3 text-right text-blue-600">
                                    {report.total_actual.toLocaleString()}
                                </td>
                                <td className="px-4 py-3 text-right text-red-600">
                                    {report.total_ng.toLocaleString()}
                                </td>
                                <td className="px-4 py-3 text-center">
                                    <span className="px-2 py-1 text-xs font-semibold rounded bg-blue-100 text-blue-800">
                                        {report.achievement_percentage.toFixed(1)}%
                                    </span>
                                </td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Approval Section */}
            {report.status !== 'draft' && (
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b pb-2">Status Approval</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {report.approved_by && (
                            <>
                                <div>
                                    <p className="text-sm text-gray-600 mb-1">Disetujui/Ditolak Oleh</p>
                                    <p className="text-base font-semibold text-gray-900">{report.approved_by}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600 mb-1">Tanggal Approval</p>
                                    <p className="text-base font-semibold text-gray-900">{report.approved_at}</p>
                                </div>
                            </>
                        )}
                        {report.rejection_reason && (
                            <div className="md:col-span-2">
                                <p className="text-sm text-gray-600 mb-1">Alasan Penolakan</p>
                                <p className="text-base text-gray-900 bg-red-50 p-3 rounded border border-red-200">{report.rejection_reason}</p>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Action Buttons */}
            {canApprove && (
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Approval Action</h3>
                    <div className="flex gap-3">
                        <form method="POST" action={`/admin/reports/${report.id}/approve`} className="inline">
                            <input type="hidden" name="_token" value={document.querySelector('meta[name="csrf-token"]').content} />
                            <input type="hidden" name="status" value="approved" />
                            <Button
                                type="submit"
                                variant="success"
                                className="flex items-center gap-2"
                                onClick={(e) => {
                                    if (!confirm('Apakah Anda yakin ingin menyetujui laporan ini?')) {
                                        e.preventDefault();
                                    }
                                }}
                            >
                                <CheckCircle className="w-4 h-4" />
                                Setujui Laporan
                            </Button>
                        </form>
                        <form method="POST" action={`/admin/reports/${report.id}/approve`} className="inline">
                            <input type="hidden" name="_token" value={document.querySelector('meta[name="csrf-token"]').content} />
                            <input type="hidden" name="status" value="rejected" />
                            <Button
                                type="button"
                                variant="danger"
                                className="flex items-center gap-2"
                                onClick={(e) => {
                                    e.preventDefault();
                                    const reason = prompt('Alasan penolakan:');
                                    if (reason) {
                                        const form = e.target.closest('form');
                                        const input = document.createElement('input');
                                        input.type = 'hidden';
                                        input.name = 'rejection_reason';
                                        input.value = reason;
                                        form.appendChild(input);
                                        form.submit();
                                    }
                                }}
                            >
                                <XCircle className="w-4 h-4" />
                                Tolak Laporan
                            </Button>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
