function validateForm(dueDateInput) {
    // Get the selected date value
    const selectedDateValue = dueDateInput.value;

    // Get the current date
    const currentDate = new Date().toISOString().split('T')[0];

    // Validate selected date
    if (selectedDateValue < currentDate) {
        alert('Please select a date not in the past.');
        return false; // Prevent form submission
    }

    return true; // Allow form submission
}
