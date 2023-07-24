const signupForm = document.querySelector('#signup-form');

signupForm.addEventListener('submit', handleSignup);

async function handleSignup(event) {
  event.preventDefault();

  const usernameInput = document.querySelector('#username-input');
  const passwordInput = document.querySelector('#password-input');

  const formData = {
    username: usernameInput.value,
    password: passwordInput.value,
  };

  try {
    const response = await fetch('/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      window.location.href = '/dashboard';
    } else {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }
  } catch (error) {
    console.error(error);
    // Display error message to the user
  }
}
