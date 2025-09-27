Write-Host "=== Cleaning Next.js build cache (.next) ==="
if (Test-Path ".\.next") {
    Remove-Item -Recurse -Force ".\.next"
    Write-Host "Deleted .next folder"
} else {
    Write-Host ".next folder not found, skipping..."
}

Write-Host "=== Restarting Next.js dev server ==="
npm run dev
