<?php
require 'includes/db.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    json_response(['success' => false, 'error' => 'Invalid request method.']);
}

$id = intval($_POST['id'] ?? 0);
$name = trim($_POST['name'] ?? '');
$service = trim($_POST['service'] ?? '');
$date = trim($_POST['date'] ?? '');
$time = trim($_POST['time'] ?? '');

if (!$id || !$name || !$service || !$date || !$time) {
    json_response(['success' => false, 'error' => 'Please provide all required booking fields.']);
}

$stmt = $mysqli->prepare(
    'UPDATE bookings SET name = ?, service = ?, booking_date = ?, booking_time = ? WHERE id = ?'
);

if (!$stmt) {
    json_response(['success' => false, 'error' => 'Database prepare failed.']);
}

$stmt->bind_param('ssssi', $name, $service, $date, $time, $id);

if (!$stmt->execute()) {
    json_response(['success' => false, 'error' => 'Unable to update booking.']);
}

json_response(['success' => true, 'message' => 'Appointment updated successfully.']);
