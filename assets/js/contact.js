const form = document.getElementById('contact-form');
const messageBox = document.getElementById('form-message');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const message = form.message.value.trim();

  if (name.length < 2) {
    showMessage('Please enter a valid name (at least 2 characters).', 'error');
    return;
  }

  if (!validateEmail(email)) {
    showMessage('Please enter a valid email address.', 'error');
    return;
  }

  if (message.length < 10) {
    showMessage('Your message must be at least 10 characters long.', 'error');
    return;
  }

  // If validation passes, send the form with fetch:
  try {
    const formData = new FormData(form);
    const response = await fetch(form.action, {
      method: form.method,
      body: formData,
      headers: { 'Accept': 'application/json' }
    });

    if (response.ok) {
      showMessage('Thanks for sending me a message!', 'success');
      form.reset();
    } else {
      showMessage('Oops! There was a problem sending your message.', 'error');
    }
  } catch {
    showMessage('Network error, please try again later.', 'error');
  }
});

function showMessage(msg, type) {
  messageBox.textContent = msg;
  messageBox.className = 'form-message ' + type;
}

function validateEmail(email) {
  // Simple regex for email validation
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}