async function handleFormSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const successMessage = document.getElementById("success-message");
    const errorMessage = document.getElementById("error-message");

    // Clear any previous messages immediately
    successMessage.textContent = "";
    errorMessage.textContent = "";
    successMessage.classList.add("d-none");
    errorMessage.classList.add("d-none");

    try {
        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify(Object.fromEntries(formData)),
        });

        if (response.status === 200) {
            successMessage.textContent = "Thank you for your message. We will reply to you shortly!";
            successMessage.classList.remove("d-none");
            errorMessage.classList.add("d-none");
            e.target.reset(); // Reset the form after success
        } else {
            errorMessage.textContent = "Something went wrong! Please try again.";
            errorMessage.classList.remove("d-none");
            successMessage.classList.add("d-none");
        }
    } catch (error) {
        console.error("Error submitting form:", error);
        errorMessage.textContent = "An error occurred while submitting the form.";
        errorMessage.classList.remove("d-none");
        successMessage.classList.add("d-none");
    }
}
