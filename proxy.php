<?php
/**
 * SA-MP / open.mp UDP Query Proxy
 * Кладёшь рядом с index.html на любой PHP хостинг.
 * Браузер не умеет UDP — этот файл делает запрос за него.
 *
 * Использование: proxy.php?ip=217.182.127.213&port=7777
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

// ─── Настройки ────────────────────────────────────────────────────────────────
$default_ip   = '217.182.127.213';
$default_port = 7777;
$timeout      = 3; // секунд

// ─── Параметры запроса ────────────────────────────────────────────────────────
$ip   = isset($_GET['ip'])   ? trim($_GET['ip'])   : $default_ip;
$port = isset($_GET['port']) ? (int)$_GET['port']  : $default_port;

// Минимальная проверка IP
if (!filter_var($ip, FILTER_VALIDATE_IP) || $port < 1 || $port > 65535) {
    echo json_encode(['online' => false, 'error' => 'invalid params']);
    exit;
}

// ─── Собираем SA-MP Query пакет ('i' = info) ──────────────────────────────────
// Формат: "SAMP" + 4 байта IP + 2 байта порт (little-endian) + опкод
$parts   = explode('.', $ip);
$packet  = 'SAMP';
$packet .= chr((int)$parts[0]);
$packet .= chr((int)$parts[1]);
$packet .= chr((int)$parts[2]);
$packet .= chr((int)$parts[3]);
$packet .= chr($port & 0xFF);
$packet .= chr(($port >> 8) & 0xFF);
$packet .= 'i'; // opcode: info

// ─── Отправляем UDP пакет ─────────────────────────────────────────────────────
$socket = @fsockopen('udp://' . $ip, $port, $errno, $errstr, $timeout);

if (!$socket) {
    echo json_encode(['online' => false, 'error' => 'socket error: ' . $errstr]);
    exit;
}

stream_set_timeout($socket, $timeout);
fwrite($socket, $packet);

// ─── Читаем ответ ─────────────────────────────────────────────────────────────
$response = fread($socket, 2048);
fclose($socket);

if (!$response || strlen($response) < 11) {
    echo json_encode(['online' => false, 'error' => 'no response']);
    exit;
}

// ─── Парсим ответ ─────────────────────────────────────────────────────────────
// Пропускаем заголовок: 4 (SAMP) + 4 (IP) + 2 (port) + 1 (opcode) = 11 байт
$offset = 11;

function read_uint8(&$data, &$offset) {
    $val = ord($data[$offset]);
    $offset += 1;
    return $val;
}

function read_uint16(&$data, &$offset) {
    $val = unpack('v', substr($data, $offset, 2))[1];
    $offset += 2;
    return $val;
}

function read_uint32(&$data, &$offset) {
    $val = unpack('V', substr($data, $offset, 4))[1];
    $offset += 4;
    return $val;
}

function read_string(&$data, &$offset) {
    $len = unpack('v', substr($data, $offset, 2))[1]; // 2-byte length
    $offset += 2;
    $str = substr($data, $offset, $len);
    $offset += $len;
    return $str;
}

function read_string8(&$data, &$offset) {
    $len = ord($data[$offset]); // 1-byte length
    $offset += 1;
    $str = substr($data, $offset, $len);
    $offset += $len;
    return $str;
}

try {
    $has_password = read_uint8($response, $offset);
    $players      = read_uint16($response, $offset);
    $max_players  = read_uint16($response, $offset);
    $hostname     = read_string($response, $offset);
    $gamemode     = read_string($response, $offset);
    $language     = read_string($response, $offset);

    echo json_encode([
        'online'      => true,
        'players'     => $players,
        'max_players' => $max_players,
        'hostname'    => $hostname,
        'gamemode'    => $gamemode,
        'language'    => $language,
        'password'    => (bool)$has_password,
    ], JSON_UNESCAPED_UNICODE);

} catch (Exception $e) {
    echo json_encode(['online' => false, 'error' => 'parse error']);
}