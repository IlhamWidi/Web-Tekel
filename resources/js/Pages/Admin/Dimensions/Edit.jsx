import { Head, useForm, Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import Input from '@/Components/Input';
import Button from '@/Components/Button';
import FlashMessage from '@/Components/FlashMessage';
import { Save, ArrowLeft } from 'lucide-react';

export default function Edit({ dimension }) {
    const { data, setData, put, processing, errors } = useForm({
        name: dimension.name,
        width: dimension.width,
        height: dimension.height,
        thickness: dimension.thickness,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(`/admin/dimensions/${dimension.id}`);
    };

    return (
        <AdminLayout title="Edit Dimensi">
            <Head title="Edit Dimensi" />

            <FlashMessage />

            <div className="mb-6">
                <Link href="/admin/dimensions">
                    <Button variant="outline" size="sm" className="flex items-center gap-2">
                        <ArrowLeft className="w-4 h-4" />
                        Kembali
                    </Button>
                </Link>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Edit Dimensi</h3>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                    <Input
                        type="text"
                        label="Nama Dimensi"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        error={errors.name}
                        placeholder="Contoh: Lantai 60x60"
                        required
                    />

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Input
                            type="number"
                            step="0.1"
                            label="Panjang (cm)"
                            value={data.width}
                            onChange={(e) => setData('width', e.target.value)}
                            error={errors.width}
                            placeholder="60"
                            required
                        />

                        <Input
                            type="number"
                            step="0.1"
                            label="Lebar (cm)"
                            value={data.height}
                            onChange={(e) => setData('height', e.target.value)}
                            error={errors.height}
                            placeholder="60"
                            required
                        />

                        <Input
                            type="number"
                            step="0.1"
                            label="Tebal (cm)"
                            value={data.thickness}
                            onChange={(e) => setData('thickness', e.target.value)}
                            error={errors.thickness}
                            placeholder="1.0"
                            required
                        />
                    </div>

                    <div className="flex justify-end gap-3">
                        <Link href="/admin/dimensions">
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
