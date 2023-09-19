document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    const message = document.getElementById("message");
  
    form.addEventListener("submit", function (e) {
      const nameInput = document.querySelector('input[name="name"]');
      const phoneInput = document.querySelector('input[name="phone"]');
      const name = nameInput.value.trim();
      const phone = phoneInput.value.trim();
  
      // Check if the name is not more than 252 characters
      if (name.length > 252) {
        showMessage("Name should not exceed 252 characters.");
        e.preventDefault(); // Prevent form submission on validation error
        return;
      }
  
      // Check if the phone number is a 10-digit number
      if (!/^\d{10}$/.test(phone)) {
        showMessage("Phone number should be a 10-digit number.");
        e.preventDefault(); // Prevent form submission on validation error
        return;
      }
  
      // If all validations pass, display a success message with the name
      showMessage(`Contact added: ${name}`);
    });
  
    function showMessage(msg) {
      const messageDiv = document.getElementById("message"); // Get the message div
      messageDiv.textContent = msg;
      messageDiv.style.display = "block";
  
      // Hide the message after 3 seconds (adjust as needed)
      setTimeout(() => {
        messageDiv.style.display = "none";
      }, 3000);
    }
  });
  