# Simple formatter for environments without npm/prettier
# Replacements:
# - tabs -> 2 spaces
# - remove trailing whitespace
# - normalize CRLF -> LF
# - ensure single newline at EOF

$extensions = @('*.js','*.css','*.html')
$excludeDirs = @('node_modules','dist','web/lib')
$root = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $root

$modified = @()

Get-ChildItem -Path . -Recurse -Include $extensions | Where-Object {
    foreach($d in $excludeDirs){ if ($_.FullName -like "*$d*") { return $false } }
    return $true
} | ForEach-Object {
    $path = $_.FullName
    try{
        $orig = Get-Content -Path $path -Raw -ErrorAction Stop -Encoding UTF8
    }catch{
        return
    }
    $new = $orig -replace "\t","  "
    # normalize line endings to LF
    $new = $new -replace "\r\n","\n"
    $lines = $new -split "\n"
    for($i=0;$i -lt $lines.Length;$i++){
        $lines[$i] = $lines[$i] -replace '\s+$',''
    }
    $new = [string]::Join("\n", $lines)
    # ensure single newline at EOF
    if(-not $new.EndsWith("\n")) { $new = $new + "\n" }

    if($new -ne $orig){
        [System.IO.File]::WriteAllText($path, $new, [System.Text.Encoding]::UTF8)
        $modified += $path
        Write-Host "Formatted: $path"
    }
}

if($modified.Count -eq 0){
    Write-Host "No files required formatting." -ForegroundColor Green
}else{
    Write-Host "\nSummary: $($modified.Count) files formatted." -ForegroundColor Yellow
}

exit 0
