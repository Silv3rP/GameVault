(function() {
    // get the form and input elements from the DOM
    const form = document.querySelector(".user-form");
    const fnameInput = document.getElementById("fname");
    const lnameInput = document.getElementById("lname");
    const emailInput = document.getElementById("email");
    const message = document.getElementById("form-message");

    // regex patterns for validation
    const namePattern = /^[A-Za-z\s]{2,50}$/;
    const validateEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    form.addEventListener("submit", (e) => {

        // clear any previous message
        message.textContent = "";

        // check if any field is empty or fails validation
        if (
            fnameInput.value.trim() === '' ||
            lnameInput.value.trim() === '' ||
            emailInput.value.trim() === '' ||
            !namePattern.test(fnameInput.value.trim()) ||
            !namePattern.test(lnameInput.value.trim()) ||
            !validateEmail.test(emailInput.value.trim())
        ) {
            // stop form submitting and show error message and add shake animation to the form for visual feedback on error
            e.preventDefault();
            message.className = "error-message";
            message.textContent = "Please fill in all fields with a name containing at least 2 characters and provide a valid email address.";
            form.classList.add("shake");
            setTimeout(() => { form.classList.remove("shake"); }, 600);
            return;

            
        }
        else {
            // stop form submitting, show success message and clear fields
            e.preventDefault();
            message.className = "success-message";
            message.textContent = "Thank you for subscribing to our newsletter!";
            fnameInput.value = '';
            lnameInput.value = '';
            emailInput.value = '';
        }
    });

})();
