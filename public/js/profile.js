// Fetch user profile data and display it
const fetchUserProfile = async () => {
    try {
      const response = await fetch('/api/users/profile');
      if (response.ok) {
        const userData = await response.json();
        // Update the DOM with user profile data
        document.querySelector('#username').textContent = userData.username;
        document.querySelector('#email').textContent = userData.email;
      } else {
        console.error('Error fetching user profile');
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };
  
  // Call the fetchUserProfile function to display the profile on page load
  fetchUserProfile();
  
  // Event listener for creating a new blog post
  document.querySelector('#create-post-form').addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent the default form submission
  
    const title = document.querySelector('#title-input').value;
    const content = document.querySelector('#content-input').value;
  
    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content }),
      });
  
      if (response.ok) {
        // Clear the form inputs
        document.querySelector('#title-input').value = '';
        document.querySelector('#content-input').value = '';
  
        // Reload the page to display the new post
        location.reload();
      } else {
        console.error('Error creating a new post');
      }
    } catch (error) {
      console.error('Error creating a new post:', error);
    }
  });
  
  // Function to fetch and display the user's blog posts
  const fetchUserPosts = async () => {
    try {
      const response = await fetch('/api/posts');
      if (response.ok) {
        const postsData = await response.json();
        const postsContainer = document.querySelector('#user-posts');
  
        // Clear the container
        postsContainer.innerHTML = '';
  
        // Iterate over the posts and create HTML elements to display them
        postsData.forEach((post) => {
          const postElement = document.createElement('div');
          postElement.classList.add('post');
          postElement.innerHTML = `
            <h3 class="post-title">${post.title}</h3>
            <p class="post-content">${post.content}</p>
            <p class="post-date">Created on: ${new Date(post.createdAt).toLocaleString()}</p>
          `;
          postsContainer.appendChild(postElement);
        });
      } else {
        console.error('Error fetching user posts');
      }
    } catch (error) {
      console.error('Error fetching user posts:', error);
    }
  };
  
  // Call the fetchUserPosts function to display the user's posts on page load
  fetchUserPosts();
  