import { Head, useForm, Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import Input from '@/Components/Input';
import Button from '@/Components/Button';
import FlashMessage from '@/Components/FlashMessage';
import { Save, ArrowLeft } from 'lucide-react';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        code: '',
        name: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/admin/motifs');
    };

    return (
        <AdminLayout title="Tambah Motif">
            <Head title="Tambah Motif" />

            <FlashMessage />

            <div className="mb-6">
                <Link href="/admin/motifs">
                    <Button variant="outline" size="sm" className="flex items-center gap-2">
                        <ArrowLeft className="w-4 h-4" />
                        Kembali
                    </Button>
                </Link>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Tambah Motif Baru</h3>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                    <Input
                        type="text"
                        label="Kode Motif"
                        value={data.code}
                        onChange={(e) => setData('code', e.target.value)}
                        error={errors.code}
                        placeholder="Contoh: MT-001"
                        required
                    />

                    <Input
                        type="text"
                        label="Nama Motif"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        error={errors.name}
                        placeholder="Contoh: Granit Abu-abu"
                        required
                    />

                    <div className="flex justify-end gap-3">
                        <Link href="/admin/motifs">
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
                            {processing ? 'Menyimpan...' : 'Simpan'}
                        </Button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
