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

const closePop = (btn) => {
  document.querySelector('#close').addEventListener('click', () => {
    document.querySelector('.popup').classList.add('hidden');
    btn.classList.remove('active');
    const comments = document.querySelectorAll('.item-comment');
    comments.forEach((elem) => elem.remove());
  });
};

const addComment = (elem) => {
  document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (elem.matches('.active')) POSTcomment(path, elem.parentElement.id);
  });
};

const setCounter = (comments) => {
  document.querySelector('.cont').innerHTML = `(${comments.length})`;
};

const comments = async (id, elem) => {
  document.querySelector('.popup').classList.remove('hidden');
  const pathById = `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/Ak1TTqB18F0chgbGj32L/comments/?item_id=${id}`;
  const comments = await getComments(pathById);
  setCounter(comments);
  displayComments(comments);
  closePop(elem);
};

const initComment = () => {
  const showsComments = document.querySelector('#homeForTestComments');
  showsComments.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopImmediatePropagation();
    e.target.classList.add('active');
    const { id } = e.target.parentElement;
    comments(id, e.target);
    addComment(e.target);
  });
};

export default initComment;