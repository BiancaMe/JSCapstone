import "./css/index.css";
import "./css/popUp.css";
import { comments } from "./modules/comments";

const commentCounts = {};
const likeCounts = {};

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

async function fetchCommentCount(appId, itemId) {
  const apiUrl = `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${appId}/comments?item_id=${itemId}`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(
        `Network response was not ok. Status: ${response.status}`
      );
    }
    const data = await response.json();
    return data.length || 0;
  } catch (error) {
    console.error("Error fetching comment count:", error);
    return 0;
  }
}

async function fetchLikeCount(appId, itemId) {
  const apiUrl = `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${appId}/likes?item_id=${itemId}`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(
        `Network response was not ok. Status: ${response.status}`
      );
    }
    const data = await response.json();
    return data.likes || 0;
  } catch (error) {
    console.error("Error fetching like count:", error);
    return 0;
  }
}

async function loadItems() {
  const appId = "Ak1TTqB18F0chgbGj32L"; // Your API key
  const baseApiUrl = "https://api.tvmaze.com/shows?page=1";
  const shows = await fetchData(baseApiUrl);
  const kanbanBoard = document.getElementById("kanbanBoard");

  for (let i = 0; i < shows.length; i += 3) {
    const row = document.createElement("div");
    row.classList.add("row");

    for (let j = i; j < i + 3 && j < shows.length; j += 1) {
      const show = shows[j];
      const commentCount = await fetchCommentCount(appId, show.id);
      const likeCount = await fetchLikeCount(appId, show.id);

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
        <button class="btn-likes like-button" data-item-id="${show.id}">Like</button>
        <button class="btn-comments comments-button" data-item-id="${show.id}">Comments</button>
        <span class="comment-icon">💬</span>
        <span class="comment-count">${commentCount}</span>
      `;

      const likeButton = itemCard.querySelector(".like-button");
      initLike(likeButton, itemCard, appId, show.id);

      const commentButton = itemCard.querySelector(".comments-button");
      initComment(commentButton, itemCard, show.id);

      row.appendChild(itemCard);
    }

    kanbanBoard.appendChild(row);
  }

  await countLikes();
}

async function initLike(btn, card, appId, id) {
  btn.addEventListener("click", async (e) => {
    e.preventDefault();
    e.stopPropagation();

    // Check if the button is already active (liked)
    if (btn.classList.contains("active")) {
      return;
    }

    btn.classList.add("active");
    await updateLikeCount(appId, id, card);
  });
}

async function updateLikeCount(appId, id, card) {
  const apiUrl = `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${appId}/likes`;

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ item_id: id }),
    });

    if (!response.ok) {
      throw new Error(
        `Network response was not ok. Status: ${response.status}`
      );
    }

    const likeCountElement = card.querySelector(".like-count");
    const currentLikes = parseInt(likeCountElement.textContent);
    const updatedLikes = currentLikes + 1;
    likeCountElement.textContent = updatedLikes;
  } catch (error) {
    console.error("Error updating likes:", error);
  }
}

async function initComment(btn, card, id) {
  // ... (same as before)
}

document.addEventListener("DOMContentLoaded", loadItems);
