<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Laporan Produksi - {{ $report->report_number }}</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: 'Arial', sans-serif;
            font-size: 11px;
            color: #333;
            padding: 20px;
        }
        .header {
            text-align: center;
            margin-bottom: 20px;
            border-bottom: 3px solid #2563eb;
            padding-bottom: 15px;
        }
        .header h1 {
            font-size: 20px;
            color: #1e40af;
            margin-bottom: 5px;
        }
        .header h2 {
            font-size: 16px;
            color: #64748b;
            font-weight: normal;
        }
        .info-section {
            margin-bottom: 20px;
            background: #f8fafc;
            padding: 15px;
            border-radius: 8px;
            border: 1px solid #e2e8f0;
        }
        .info-grid {
            display: table;
            width: 100%;
        }
        .info-row {
            display: table-row;
        }
        .info-label {
            display: table-cell;
            font-weight: bold;
            width: 150px;
            padding: 5px 10px;
            color: #475569;
        }
        .info-value {
            display: table-cell;
            padding: 5px 10px;
        }
        .status-badge {
            display: inline-block;
            padding: 4px 12px;
            border-radius: 12px;
            font-size: 10px;
            font-weight: bold;
            text-transform: uppercase;
        }
        .status-draft { background: #f1f5f9; color: #64748b; }
        .status-pending { background: #fef3c7; color: #92400e; }
        .status-approved { background: #d1fae5; color: #065f46; }
        .status-rejected { background: #fee2e2; color: #991b1b; }
        
        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 15px;
        }
        table thead {
            background: #2563eb;
            color: white;
        }
        table th {
            padding: 10px;
            text-align: left;
            font-size: 11px;
            font-weight: bold;
        }
        table td {
            padding: 8px 10px;
            border-bottom: 1px solid #e2e8f0;
        }
        table tbody tr:nth-child(even) {
            background: #f8fafc;
        }
        table tbody tr:hover {
            background: #f1f5f9;
        }
        .text-right {
            text-align: right;
        }
        .text-center {
            text-align: center;
        }
        .totals-section {
            margin-top: 20px;
            background: #eff6ff;
            padding: 15px;
            border-radius: 8px;
            border: 2px solid #2563eb;
        }
        .totals-grid {
            display: table;
            width: 100%;
        }
        .totals-item {
            display: table-cell;
            text-align: center;
            padding: 10px;
            width: 25%;
        }
        .totals-label {
            font-size: 10px;
            color: #64748b;
            text-transform: uppercase;
            margin-bottom: 5px;
        }
        .totals-value {
            font-size: 18px;
            font-weight: bold;
            color: #1e40af;
        }
        .footer {
            margin-top: 30px;
            padding-top: 15px;
            border-top: 2px solid #e2e8f0;
            font-size: 9px;
            color: #94a3b8;
            text-align: center;
        }
        .notes-section {
            margin-top: 20px;
            padding: 15px;
            background: #fffbeb;
            border-left: 4px solid #f59e0b;
            border-radius: 4px;
        }
        .notes-label {
            font-weight: bold;
            color: #92400e;
            margin-bottom: 5px;
        }
        .notes-content {
            color: #78350f;
            line-height: 1.5;
        }
        .signature-section {
            margin-top: 30px;
            display: table;
            width: 100%;
        }
        .signature-box {
            display: table-cell;
            width: 50%;
            padding: 10px;
            text-align: center;
        }
        .signature-title {
            font-weight: bold;
            margin-bottom: 60px;
            color: #475569;
        }
        .signature-name {
            border-top: 1px solid #64748b;
            padding-top: 5px;
            display: inline-block;
            min-width: 200px;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>PT SURYA MULTI CEMERLANG</h1>
        <h2>Laporan Produksi Harian</h2>
    </div>

    <div class="info-section">
        <div class="info-grid">
            <div class="info-row">
                <div class="info-label">No. Laporan</div>
                <div class="info-value">: {{ $report->report_number }}</div>
            </div>
            <div class="info-row">
                <div class="info-label">Tanggal Produksi</div>
                <div class="info-value">: {{ \Carbon\Carbon::parse($report->production_date)->format('d F Y') }}</div>
            </div>
            <div class="info-row">
                <div class="info-label">Line Produksi</div>
                <div class="info-value">: {{ $report->line->name }}</div>
            </div>
            <div class="info-row">
                <div class="info-label">Shift</div>
                <div class="info-value">: {{ $report->shift->name }} ({{ $report->shift->start_time }} - {{ $report->shift->end_time }})</div>
            </div>
            <div class="info-row">
                <div class="info-label">Status</div>
                <div class="info-value">: 
                    <span class="status-badge status-{{ $report->status }}">
                        @if($report->status === 'draft') DRAFT
                        @elseif($report->status === 'pending') MENUNGGU APPROVAL
                        @elseif($report->status === 'approved') DISETUJUI
                        @elseif($report->status === 'rejected') DITOLAK
                        @endif
                    </span>
                </div>
            </div>
            <div class="info-row">
                <div class="info-label">Dibuat Oleh</div>
                <div class="info-value">: {{ $report->creator->name }}</div>
            </div>
            @if($report->approver)
            <div class="info-row">
                <div class="info-label">Disetujui Oleh</div>
                <div class="info-value">: {{ $report->approver->name }} pada {{ \Carbon\Carbon::parse($report->approved_at)->format('d/m/Y H:i') }}</div>
            </div>
            @endif
        </div>
    </div>

    <h3 style="margin-top: 20px; margin-bottom: 10px; color: #1e40af;">Detail Produksi</h3>
    
    <table>
        <thead>
            <tr>
                <th style="width: 5%;">No</th>
                <th style="width: 20%;">Motif</th>
                <th style="width: 15%;">Dimensi</th>
                <th style="width: 15%;" class="text-right">Target</th>
                <th style="width: 15%;" class="text-right">Aktual</th>
                <th style="width: 15%;" class="text-right">NG</th>
                <th style="width: 15%;" class="text-right">Achievement</th>
            </tr>
        </thead>
        <tbody>
            @foreach($report->details as $index => $detail)
            <tr>
                <td class="text-center">{{ $index + 1 }}</td>
                <td>
                    <strong>{{ $detail->motif->code }}</strong><br>
                    <span style="font-size: 9px; color: #64748b;">{{ $detail->motif->name }}</span>
                </td>
                <td>{{ $detail->dimension->size }}</td>
                <td class="text-right">{{ number_format($detail->target_quantity, 0, ',', '.') }}</td>
                <td class="text-right">{{ number_format($detail->actual_quantity, 0, ',', '.') }}</td>
                <td class="text-right">{{ number_format($detail->ng_quantity, 0, ',', '.') }}</td>
                <td class="text-right">
                    @php
                        $achievement = $detail->target_quantity > 0 
                            ? round(($detail->actual_quantity / $detail->target_quantity) * 100, 2) 
                            : 0;
                    @endphp
                    <strong>{{ number_format($achievement, 2, ',', '.') }}%</strong>
                </td>
            </tr>
            @endforeach
        </tbody>
    </table>

    <div class="totals-section">
        <div class="totals-grid">
            <div class="totals-item">
                <div class="totals-label">Total Target</div>
                <div class="totals-value">{{ number_format($totals['target'], 0, ',', '.') }}</div>
            </div>
            <div class="totals-item">
                <div class="totals-label">Total Aktual</div>
                <div class="totals-value" style="color: #059669;">{{ number_format($totals['actual'], 0, ',', '.') }}</div>
            </div>
            <div class="totals-item">
                <div class="totals-label">Total NG</div>
                <div class="totals-value" style="color: #dc2626;">{{ number_format($totals['ng'], 0, ',', '.') }}</div>
            </div>
            <div class="totals-item">
                <div class="totals-label">Achievement Rate</div>
                <div class="totals-value" style="color: {{ $totals['achievement'] >= 100 ? '#059669' : '#f59e0b' }};">
                    {{ number_format($totals['achievement'], 2, ',', '.') }}%
                </div>
            </div>
        </div>
    </div>

    @if($report->notes)
    <div class="notes-section">
        <div class="notes-label">Catatan:</div>
        <div class="notes-content">{{ $report->notes }}</div>
    </div>
    @endif

    <div class="signature-section">
        <div class="signature-box">
            <div class="signature-title">Dibuat Oleh,</div>
            <div class="signature-name">{{ $report->creator->name }}</div>
        </div>
        @if($report->approver)
        <div class="signature-box">
            <div class="signature-title">Disetujui Oleh,</div>
            <div class="signature-name">{{ $report->approver->name }}</div>
        </div>
        @endif
    </div>

    <div class="footer">
        <p>Dicetak pada: {{ now()->format('d F Y H:i:s') }} | Dokumen ini digenerate otomatis oleh sistem</p>
        <p style="margin-top: 5px;">PT Surya Multi Cemerlang - Sistem Pelaporan Produksi</p>
    </div>
</body>
</html>
