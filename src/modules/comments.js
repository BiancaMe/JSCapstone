import getComments from './GETcomments';
import POSTcomment from './POSTcomments';

// Generated with API NetWork
const path = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/Ak1TTqB18F0chgbGj32L/comments';

const displayComments = (comments) => {
  const list = document.querySelector('.list-comments');
  if (comments) {
    comments.forEach((elem) => {
      const add = document.createElement('li');
      add.setAttribute('class', 'item-comment');
      add.innerHTML = ` <div class="c-user-data">
                          <h4 class="c-user">${elem.username}</h4>
                          <p class="c-date">${elem.creation_date}</p>
                      </div>
                      <p class="comment">${elem.comment}</p>`;
      list.appendChild(add);
    });
  }
};

const closePop = () => {
  document.querySelector('#close').addEventListener('click', () => {
    document.querySelector('.popup').classList.add('hidden');
    const comments = document.querySelectorAll('.item-comment');
    comments.forEach((elem) => elem.remove());
  });
};

const addComment = (path) => {
  document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();
    POSTcomment(path);
  });
};

const initComment = () => {
  const showsComments = document.querySelectorAll('.btn-comments');
  showsComments.forEach((element) => {
    element.addEventListener('click', async (e) => {
      e.preventDefault();
      document.querySelector('.popup').classList.remove('hidden');
      const { id } = e.target.parentElement;
      const pathById = `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/Ak1TTqB18F0chgbGj32L/comments/?item_id=${id}`;
      const comments = await getComments(pathById);
      displayComments(comments);
      addComment(path, id);
      closePop();
    });
  });
};

export default initComment;
