import { Head, useForm, Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import Input from '@/Components/Input';
import Button from '@/Components/Button';
import FlashMessage from '@/Components/FlashMessage';
import { Save, ArrowLeft } from 'lucide-react';

export default function Edit({ line }) {
    const { data, setData, put, processing, errors } = useForm({
        name: line.name,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(`/admin/lines/${line.id}`);
    };

    return (
        <AdminLayout title="Edit Line">
            <Head title="Edit Line" />

            <FlashMessage />

            <div className="mb-6">
                <Link href="/admin/lines">
                    <Button variant="outline" size="sm" className="flex items-center gap-2">
                        <ArrowLeft className="w-4 h-4" />
                        Kembali
                    </Button>
                </Link>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Edit Line Produksi</h3>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                    <Input
                        type="text"
                        label="Nama Line"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        error={errors.name}
                        placeholder="Contoh: PSB-II"
                        required
                    />

                    <div className="flex justify-end gap-3">
                        <Link href="/admin/lines">
                            <Button type="button" variant="outline">
                                Batal
                            </Button>
                        </Link>
                        <Button
                            type="submit"
                            variant="primary"
                            disabled={processing}
                            className="flex items-center gap-2"
                        >
                            <Save className="w-4 h-4" />
                            {processing ? 'Menyimpan...' : 'Update'}
                        </Button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
