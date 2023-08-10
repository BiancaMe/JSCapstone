// eslint-disable-next-line import/no-cycle
import displayComments from './displayComments';
import POSTcomment from './POSTcomments';

// Generated with API NetWork
// path = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/Ak1TTqB18F0chgbGj32L/comments';

export const setCounter = (comments) => {
  if (comments.length === undefined) {
    document.querySelector('.cont').innerHTML = '(0)';
  } else {
    document.querySelector('.cont').innerHTML = `(${comments.length})`;
  }
};

export const cleanComments = () => {
  const comments = document.querySelectorAll('.item-comment');
  comments.forEach((elem) => elem.remove());
};

const closePop = (btn) => {
  document.getElementById('close').addEventListener('click', () => {
    document.querySelector('.popup').classList.add('hidden');
    btn.classList.remove('active');
    cleanComments();
  });
};

export const comments = async (id, elem) => {
  document.querySelector('.popup').classList.remove('hidden');
  displayComments(id);
  closePop(elem);
  // new code
  document.querySelector('#btn-submit').addEventListener('click', (e) => {
    e.preventDefault();
    if (elem.classList.contains('active'))POSTcomment(id);
    e.stopPropagation();
  }, { once: true });
};
