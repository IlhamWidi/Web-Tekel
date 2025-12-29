# Export Diagrams Script
# Simple version

Write-Host "Exporting diagrams..." -ForegroundColor Cyan

# Create directory
New-Item -ItemType Directory -Path "exports/images" -Force | Out-Null

# Export ERD
Write-Host "Exporting ERD..." -ForegroundColor Yellow
mmdc -i docs/ERD.md -o exports/images/ERD-Database-Schema.png -t default -w 2400 -H 1600 -b white
mmdc -i docs/ERD.md -o exports/images/ERD-Database-Schema.svg -t default -b white

# Export Use Case
Write-Host "Exporting Use Case Diagram..." -ForegroundColor Yellow
mmdc -i docs/USE-CASE-DIAGRAM.md -o exports/images/Use-Case-Diagram.png -t default -w 2400 -H 1600 -b white
mmdc -i docs/USE-CASE-DIAGRAM.md -o exports/images/Use-Case-Diagram.svg -t default -b white

# Export UML
Write-Host "Exporting UML Diagrams..." -ForegroundColor Yellow
mmdc -i docs/UML-DIAGRAMS.md -o exports/images/UML-Complete.png -t default -w 2400 -H 1600 -b white
mmdc -i docs/UML-DIAGRAMS.md -o exports/images/UML-Complete.svg -t default -b white

Write-Host "Done! Check exports/images folder" -ForegroundColor Green
