// eslint-disable-next-line import/no-cycle
import { cleanComments, setCounter } from './comments';
import getComments from './GETcomments';

const displayComments = async (id) => {
  const pathById = `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/Ak1TTqB18F0chgbGj32L/comments/?item_id=${id}`;
  const comments = await getComments(pathById);
  const list = document.querySelector('.list-comments');
  cleanComments();
  setCounter(comments);
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

export default displayComments;