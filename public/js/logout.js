document.querySelector('#logout-btn').addEventListener('click', async () => {
    try {
      // Make a POST request to the logout endpoint
      const response = await fetch('/api/users/logout', {
        method: 'POST',
      });
  
      if (response.ok) {
        // Successful logout, redirect to the login page
        window.location.href = '/login';
      } else {
        console.error('Error during logout');
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  });
  