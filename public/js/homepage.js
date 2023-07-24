// Handle fetching existing blog posts from the back-end API and rendering them dynamically on the homepage
fetchPosts();

async function fetchPosts() {
  try {
    const response = await fetch('/api/posts');
    if (!response.ok) {
      throw new Error('Failed to fetch blog posts');
    }
    const posts = await response.json();
    renderPosts(posts);
  } catch (error) {
    console.error(error);
  }
}

function renderPosts(posts) {
  const postContainer = document.querySelector('.post-container');
  if (posts.length === 0) {
    postContainer.innerHTML = '<p>No blog posts available.</p>';
  } else {
    postContainer.innerHTML = '';
    posts.forEach((post) => {
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
