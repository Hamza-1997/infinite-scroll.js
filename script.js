const postsContainer = document.getElementById('posts-container');
const filterInput = document.querySelector('.filter');
const loader = document.querySelector('.loader');
let limit = 3;
let page = 1;

async function getPosts() {
  const res = await fetch(
    ` https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`
  );

  const data = await res.json();
  return data;
}

// show in DOM
async function showPosts() {
  const posts = await getPosts();
  posts.forEach((post) => {
    const postEl = document.createElement('div');
    postEl.classList.add('post');
    postEl.innerHTML = `
    <div class="number">${post.id}</div>
        <div class="post-info">
          <h2 class="post-title">${post.title}</h2>

          <p class="post-body">
          ${post.body}
          </p>
        </div>
    `;
    postsContainer.appendChild(postEl);
  });
}
showPosts();

function showLoader() {
  loader.classList.add('show');
  setTimeout(() => {
    loader.classList.remove('show');
    setTimeout(() => {
      page++;
      showPosts();
    }, 300);
  }, 1000);
}
// console.log(postsContainer.getBoundingClientRect());

window.addEventListener('scroll', function () {
  const { clientHeight, scrollTop, scrollHeight } = document.documentElement;
  // if the user hasn't scrolled far enough (>100px to the end)
  if (clientHeight + scrollTop >= scrollHeight - 5) {
    // showPosts();
    showLoader();
  }

  // We can get window-relative coordinates of
  // the whole document as
  //  document.documentElement.getBoundingClientRect(),
  //   the bottom property will be window-relative
  //    coordinate of the document bottom.

  // We can obtain the window height as document.documentElement.clientHeight
});

//filter search

function filterPosts(e) {
  const term = e.target.value.toUpperCase();
  const posts = document.querySelectorAll('.post');

  posts.forEach((post) => {
    const title = post.querySelector('.post-title').innerText.toUpperCase();
    const body = post.querySelector('.post-body').innerText.toUpperCase();
    if (title.indexOf(term) > -1 || body.indexOf(term) > -1) {
      post.style.display = 'flex';
    } else {
      post.style.display = 'none';
    }
  });
}
filterInput.addEventListener('input', filterPosts);
