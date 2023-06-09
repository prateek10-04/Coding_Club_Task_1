document.addEventListener('DOMContentLoaded', () => {
  const blogForm = document.getElementById('blogForm');
  const submitButton = blogForm.querySelector('button[type="submit"]');
  let formMode = 'create'; 
  let blogId = ''; 

  const blogToEdit = sessionStorage.getItem('blogToEdit');

  if (blogToEdit) {
    const blog = JSON.parse(blogToEdit);
    formMode = 'update'; 
    blogId = blog._id; 

    
    const titleInput = document.getElementById('title');
    const authorInput = document.getElementById('author');
    const contentInput = document.getElementById('content');

    
    titleInput.value = blog.title;
    authorInput.value = blog.author;
    contentInput.value = blog.content;

    blogForm.setAttribute('data-mode', formMode);
    blogForm.setAttribute('data-id', blogId);

    submitButton.textContent = formMode === 'create' ? 'Create Blog' : 'Update Blog';
  }

  blogForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const titleInput = document.getElementById('title');
    const authorInput = document.getElementById('author');
    const contentInput = document.getElementById('content');
    const title = titleInput.value;
    const author = authorInput.value;
    const content = contentInput.value;

    const formMode = blogForm.getAttribute('data-mode');
    let url = '/blogs';
    let method = 'POST';

    if (formMode === 'update') {
      url += `/${blogId}`;
      method = 'PUT';
    }

    const newBlog = {
      title: title,
      author: author,
      content: content
    };

    fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newBlog)
    })
      .then(response => response.json())
      .then(data => {
        console.log(data.message);

        titleInput.value = '';
        authorInput.value = '';
        contentInput.value = '';

        window.location.href = '/';
      })
      .catch(error => console.log(error));
  });

  window.addEventListener('beforeunload', () => {
    sessionStorage.removeItem('blogToEdit');
  });
});
