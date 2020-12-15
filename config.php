<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

if (!isset($_SERVER["HTTP_HOST"]) && isset($argv[1])) {
    $_SERVER['REQUEST_METHOD'] = 'POST';
    $_POST = $argv[1];
}

$response = [];

switch($_SERVER['REQUEST_METHOD'] ?? 'GET') {
    case 'GET':
        $response = json_decode(file_get_contents('./settings.json'));
    break;
    case 'POST':
        $data = json_decode($_POST, true);
        file_put_contents('./settings.json', json_encode($data, JSON_PRETTY_PRINT));
        $response = "Configuration updated.";
    break;
}

header('Content-Type: application/json');
echo json_encode($response);