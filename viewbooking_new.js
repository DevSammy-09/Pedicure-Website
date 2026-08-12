let bookings = [];
let currentBookingId = null;

async function showAppointments() {
    const container = document.getElementById('appointmentList');
    if (!container) return;

    container.innerHTML = '<p style="font-size: 16px;">Loading appointments...</p>';

    try {
        const response = await fetch('get_bookings.php', {
            headers: { 'Accept': 'application/json' }
        });
        const text = await response.text();
        let data = null;

        try {
            data = text ? JSON.parse(text) : null;
        } catch (error) {
            data = { success: false, error: text || 'Invalid response from server.' };
        }

        if (!response.ok || !data || !data.success || !Array.isArray(data.bookings)) {
            container.innerHTML = `<p style="font-size: 16px;">${data?.error || 'Unable to load appointments.'}</p>`;
            bookings = [];
            return;
        }

        bookings = data.bookings;

        if (bookings.length === 0) {
            container.innerHTML = "<p style='font-size: 16px;'>No appointments found.</p>";
            return;
        }

        container.innerHTML = '';
        bookings.forEach((b, index) => {
            container.innerHTML += `
                <div class="card">
                    <div class="details">
                        <p><strong>Name:</strong> ${b.name}</p>
                        <p><strong>Service:</strong> ${b.service}</p>
                        <p><strong>Date:</strong> ${b.booking_date}</p>
                        <p><strong>Time:</strong> ${b.booking_time}</p>
                    </div>
                    <div class="buttonContainer">
                        <button onclick="editBooking(${index})">Edit</button>
                        <button onclick="cancelBooking(${index})">Cancel</button>
                    </div>
                </div>
            `;
        });
    } catch (error) {
        container.innerHTML = '<p style="font-size: 16px;">Unable to connect to the server.</p>';
    }
}

showAppointments();

async function cancelBooking(index) {
    const booking = bookings[index];
    if (!booking) return;

    const formData = new FormData();
    formData.append('id', booking.id);

    try {
        const response = await fetch('delete_booking.php', {
            method: 'POST',
            body: formData,
            headers: { 'Accept': 'application/json' }
        });

        const text = await response.text();
        let data = null;

        try {
            data = text ? JSON.parse(text) : null;
        } catch (error) {
            data = { success: false, error: text || 'Unable to cancel appointment.' };
        }

        showPopup(data?.message || data?.error || 'Unable to cancel appointment.');
        if (data?.success) {
            showAppointments();
        }
    } catch (error) {
        showPopup('Unable to cancel appointment.');
    }
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

    try {
        const response = await fetch('update_booking.php', {
            method: 'POST',
            body: formData,
            headers: { 'Accept': 'application/json' }
        });

        const text = await response.text();
        let data = null;

        try {
            data = text ? JSON.parse(text) : null;
        } catch (error) {
            data = { success: false, error: text || 'Unable to update appointment.' };
        }

        showPopup(data?.message || data?.error || 'Unable to update appointment.');

        if (data?.success) {
            closeModal();
            showAppointments();
        }
    } catch (error) {
        showPopup('Unable to update appointment.');
    }
}

function closeModal() {
    document.getElementById('editModal').style.display = 'none';
}
