<?php
require 'includes/db.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    json_response(['success' => false, 'error' => 'Invalid request method.']);
}

$name = trim($_POST['name'] ?? '');
$number = trim($_POST['number'] ?? '');
$email = trim($_POST['email'] ?? '');
$service = trim($_POST['service'] ?? '');
$date = trim($_POST['date'] ?? '');
$time = trim($_POST['time'] ?? '');

if (!$name || !$number || !$email || !$service || !$date || !$time) {
    json_response(['success' => false, 'error' => 'Please fill in all required fields.']);
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    json_response(['success' => false, 'error' => 'Please enter a valid email address.']);
}

$stmt = $mysqli->prepare(
    'INSERT INTO bookings (name, number, email, service, booking_date, booking_time) VALUES (?, ?, ?, ?, ?, ?)'
);

if (!$stmt) {
    json_response(['success' => false, 'error' => 'Database prepare failed.']);
}

$stmt->bind_param('ssssss', $name, $number, $email, $service, $date, $time);

if (!$stmt->execute()) {
    json_response(['success' => false, 'error' => 'Could not save booking.']);
}

json_response(['success' => true, 'message' => 'Appointment booked successfully.']);
