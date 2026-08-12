const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', async function (event) {
        event.preventDefault();

        const formData = new FormData(contactForm);
        const response = await fetch('contact_submit.php', {
            method: 'POST',
            body: formData,
        });

        let data;
        try {
            data = await response.json();
        } catch (error) {
            alert('Unexpected server response.');
            return;
        }

        if (!data.success) {
            alert(data.error || 'Unable to send message.');
            return;
        }

        alert(data.message || 'Message sent successfully.');
        contactForm.reset();
    });
}
