//SHOW BOOKING
function showAppointments(){

    const container = document.getElementById("appointmentList");
    let bookings = JSON.parse(localStorage.getItem("bookings")) || [];

    container.innerHTML = "";

    if(bookings.length === 0){
        container.innerHTML = "<p style='font-size: 16px;'>No appointments found.</p>";
        return;
    }

    bookings.forEach((b, index) => {

        container.innerHTML += `
            <div class="card">
                <div class="details">
                    <p>Name: ${b.name}</p>
                    <p>Service: ${b.service}</p>
                    <p>Date: ${b.date}</p>
                    <p>Time: ${b.time}</p>
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

//CANCEL BOOKING
function cancelBooking(index){

    let bookings = JSON.parse(localStorage.getItem("bookings")) || [];

    bookings.splice(index, 1);

    localStorage.setItem("bookings", JSON.stringify(bookings));

    showPopup("Appointment cancelled successfully!");

    showAppointments();
}

//CANCEL OR EDIT POPUP 
function showPopup(message){

    const popup = document.getElementById("popup");
    const popupText = document.getElementById("popupText");

    popupText.textContent = message;
    popup.style.display = "flex";

    setTimeout(() => {
        popup.style.display = "none";
    }, 3000);
}

//EDIT BOOKING
let currentIndex = null;

function editBooking(index){

    let bookings = JSON.parse(localStorage.getItem("bookings")) || [];

    const booking = bookings[index];

    // store index globally
    currentIndex = index;

    // fill inputs
    document.getElementById("editName").value = booking.name;
    document.getElementById("editService").value = booking.service;
    document.getElementById("editDate").value = booking.date;
    document.getElementById("editTime").value = booking.time;

    // show modal
    document.getElementById("editModal").style.display = "flex";
}

//SAVE EDITED BOOKING
function saveEdit(){

    let bookings = JSON.parse(localStorage.getItem("bookings")) || [];

    const name = document.getElementById("editName").value;
    const service = document.getElementById("editService").value;
    const date = document.getElementById("editDate").value;
    const time = document.getElementById("editTime").value;

    // Prevent double booking (ignore current booking)
    const slotTaken = bookings.some((b, i) => 
        i !== currentIndex && b.date === date && b.time === time
    );

    if(slotTaken){
        showPopup("This time slot is already booked!");
        return;
    }

    // update booking
    bookings[currentIndex] = {name, service, date, time};

    localStorage.setItem("bookings", JSON.stringify(bookings));

    showPopup("Appointment updated successfully!");

    closeModal();
    showAppointments();
}

//CLOSE MODAL
function closeModal(){
    document.getElementById("editModal").style.display = "none";
}