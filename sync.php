<?php
$ftp_server = "ftp.tuservidor.com"; // Cambia esto por tu servidor FTP|
$ftp_user = "tu_usuario";
$ftp_pass = "tu_contraseña";
$remote_file = "/Ejemplo.CSV";
$local_file = __DIR__ . "/Ejemplo.CSV";
$json_file = __DIR__ . "/products.json";

// 1. Conectar al FTP
$conn = ftp_connect($ftp_server);
if (!$conn) {
    exit("❌ Error: No se pudo conectar al servidor FTP.");
}

if (!ftp_login($conn, $ftp_user, $ftp_pass)) {
    ftp_close($conn);
    exit("❌ Error: No se pudo iniciar sesión en el FTP.");
}

ftp_pasv($conn, true);
echo "✅ Conexión FTP exitosa.<br>";

echo "🔽 Intentando descargar: <code>$remote_file</code><br>";
if (!ftp_get($conn, $local_file, $remote_file, FTP_BINARY)) {
    ftp_close($conn);
    exit("❌ Error al descargar el archivo: <code>$remote_file</code>");
}

ftp_close($conn);
echo "✅ Archivo descargado exitosamente en: <code>$local_file</code><br><br>";

// 2. Leer CSV con delimitador fijo ;
$file_data = file($local_file, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
if ($file_data === false || count($file_data) < 2) {
    exit("❌ El archivo está vacío o tiene un formato inválido.");
}

$delimiter = ";"; // ← delimitador fijo según tu archivo

$rows = array_map(function($line) use ($delimiter) {
    return str_getcsv($line, $delimiter);
}, $file_data);

$header = array_map('strtolower', $rows[0]);
unset($rows[0]);

$data = [];
foreach ($rows as $row) {
    if (count($row) === count($header)) {
        $data[] = array_combine($header, $row);
    }
}

if (empty($data)) {
    exit("❌ No se pudo convertir el archivo a JSON.");
}

file_put_contents($json_file, json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
echo "✅ JSON generado correctamente en: <code>$json_file</code>";
?>

