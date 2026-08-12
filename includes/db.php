<?php
$dbHost = 'localhost';
$dbName = 'pedicare';
$dbUser = 'root';
$dbPass = '';

$mysqli = new mysqli($dbHost, $dbUser, $dbPass, $dbName);

if ($mysqli->connect_errno) {
    header('Content-Type: application/json');
    echo json_encode(['success' => false, 'error' => 'Database connection failed: ' . $mysqli->connect_error]);
    exit;
}

$mysqli->set_charset('utf8mb4');

function json_response(array $data)
{
    header('Content-Type: application/json');
    echo json_encode($data);
    exit;
}
