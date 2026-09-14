# Gera public/capa.png (1200x630, cartão de compartilhamento) e public/favicon.png
# a partir de public/logo-gattini-dark.png.
#
# Uso, a partir da raiz do projeto:
#   powershell -ExecutionPolicy Bypass -File docs\gerar-capa.ps1

Add-Type -AssemblyName System.Drawing

$raiz = Split-Path -Parent $PSScriptRoot
$logoPath = Join-Path $raiz "public\logo-gattini-dark.png"
if (-not (Test-Path $logoPath)) { throw "Logo nao encontrado: $logoPath" }

$areia = [System.Drawing.ColorTranslator]::FromHtml("#f0e7d8")
$tinta = [System.Drawing.ColorTranslator]::FromHtml("#2f2118")
$suave = [System.Drawing.ColorTranslator]::FromHtml("#5f4b3b")
$terra = [System.Drawing.ColorTranslator]::FromHtml("#8a5524")

# ---------- capa.png ----------
$W = 1200; $H = 630
$bmp = New-Object System.Drawing.Bitmap($W, $H)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.SmoothingMode = 'AntiAlias'
$g.InterpolationMode = 'HighQualityBicubic'
$g.TextRenderingHint = 'ClearTypeGridFit'
$g.Clear($areia)
$g.FillRectangle((New-Object System.Drawing.SolidBrush($terra)), 0, 0, $W, 8)

$cen = New-Object System.Drawing.StringFormat
$cen.Alignment = 'Center'

$fEyebrow = New-Object System.Drawing.Font("Segoe UI", 15, [System.Drawing.FontStyle]::Bold)
$fTitulo  = New-Object System.Drawing.Font("Georgia", 62, [System.Drawing.FontStyle]::Regular)
$fSub     = New-Object System.Drawing.Font("Segoe UI", 21, [System.Drawing.FontStyle]::Regular)

$g.DrawString("G U I A   P A R A   F A M I L I A S".Replace("I L I A S","Í L I A S"), $fEyebrow, (New-Object System.Drawing.SolidBrush($terra)), $W/2, 96, $cen)
$g.DrawString("Telas em Família", $fTitulo, (New-Object System.Drawing.SolidBrush($tinta)), $W/2, 140, $cen)
$g.DrawString("Controles parentais: o que instalar, e como configurar", $fSub, (New-Object System.Drawing.SolidBrush($suave)), $W/2, 268, $cen)
$g.DrawLine((New-Object System.Drawing.Pen($terra, 2)), ($W/2 - 60), 350, ($W/2 + 60), 350)

$logo = [System.Drawing.Image]::FromFile($logoPath)
$lw = 400; $lh = [int]($lw * $logo.Height / $logo.Width)
$g.DrawImage($logo, [int](($W - $lw)/2), 420, $lw, $lh)
$logo.Dispose()

$bmp.Save((Join-Path $raiz "public\capa.png"), [System.Drawing.Imaging.ImageFormat]::Png)
$g.Dispose(); $bmp.Dispose()
Write-Host "public/capa.png gerada"

# ---------- favicon.png ----------
# Recorta o "G" do logo. Os limites abaixo valem para a arte 1841x683;
# se o logo for reexportado em outro tamanho, recalcule-os.
$src = New-Object System.Drawing.Bitmap($logoPath)
$rect = New-Object System.Drawing.Rectangle(724, 93, 267, 301)
$glifo = $src.Clone($rect, $src.PixelFormat)

$S = 256
$ico = New-Object System.Drawing.Bitmap($S, $S)
$gi = [System.Drawing.Graphics]::FromImage($ico)
$gi.SmoothingMode = 'AntiAlias'
$gi.InterpolationMode = 'HighQualityBicubic'
$gi.Clear($areia)
$alvoH = 180
$alvoW = [int]($alvoH * $glifo.Width / $glifo.Height)
$gi.DrawImage($glifo, [int](($S - $alvoW)/2), [int](($S - $alvoH)/2), $alvoW, $alvoH)
$ico.Save((Join-Path $raiz "public\favicon.png"), [System.Drawing.Imaging.ImageFormat]::Png)
$gi.Dispose(); $ico.Dispose(); $glifo.Dispose(); $src.Dispose()
Write-Host "public/favicon.png gerado"
