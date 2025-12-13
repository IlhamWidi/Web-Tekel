import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import Input from '@/Components/Input';
import Button from '@/Components/Button';
import FlashMessage from '@/Components/FlashMessage';
import { Plus, Search, Edit, Trash2 } from 'lucide-react';
import { useState } from 'react';

export default function Index({ lines, filters }) {
    const [search, setSearch] = useState(filters.search || '');

    const handleSearch = (e) => {
        e.preventDefault();
        router.get('/admin/lines', { search }, { preserveState: true });
    };

    const handleDelete = (id) => {
        if (confirm('Apakah Anda yakin ingin menghapus line ini?')) {
            router.delete(`/admin/lines/${id}`);
        }
    };

    return (
        <AdminLayout title="Master Data Line">
            <Head title="Master Data Line" />

            <FlashMessage />

            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Master Data Line Produksi</h2>
                <Link href="/admin/lines/create">
                    <Button variant="primary" className="flex items-center gap-2">
                        <Plus className="w-4 h-4" />
                        Tambah Line
                    </Button>
                </Link>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <form onSubmit={handleSearch} className="flex gap-2">
                    <div className="flex-1">
                        <Input
                            type="text"
                            placeholder="Cari line..."
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
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nama Line</th>
                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {lines.data.length === 0 ? (
                            <tr>
                                <td colSpan="3" className="px-6 py-8 text-center text-gray-500">
                                    Tidak ada data line
                                </td>
                            </tr>
                        ) : (
                            lines.data.map(line => (
                                <tr key={line.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 text-sm text-gray-900">{line.id}</td>
                                    <td className="px-6 py-4 text-sm font-semibold text-gray-900">{line.name}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-center gap-2">
                                            <Link href={`/admin/lines/${line.id}/edit`}>
                                                <button className="text-green-600 hover:text-green-800" title="Edit">
                                                    <Edit className="w-4 h-4" />
                                                </button>
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(line.id)}
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

                {lines.links.length > 3 && (
                    <div className="px-6 py-3 border-t border-gray-200">
                        <div className="flex items-center justify-between">
                            <div className="text-sm text-gray-700">
                                Menampilkan <span className="font-semibold">{lines.from}</span> sampai{' '}
                                <span className="font-semibold">{lines.to}</span> dari{' '}
                                <span className="font-semibold">{lines.total}</span> data
                            </div>
                            <div className="flex gap-1">
                                {lines.links.map((link, index) => (
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
