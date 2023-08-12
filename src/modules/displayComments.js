// eslint-disable-next-line import/no-cycle
import { cleanComments, setCounter } from './comments';
import { getShowData, getComments } from './GETcomments';

const displayComments = async (id) => {
  const pathById = `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/Ak1TTqB18F0chgbGj32L/comments/?item_id=${id}`;
  const comments = await getComments(pathById);
  const show = await getShowData(`https://api.tvmaze.com/shows/${id}`);
  document.querySelector('#dataShow').innerHTML = ` <img src="${show.image.medium}"> 
                                                    <h2 class="p-title">${show.name}</h2>
                                                    <ul class="p-features">
                                                        <li class="f-item"> <p> Genre:</p>${show.genres}</li>
                                                        <li class="f-item"> <p>Premiered:</p>${show.premiered}</li>
                                                        <li class="f-item"> <p>Language:</p> ${show.language}</li>
                                                        <li class="f-item"> <p>Official Site:</p>${show.officialSite}</li>
                                                    </ul>`;
  const list = document.querySelector('.list-comments');
  cleanComments();
  setCounter(comments);
  if (comments.length !== undefined) {
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