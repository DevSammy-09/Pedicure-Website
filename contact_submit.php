<?php
require 'includes/db.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    json_response(['success' => false, 'error' => 'Invalid request method.']);
}

$name = trim($_POST['name'] ?? '');
$email = trim($_POST['email'] ?? '');
$tel = trim($_POST['tel'] ?? '');
$message = trim($_POST['message'] ?? '');

if (!$name || !$email || !$tel || !$message) {
    json_response(['success' => false, 'error' => 'Please fill in all required fields.']);
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    json_response(['success' => false, 'error' => 'Please enter a valid email address.']);
}

$stmt = $mysqli->prepare(
    'INSERT INTO messages (name, email, tel, message) VALUES (?, ?, ?, ?)'
);

if (!$stmt) {
    json_response(['success' => false, 'error' => 'Database prepare failed.']);
}

$stmt->bind_param('ssss', $name, $email, $tel, $message);

if (!$stmt->execute()) {
    json_response(['success' => false, 'error' => 'Could not save message.']);
}

json_response(['success' => true, 'message' => 'Your message has been sent successfully.']);
