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
  const initComment = (btn, id) => {
    btn.addEventListener('click', async (e) => {
      e.preventDefault();
      e.stopPropagation();
      btn.classList.add('active');
      comments(id, btn);
    });
  };
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
          <span class="like-icon">:corazón:</span>
          <span class="like-count">${likeCount}</span>
        </div>
        <button class="btn-comments comments-button" data-item-id="${show.id}">Comments</button>
        <span class="comment-icon">:bocadillo_de_diálogo:</span>
        <span class="comment-count">0</span>
      `;
      const commentButton = itemCard.querySelector('.comments-button');
      initComment(commentButton, show.id);
      row.appendChild(itemCard);
    }
    kanbanBoard.appendChild(row);
  }
}

document.addEventListener('DOMContentLoaded', loadItems);