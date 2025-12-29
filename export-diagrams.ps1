# Export All Mermaid Diagrams to Images
# PT Surya Multi Cemerlang - Production Report System

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Diagram Export Tool" -ForegroundColor Cyan
Write-Host "  PT Surya Multi Cemerlang" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Create exports directory if not exists
$exportsDir = "exports/images"
if (-not (Test-Path $exportsDir)) {
    New-Item -ItemType Directory -Path $exportsDir -Force | Out-Null
    Write-Host "✓ Created exports directory" -ForegroundColor Green
}

# Define diagrams to export
$diagrams = @(
    @{
        Name = "ERD-Database-Schema"
        Source = "docs/ERD.md"
        Description = "Entity Relationship Diagram - Database Schema"
    },
    @{
        Name = "Use-Case-Diagram"
        Source = "docs/USE-CASE-DIAGRAM.md"
        Description = "Use Case Diagram - System Actors and Use Cases"
    },
    @{
        Name = "UML-Diagrams-Complete"
        Source = "docs/UML-DIAGRAMS.md"
        Description = "Complete UML Diagrams - System Architecture"
    }
)

Write-Host "Starting diagram export process..." -ForegroundColor Yellow
Write-Host ""

$successCount = 0
$failCount = 0

foreach ($diagram in $diagrams) {
    Write-Host "Processing: $($diagram.Name)" -ForegroundColor Cyan
    Write-Host "  Source: $($diagram.Source)" -ForegroundColor Gray
    
    # Export to PNG (for Word/PDF)
    $pngOutput = "$exportsDir/$($diagram.Name).png"
    Write-Host "  → Generating PNG..." -ForegroundColor Gray
    
    try {
        & mmdc -i $diagram.Source -o $pngOutput -t default -w 2400 -H 1600 -b white 2>$null
        
        if (Test-Path $pngOutput) {
            $fileSize = (Get-Item $pngOutput).Length / 1KB
            Write-Host "  ✓ PNG created: $([math]::Round($fileSize, 2)) KB" -ForegroundColor Green
            $successCount++
        } else {
            Write-Host "  ✗ PNG failed to create" -ForegroundColor Red
            $failCount++
        }
    } catch {
        Write-Host "  ✗ Error generating PNG: $_" -ForegroundColor Red
        $failCount++
    }
    
    # Export to SVG (for presentations/scalable)
    $svgOutput = "$exportsDir/$($diagram.Name).svg"
    Write-Host "  → Generating SVG..." -ForegroundColor Gray
    
    try {
        & mmdc -i $diagram.Source -o $svgOutput -t default -b white 2>$null
        
        if (Test-Path $svgOutput) {
            $fileSize = (Get-Item $svgOutput).Length / 1KB
            Write-Host "  ✓ SVG created: $([math]::Round($fileSize, 2)) KB" -ForegroundColor Green
            $successCount++
        } else {
            Write-Host "  ✗ SVG failed to create" -ForegroundColor Red
            $failCount++
        }
    } catch {
        Write-Host "  ✗ Error generating SVG: $_" -ForegroundColor Red
        $failCount++
    }
    
    Write-Host ""
}

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Export Summary:" -ForegroundColor Cyan
Write-Host "  Success: $successCount files" -ForegroundColor Green
Write-Host "  Failed: $failCount files" -ForegroundColor $(if($failCount -gt 0){"Red"}else{"Green"})
Write-Host "  Output: $exportsDir" -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# List all exported files
if (Test-Path $exportsDir) {
    Write-Host "Exported Files:" -ForegroundColor Green
    Get-ChildItem $exportsDir -File | ForEach-Object {
        $sizeKB = [math]::Round($_.Length / 1KB, 2)
        Write-Host "  • $($_.Name) - $sizeKB KB" -ForegroundColor Gray
    }
    Write-Host ""
}

Write-Host "✓ Export process completed!" -ForegroundColor Green
Write-Host ""
Write-Host "Next Steps:" -ForegroundColor Yellow
Write-Host "  1. Check exports/images/ folder for generated diagrams" -ForegroundColor Gray
Write-Host "  2. Open PNG files for Word/PDF documents" -ForegroundColor Gray
Write-Host "  3. Use SVG files for presentations (scalable)" -ForegroundColor Gray
Write-Host "  4. Add diagrams to your internship proposal" -ForegroundColor Gray
Write-Host ""
