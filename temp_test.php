<?php
$_SERVER['REQUEST_METHOD'] = 'POST';
$_POST = ['id' => 1, 'name' => 'Updated', 'service' => 'Spa Pedicure', 'date' => '2026-08-12', 'time' => '10:00 AM'];
include 'update_booking.php';
