import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import Input from '@/Components/Input';
import Button from '@/Components/Button';
import FlashMessage from '@/Components/FlashMessage';
import { Plus, Search, Edit, Trash2 } from 'lucide-react';
import { useState } from 'react';

export default function Index({ shifts, filters }) {
    const [search, setSearch] = useState(filters.search || '');

    const handleSearch = (e) => {
        e.preventDefault();
        router.get('/admin/shifts', { search }, { preserveState: true });
    };

    const handleDelete = (id) => {
        if (confirm('Apakah Anda yakin ingin menghapus shift ini?')) {
            router.delete(`/admin/shifts/${id}`);
        }
    };

    return (
        <AdminLayout title="Master Data Shift">
            <Head title="Master Data Shift" />

            <FlashMessage />

            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Master Data Shift</h2>
                <Link href="/admin/shifts/create">
                    <Button variant="primary" className="flex items-center gap-2">
                        <Plus className="w-4 h-4" />
                        Tambah Shift
                    </Button>
                </Link>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <form onSubmit={handleSearch} className="flex gap-2">
                    <div className="flex-1">
                        <Input
                            type="text"
                            placeholder="Cari shift..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <Button type="submit" variant="primary">
                        <Search className="w-4 h-4 mr-2" />
                        Cari
                    </Button>
                </form>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nama Shift</th>
                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Jam Mulai</th>
                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Jam Selesai</th>
                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {shifts.data.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                                    Tidak ada data shift
                                </td>
                            </tr>
                        ) : (
                            shifts.data.map(shift => (
                                <tr key={shift.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 text-sm text-gray-900">{shift.id}</td>
                                    <td className="px-6 py-4 text-sm font-semibold text-gray-900">{shift.name}</td>
                                    <td className="px-6 py-4 text-sm text-center text-blue-600">{shift.start_time}</td>
                                    <td className="px-6 py-4 text-sm text-center text-red-600">{shift.end_time}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-center gap-2">
                                            <Link href={`/admin/shifts/${shift.id}/edit`}>
                                                <button className="text-green-600 hover:text-green-800" title="Edit">
                                                    <Edit className="w-4 h-4" />
                                                </button>
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(shift.id)}
                                                className="text-red-600 hover:text-red-800"
                                                title="Hapus"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>

                {shifts.links.length > 3 && (
                    <div className="px-6 py-3 border-t border-gray-200">
                        <div className="flex items-center justify-between">
                            <div className="text-sm text-gray-700">
                                Menampilkan <span className="font-semibold">{shifts.from}</span> sampai{' '}
                                <span className="font-semibold">{shifts.to}</span> dari{' '}
                                <span className="font-semibold">{shifts.total}</span> data
                            </div>
                            <div className="flex gap-1">
                                {shifts.links.map((link, index) => (
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
