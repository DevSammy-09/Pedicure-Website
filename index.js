//PREVIOUS AND NEXT TESTIMONIALS
const testimonials = document.querySelectorAll(".testimonial");
const next = document.querySelector(".next");
const prev = document.querySelector(".prev");

let index = 0;

function showTestimonial(i){
    testimonials.forEach(t => t.classList.remove("active"));
    testimonials[i].classList.add("active");
}

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

//SUNDAY CLOSURE
const dateInput = document.getElementById("date");

const today = new Date().toISOString().split("T")[0];
dateInput.setAttribute("min", today);

dateInput.addEventListener("change", function () {
  const selectedDate = new Date(this.value);
  const day = selectedDate.getDay();

  if (day === 0) {
    alert("We are closed on Sundays. Please choose another date.");
    this.value = "";
  }
});

//SUCCESS POPUP


//FORM SUBMISSION
function handleBooking(event){

    event.preventDefault(); // stops page refresh

    document.getElementById("bookingForms").reset();

}

document.getElementById("bookingForms").addEventListener("submit", handleBooking);

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

}

//SAVE BOOKINGS TO LOCAL STORAGE

function bookAppoint(){

    const form = document.getElementById("bookingForms");
    const name = document.getElementById("name").value;
    const number = document.getElementById("number").value;
    const date = document.getElementById("date").value;
    const service = document.getElementById("service").value;
    const time = document.getElementById("time").value;

    function showPopup(message){

        document.getElementById("popupText").textContent = message;

        document.getElementById("popup").style.display = "flex";

    }

    //NO INPUT SELECTED POPUP
    
    if (!name) {
        showPopup("Please enter your name");
        return;
    }
    if (!number) {
        showPopup("Please enter your phone number");
        return;
    }
    if (!email) {
        showPopup("Please enter your Email");
        return;
    }
    if (!service) {
        showPopup("Please select a service");
        return;
    }
    if(!date){
        showPopup("Please select a date");
        return;
    }

    if(!time){
        showPopup("Please select a time");
        return;
    }

    let bookings = JSON.parse(localStorage.getItem("bookings")) || [];

    const slotTaken = bookings.some(b => b.date === date && b.time === time);
    if(slotTaken){
      showPopup("This time slot is already booked!");
      return;
    }

    bookings.push({name, number, date, service, time});
    localStorage.setItem("bookings", JSON.stringify(bookings));

    showPopup("Appointment booked successfully. Check Booking page to view your appointment.");
    form.reset();
}

function closePopup(){
    document.getElementById("popup").style.display = "none";
}