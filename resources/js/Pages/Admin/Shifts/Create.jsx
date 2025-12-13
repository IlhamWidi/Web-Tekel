import { Head, useForm, Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import Input from '@/Components/Input';
import Button from '@/Components/Button';
import FlashMessage from '@/Components/FlashMessage';
import { Save, ArrowLeft } from 'lucide-react';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        start_time: '',
        end_time: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/admin/shifts');
    };

    return (
        <AdminLayout title="Tambah Shift">
            <Head title="Tambah Shift" />

            <FlashMessage />

            <div className="mb-6">
                <Link href="/admin/shifts">
                    <Button variant="outline" size="sm" className="flex items-center gap-2">
                        <ArrowLeft className="w-4 h-4" />
                        Kembali
                    </Button>
                </Link>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Tambah Shift Baru</h3>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                    <Input
                        type="text"
                        label="Nama Shift"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        error={errors.name}
                        placeholder="Contoh: Shift 1"
                        required
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                            type="time"
                            label="Jam Mulai"
                            value={data.start_time}
                            onChange={(e) => setData('start_time', e.target.value)}
                            error={errors.start_time}
                            required
                        />

                        <Input
                            type="time"
                            label="Jam Selesai"
                            value={data.end_time}
                            onChange={(e) => setData('end_time', e.target.value)}
                            error={errors.end_time}
                            required
                        />
                    </div>

                    <div className="flex justify-end gap-3">
                        <Link href="/admin/shifts">
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
