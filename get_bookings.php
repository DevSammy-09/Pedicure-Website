<?php
require 'includes/db.php';

$sql = 'SELECT id, name, number, email, service, booking_date, booking_time FROM bookings ORDER BY booking_date ASC, booking_time ASC';
$result = $mysqli->query($sql);

if ($result === false) {
    json_response(['success' => false, 'error' => 'Could not retrieve appointments.']);
}

$bookings = [];
while ($row = $result->fetch_assoc()) {
    $bookings[] = [
        'id' => (int) $row['id'],
        'name' => $row['name'],
        'number' => $row['number'],
        'email' => $row['email'],
        'service' => $row['service'],
        'booking_date' => $row['booking_date'],
        'booking_time' => $row['booking_time']
    ];
}

json_response(['success' => true, 'bookings' => $bookings]);
