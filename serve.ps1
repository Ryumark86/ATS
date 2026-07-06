Start-Job -ScriptBlock {
    $port = 8000
    $listener = New-Object System.Net.HttpListener
    $listener.Prefixes.Add("http://localhost:$port/")
    $listener.Start()
    Write-Host "Servidor en: http://localhost:$port/"
    while ($listener.IsListening) {
        $ctx = $listener.GetContext()
        $path = $ctx.Request.Url.LocalPath.TrimStart('/')
        if ([string]::IsNullOrEmpty($path)) { $path = "index.html" }
        $file = Join-Path $PSScriptRoot $path
        if (Test-Path $file -PathType Leaf) {
            $ext = [System.IO.Path]::GetExtension($file)
            $map = @{
                '.html' = 'text/html; charset=utf-8'
                '.css'  = 'text/css'
                '.js'   = 'application/javascript'
                '.png'  = 'image/png'
                '.json' = 'application/json'
            }
            if ($map.ContainsKey($ext)) { $ctx.Response.ContentType = $map[$ext] }
            [byte[]]$bytes = [System.IO.File]::ReadAllBytes($file)
            $ctx.Response.OutputStream.Write($bytes, 0, $bytes.Length)
        } else {
            $ctx.Response.StatusCode = 404
            $data = [Text.Encoding]::UTF8.GetBytes("404 - $path no encontrado")
            $ctx.Response.OutputStream.Write($data, 0, $data.Length)
        }
        $ctx.Response.Close()
    }
} | Out-Null
Start-Sleep 1
Start-Process "http://localhost:8000/"
