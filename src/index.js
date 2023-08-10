import "./css/index.css";
import "./css/popUp.css";
import { comments } from "./modules/comments";

// Track likes and comments using objects
const likeCounts = {};
const commentCounts = {};

async function fetchData(apiUrl) {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(
        `Network response was not ok. Status: ${response.status}`
      );
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}

async function loadItems() {
  const baseApiUrl = "https://api.tvmaze.com/shows?page=1";
  const shows = await fetchData(baseApiUrl);
  const kanbanBoard = document.getElementById("kanbanBoard");

  for (let i = 0; i < shows.length; i += 3) {
    const row = document.createElement("div");
    row.classList.add("row");

    for (let j = i; j < i + 3 && j < shows.length; j += 1) {
      const show = shows[j];
      const likeCount = likeCounts[show.id] || 0; // Use the tracked like count
      const commentCount = commentCounts[show.id] || 0; // Use the tracked comment count

      const itemCard = document.createElement("div");
      itemCard.classList.add("item-card");
      itemCard.setAttribute("id", show.id);
      itemCard.innerHTML = `
        <img src="${show.image.medium}" alt="${show.name}" class="item-image">
        <h3>${show.name}</h3>
        <div class="likes">
          <span class="like-icon">❤️</span>
          <span class="like-count">${likeCount}</span>
        </div>
        <button class="btn-comments comments-button" data-item-id="${show.id}">Comments</button>
        <span class="comment-icon">💬</span>
        <span class="comment-count">${commentCount}</span>
      `;

      const likeButton = itemCard.querySelector(".like-icon");
      likeButton.addEventListener("click", () => {
        likeCounts[show.id] = (likeCounts[show.id] || 0) + 1;
        const likeCountElement = itemCard.querySelector(".like-count");
        likeCountElement.textContent = likeCounts[show.id];
      });

      const commentButton = itemCard.querySelector(".comments-button");
      initComment(commentButton, itemCard, show.id); // Pass itemCard to initComment

      row.appendChild(itemCard);
    }

    kanbanBoard.appendChild(row);
  }
}

function initComment(btn, card, id) {
  btn.addEventListener("click", async (e) => {
    e.preventDefault();
    e.stopPropagation();
    btn.classList.add("active");
    comments(id, btn);
    commentCounts[id] = (commentCounts[id] || 0) + 1;
    const commentCountElement = card.querySelector(".comment-count");
    commentCountElement.textContent = commentCounts[id];
  });
}

document.addEventListener("DOMContentLoaded", loadItems);
