// Handle fetching the user's existing blog posts from the back-end API and rendering them dynamically on the dashboard
fetchUserPosts();

async function fetchUserPosts() {
  try {
    const response = await fetch('/api/posts/user');
    if (!response.ok) {
      throw new Error('Failed to fetch user posts');
    }
    const userPosts = await response.json();
    renderUserPosts(userPosts);
  } catch (error) {
    console.error(error);
  }
}

function renderUserPosts(userPosts) {
  const postContainer = document.querySelector('.post-container');
  if (userPosts.length === 0) {
    postContainer.innerHTML = '<p>No posts available.</p>';
  } else {
    postContainer.innerHTML = '';
    userPosts.forEach((post) => {
      const postCard = createPostCard(post);
      postContainer.appendChild(postCard);
    });
  }
}

function createPostCard(post) {
  const postCard = document.createElement('div');
  postCard.classList.add('post-card');

  const postTitle = document.createElement('h2');
  postTitle.textContent = post.title;

  const postContent = document.createElement('p');
  postContent.textContent = post.content;

  postCard.appendChild(postTitle);
  postCard.appendChild(postContent);

  return postCard;
}
