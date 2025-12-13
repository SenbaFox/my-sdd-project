# Simple lint script for environments without npm
# Scans .js files (excluding node_modules/dist/web/lib) for common issues

$root = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $root

$excludeDirs = @("node_modules","dist","web/lib")
$patterns = @{
    'CONSOLE' = 'console\.log\s*\(';
    'DEBUGGER' = '\bdebugger\b';
    'TAB_CHAR' = "\t";
    'TRAILING_WS' = '\s+$';
    'LONG_LINE' = '.{121,}';
    'DOUBLE_EQ' = '(?<![=!])==(?!=)';
    'VAR_USAGE' = '\bvar\s+';
    'TODO' = '\bTODO\b';
}

$files = Get-ChildItem -Path . -Recurse -Include *.js | Where-Object {
    foreach($d in $excludeDirs){ if ($_.FullName -like "*$d*") { return $false } }
    return $true
}

$issues = @()
foreach($f in $files){
    $lines = Get-Content $f.FullName -Raw -ErrorAction SilentlyContinue -Encoding UTF8
    if(-not $lines) { continue }
    $arr = $lines -split "\r?\n"
    for($i=0;$i -lt $arr.Length;$i++){
        $line = $arr[$i]
        foreach($key in $patterns.Keys){
            $regex = $patterns[$key]
            if($line -match $regex){
                $issues += [PSCustomObject]@{
                    File = $f.FullName;
                    Line = $i + 1;
                    Type = $key;
                    Text = $line.Trim();
                }
            }
        }
    }
}

if($issues.Count -eq 0){
    Write-Host "Simple lint: No issues found." -ForegroundColor Green
    exit 0
}

Write-Host "Simple lint found issues:" -ForegroundColor Yellow
$issues | Sort-Object File,Line | ForEach-Object {
    Write-Host "[$($_.Type)] $($_.File) :$($_.Line) -> $($_.Text)" -ForegroundColor Cyan
}

# Summary
$summary = $issues | Group-Object Type | ForEach-Object { "$($_.Name): $($_.Count)" }
Write-Host "\nSummary:" -ForegroundColor Yellow
$summary | ForEach-Object { Write-Host $_ }

exit 0
