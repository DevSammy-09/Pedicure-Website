//PREVIOUS AND NEXT TESTIMONIALS
const testimonials = document.querySelectorAll(".testimonial");
const next = document.querySelector(".next");
const prev = document.querySelector(".prev");

let index = 0;

function showTestimonial(i){
    testimonials.forEach(t => t.classList.remove("active"));
    if (testimonials[i]) {
        testimonials[i].classList.add("active");
    }
}

// Guard the slider so a missing button can never throw and stop the rest
// of this script (which would prevent the booking handler from attaching).
if (next && prev && testimonials.length) {
    next.addEventListener("click", ()=>{
        index++;
        if(index >= testimonials.length){
            index = 0;
        }
        showTestimonial(index);
    });

    prev.addEventListener("click", ()=>{
        index--;
        if(index < 0){
            index = testimonials.length - 1;
        }
        showTestimonial(index);
    });
}


//SUNDAY CLOSURE
const dateInput = document.getElementById("date");

if (dateInput) {
    const today = new Date().toISOString().split("T")[0];
    dateInput.setAttribute("min", today);

    dateInput.addEventListener("change", function () {
        const selectedDate = new Date(this.value);

        if (Number.isNaN(selectedDate.getTime())) {
            return;
        }

        const day = selectedDate.getDay();

        if (day === 0) {
            alert("We are closed on Sundays. Please choose another date.");
            this.value = "";
        }
    });
}

//FORM SUBMISSION
const bookingForm = document.getElementById('bookingForms');
if (bookingForm) {
    bookingForm.addEventListener('submit', handleBooking);
}

async function handleBooking(event) {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);
    const name = formData.get('name')?.toString().trim();
    const number = formData.get('number')?.toString().trim();
    const email = formData.get('email')?.toString().trim();
    const service = formData.get('service')?.toString().trim();
    const date = formData.get('date')?.toString().trim();
    const time = formData.get('time')?.toString().trim();

    if (!name || !number || !email || !service || !date || !time) {
        showPopup('Please complete all booking fields.');
        return;
    }

    // If the page was opened directly from disk (file://) there is no server
    // to talk to, so fetch() would fail with a confusing message. Guide the user.
    if (window.location.protocol === 'file:') {
        showPopup('Please open this site through the server (e.g. http://localhost/Pedicure%20Website%20Project/index.html), not by double-clicking the HTML file.');
        return;
    }

    try {

        const response = await fetch('booking_submit.php', {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });

        const responseText = await response.text();
        let data = null;

        if (responseText) {
            try {
                data = JSON.parse(responseText);
            } catch (error) {
                data = { success: false, error: responseText };
            }
        }

        if (!response.ok) {
            showPopup(`Booking failed (${response.status} ${response.statusText}). ${responseText || 'Please try again.'}`.trim());
            return;
        }

        if (!data || !data.success) {
            showPopup(data?.error || 'Unable to submit booking.');
            return;
        }

        showPopup(data.message || 'Appointment booked successfully.');
        form.reset();
    } catch (error) {
        showPopup(`Unable to connect to the server. ${error.message || 'Please try again.'}`.trim());
    }
};

function showPopup(message) {
    const popup = document.getElementById('popup');
    const popupText = document.getElementById('popupText');

    // Fallback so the user ALWAYS gets feedback, even if the popup markup
    // is missing on the current page.
    if (!popup || !popupText) {
        alert(message);
        return;
    }

    popupText.textContent = message;
    popup.style.display = 'flex';
}

//SMOOTH SCROLLING
window.addEventListener("scroll", reveal);

function reveal(){

    const reveals = document.querySelectorAll(".reveal");

    for(let i = 0; i < reveals.length; i++){

        const windowHeight = window.innerHeight;
        const elementTop = reveals[i].getBoundingClientRect().top;
        const elementVisible = 150;

        if(elementTop < windowHeight - elementVisible){
            reveals[i].classList.add("active");
        }

    }

};

function closePopup(){
    document.getElementById("popup").style.display = "none";
};
