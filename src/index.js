/* eslint-disable no-await-in-loop */
import './css/index.css';
import './css/popUp.css';
import itemCounter from './item-counter';
import { comments } from './modules/comments';
import {
  getLikes, postLike, updateLikeCountUI,
} from './modules/likes'; // Import likes functionality

// Track comments using an object
const commentCounts = {};

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

async function fetchCommentCount(itemId) {
  const apiUrl = `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/Ak1TTqB18F0chgbGj32L/comments?item_id=${itemId}`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(
        `Network response was not ok. Status: ${response.status}`,
      );
    }
    const data = await response.json();
    return data.length || 0;
  } catch (error) {
    console.error('Error fetching comment count:', error);
    return 0;
  }
}

async function initLike(icon, card, appId, id) {
  // Event listener for like icon (toggle like on click)
  icon.addEventListener('click', async (e) => {
    e.preventDefault();
    e.stopPropagation();
    postLike(id);
    const updatedLikeCount = await getLikes(id);
    updateLikeCountUI(card, updatedLikeCount);
  });
}

async function initComment(btn, card, id) {
  btn.addEventListener('click', async (e) => {
    e.preventDefault();
    e.stopPropagation();
    btn.classList.add('active');
    comments(id, btn); // This line may need further implementation based on your comments function

    // Fetch and update comment count
    const apiUrl = `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/Ak1TTqB18F0chgbGj32L/comments?item_id=${id}`;

    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(
          `Network response was not ok. Status: ${response.status}`,
        );
      }
      const data = await response.json();
      const updatedCommentCount = data.length || 0;

      commentCounts[id] = updatedCommentCount;
      const commentCountElement = card.querySelector('.comment-count');
      commentCountElement.textContent = updatedCommentCount;
    } catch (error) {
      console.error('Error counting comments:', error);
    }
  });
}

async function loadItems() {
  const appId = 'Ak1TTqB18F0chgbGj32L'; // Your API key
  const baseApiUrl = 'https://api.tvmaze.com/shows?page=1';
  const shows = await fetchData(baseApiUrl);
  const kanbanBoard = document.getElementById('kanbanBoard');

  for (let i = 0; i < 18; i += 3) {
    const row = document.createElement('div');
    row.classList.add('row');

    for (let j = i; j < i + 3 && j < 18; j += 1) {
      const show = shows[j];
      const commentCount = await fetchCommentCount(show.id);
      const likeCount = await getLikes(show.id);

      const itemCard = document.createElement('div');
      itemCard.classList.add('item-card');
      itemCard.setAttribute('id', show.id);
      itemCard.innerHTML = `
        <img src="${show.image.medium}" alt="${show.name}" class="item-image">
        <h3>${show.name}</h3>
        <div class="likes">
         <button class="like-icon"><span >❤️</span></button>
          <span class="like-count">${likeCount}</span>
        </div>
        <button class="btn-comments comments-button" data-item-id="${show.id}">Comments</button>
        <span class="comment-icon">💬</span>
        <span class="comment-count">${commentCount}</span>
      `;
      const likeIcon = itemCard.querySelector('.like-icon'); // Get the like icon element
      initLike(likeIcon, itemCard, appId, show.id);

      const commentButton = itemCard.querySelector('.comments-button');
      initComment(commentButton, itemCard, show.id);

      row.appendChild(itemCard);
    }
    kanbanBoard.appendChild(row);
    itemCounter(kanbanBoard);
  }
}

document.addEventListener('DOMContentLoaded', loadItems);
