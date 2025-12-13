<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Laporan Produksi Batch</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: 'Arial', sans-serif;
            font-size: 9px;
            color: #333;
            padding: 15px;
        }
        .header {
            text-align: center;
            margin-bottom: 15px;
            border-bottom: 2px solid #2563eb;
            padding-bottom: 10px;
        }
        .header h1 {
            font-size: 16px;
            color: #1e40af;
            margin-bottom: 3px;
        }
        .header h2 {
            font-size: 12px;
            color: #64748b;
            font-weight: normal;
        }
        .filter-info {
            background: #f8fafc;
            padding: 10px;
            margin-bottom: 15px;
            border-radius: 4px;
            font-size: 8px;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 10px;
        }
        table thead {
            background: #2563eb;
            color: white;
        }
        table th {
            padding: 6px 4px;
            text-align: left;
            font-size: 8px;
            font-weight: bold;
        }
        table td {
            padding: 5px 4px;
            border-bottom: 1px solid #e2e8f0;
            font-size: 8px;
        }
        table tbody tr:nth-child(even) {
            background: #f8fafc;
        }
        .text-right {
            text-align: right;
        }
        .text-center {
            text-align: center;
        }
        .totals-row {
            background: #eff6ff !important;
            font-weight: bold;
            border-top: 2px solid #2563eb;
        }
        .footer {
            margin-top: 15px;
            padding-top: 10px;
            border-top: 1px solid #e2e8f0;
            font-size: 7px;
            color: #94a3b8;
            text-align: center;
        }
        .status-badge {
            padding: 2px 6px;
            border-radius: 8px;
            font-size: 7px;
            font-weight: bold;
        }
        .status-approved { background: #d1fae5; color: #065f46; }
        .status-pending { background: #fef3c7; color: #92400e; }
        .status-rejected { background: #fee2e2; color: #991b1b; }
        .status-draft { background: #f1f5f9; color: #64748b; }
    </style>
</head>
<body>
    <div class="header">
        <h1>PT SURYA MULTI CEMERLANG</h1>
        <h2>Rekap Laporan Produksi</h2>
    </div>

    <div class="filter-info">
        <strong>Filter:</strong>
        Periode: {{ \Carbon\Carbon::parse($filters['start_date'])->format('d/m/Y') }} - {{ \Carbon\Carbon::parse($filters['end_date'])->format('d/m/Y') }}
        @if(isset($filters['line_id']))
            | Line: {{ $reports->first()->line->name ?? '-' }}
        @endif
        @if(isset($filters['shift_id']))
            | Shift: {{ $reports->first()->shift->name ?? '-' }}
        @endif
        @if(isset($filters['status']))
            | Status: {{ strtoupper($filters['status']) }}
        @endif
    </div>

    <table>
        <thead>
            <tr>
                <th style="width: 3%;">No</th>
                <th style="width: 10%;">No. Laporan</th>
                <th style="width: 9%;">Tanggal</th>
                <th style="width: 10%;">Line</th>
                <th style="width: 8%;">Shift</th>
                <th style="width: 10%;" class="text-right">Target</th>
                <th style="width: 10%;" class="text-right">Aktual</th>
                <th style="width: 10%;" class="text-right">NG</th>
                <th style="width: 8%;" class="text-right">%</th>
                <th style="width: 8%;">Status</th>
                <th style="width: 14%;">Pembuat</th>
            </tr>
        </thead>
        <tbody>
            @foreach($reports as $index => $report)
            @php
                $target = $report->details->sum('target_quantity');
                $actual = $report->details->sum('actual_quantity');
                $ng = $report->details->sum('ng_quantity');
                $achievement = $target > 0 ? round(($actual / $target) * 100, 2) : 0;
            @endphp
            <tr>
                <td class="text-center">{{ $index + 1 }}</td>
                <td>{{ $report->report_number }}</td>
                <td>{{ \Carbon\Carbon::parse($report->production_date)->format('d/m/Y') }}</td>
                <td>{{ $report->line->name }}</td>
                <td>{{ $report->shift->name }}</td>
                <td class="text-right">{{ number_format($target, 0, ',', '.') }}</td>
                <td class="text-right">{{ number_format($actual, 0, ',', '.') }}</td>
                <td class="text-right">{{ number_format($ng, 0, ',', '.') }}</td>
                <td class="text-right">{{ number_format($achievement, 1) }}%</td>
                <td class="text-center">
                    <span class="status-badge status-{{ $report->status }}">
                        {{ strtoupper($report->status) }}
                    </span>
                </td>
                <td>{{ $report->creator->name }}</td>
            </tr>
            @endforeach
            <tr class="totals-row">
                <td colspan="5" class="text-right">GRAND TOTAL:</td>
                <td class="text-right">{{ number_format($grandTotals['target'], 0, ',', '.') }}</td>
                <td class="text-right">{{ number_format($grandTotals['actual'], 0, ',', '.') }}</td>
                <td class="text-right">{{ number_format($grandTotals['ng'], 0, ',', '.') }}</td>
                <td class="text-right">{{ number_format($grandTotals['achievement'], 2) }}%</td>
                <td colspan="2"></td>
            </tr>
        </tbody>
    </table>

    <div class="footer">
        <p>Dicetak pada: {{ now()->format('d F Y H:i:s') }} | Total {{ count($reports) }} laporan</p>
        <p style="margin-top: 3px;">PT Surya Multi Cemerlang - Sistem Pelaporan Produksi</p>
    </div>
</body>
</html>
