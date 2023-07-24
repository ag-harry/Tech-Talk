// Get the post ID from the URL
const postId = window.location.pathname.split('/').pop();

// Fetch the specific blog post details and comments from the back-end API
fetchPostDetails(postId);

async function fetchPostDetails(postId) {
  try {
    const response = await fetch(`/api/posts/${postId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch post details');
    }
    const postDetails = await response.json();
    renderPostDetails(postDetails);
  } catch (error) {
    console.error(error);
  }
}

function renderPostDetails(postDetails) {
  const postContainer = document.querySelector('.post-container');
  postContainer.innerHTML = '';

  const postCard = createPostCard(postDetails.post);
  postContainer.appendChild(postCard);

  const commentsContainer = document.querySelector('.comments-container');
  commentsContainer.innerHTML = '';

  postDetails.comments.forEach((comment) => {
    const commentCard = createCommentCard(comment);
    commentsContainer.appendChild(commentCard);
  });
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

function createCommentCard(comment) {
  const commentCard = document.createElement('div');
  commentCard.classList.add('comment-card');

  const commentText = document.createElement('p');
  commentText.textContent = comment.text;

  commentCard.appendChild(commentText);

  return commentCard;
}
