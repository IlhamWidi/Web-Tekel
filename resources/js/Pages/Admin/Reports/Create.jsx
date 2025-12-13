import { Head, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import Input from '@/Components/Input';
import Button from '@/Components/Button';
import FlashMessage from '@/Components/FlashMessage';
import { Plus, Trash2, Save } from 'lucide-react';
import { useState } from 'react';

export default function Create({ shifts, lines, motifs, dimensions }) {
    const { data, setData, post, processing, errors } = useForm({
        production_date: new Date().toISOString().split('T')[0],
        shift_id: '',
        line_id: '',
        notes: '',
        status: 'draft',
        details: [
            {
                motif_id: '',
                dimension_id: '',
                target_quantity: '',
                actual_quantity: '',
                ng_quantity: '',
                notes: '',
            }
        ]
    });

    const addDetail = () => {
        setData('details', [
            ...data.details,
            {
                motif_id: '',
                dimension_id: '',
                target_quantity: '',
                actual_quantity: '',
                ng_quantity: '',
                notes: '',
            }
        ]);
    };

    const removeDetail = (index) => {
        const newDetails = data.details.filter((_, i) => i !== index);
        setData('details', newDetails);
    };

    const updateDetail = (index, field, value) => {
        const newDetails = [...data.details];
        newDetails[index][field] = value;
        setData('details', newDetails);
    };

    const handleSubmit = (status = 'draft') => {
        post('/admin/reports', {
            data: { ...data, status }
        });
    };

    const calculateAchievement = (detail) => {
        const target = parseInt(detail.target_quantity) || 0;
        const actual = parseInt(detail.actual_quantity) || 0;
        if (target === 0) return 0;
        return ((actual / target) * 100).toFixed(1);
    };

    return (
        <AdminLayout title="Buat Laporan Produksi">
            <Head title="Buat Laporan Produksi" />

            <FlashMessage />

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Header Information */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Informasi Laporan</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <Input
                            type="date"
                            label="Tanggal Produksi"
                            value={data.production_date}
                            onChange={(e) => setData('production_date', e.target.value)}
                            error={errors.production_date}
                            required
                        />
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Shift <span className="text-red-500">*</span>
                            </label>
                            <select
                                value={data.shift_id}
                                onChange={(e) => setData('shift_id', e.target.value)}
                                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                    errors.shift_id ? 'border-red-500' : 'border-gray-300'
                                }`}
                                required
                            >
                                <option value="">Pilih Shift</option>
                                {shifts.map(shift => (
                                    <option key={shift.id} value={shift.id}>
                                        {shift.name}
                                    </option>
                                ))}
                            </select>
                            {errors.shift_id && <p className="mt-1 text-sm text-red-600">{errors.shift_id}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Line Produksi <span className="text-red-500">*</span>
                            </label>
                            <select
                                value={data.line_id}
                                onChange={(e) => setData('line_id', e.target.value)}
                                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                    errors.line_id ? 'border-red-500' : 'border-gray-300'
                                }`}
                                required
                            >
                                <option value="">Pilih Line</option>
                                {lines.map(line => (
                                    <option key={line.id} value={line.id}>{line.name}</option>
                                ))}
                            </select>
                            {errors.line_id && <p className="mt-1 text-sm text-red-600">{errors.line_id}</p>}
                        </div>

                        <div className="lg:col-span-3">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Catatan</label>
                            <textarea
                                value={data.notes}
                                onChange={(e) => setData('notes', e.target.value)}
                                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                    errors.notes ? 'border-red-500' : 'border-gray-300'
                                }`}
                                rows="2"
                                placeholder="Catatan tambahan untuk laporan ini..."
                            />
                            {errors.notes && <p className="mt-1 text-sm text-red-600">{errors.notes}</p>}
                        </div>
                    </div>
                </div>

                {/* Detail Production */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">Detail Produksi</h3>
                        <Button type="button" variant="success" size="sm" onClick={addDetail}>
                            <Plus className="w-4 h-4 mr-1" />
                            Tambah Baris
                        </Button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No</th>
                                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Motif</th>
                                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dimensi</th>
                                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Target (pcs)</th>
                                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aktual (pcs)</th>
                                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">NG (pcs)</th>
                                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pencapaian</th>
                                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Catatan</th>
                                    <th className="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                                {data.details.map((detail, index) => {
                                    const achievement = calculateAchievement(detail);
                                    return (
                                        <tr key={index} className="hover:bg-gray-50">
                                            <td className="px-3 py-3 text-center font-medium text-gray-900">{index + 1}</td>
                                            <td className="px-3 py-3">
                                                <select
                                                    value={detail.motif_id}
                                                    onChange={(e) => updateDetail(index, 'motif_id', e.target.value)}
                                                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                                        errors[`details.${index}.motif_id`] ? 'border-red-500' : 'border-gray-300'
                                                    }`}
                                                    required
                                                >
                                                    <option value="">Pilih Motif</option>
                                                    {motifs.map(motif => (
                                                        <option key={motif.id} value={motif.id}>
                                                            {motif.name}
                                                        </option>
                                                    ))}
                                                </select>
                                                {errors[`details.${index}.motif_id`] && (
                                                    <p className="mt-1 text-xs text-red-600">{errors[`details.${index}.motif_id`]}</p>
                                                )}
                                            </td>
                                            <td className="px-3 py-3">
                                                <select
                                                    value={detail.dimension_id}
                                                    onChange={(e) => updateDetail(index, 'dimension_id', e.target.value)}
                                                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                                        errors[`details.${index}.dimension_id`] ? 'border-red-500' : 'border-gray-300'
                                                    }`}
                                                    required
                                                >
                                                    <option value="">Pilih Dimensi</option>
                                                    {dimensions.map(dimension => (
                                                        <option key={dimension.id} value={dimension.id}>
                                                            {dimension.name}
                                                        </option>
                                                    ))}
                                                </select>
                                                {errors[`details.${index}.dimension_id`] && (
                                                    <p className="mt-1 text-xs text-red-600">{errors[`details.${index}.dimension_id`]}</p>
                                                )}
                                            </td>
                                            <td className="px-3 py-3">
                                                <input
                                                    type="number"
                                                    min="0"
                                                    value={detail.target_quantity}
                                                    onChange={(e) => updateDetail(index, 'target_quantity', e.target.value)}
                                                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                                        errors[`details.${index}.target_quantity`] ? 'border-red-500' : 'border-gray-300'
                                                    }`}
                                                    placeholder="0"
                                                    required
                                                />
                                                {errors[`details.${index}.target_quantity`] && (
                                                    <p className="mt-1 text-xs text-red-600">{errors[`details.${index}.target_quantity`]}</p>
                                                )}
                                            </td>
                                            <td className="px-3 py-3">
                                                <input
                                                    type="number"
                                                    min="0"
                                                    value={detail.actual_quantity}
                                                    onChange={(e) => updateDetail(index, 'actual_quantity', e.target.value)}
                                                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                                        errors[`details.${index}.actual_quantity`] ? 'border-red-500' : 'border-gray-300'
                                                    }`}
                                                    placeholder="0"
                                                    required
                                                />
                                                {errors[`details.${index}.actual_quantity`] && (
                                                    <p className="mt-1 text-xs text-red-600">{errors[`details.${index}.actual_quantity`]}</p>
                                                )}
                                            </td>
                                            <td className="px-3 py-3">
                                                <input
                                                    type="number"
                                                    min="0"
                                                    value={detail.ng_quantity}
                                                    onChange={(e) => updateDetail(index, 'ng_quantity', e.target.value)}
                                                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                                        errors[`details.${index}.ng_quantity`] ? 'border-red-500' : 'border-gray-300'
                                                    }`}
                                                    placeholder="0"
                                                    required
                                                />
                                                {errors[`details.${index}.ng_quantity`] && (
                                                    <p className="mt-1 text-xs text-red-600">{errors[`details.${index}.ng_quantity`]}</p>
                                                )}
                                            </td>
                                            <td className="px-3 py-3">
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                    achievement >= 100 ? 'bg-green-100 text-green-800' :
                                                    achievement >= 80 ? 'bg-blue-100 text-blue-800' :
                                                    achievement >= 60 ? 'bg-yellow-100 text-yellow-800' :
                                                    'bg-red-100 text-red-800'
                                                }`}>
                                                    {achievement}%
                                                </span>
                                            </td>
                                            <td className="px-3 py-3">
                                                <textarea
                                                    value={detail.notes || ''}
                                                    onChange={(e) => updateDetail(index, 'notes', e.target.value)}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs"
                                                    rows="2"
                                                    placeholder="Catatan..."
                                                />
                                            </td>
                                            <td className="px-3 py-3 text-center">
                                                {data.details.length > 1 && (
                                                    <button
                                                        type="button"
                                                        onClick={() => removeDetail(index)}
                                                        className="text-red-600 hover:text-red-800 transition-colors"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>

                    {errors.details && (
                        <p className="mt-2 text-sm text-red-600">{errors.details}</p>
                    )}
                </div>

                {/* Form Actions */}
                <div className="flex justify-between items-center">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => window.history.back()}
                        disabled={processing}
                    >
                        Batal
                    </Button>
                    <div className="flex gap-3">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => handleSubmit('draft')}
                            disabled={processing}
                            className="flex items-center gap-2"
                        >
                            <Save className="w-4 h-4" />
                            {processing ? 'Menyimpan...' : 'Simpan sebagai Draft'}
                        </Button>
                        <Button
                            type="button"
                            variant="primary"
                            onClick={() => handleSubmit('pending')}
                            disabled={processing}
                            className="flex items-center gap-2"
                        >
                            <Save className="w-4 h-4" />
                            {processing ? 'Mengajukan...' : 'Ajukan untuk Approval'}
                        </Button>
                    </div>
                </div>
            </form>
        </AdminLayout>
    );
}
