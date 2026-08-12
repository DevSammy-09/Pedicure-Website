<?php
require 'includes/db.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    json_response(['success' => false, 'error' => 'Invalid request method.']);
}

$id = intval($_POST['id'] ?? 0);
if (!$id) {
    json_response(['success' => false, 'error' => 'Invalid booking ID.']);
}

$stmt = $mysqli->prepare('DELETE FROM bookings WHERE id = ?');
if (!$stmt) {
    json_response(['success' => false, 'error' => 'Database prepare failed.']);
}

$stmt->bind_param('i', $id);

if (!$stmt->execute()) {
    json_response(['success' => false, 'error' => 'Unable to cancel booking.']);
}

json_response(['success' => true, 'message' => 'Appointment cancelled successfully.']);
