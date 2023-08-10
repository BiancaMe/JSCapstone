import './css/index.css';
import './css/popUp.css';
import { comments } from './modules/comments';

async function fetchData(apiUrl) {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(
        `Network response was not ok. Status: ${response.status}`,
      );
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}

async function loadItems() {
  const baseApiUrl = 'https://api.tvmaze.com/shows?page=1';
  const shows = await fetchData(baseApiUrl);
  const itemIds = shows.map((show) => show.id);
  // const likes = await loadLikes(itemIds);

  const kanbanBoard = document.getElementById('kanbanBoard');

  for (let i = 0; i < shows.length; i += 3) {
    const row = document.createElement('div');
    row.classList.add('row');

    for (let j = i; j < i + 3 && j < shows.length; j++) {
      const show = shows[j];
      // const likeCount = likes[show.id] || 0;
      const likeCount = 0;
      const itemCard = document.createElement('div');
      itemCard.classList.add('item-card');
      itemCard.setAttribute('id', show.id);
      itemCard.innerHTML = `
        <img src="${show.image.medium}" alt="${show.name}" class="item-image">
        <h3>${show.name}</h3>
        <div class="likes">
          <span class="like-icon">❤️</span>
          <span class="like-count">${likeCount}</span>
        </div>
        <button class="btn-comments comments-button" data-item-id="${show.id}">Comments</button>
        <span class="comment-icon">💬</span>
        <span class="comment-count">0</span>
      `;
      /*
      const likeIcon = itemCard.querySelector('.like-icon');
      const likeCountElement = itemCard.querySelector('.like-count');
      likeIcon.addEventListener('click', () => {
        updateLike(show.id).then(() => {
          const updatedLikeCount = parseInt(likeCountElement.textContent, 10) + 1;
          likeCountElement.textContent = updatedLikeCount;
        });
      });

      const commentIcon = itemCard.querySelector('.comment-icon');
      const commentCountElement = itemCard.querySelector('.comment-count');
      commentIcon.addEventListener('click', async () => {
        const updatedCommentCount = parseInt(commentCountElement.textContent, 10) + 1;
        commentCountElement.textContent = updatedCommentCount;
        await countComments();
      });*/

      row.appendChild(itemCard);
    }

    kanbanBoard.appendChild(row);
  }
}

document.addEventListener('DOMContentLoaded', loadItems);

const initComment = () => {
  const btns = document.getElementsByClassName('btn-comments');
  console.log(btns);
  const arrBtns = Array.from(btns);
  arrBtns.forEach((elem) => {
    elem.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      e.target.classList.add('active');
      const { id } = e.target.parentElement;
      comments(id, e.target);
    });
  });
};


document.addEventListener('DOMNodeInserted', initComment);