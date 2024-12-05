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

    // Safely retrieve and validate each field
    const name = formData.get("name")?.trim() || "";
    const email = formData.get("email")?.trim() || "";
    // const phone = formData.get("phone")?.trim() || "";
    const serviceType = formData.get("serviceType") || "0";
    const message = formData.get("message")?.trim() || "";

    if (!name || !email || serviceType === "0" || !message) {
        errorMessage.textContent = "Please fill in all required fields.";
        errorMessage.classList.remove("d-none");
        return; // Stop submission if validation fails
    }

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
            successMessage.textContent =
                "Thank you for your message. We will reply to you shortly!";
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
