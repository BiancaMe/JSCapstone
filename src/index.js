import "./index.css";
import { countLikes } from "./likesCounter";
import { countComments } from "./commentsCounter";

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

async function loadLikes(itemIds) {
  const apiUrl = "https://involvement-api.com/likes/";
  const likes = {};

  try {
    const responses = await Promise.all(
      itemIds.map((itemId) => fetch(apiUrl + itemId))
    );
    for (const response of responses) {
      const data = await response.json();
      likes[data.itemId] = data.likes || 0;
    }
  } catch (error) {
    console.error("Error loading likes:", error);
  }

  return likes;
}

async function updateLike(itemId) {
  const apiUrl = `https://involvement-api.com/likes/${itemId}`;
  try {
    const response = await fetch(apiUrl, { method: "POST" });
    if (!response.ok) {
      throw new Error(`Failed to update like. Status: ${response.status}`);
    }
  } catch (error) {
    console.error("Error updating like:", error);
  }
}

async function loadItems() {
  const baseApiUrl = "https://api.tvmaze.com/shows?page=1";
  const shows = await fetchData(baseApiUrl);
  const itemIds = shows.map((show) => show.id);
  const likes = await loadLikes(itemIds);

  const kanbanBoard = document.getElementById("kanbanBoard");

  for (let i = 0; i < shows.length; i += 3) {
    const row = document.createElement("div");
    row.classList.add("row");

    for (let j = i; j < i + 3 && j < shows.length; j++) {
      const show = shows[j];
      const likeCount = likes[show.id] || 0;

      const itemCard = document.createElement("div");
      itemCard.classList.add("item-card");
      itemCard.innerHTML = `
        <img src="${show.image.medium}" alt="${show.name}" class="item-image">
        <h3>${show.name}</h3>
        <div class="likes">
          <span class="like-icon">❤️</span>
          <span class="like-count">${likeCount}</span>
        </div>
        <button class="comments-button" data-item-id="${show.id}">Comments</button>
        <span class="comment-icon">💬</span>
        <span class="comment-count">0</span>
      `;

      const likeIcon = itemCard.querySelector(".like-icon");
      const likeCountElement = itemCard.querySelector(".like-count");
      likeIcon.addEventListener("click", () => {
        updateLike(show.id).then(() => {
          const updatedLikeCount =
            parseInt(likeCountElement.textContent, 10) + 1;
          likeCountElement.textContent = updatedLikeCount;
        });
      });

      const commentIcon = itemCard.querySelector(".comment-icon");
      const commentCountElement = itemCard.querySelector(".comment-count");
      commentIcon.addEventListener("click", async () => {
        const updatedCommentCount =
          parseInt(commentCountElement.textContent, 10) + 1;
        commentCountElement.textContent = updatedCommentCount;
        await countComments();
      });

      row.appendChild(itemCard);
    }

    kanbanBoard.appendChild(row);
  }

  await countLikes();
  await countComments();
}

document.addEventListener("DOMContentLoaded", loadItems);
