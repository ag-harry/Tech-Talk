document.querySelector('#login-form').addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent the default form submission
  
    // Get the form input values
    const username = document.querySelector('#username-input').value;
    const password = document.querySelector('#password-input').value;
  
    try {
      // Make a POST request to the login endpoint
      const response = await fetch('/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
  
      if (response.ok) {
        // Successful login, redirect to the dashboard page
        window.location.href = '/dashboard';
      } else {
        // Display an error message
        const errorData = await response.json();
        const errorContainer = document.querySelector('#error-message');
        errorContainer.textContent = errorData.message;
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  });
  