<?php

namespace App\Exports;

use App\Models\ProductionReport;
use App\Models\ProductionReportDetail;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithStyles;
use Maatwebsite\Excel\Concerns\WithTitle;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;
use PhpOffice\PhpSpreadsheet\Style\Fill;
use PhpOffice\PhpSpreadsheet\Style\Border;
use PhpOffice\PhpSpreadsheet\Style\Alignment;

class RecapExport implements FromCollection, WithHeadings, WithMapping, WithStyles, WithTitle, ShouldAutoSize
{
    protected $filters;
    protected $rowNumber = 0;

    public function __construct(array $filters = [])
    {
        $this->filters = $filters;
    }

    /**
     * @return \Illuminate\Support\Collection
     */
    public function collection()
    {
        $query = ProductionReportDetail::with([
            'productionReport.line',
            'productionReport.shift',
            'productionReport.creator',
            'motif',
            'dimension'
        ])->whereHas('productionReport', function ($q) {
            if (isset($this->filters['start_date'])) {
                $q->whereDate('production_date', '>=', $this->filters['start_date']);
            }

            if (isset($this->filters['end_date'])) {
                $q->whereDate('production_date', '<=', $this->filters['end_date']);
            }

            if (isset($this->filters['line_id'])) {
                $q->where('line_id', $this->filters['line_id']);
            }

            if (isset($this->filters['shift_id'])) {
                $q->where('shift_id', $this->filters['shift_id']);
            }

            if (isset($this->filters['status'])) {
                $q->where('status', $this->filters['status']);
            }
        });

        return $query->orderBy('created_at', 'desc')->get();
    }

    /**
     * @return array
     */
    public function headings(): array
    {
        return [
            'No',
            'No. Laporan',
            'Tanggal Produksi',
            'Line',
            'Shift',
            'Kode Motif',
            'Nama Motif',
            'Dimensi',
            'Target',
            'Aktual',
            'NG',
            'Achievement (%)',
            'Status',
            'Pembuat',
            'Tanggal Dibuat',
        ];
    }

    /**
     * @param mixed $detail
     * @return array
     */
    public function map($detail): array
    {
        $this->rowNumber++;
        
        $achievement = $detail->target_quantity > 0 
            ? round(($detail->actual_quantity / $detail->target_quantity) * 100, 2) 
            : 0;

        $statusMap = [
            'draft' => 'DRAFT',
            'pending' => 'MENUNGGU APPROVAL',
            'approved' => 'DISETUJUI',
            'rejected' => 'DITOLAK',
        ];

        return [
            $this->rowNumber,
            $detail->productionReport->report_number,
            \Carbon\Carbon::parse($detail->productionReport->production_date)->format('d/m/Y'),
            $detail->productionReport->line->name,
            $detail->productionReport->shift->name,
            $detail->motif->code,
            $detail->motif->name,
            $detail->dimension->size,
            $detail->target_quantity,
            $detail->actual_quantity,
            $detail->ng_quantity,
            $achievement,
            $statusMap[$detail->productionReport->status] ?? $detail->productionReport->status,
            $detail->productionReport->creator->name,
            \Carbon\Carbon::parse($detail->created_at)->format('d/m/Y H:i'),
        ];
    }

    /**
     * @param Worksheet $sheet
     * @return array
     */
    public function styles(Worksheet $sheet)
    {
        // Style for header row
        $sheet->getStyle('A1:O1')->applyFromArray([
            'font' => [
                'bold' => true,
                'color' => ['rgb' => 'FFFFFF'],
                'size' => 11,
            ],
            'fill' => [
                'fillType' => Fill::FILL_SOLID,
                'startColor' => ['rgb' => '2563EB'],
            ],
            'alignment' => [
                'horizontal' => Alignment::HORIZONTAL_CENTER,
                'vertical' => Alignment::VERTICAL_CENTER,
            ],
            'borders' => [
                'allBorders' => [
                    'borderStyle' => Border::BORDER_THIN,
                    'color' => ['rgb' => '000000'],
                ],
            ],
        ]);

        // Set row height for header
        $sheet->getRowDimension(1)->setRowHeight(25);

        // Style for data rows
        $lastRow = $this->rowNumber + 1;
        for ($row = 2; $row <= $lastRow; $row++) {
            // Zebra striping
            if ($row % 2 == 0) {
                $sheet->getStyle("A{$row}:O{$row}")->applyFromArray([
                    'fill' => [
                        'fillType' => Fill::FILL_SOLID,
                        'startColor' => ['rgb' => 'F8FAFC'],
                    ],
                ]);
            }

            // Borders for all cells
            $sheet->getStyle("A{$row}:O{$row}")->applyFromArray([
                'borders' => [
                    'allBorders' => [
                        'borderStyle' => Border::BORDER_THIN,
                        'color' => ['rgb' => 'E2E8F0'],
                    ],
                ],
            ]);

            // Center align for specific columns
            $sheet->getStyle("A{$row}")->getAlignment()->setHorizontal(Alignment::HORIZONTAL_CENTER); // No
            $sheet->getStyle("C{$row}")->getAlignment()->setHorizontal(Alignment::HORIZONTAL_CENTER); // Date
            $sheet->getStyle("M{$row}")->getAlignment()->setHorizontal(Alignment::HORIZONTAL_CENTER); // Status
            
            // Right align for number columns
            $sheet->getStyle("I{$row}:L{$row}")->getAlignment()->setHorizontal(Alignment::HORIZONTAL_RIGHT); // Target, Aktual, NG, Achievement
        }

        // Add title above header
        $sheet->insertNewRowBefore(1, 3);
        $sheet->mergeCells('A1:O1');
        $sheet->setCellValue('A1', 'PT SURYA MULTI CEMERLANG');
        $sheet->getStyle('A1')->applyFromArray([
            'font' => [
                'bold' => true,
                'size' => 16,
                'color' => ['rgb' => '1E40AF'],
            ],
            'alignment' => [
                'horizontal' => Alignment::HORIZONTAL_CENTER,
                'vertical' => Alignment::VERTICAL_CENTER,
            ],
        ]);

        $sheet->mergeCells('A2:O2');
        $sheet->setCellValue('A2', 'REKAP LAPORAN PRODUKSI');
        $sheet->getStyle('A2')->applyFromArray([
            'font' => [
                'bold' => true,
                'size' => 12,
                'color' => ['rgb' => '64748B'],
            ],
            'alignment' => [
                'horizontal' => Alignment::HORIZONTAL_CENTER,
                'vertical' => Alignment::VERTICAL_CENTER,
            ],
        ]);

        // Add filter info
        $filterText = 'Filter: ';
        if (isset($this->filters['start_date']) && isset($this->filters['end_date'])) {
            $filterText .= 'Periode ' . \Carbon\Carbon::parse($this->filters['start_date'])->format('d/m/Y') . ' - ' . \Carbon\Carbon::parse($this->filters['end_date'])->format('d/m/Y');
        }
        $sheet->mergeCells('A3:O3');
        $sheet->setCellValue('A3', $filterText);
        $sheet->getStyle('A3')->applyFromArray([
            'font' => [
                'italic' => true,
                'size' => 9,
                'color' => ['rgb' => '64748B'],
            ],
            'alignment' => [
                'horizontal' => Alignment::HORIZONTAL_CENTER,
            ],
        ]);

        $sheet->getRowDimension(1)->setRowHeight(30);
        $sheet->getRowDimension(2)->setRowHeight(20);
        $sheet->getRowDimension(3)->setRowHeight(15);

        return [];
    }

    /**
     * @return string
     */
    public function title(): string
    {
        return 'Rekap Produksi';
    }
}
