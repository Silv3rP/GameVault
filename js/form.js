(function() {
    // get the form and input elements from the DOM
    const form = document.querySelector(".user-form");
    const fnameInput = document.getElementById("fname");
    const lnameInput = document.getElementById("lname");
    const emailInput = document.getElementById("email");
    const message = document.getElementById("form-message");

    let fadeTimeout, clearMessage;

    // regex patterns for validation
    const namePattern = /^[A-Za-z\s]{2,50}$/;
    const validateEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    form.addEventListener("submit", (e) => {
    e.preventDefault();
    
        // clear any previous message and remove fade-out class
        clearTimeout(fadeTimeout);
        clearTimeout(clearMessage);

        message.classList.remove("message-fade-out");


        // check if any field is empty or fails validation
        if (
            fnameInput.value.trim() === '' ||
            lnameInput.value.trim() === '' ||
            emailInput.value.trim() === '' ||
            !namePattern.test(fnameInput.value.trim()) ||
            !namePattern.test(lnameInput.value.trim()) ||
            !validateEmail.test(emailInput.value.trim())
        ) {
            // show error message and add shake animation to the form for visual feedback on error    
            message.className = "error-message";
            message.textContent = "Please fill in all fields with a name containing at least 2 characters and provide a valid email address!";
            
            // remove and re-add the shake class to restart the animation
            form.classList.remove("shake");
            setTimeout(() => {
                form.classList.add("shake");
            }, 10);

        } else {
            // show success message and clear fields
            message.className = "success-message";
            message.textContent = "Thank you for subscribing to our newsletter!";
            fnameInput.value = '';
            lnameInput.value = '';
            emailInput.value = '';
            
        }
            // fade out either message after 3 seconds, then clear the message after 4 seconds
            fadeTimeout = setTimeout(() => {
                message.classList.add("message-fade-out");
            }, 3000);

            clearMessage = setTimeout(() => {
                message.textContent = '';
            }, 4000);
        
    });

})();
