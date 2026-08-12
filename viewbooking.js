let bookings = [];
let currentBookingId = null;

async function showAppointments() {
    const container = document.getElementById('appointmentList');
    container.innerHTML = '';

    const response = await fetch('get_bookings.php');
    const data = await response.json();

    if (!data.success || !Array.isArray(data.bookings) || data.bookings.length === 0) {
        container.innerHTML = "<p style='font-size: 16px;'>No appointments found.</p>";
        bookings = [];
        return;
    }

    bookings = data.bookings;

    bookings.forEach((b, index) => {
        container.innerHTML += `
            <div class="card">
                <div class="details">
                    <p>Name: ${b.name}</p>
                    <p>Service: ${b.service}</p>
                    <p>Date: ${b.booking_date}</p>
                    <p>Time: ${b.booking_time}</p>
                </div>
                <div class="buttonContainer">
                    <button onclick="editBooking(${index})">Edit</button>
                    <button onclick="cancelBooking(${index})">Cancel</button>
                </div>
            </div>
        `;
    });
}

showAppointments();

async function cancelBooking(index) {
    const booking = bookings[index];
    if (!booking) return;

    const formData = new FormData();
    formData.append('id', booking.id);

    const response = await fetch('delete_booking.php', {
        method: 'POST',
        body: formData,
    });

    const data = await response.json();
    showPopup(data.message || data.error || 'Unable to cancel appointment.');
    showAppointments();
}

function showPopup(message) {
    const popup = document.getElementById('popup');
    const popupText = document.getElementById('popupText');

    popupText.textContent = message;
    popup.style.display = 'flex';

    setTimeout(() => {
        popup.style.display = 'none';
    }, 3000);
}

function editBooking(index) {
    const booking = bookings[index];
    if (!booking) return;

    currentBookingId = booking.id;

    document.getElementById('editName').value = booking.name;
    document.getElementById('editService').value = booking.service;
    document.getElementById('editDate').value = booking.booking_date;
    document.getElementById('editTime').value = booking.booking_time;

    document.getElementById('editModal').style.display = 'flex';
}

async function saveEdit() {
    if (!currentBookingId) {
        showPopup('No appointment selected.');
        return;
    }

    const name = document.getElementById('editName').value.trim();
    const service = document.getElementById('editService').value.trim();
    const date = document.getElementById('editDate').value.trim();
    const time = document.getElementById('editTime').value.trim();

    if (!name || !service || !date || !time) {
        showPopup('Please complete all fields before saving.');
        return;
    }

    const formData = new FormData();
    formData.append('id', currentBookingId);
    formData.append('name', name);
    formData.append('service', service);
    formData.append('date', date);
    formData.append('time', time);

    const response = await fetch('update_booking.php', {
        method: 'POST',
        body: formData,
    });

    const data = await response.json();
    showPopup(data.message || data.error || 'Unable to update appointment.');

    if (data.success) {
        closeModal();
        showAppointments();
    }
}

function closeModal() {
    document.getElementById('editModal').style.display = 'none';
}
